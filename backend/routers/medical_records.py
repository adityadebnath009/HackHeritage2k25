from fastapi import APIRouter, Depends, HTTPException, status
from pymongo.collection import Collection
from bson import ObjectId
import base64
from datetime import datetime
from typing import List

# Import your models and dependencies
from models.medical_record import MedicalRecordIn, MedicalRecordDB
from models.profile import ProfileDB
from db import get_profiles_collection, get_medical_records_collection
from routers.firebase import verify_otp 

router = APIRouter(prefix="/profiles", tags=["Medical Records"])

@router.post("/{profile_id}/records", status_code=status.HTTP_201_CREATED)
def upload_medical_record(
    profile_id: str,
    record_data: MedicalRecordIn,
    current_user: dict = Depends(verify_otp),
    profiles_col: Collection = Depends(get_profiles_collection),
    medical_records_col: Collection = Depends(get_medical_records_collection)
):
    # Authorization: Check if the current user owns the profile
    profile = profiles_col.find_one({"_id": ObjectId(profile_id)})
    if not profile or str(profile.get("user_id")) != current_user.get("uid"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized.")
    
    # Decode Base64 data and prepare the document
    try:
        binary_data = base64.b64decode(record_data.file_data)
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Base64 data.")

    new_record = {
        "profile_id": ObjectId(profile_id),
        "file_name": record_data.file_name,
        "file_data": binary_data,
        "uploaded_at": datetime.utcnow()
    }

    # Insert the new record and update the profile to link to it
    record_result = medical_records_col.insert_one(new_record)
    profiles_col.update_one(
        {"_id": ObjectId(profile_id)},
        {"$push": {"medical_records": record_result.inserted_id}}
    )

    return {"message": "Record uploaded successfully.", "record_id": str(record_result.inserted_id)}

@router.get("/{profile_id}/records", response_model=List[MedicalRecordDB])
def get_medical_records(
    profile_id: str,
    current_user: dict = Depends(verify_otp),
    profiles_col: Collection = Depends(get_profiles_collection),
    medical_records_col: Collection = Depends(get_medical_records_collection)
):
    # Authorization: Check if the current user owns the profile
    profile = profiles_col.find_one({"_id": ObjectId(profile_id)})
    if not profile or str(profile.get("user_id")) != current_user.get("uid"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized.")

    # Fetch and return the list of records
    records_cursor = medical_records_col.find(
        {"profile_id": ObjectId(profile_id)},
        {"file_data": 0}  # Exclude the large binary data
    )
    records = list(records_cursor)
    
    return [MedicalRecordDB(**record, id=str(record["_id"])) for record in records]