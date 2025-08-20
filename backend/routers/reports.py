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

@router.patch("/update/{report_id}/status", response_model=ReportResponse, status_code=status.HTTP_200_OK)
def update_report_status(report_id: str,status_update: ReportUpdate, reports: Collection = Depends(get_reports_collection)):
    
    
    stored  = reports.fine_one({"report_id" : report_id})
    if not stored:
        raise HTTPException(status_code=404, detail="Report not found")
    
    
    update_data = {
        "status": status_update.status,
        "resolved_at": datetime.utcnow()
    }
    if status_update.resolved_by:
            update_data["resolved_by"] = status_update.resolved_by
    reports.update_one({"report_id": report_id}, {"$set": update_data})
    
    
    return {"message": f"Report {report_id} status updated successfully to '{status_update.status}'."}
