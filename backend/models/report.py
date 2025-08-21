
from fastapi import FastAPI, UploadFile
from pydantic import BaseModel, Field
from typing import Optional, List, Literal
from datetime import date, time, datetime
from pydantic_extra_types import PhoneNumber 
from typing import Annotated


class ReportCreate(BaseModel):
    
    report_id: Optional[str] = Field(default=None, description="Unique identifier for the report")
    reporter_name: str = Field(description="Name of the person reporting")
    phone_number: Annotated[PhoneNumber, Field(description="Phone number of the reporter")]
    role: Optional[str] = Field(None, description="Role of the reporter(CHW/MEMBER)")
    
    category: Literal[
        "Symptoms / Health Concern",
        "Environmental Health",
        "Healthcare Services","Emergency / Disaster",
        "Animal / Vector Issues",
        "Community Requests / Awareness / Requests"
    ] = Field(description = "Category of the report.")
    
    report_date: date = Field(description="Date of the report")
    report_time: time = Field(description="Time of the report")
    
    location: str = Field(description="Location of the report")
    lat: Optional[float] = Field(None, description="Latitude of the report location")
    long: Optional[float] = Field(None, description="Longitude of the report location")
    attachments: Optional[List[str]] = Field(default=[], description="List of file paths uploaded")
    
    status: Optional[str] = Field(default = "Unresolved", description="Status of the report")
    
    
    
class ReportResponse(ReportCreate):
    report_id: Optional[str] = None
    created_at: datetime
    

    class Config:
        orm_mode = True
        
class ReportUpdate(BaseModel):
    status: Literal["In Progress", "Resolved", "Pending"] = Field(..., description="New status of the report")
    resolved_by: Optional[str] = Field(None, description="Name or ID of the person resolving the report")