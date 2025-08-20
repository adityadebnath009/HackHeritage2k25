from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime
from pymongo.collection import Collection
from models.report import ReportCreate, ReportResponse
from db import get_reports_collection
from utils.id_generator import generate_report_id

router = APIRouter(prefix="/reports", tags = ["Reports"])


# Create a report
@router.post("/create", response_model=ReportResponse, status_code=status.HTTP_201_CREATED)
def create_report(report: ReportCreate, reports: Collection = Depends(get_reports_collection)):
    report_id = generate_report_id()
    report_dict = report.dict()
    report_dict["report_id"] = report_id
    report_dict["created_at"] = datetime.utcnow()
    
    try:
        reports.insert_one(report_dict)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to insert report: {str(e)}")
    
    return report_dict


