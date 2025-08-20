import firebase_admin
from firebase_admin import credentials
import os
from dotenv import load_dotenv
load_dotenv()
from pathlib import Path

rel = os.getenv("FIREBASE_CREDENTIALS_JSON")
base = Path(__file__).resolve().parent  # backend/config
creds_path = (base / rel).resolve()

if not creds_path.exists():
    raise FileNotFoundError(f"Missing Firebase credentials at: {creds_path}")

cred = credentials.Certificate(str(creds_path))
