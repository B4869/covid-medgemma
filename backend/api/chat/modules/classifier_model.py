from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import os

# read instruction text file
with open(os.path.join(os.path.dirname(__file__), '..', 'instruction_model', 'classifier_model.txt'), "r", encoding="utf-8") as f:
    classifier_instruction = f.read()

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))
GEM_TOKEN = os.getenv("GEM_TOKEN")

classifier_model = ChatGoogleGenerativeAI(
    model="gemma-3n-e2b-it",
    google_api_key= GEM_TOKEN,
    temperature=0,
    max_output_tokens=1
)

#function get answer from model classifier
def classificationQuestion(prompt):
    prompt = classifier_instruction + f"Question: {prompt}"
    response = classifier_model.invoke(prompt)
    return response.content

def isCovidQuestion(prompt):
  res = classificationQuestion(prompt)
  if res == "YES":
    return True
  else:
    return False