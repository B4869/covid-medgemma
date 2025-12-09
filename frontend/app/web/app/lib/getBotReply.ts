// ===================================
// Type Definitions
// ===================================

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: Message[];
}

// ===================================
// Configuration
// ===================================

const SECOND = 60;
const API_BASE_URL = process.env.PUBLIC_API_BASE_URL || 'http://localhost:5000';
const API_ENDPOINT = '/api/v1/chat/completions';
const REQUEST_TIMEOUT = SECOND * 1000; // 60 วินาที

// ===================================
// Main Function
// ===================================

/**
 * ส่งข้อความไปยัง COVID-19 Medical Chatbot API
 * 
 * @param messages - ประวัติการสนทนา
 * @returns คำตอบจาก AI
 * @throws Error เมื่อเกิดข้อผิดพลาด
 * 
 * @example
 * const answer = await getBotReply([{role: 'user', content: 'อาการของโรค COVID-19 คืออะไร?'}]);
 * console.log(answer);
 */
export async function getBotReply(messages: Message[]): Promise<string> {
  // 1. Validation - ตรวจสอบ Input
  if (!messages || messages.length === 0) {
    throw new Error('กรุณาใส่ข้อความ ไม่สามารถส่งประวัติการสนทนาว่างได้');
  }

  // 2. เตรียม Timeout Controller
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    // 3. ส่ง Request ไปยัง API
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages,
      } as ChatRequest),
      signal: controller.signal,
    });

    // หยุด Timeout เมื่อได้ Response แล้ว
    clearTimeout(timeoutId);

    // 4. ตรวจสอบว่า Response สำเร็จหรือไม่
    if (!response.ok) {
      // พยายามอ่าน Error Message จาก Server
      let errorMessage = `เซิร์ฟเวอร์ตอบกลับด้วยสถานะ ${response.status}`;

      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch {
        // ถ้าอ่าน Error ไม่ได้ ใช้ข้อความเริ่มต้น
      }

      throw new Error(errorMessage);
    }

    // 5. แปลง Response เป็น JSON
    const data = await response.json();

    // 6. Validation - ตรวจสอบ Response Structure
    if (!data || typeof data.content !== 'string') {
      throw new Error('ข้อมูลที่ได้รับจากเซิร์ฟเวอร์ไม่ถูกต้อง');
    }

    if (data.content.trim().length === 0) {
      throw new Error('เซิร์ฟเวอร์ส่งคำตอบว่างกลับมา');
    }

    // 7. Return คำตอบ
    return data;

  } catch (error) {
    // หยุด Timeout ถ้ายังทำงานอยู่
    clearTimeout(timeoutId);

    // จัดการ Error แต่ละประเภท
    if (error instanceof Error) {
      // Timeout Error
      if (error.name === 'AbortError') {
        throw new Error('การเชื่อมต่อหมดเวลา กรุณาลองใหม่อีกครั้ง');
      }

      // Network Error (ไม่สามารถเชื่อมต่อได้)
      if (error instanceof TypeError) {
        throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต');
      }

      // Error อื่นๆ ที่เราโยนเอง
      throw error;
    }

    // Unknown Error
    throw new Error('เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
  }
}