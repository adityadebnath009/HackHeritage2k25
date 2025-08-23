from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from langchain.schema import Document
from dotenv import load_dotenv
from pdf2image import convert_from_path
import pytesseract
import os

# ---------------------------
# Load environment variables
# ---------------------------
load_dotenv(dotenv_path="/Users/adityadebnath/QuantumBeings/HackHeritage2k25/backend/.env")
OPENAI_API_KEY = os.getenv("OPEN_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPEN_API_KEY environment variable is not set.")
print(f"[INFO] Loaded OpenAI API Key")

# ---------------------------
# List of patient PDF files
# ---------------------------
patient_pdf_list = [
    '/Users/adityadebnath/QuantumBeings/HackHeritage2k25/backend/records/TestReport1.pdf',
    '/Users/adityadebnath/QuantumBeings/HackHeritage2k25/backend/records/TestReport2.pdf',
    '/Users/adityadebnath/QuantumBeings/HackHeritage2k25/backend/records/TestReport3.pdf'
]

# ---------------------------
# Initialize Qdrant client
# ---------------------------
client = QdrantClient(url="http://localhost:6333")

# ---------------------------
# Function to extract text using OCR
# ---------------------------
def extract_text_with_ocr(pdf_file):
    try:
        images = convert_from_path(pdf_file)
        text = ""
        for image in images:
            text += pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        print(f"[ERROR] OCR failed for {pdf_file}: {e}")
        return ""

# ---------------------------
# Load all documents
# OCR first, then PyPDFLoader
# ---------------------------
all_docs = []

for pdf_file in patient_pdf_list:
    try:
        print(f"[INFO] Processing file: {pdf_file}")
        # Try OCR first
        ocr_text = extract_text_with_ocr(pdf_file)
        if ocr_text:
            all_docs.append(Document(page_content=ocr_text, metadata={"source": pdf_file, "method": "ocr"}))
            print(f"[INFO] OCR succeeded for {pdf_file}")
            continue  # skip PDF loader if OCR worked

        # Fallback to PyPDFLoader
        loader = PyPDFLoader(pdf_file)
        docs = loader.load()
        all_docs.extend(docs)
        print(f"[INFO] PyPDFLoader extracted {len(docs)} document(s) from {pdf_file}")

    except Exception as e:
        print(f"[ERROR] Failed to load {pdf_file}: {e}")

if not all_docs:
    raise ValueError("[ERROR] No documents were loaded. Check PDF paths or content.")

print(f"[INFO] Total documents loaded: {len(all_docs)}")
print("[DEBUG] Sample extracted text:")
for d in all_docs[:2]:
    print(d.page_content[:300], "...\n")

# ---------------------------
# Process PDFs: split -> embeddings -> vector store
# ---------------------------
def process_pdf(docs):
    try:
        # Split documents into chunks
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        split_docs = text_splitter.split_documents(docs)
        if not split_docs:
            raise ValueError("No text chunks were created.")
        print(f"[INFO] Total chunks created: {len(split_docs)}")
    except Exception as e:
        raise RuntimeError(f"[ERROR] Failed to split documents: {e}")

    try:
        # Initialize embedding model
        embedding_model = OpenAIEmbeddings(model="text-embedding-ada-002", openai_api_key=OPENAI_API_KEY)
    except Exception as e:
        raise RuntimeError(f"[ERROR] Failed to initialize embeddings: {e}")

    try:
        # Store chunks in Qdrant
        vector_store = QdrantVectorStore.from_documents(
            documents=split_docs,
            embedding=embedding_model,
            
            
            collection_name="patient_medical_records"
        )
        print("[INFO] Vector store created successfully")
        return vector_store
    except Exception as e:
        raise RuntimeError(f"[ERROR] Failed to store documents in Qdrant: {e}")

# ---------------------------
# Run the pipeline
# ---------------------------
try:
    vector_store = process_pdf(all_docs)
    query = "Summarize the patient's lab results"
    try:
        results = vector_store.similarity_search(query, k=3)
        print("----- Retrieved Chunks -----")
        for idx, r in enumerate(results):
            print(f"\nChunk {idx+1}:\n{r.page_content[:500]}...")
    except Exception as e:
        print(f"[ERROR] Similarity search failed: {e}")
except Exception as e:
    print(f"[ERROR] Pipeline failed: {e}")
