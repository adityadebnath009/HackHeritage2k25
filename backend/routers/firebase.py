# backend/routers/firebase.py
from fastapi import APIRouter, HTTPException, status, Depends
from models.firebaseModels import VerifyOTPRequest
from firebase_admin import auth
from pymongo.collection import Collection
from db import get_user_collection, get_profiles_collection
from models.user import UserDB 
from models.profile import ProfileDB 
from datetime import datetime
from fastapi.security import OAuth2PasswordBearer
firebase_router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="verify-otp")

@firebase_router.post("/verify-otp")
def verify_otp(
    req: VerifyOTPRequest,
    users_col: Collection = Depends(get_user_collection),
    profiles_col: Collection = Depends(get_profiles_collection)
):
    try:
        decoded_token = auth.verify_id_token(req.id_token)
        uid = decoded_token["uid"]
        phone_number = decoded_token.get("phone_number", None)
        
        # Check if user already exists
        user_doc = users_col.find_one({"_id": uid})

        if user_doc:
            # User exists, return success
            return {"status": "success", "uid": uid, "phone": phone_number}
        else:
            # User does not exist, create a new user and profile
            abha_no = "DEMO1234567890" 

            # Create a new profile document first to get its ID
            new_profile = {
                "user_id": uid,
                "full_name": "New User",
                "chronic_conditions": [],
                "medical_records": []
            }
            profile_result = profiles_col.insert_one(new_profile)
            
            # Now, create the user document with the new profile's ID
            new_user = {
                "_id": uid,
                "abha_no": abha_no,
                "phone": phone_number,
                "profile_id": str(profile_result.inserted_id),
                "created_at": datetime.utcnow()
            }
            users_col.insert_one(new_user)
            
            return {"status": "Newsuccess", "uid": uid, "phone": phone_number}

    except auth.InvalidIdTokenError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Invalid Firebase token: {e}")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"An unexpected error occurred: {str(e)}")
    
def get_current_user(token: str = Depends(oauth2_scheme)):
    print("TOKEN:", token)
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except auth.InvalidIdTokenError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")