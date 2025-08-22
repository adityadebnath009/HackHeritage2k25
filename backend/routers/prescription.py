# backend/routers/prescription.py
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from pymongo.collection import Collection
from db import get_prescription_collection
from datetime import datetime
import gridfs
from bson import ObjectId
from fastapi.responses import StreamingResponse
from fastapi import Path
prescription_router = APIRouter()

@prescription_router.post("/upload-prescription")
async def upload_prescription(
    file: UploadFile = File(...),
    prescriptions_col: Collection = Depends(get_prescription_collection)
):
    try:
        # Use GridFS for large files (PDFs, images)
        db = prescriptions_col.database
        fs = gridfs.GridFS(db)

        file_id = fs.put(file.file, filename=file.filename, content_type=file.content_type)

        prescription_doc = {
            "file_id": str(file_id),
            "filename": file.filename,
            "content_type": file.content_type,
            "uploaded_at": datetime.utcnow()
        }
        prescriptions_col.insert_one(prescription_doc)

        return {"status": "success", "file_id": str(file_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@prescription_router.get("/get-prescription/{file_id}")
async def get_prescription(
    file_id: str = Path(...),
    prescriptions_col: Collection = Depends(get_prescription_collection)
):
    try:
        db = prescriptions_col.database
        fs = gridfs.GridFS(db)

        file_obj = fs.get(ObjectId(file_id))
        return StreamingResponse(
            file_obj,
            media_type=file_obj.content_type,
            headers={"Content-Disposition": f"inline; filename={file_obj.filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=404, detail="Prescription not found")