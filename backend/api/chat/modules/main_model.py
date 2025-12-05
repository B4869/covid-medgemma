from transformers import BitsAndBytesConfig, pipeline
import torch
import os
import json
import time

try:
    from modules.login_hf import login_hf
    from modules.classifier_model import isCovidQuestion
except ImportError:
    from login_hf import login_hf
    from classifier_model import isCovidQuestion

# read instruction text file
with open(os.path.join(os.path.dirname(__file__), '..', 'instruction_model', 'main_model.txt'), "r", encoding="utf-8") as f:
    role_instruction = f.read()

# login huggingface_hub
login_hf()

print(f"GPU {("is available" if torch.cuda.is_available() else "is not available")}") #torch.cuda.is_available() ? is available : is not available

# configuration model
model_id = f"google/medgemma-4b-it"

model_kwargs = dict(
    torch_dtype=torch.bfloat16,
    device_map="auto",
    quantization_config=BitsAndBytesConfig(load_in_4bit=True),
)

pipe = pipeline("text-generation", model=model_id, model_kwargs=model_kwargs)
pipe.model.generation_config.do_sample = False

CONVERSATION_PAIRS_LIMIT = 5
MAX_MSG_COUNT = ((CONVERSATION_PAIRS_LIMIT * 2) - 1) or 1

# ask model
def getResponse(query):
    start = time.time()
    messageHistory = query[-MAX_MSG_COUNT:]
    context_list = [msg["text"] for msg in messageHistory]
    context = "\n".join(context_list)
    
    if isCovidQuestion(context):
        system_instruction = role_instruction
        max_new_tokens = 750

        messages = [
            {
                "role": "system",
                "content": [{"type": "text", "text": system_instruction}]
            },
            {
                "role": "user",
                "content": [{"type": "text", "text": context}]
            }
        ]

        output = pipe(messages, max_new_tokens=max_new_tokens)
        response = output[0]["generated_text"][-1]["content"]
        data = {
            "role": "assistant",
            "content": response,
            "status": "successed"
        }
    else:
        data = {
            "role": "assistant",
            "content": "ขออภัย ฉันสามารถตอบได้เฉพาะคำถามที่เกี่ยวข้องกับโรคโควิด-19 ในเชิงทางการแพทย์เท่านั้น หากคำถามของคุณเกี่ยวข้องกับโรคโควิด-19 จริง ๆ กรุณาลองปรับหรือเขียนคำถามใหม่ เพื่อให้ฉันเข้าใจได้ชัดเจนมากขึ้น",
            "status": "failed"
        }

    elapsed = time.time() - start
    
    print(len(messageHistory), "\n")
    print("--------------")
    print(context)
    print("--------------")
    
    print(f"Used time {elapsed:.2f} seconds")

    json_data = json.dumps(data, ensure_ascii=False, indent=4)
    return json_data