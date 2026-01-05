const txt = `
ขออภัยครับ ตอนนี้ยังไม่สามารถใช้ AI จริงบนเว็บนี้ได้

**เหตุผล:**
- โมเดล AI ที่ใช้ต้องอาศัย GPU และ RAM สูงมาก
- Vercel เป็น Serverless จึงไม่มี GPU และหน่วยความจำไม่พอรันโมเดลขนาดใหญ่

เดโมนี้จึงเป็นแบบ Rule-based เท่านั้น

หากอยากลองใช้ AI จริงเต็มประสิทธิภาพ กรุณาดาวน์โหลดโปรเจกต์แล้วรันบนเครื่องตัวเอง

**Git Repository:**
https://github.com/B4869/covid-medgemma.git
`

export function getSimpleBotReply(userText: string) {
  const t = userText.trim().toLowerCase();
  // simple rule-based replies for demo purposes
  if (!t) return 'ขอโทษครับ ผมไม่เห็นข้อความ กรุณาพิมพ์ใหม่อีกครั้ง';
  if (t.includes('สวัสดี') || t.includes('hello') || t.includes('hi')) {
    return 'สวัสดีครับ! มีอะไรให้ผมช่วยไหม?';
  }
  if (t.includes('bye') || t.includes('ลาก่อน')) {
    return 'ขอบคุณที่ใช้บริการครับ ดูแลตัวเองด้วยนะครับ!';
  }
  // fallback: echo with a polite prefix
  return txt;
}
