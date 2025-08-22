# backend/routers/auth.py
from fastapi import APIRouter, HTTPException, status, Depends
from models.authModels import SendOTPRequest, VerifyOTPRequest
from twilio.rest import Client
import os
from pymongo.collection import Collection
from db import get_user_collection, get_profiles_collection
from datetime import datetime
from fastapi.security import OAuth2PasswordBearer

auth_router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="verify-otp")

# Twilio client initialization
client = Client(os.getenv("TWILIO_ACCOUNT_SID"), os.getenv("TWILIO_AUTH_TOKEN"))
verify_sid = os.getenv("TWILIO_VERIFY_SID")

def get_current_user(token: str = Depends(oauth2_scheme)):
    # This is a simplified placeholder. In a real-world application,
    # you would typically decode a JWT here to verify the user's identity.
    return {"uid": token}


@auth_router.post("/send-otp")
def send_otp(req: SendOTPRequest):
    try:
        verification = client.verify.v2.services(verify_sid) \
            .verifications \
            .create(to=req.phone_number, channel='sms')
        return {"status": verification.status}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@auth_router.post("/verify-otp")
def verify_otp(
    req: VerifyOTPRequest,
    users_col: Collection = Depends(get_user_collection),
    profiles_col: Collection = Depends(get_profiles_collection)
):
    try:
        verification_check = client.verify.v2.services(verify_sid) \
            .verification_checks \
            .create(to=req.phone_number, code=req.otp)

        if verification_check.status == "approved":
            user_doc = users_col.find_one({"phone": req.phone_number})

            if user_doc:
                return {"status": "success", "uid": str(user_doc["_id"]), "phone": req.phone_number}
            else:
                # Create a new user and profile
                new_user_data = {
                    "abha_no": "DEMO1234567890",
                    "phone": req.phone_number,
                    "profile_id": None, # Will be updated after profile creation
                    "created_at": datetime.utcnow()
                }
                user_result = users_col.insert_one(new_user_data)
                user_id = user_result.inserted_id

                new_profile = {
                    "user_id": str(user_id),
                    "full_name": "New User",
                    "chronic_conditions": [],
                    "medical_records": []
                }
                profile_result = profiles_col.insert_one(new_profile)

                users_col.update_one(
                    {"_id": user_id},
                    {"$set": {"profile_id": str(profile_result.inserted_id)}}
                )

                return {"status": "Newsuccess", "uid": str(user_id), "phone": req.phone_number}
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid OTP")

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))