# backend/main.py
from core.firebase import cred
from fastapi import FastAPI
import firebase_admin
from fastapi.middleware.cors import CORSMiddleware
from routers import firebase, reports, users, medical_records # Import the new routers

app = FastAPI(title="Health Bridge API")
origins = [
    "http://localhost:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)

# Include each router only once
app.include_router(firebase.firebase_router, tags=["Authentication"]) 
app.include_router(reports.router)
app.include_router(users.profile_router) 
app.include_router(medical_records.router) 

firebase_admin.initialize_app(cred)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Health Bridge API"}