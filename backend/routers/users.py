from fastapi import APIRouter, Depends, HTTPException, status
from pymongo.collection import Collection
from db import get_profiles_collection
from routers.firebase import verify_otp 
from models.profile import ProfileDB

profile_router = APIRouter(prefix="/users", tags=["Users"])

@profile_router.get("/me", response_model=ProfileDB)
def get_my_profile(
    current_user: dict = Depends(verify_otp),
    profiles_col: Collection = Depends(get_profiles_collection)
):
    """
    Fetches the profile of the currently logged-in user.
    """
    # Find the profile linked to the current user's UID
    profile_doc = profiles_col.find_one({"user_id": current_user.get("uid")})

    if not profile_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found."
        )

    return ProfileDB(**profile_doc)