# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import reports, users, medical_records, auth, prescription # Import the new routers

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
app.include_router(auth.auth_router, tags=["Authentication"])
app.include_router(reports.router)
app.include_router(users.profile_router) 
app.include_router(medical_records.router) 
app.include_router(prescription.prescription_router)



@app.get("/")
def read_root():
    return {"message": "Welcome to the Health Bridge API"}