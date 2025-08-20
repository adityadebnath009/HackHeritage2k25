import firebase_admin
from firebase_admin import credentials
import os
from dotenv import load_dotenv
load_dotenv()
creds_path = os.getenv("FIREBASE_CREDENTIALS_JSON")

# Check if the path exists before trying to use it
if not creds_path or not os.path.exists(creds_path):
    raise FileNotFoundError(f"Missing Firebase credentials. Check your .env file and the path: {creds_path}")

cred = credentials.Certificate(creds_path)