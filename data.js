// ============================================================
// data.js — ข้อมูลจำลอง (Mock Data) ของระบบขวานคอนเสิร์ต
// ============================================================

// ========== DATA ==========
const concerts = [
  {
    id: 1,
    title: "ขวานร็อก เฟสติวัล 2026",
    artist: "ศิลปินร็อกไทย รวมวง",
    date: "15 ตุลาคม 2569",
    time: "18:00 น.",
    venue: "ราชมังคลากีฬาสถาน",
    category: "rock",
    emoji: "🎸",
    price: 1200,
    hot: true,
    desc: "เทศกาลร็อกสุดยิ่งใหญ่แห่งปี รวมศิลปินร็อกไทยชื่อดัง บนเวทีกลางแจ้งที่ราชมังคลากีฬาสถาน พร้อมแสงสีเสียงระดับอินเตอร์",
    zones: [
      { name: "VIP", price: 4500 },
      { name: "A", price: 2800 },
      { name: "B", price: 1800 },
      { name: "C", price: 1200 }
    ]
  },
  {
    id: 2,
    title: "Night Pulse Live",
    artist: "DJ Collective & Friends",
    date: "22 พฤศจิกายน 2569",
    time: "20:00 น.",
    venue: "Impact Arena",
    category: "pop",
    emoji: "🎧",
    price: 1500,
    hot: false,
    desc: "ค่ำคืนแห่งจังหวะดนตรีอิเล็กทรอนิกส์และป๊อป กับดีเจและศิลปินดัง พร้อมเวที LED ขนาดยักษ์",
    zones: [
      { name: "VIP", price: 3500 },
      { name: "A", price: 2200 },
      { name: "B", price: 1500 }
    ]
  },
  {
    id: 3,
    title: "Indie Soul Night",
    artist: "วงอินดี้ไทย 5 วง",
    date: "5 ธันวาคม 2569",
    time: "19:00 น.",
    venue: "Thunder Dome",
    category: "indie",
    emoji: "🎹",
    price: 900,
    hot: false,
    desc: "ค่ำคืนอบอุ่นกับเสียงเพลงอินดี้ไทยคุณภาพ บรรยากาศใกล้ชิดศิลปิน",
    zones: [
      { name: "VIP", price: 2000 },
      { name: "A", price: 1400 },
      { name: "B", price: 900 }
    ]
  },
  {
    id: 4,
    title: "K-Star Wave Bangkok",
    artist: "K-Pop Superstars",
    date: "18 มกราคม 2570",
    time: "18:30 น.",
    venue: "ราชมังคลากีฬาสถาน",
    category: "kpop",
    emoji: "💜",
    price: 2800,
    hot: true,
    desc: "คอนเสิร์ต K-Pop ระดับโลก ที่ราชมังคลากีฬาสถาน กับศิลปินเกาหลีชั้นนำ พร้อมแฟนมีตและเซอร์ไพรส์พิเศษ",
    zones: [
      { name: "VIP", price: 8900 },
      { name: "A", price: 5900 },
      { name: "B", price: 3900 },
      { name: "C", price: 2800 }
    ]
  },
  {
    id: 5,
    title: "Acoustic Under the Stars",
    artist: "นักร้องอะคูสติกชื่อดัง",
    date: "28 กุมภาพันธ์ 2570",
    time: "19:30 น.",
    venue: "สวนลุมพินี",
    category: "indie",
    emoji: "🌙",
    price: 800,
    hot: false,
    desc: "คอนเสิร์ตอะคูสติกกลางแจ้งใต้แสงดาว บรรยากาศโรแมนติกและอบอุ่น",
    zones: [
      { name: "VIP", price: 1800 },
      { name: "A", price: 1200 },
      { name: "B", price: 800 }
    ]
  },
  {
    id: 6,
    title: "Metal Storm Thailand",
    artist: "วงเมทัลนานาชาติ",
    date: "12 มีนาคม 2570",
    time: "17:00 น.",
    venue: "Impact Challenger",
    category: "rock",
    emoji: "🔥",
    price: 1600,
    hot: true,
    desc: "มหกรรมเมทัลสุดเดือด วงเมทัลจากทั่วโลกมารวมตัวกันที่กรุงเทพฯ",
    zones: [
      { name: "VIP", price: 4200 },
      { name: "A", price: 2800 },
      { name: "B", price: 1600 }
    ]
  }
];

// Seat configuration (inspired by stadium layout - simplified)
const seatConfig = {
  VIP: { rows: ['V1', 'V2'], seatsPerRow: 10, price: 4500, color: 'vip' },
  A: { rows: ['A1', 'A2', 'A3'], seatsPerRow: 12, price: 2800, color: 'available' },
  B: { rows: ['B1', 'B2', 'B3', 'B4'], seatsPerRow: 14, price: 1800, color: 'available' },
  C: { rows: ['C1', 'C2', 'C3'], seatsPerRow: 16, price: 1200, color: 'available' }
};
