# ขวานคอนเสิร์ต (Khwan Concert)

ระบบจองบัตรคอนเสิร์ต — โปรเจกต์กลุ่มขวาน
(แยกไฟล์จาก index.html เดิม ~2,000 บรรทัด ให้เป็นโครงสร้างที่เป็นระเบียบ โค้ดเดิมครบทุกบรรทัด)

## โครงสร้างโปรเจกต์

```
khwan-concert/
├── index.html            # หน้าหลัก (ค้นหา / กรองหมวด / การ์ดคอนเสิร์ต)
├── detail.html           # หน้ารายละเอียดคอนเสิร์ต
├── seats.html            # หน้าเลือกที่นั่ง (Interactive Seat Map + Timer 15 นาที)
├── checkout.html         # หน้าชำระเงิน (พร้อม Success Modal)
├── tickets.html          # หน้าบัตรของฉัน (E-Ticket + คืนบัตร 90%)
├── login.html            # หน้าเข้าสู่ระบบ / สมัครสมาชิก
├── organizer.html        # แดชบอร์ดผู้จัดงาน (สร้างคอนเสิร์ต)
├── gate.html             # หน้าสแกนบัตรเข้างาน
│
├── assets/
│   ├── css/
│   │   └── style.css     # CSS ทั้งหมด (Theme สีม่วง + Component ทุกหน้า)
│   └── js/
│       ├── data.js       # Mock Data: รายชื่อคอนเสิร์ต + ผังที่นั่ง
│       ├── common.js     # State กลาง (localStorage), Toast, ตัวช่วยร่วม
│       ├── home.js       # Logic หน้าหลัก
│       ├── detail.js     # Logic หน้ารายละเอียด
│       ├── seats.js      # Logic หน้าเลือกที่นั่ง
│       ├── checkout.js   # Logic หน้าชำระเงิน
│       ├── tickets.js    # Logic หน้าบัตรของฉัน
│       ├── auth.js       # Logic หน้าเข้าสู่ระบบ
│       ├── organizer.js  # Logic แดชบอร์ดผู้จัดงาน
│       └── gate.js       # Logic สแกนบัตร
│
└── database/
    └── schema.sql        # SQL สร้างตารางฐานข้อมูลทั้ง 8 ตาราง
```

## วิธีใช้งาน

1. เปิดไฟล์ `index.html` ด้วยเบราว์เซอร์ได้เลย (ไม่ต้องใช้ Server)
   - หรือใช้ Live Server ใน VS Code จะสะดวกกว่า
2. ตัวอย่าง SQL อยู่ใน `database/schema.sql` นำไปรันใน MySQL/MariaDB ได้เลย

## หมายเหตุ

- จากเดิมเป็น Single-Page App (showPage สลับ div) เปลี่ยนเป็น **หลายหน้าแยกไฟล์**
  โดยส่งต่อข้อมูลระหว่างหน้าผ่าน `localStorage` (prefix `khwan_`)
- โค้ดทุกบรรทัดจากไฟล์เดิมถูกเก็บไว้ครบ แค่แยกวางเป็นไฟล์ตามหน้าที่
- ระบบเป็นแบบ Front-end จำลอง (Mock) เพื่อการศึกษา/นำเสนอ ยังไม่ได้ต่อ Back-end จริง
