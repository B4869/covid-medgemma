from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from modules.main_model import getResponse

# 1. สร้าง Flask app
app = Flask(__name__)

# 2. ตั้งค่า CORS (Cross-Origin Resource Sharing)
# นี่คือส่วนสำคัญมาก! ที่จะอนุญาตให้ JavaScript (ที่อยู่คนละที่) เรียก API นี้ได้
CORS(app) 

# 3. สร้าง "Endpoint" หรือ "Route" ของ API
# นี่คือ URL ที่ JavaScript จะเรียกมา
# เช่น http://127.0.0.1:5000/api/v1/chat/completions
@app.route("/api/v1/chat/completions", methods=['POST'])
def return_chat_completions():
    # 1. รับ JSON Payload
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
    except Exception:
        # ดักจับกรณีที่ JSON ที่ส่งมาผิดรูปแบบ
        return jsonify({"error": "Invalid JSON format"}), 400
    
    # 2. ดึงข้อความสนทนา (Messages)
    query = data.get("messages")  # สมมติว่า key ชื่อ 'messages'

    if not query:
        # ตรวจสอบว่ามี key 'messages' อยู่ใน JSON ที่ส่งมาหรือไม่
        return jsonify({"error": "Missing 'messages' key in request body (JSON)"}), 400
    
    # 3. เรียกใช้ Logic (ฟังก์ชัน getResponse ของคุณ)
    try:
        # ฟังก์ชัน getResponse คืนค่าเป็น JSON String
        response = getResponse(query)
        
        # 4. ส่งคำตอบกลับไป
        # ใช้ Response Object เพื่อให้แน่ใจว่า Header (mimetype) และ Encoding (UTF-8) ถูกต้อง
        # เพื่อรองรับภาษาไทยตามที่คุณใช้ ensure_ascii=False
        return Response(
            response,
            mimetype='application/json; charset=utf-8',
            status=200
        )

    except Exception as e:
        # ดักจับ Error ที่อาจเกิดขึ้นภายในฟังก์ชัน LLM
        print(f"Error during getResponse execution: {e}")
        return jsonify({"error": "Internal server error during LLM processing"}), 500
    
# 6. สั่งให้ app ทำงาน (Run) เมื่อรันไฟล์นี้ตรงๆ
if __name__ == "__main__":
    app.run(debug=True, port=5000)