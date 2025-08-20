from core.firebase import cred
from fastapi import FastAPI
import firebase_admin
from routers.firebase import firebase_router
from fastapi.middleware.cors import CORSMiddleware

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


app.include_router(firebase_router, tags=["Authentication"]) 
firebase_admin.initialize_app(cred)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Health Bridge API"}