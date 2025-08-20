from fastapi import APIRouter, HTTPException, status
from models.firebaseModels import VerifyOTPRequest
from firebase_admin import auth

firebase_router = APIRouter()

@firebase_router.post("/verify-otp")
def verify_otp(req: VerifyOTPRequest):
    try:
        decoded_token = auth.verify_id_token(req.id_token)
        uid = decoded_token["uid"]
        phone_number = decoded_token.get("phone_number", None)
        return {"status": "success", "uid": uid, "phone": phone_number}
    except auth.InvalidIdTokenError as e:
        # This catches specific token errors (e.g., expired, malformed)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Invalid Firebase token: {e}")
    except Exception as e:
        # Catch any other unexpected server errors
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"An unexpected error occurred: {str(e)}")