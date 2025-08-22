from fastapi import APIRouter, Depends, HTTPException, status
from pymongo.collection import Collection
from db import get_profiles_collection
from routers.auth import get_current_user
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
    print(current_user)
    profile_doc = profiles_col.find_one({"user_id": current_user.get("user_id") or current_user.get("uid") or current_user.get("sub")})

    if not profile_doc:
        print(current_user.get("user_id")+ " not found in profiles collection")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found."
        )
    print("Found profile:", profile_doc)
    # Convert _id to string and map to 'id', then remove '_id' from profile_doc
    profile_doc = dict(profile_doc)
    profile_doc['id'] = convert_objectid_to_str(profile_doc.pop('_id', None))
    # Ensure all required fields for ProfileDB are present
    missing_fields = [field for field in ProfileDB.__fields__ if field not in profile_doc]
    for field in missing_fields:
        profile_doc[field] = None  # or set a sensible default
    return ProfileDB(**profile_doc)