from fastapi import APIRouter, Depends, HTTPException, status
from pymongo.collection import Collection
from db import get_profiles_collection
from routers.firebase import get_current_user
from models.profile import ProfileDB
from bson import ObjectId
profile_router = APIRouter(prefix="/users", tags=["Users"])

# Helper function to convert ObjectId to str
def convert_objectid_to_str(v):
    if isinstance(v, ObjectId):
        return str(v)
    return v

@profile_router.get("/me", response_model=ProfileDB)
def get_my_profile(
    current_user: dict = Depends(get_current_user),
    profiles_col: Collection = Depends(get_profiles_collection)
):
    """
    Fetches the profile of the currently logged-in user.
    """
    # Find the profile linked to the current user's UID
    print(current_user.get("_id"))
    profile_doc = profiles_col.find_one({"user_id": current_user.get("_id")})

    if not profile_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found."
        )
    return ProfileDB(**profile_doc)