from vector_pipeline import load_documents, process_pdf, patient_pdf_list
from langchain.prompts import PromptTemplate, ChatPromptTemplate

from langchain_community.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
import os



# Load .env
load_dotenv()
api_key = os.getenv("OPEN_API_KEY")

# Step 1: Load docs and build vector store
docs = load_documents(patient_pdf_list)
vector_store = process_pdf(docs)

# Step 2: Initialize LLM (ChatOpenAI instead of init_chat_model)
llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0, openai_api_key=api_key)

# Step 3: Build RetrievalQA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vector_store.as_retriever(),
    chain_type="stuff"
)

# Step 4: Run a query

query = input("Your input:")
answer = qa_chain.run(query)

print("\n=== LLM Answer ===")
print(answer)
