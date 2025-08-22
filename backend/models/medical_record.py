# backend/models/medical_record.py
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class MedicalRecordIn(BaseModel):
    """Pydantic model for a medical record uploaded by the user."""
    file_name: str
    profile_id : str  # Base64 encoded file content

class MedicalRecordDB(BaseModel):
    """Pydantic model for a medical record stored in the database."""
    id: str = Field(..., alias="_id")
    profile_id: str
    file_name: str
    gridfs_id: str
    uploaded_at: datetime
    
    class Config:
        populate_by_name = True