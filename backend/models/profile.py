from pydantic import BaseModel, Field
from typing import Optional, List, Literal
from datetime import date, time, datetime
from pydantic_extra_types.phone_numbers import PhoneNumber 
from typing import Annotated


class ProfileDB(BaseModel):
    """Pydantic model representing a profile document in MongoDB."""
    id: str = Field(..., alias="_id")
    user_id: str
    full_name: str
    age: int
    sex: str
    dob: date
    marital_status: str
    chronic_conditions: List[str] = Field(default_factory=list)
    medical_records: List[str] = Field(default_factory=list)

    class Config:
        populate_by_name = True