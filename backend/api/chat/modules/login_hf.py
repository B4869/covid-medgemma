from huggingface_hub import login
from dotenv import load_dotenv
import os

def login_hf():
    load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env')) # อ่านไฟล์ .env

    HF_TOKEN = os.getenv("HF_TOKEN")

    login(token=HF_TOKEN)
    print("login successfully")