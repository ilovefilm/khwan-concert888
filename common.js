// ============================================================
// common.js — State กลาง + ตัวช่วยใช้ร่วมกันทุกหน้า
// (แต่ละหน้าเป็นไฟล์ HTML แยก จึงส่งต่อ state ผ่าน localStorage)
// ============================================================

// State
let currentConcert = null;
let selectedSeats = [];
let seatStates = {}; // key: "V1-5" -> available|selected|held|sold
let myTickets = [];
let isLoggedIn = false;
let holdTimerInterval = null;
let holdSecondsLeft = 15 * 60;
let currentFilter = 'all';
let usedTicketCodes = new Set();

// ---- localStorage helper ----
const store = {
  get(key, def) {
    try {
      const v = localStorage.getItem('khwan_' + key);
      return v !== null ? JSON.parse(v) : def;
    } catch (e) { return def; }
  },
  set(key, val) {
    localStorage.setItem('khwan_' + key, JSON.stringify(val));
  }
};

function loadPersistedState() {
  const cid = store.get('currentConcertId', null);
  currentConcert = cid ? concerts.find(c => c.id === cid) : null;
  selectedSeats = store.get('selectedSeats', []);
  seatStates = store.get('seatStates', {});
  myTickets = store.get('myTickets', []);
  isLoggedIn = store.get('isLoggedIn', false);
  usedTicketCodes = new Set(store.get('usedTicketCodes', []));
}

function saveAllState() {
  store.set('selectedSeats', selectedSeats);
  store.set('seatStates', seatStates);
  store.set('myTickets', myTickets);
  store.set('usedTicketCodes', Array.from(usedTicketCodes));
}

// ========== INIT (ต้องเรียกหลัง loadPersistedState) ==========
function init() {
  // หน้าแรกจะ renderConcerts เองในไฟล์ของแต่ละหน้า
  updateNavAuth();
}

function initSeatStates() {
  seatStates = {};
  Object.keys(seatConfig).forEach(zone => {
    const cfg = seatConfig[zone];
    cfg.rows.forEach(row => {
      for (let i = 1; i <= cfg.seatsPerRow; i++) {
        const key = `${row}-${i}`;
        // Randomly mark ~20% sold, ~5% held
        const r = Math.random();
        if (r < 0.18) seatStates[key] = 'sold';
        else if (r < 0.22) seatStates[key] = 'held';
        else seatStates[key] = 'available';
      }
    });
  });
  saveAllState();
}

// ========== NAV AUTH ==========
function updateNavAuth() {
  if (isLoggedIn) {
    document.getElementById('userBadge').classList.remove('hidden');
    document.getElementById('userName').textContent = store.get('userName', 'ผู้ใช้');
    document.getElementById('authNavBtn').classList.add('hidden');
  }
}

// ========== TOAST ==========
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (type ? ' ' + type : '');
  setTimeout(() => t.classList.remove('show'), 3000);
}
