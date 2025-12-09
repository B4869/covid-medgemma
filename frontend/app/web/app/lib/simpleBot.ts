export function getSimpleBotReply(userText: string) {
  const t = userText.trim().toLowerCase();
  // simple rule-based replies for demo purposes
  if (!t) return 'ขอโทษครับ ผมไม่ได้ยินข้อความ กรุณาพิมพ์ใหม่อีกครั้ง';
  if (t.includes('สวัสดี') || t.includes('hello') || t.includes('hi')) {
    return 'สวัสดีครับ! มีอะไรให้ผมช่วยไหม?';
  }
  if (t.includes('อาการ') || t.includes('เจ็บ')) {
    return 'คุณสามารถบอกอาการโดยสั้น ๆ ได้ไหมครับ (เช่น ปวดหัว มีไข้ คัดจมูก)';
  }
  if (t.includes('bye') || t.includes('ลาก่อน')) {
    return 'ขอบคุณที่ใช้บริการครับ ดูแลตัวเองด้วยนะครับ!';
  }
  // fallback: echo with a polite prefix
  return `ผมได้รับข้อความ: "${userText}" — นี่เป็นตัวอย่างการตอบกลับจาก bot`;
}
