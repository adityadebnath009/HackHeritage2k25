# app/db.py
from pymongo import MongoClient
from core.config import MONGO_URI, USER_DB, COMMUNITY_DB

# Initialize a single MongoDB client for the app
client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)

try:
    client.admin.command('ping')
    print("Pinged your deployment. Successfully connected to MongoDB!")
except Exception as e:
    print("MongoDB connection failed:", e)

# Databases
user_db = client[USER_DB]
community_db = client[COMMUNITY_DB]



# Collections
user_col = user_db["Users"]
report_col = community_db["Report"]

# Dependency function for FastAPI (if needed)
def get_user_db():
    try:
        yield user_db
    finally:
        pass  # Do not close client; reuse for the app lifetime

def get_user_collection():
    return user_col

def get_reports_collection():
    return report_col
