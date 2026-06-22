# 🚀 CYD Tracking System (Frontend Dashboard)

โปรเจกต์นี้เป็นส่วน Frontend (User Interface) สำหรับระบบจัดการและติดตามสถานะงานของบริษัท CHAIDET PROGRESS CO., LTD. 

## 🛠️ Tech Stack ที่ใช้งาน
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Icons:** Lucide React

---

## 💻 วิธีการติดตั้งและรันโปรเจกต์ (สำหรับทีม Backend)

**1. Clone โค้ดลงเครื่อง**
\`\`\`bash
git clone https://github.com/atthachet333/CYD_AT_TRACKING.git
cd CYD_AT_TRACKING
\`\`\`

**2. ติดตั้ง Dependencies**
\`\`\`bash
npm install
\`\`\`

**3. ตั้งค่า Environment Variables**
สร้างไฟล์ชื่อ \`.env.local\` ไว้ที่หน้าสุดของโปรเจกต์ (ระดับเดียวกับ package.json) และใส่ค่าดังนี้ (ขอ Key จากทีม Frontend):
\`\`\`env
GOOGLE_SHEET_ID=your_sheet_id_here
LINE_CHANNEL_ACCESS_TOKEN=your_line_token_here
\`\`\`

**4. รันเซิร์ฟเวอร์จำลอง**
\`\`\`bash
npm run dev
\`\`\`
จากนั้นเปิดเบราว์เซอร์ไปที่: [http://localhost:3000](http://localhost:3000)

---

## 🤝 คู่มือสำหรับทีม Backend (การเชื่อมต่อ API)

ฝั่ง Frontend ได้ทำการสร้างหน้า UI และแบ่ง Layout ไว้เรียบร้อยแล้ว (ปัจจุบันใช้ข้อมูล Mock data และ State ว่างเปล่า) 

**จุดที่คุณต้องเข้ามาทำงาน (API Integration):**
หากคุณต้องการดึงข้อมูลจาก Database หรือระบบ Backend ของคุณมาแสดงผล กรุณาสร้างฟังก์ชันเชื่อมต่อ API ไว้ที่โฟลเดอร์:
👉 \`src/lib/services/\`

**ตัวอย่างการทำงาน:**
1. สร้างไฟล์ \`src/lib/services/departmentService.ts\`
2. เขียนฟังก์ชัน \`fetch()\` หรือ \`axios\` ดึงข้อมูลจาก Backend API ของคุณ
3. ไปที่ไฟล์หน้า UI (เช่น \`src/app/dashboard/departments/page.tsx\`)
4. นำฟังก์ชันที่คุณสร้างมาเรียกใช้ใน \`useEffect\` และนำข้อมูลไปเซ็ตใส่ \`useState\` เพื่อแสดงผลในตาราง

---

*📝 Note: ฝั่ง UI มีการแบ่งสิทธิ์ (Role-based) สำหรับ Admin และ User ทั่วไป ไว้ที่ Context (\`src/context/AuthContext.tsx\`) สามารถเข้าไปปรับแก้การเชื่อมต่อระบบ Login จริงได้ที่นั่นครับ*
