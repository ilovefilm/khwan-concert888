// ============================================================
// seats.js — หน้าเลือกที่นั่ง (Interactive Seat Map + Timer 15 นาที)
// ============================================================
loadPersistedState();
init();

// เทียบเท่า goToSeatMap() เดิม: reset การเลือก และสุ่มสถานะที่นั่งใหม่ทุกครั้ง
if (!currentConcert) {
  location.href = 'index.html';
} else {
  selectedSeats = [];
  initSeatStates();
  document.getElementById('seatConcertTitle').textContent = currentConcert.title;
  document.getElementById('seatConcertDate').textContent = `${currentConcert.date} · ${currentConcert.time} · ${currentConcert.venue}`;
  document.getElementById('holdTimer').classList.remove('show');
  stopHoldTimer();
  renderSeatMap();
  updateSummary();
}

function renderSeatMap() {
  const container = document.getElementById('seatMap');
  let html = '';

  Object.keys(seatConfig).forEach(zone => {
    const cfg = seatConfig[zone];
    const zonePrice = cfg.price;
    html += `<div class="zone-section">
      <div class="zone-label">
        <div class="zone-color" style="background:${zone === 'VIP' ? '#7c3aed' : '#4c1d95'}"></div>
        โซน ${zone} — ฿${zonePrice.toLocaleString()}
      </div>`;

    cfg.rows.forEach(row => {
      html += `<div class="seats-row">`;
      for (let i = 1; i <= cfg.seatsPerRow; i++) {
        const key = `${row}-${i}`;
        let state = seatStates[key] || 'available';
        // Override if currently selected
        if (selectedSeats.find(s => s.key === key)) state = 'selected';
        const cls = state === 'available' && zone === 'VIP' ? 'seat vip available' :
                    state === 'available' ? 'seat available' :
                    state === 'selected' ? 'seat selected' :
                    state === 'held' ? 'seat held' : 'seat sold';
        html += `<button class="${cls}" data-key="${key}" data-zone="${zone}" data-row="${row}" data-num="${i}" onclick="toggleSeat(this)" title="${row}-${i}">${i}</button>`;
      }
      html += `</div>`;
    });
    html += `</div>`;
  });

  container.innerHTML = html;
}

function toggleSeat(btn) {
  const key = btn.dataset.key;
  const zone = btn.dataset.zone;
  const row = btn.dataset.row;
  const num = btn.dataset.num;
  const state = seatStates[key];

  if (state === 'sold' || state === 'held') {
    showToast('ที่นั่งนี้ไม่ว่างแล้ว', 'error');
    return;
  }

  const idx = selectedSeats.findIndex(s => s.key === key);
  if (idx >= 0) {
    // Deselect
    selectedSeats.splice(idx, 1);
    seatStates[key] = 'available';
  } else {
    if (selectedSeats.length >= 4) {
      showToast('เลือกได้สูงสุด 4 ที่นั่งต่อรายการ', 'error');
      return;
    }
    selectedSeats.push({
      key,
      zone,
      row,
      num,
      label: `${row}-${num}`,
      price: seatConfig[zone].price
    });
    seatStates[key] = 'selected';
  }

  saveAllState();
  renderSeatMap();
  updateSummary();

  if (selectedSeats.length > 0 && !holdTimerInterval) {
    startHoldTimer();
  } else if (selectedSeats.length === 0) {
    stopHoldTimer();
    document.getElementById('holdTimer').classList.remove('show');
  }
}

function updateSummary() {
  const list = document.getElementById('selectedList');
  const totalEl = document.getElementById('totalPrice');
  const btn = document.getElementById('btnCheckout');

  if (selectedSeats.length === 0) {
    list.innerHTML = '<div class="empty-seats">ยังไม่ได้เลือกที่นั่ง<br>คลิกที่นั่งว่างเพื่อเลือก</div>';
    totalEl.textContent = '฿0';
    btn.disabled = true;
    return;
  }

  list.innerHTML = selectedSeats.map(s => `
    <div class="selected-item">
      <span>${s.zone} · ${s.label}</span>
      <span>฿${s.price.toLocaleString()} <button class="remove-seat" onclick="removeSeat('${s.key}')">×</button></span>
    </div>
  `).join('');

  const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  totalEl.textContent = '฿' + total.toLocaleString();
  btn.disabled = false;
}

function removeSeat(key) {
  selectedSeats = selectedSeats.filter(s => s.key !== key);
  seatStates[key] = 'available';
  saveAllState();
  renderSeatMap();
  updateSummary();
  if (selectedSeats.length === 0) {
    stopHoldTimer();
    document.getElementById('holdTimer').classList.remove('show');
  }
}

function startHoldTimer() {
  holdSecondsLeft = 15 * 60;
  document.getElementById('holdTimer').classList.add('show');
  updateTimerDisplay();
  holdTimerInterval = setInterval(() => {
    holdSecondsLeft--;
    updateTimerDisplay();
    if (holdSecondsLeft <= 0) {
      // Release seats
      selectedSeats.forEach(s => { seatStates[s.key] = 'available'; });
      selectedSeats = [];
      stopHoldTimer();
      document.getElementById('holdTimer').classList.remove('show');
      saveAllState();
      renderSeatMap();
      updateSummary();
      showToast('หมดเวลาจองที่นั่งแล้ว ที่นั่งถูกปล่อยคืนระบบ', 'error');
    }
  }, 1000);
}

function stopHoldTimer() {
  if (holdTimerInterval) {
    clearInterval(holdTimerInterval);
    holdTimerInterval = null;
  }
}

function updateTimerDisplay() {
  const m = Math.floor(holdSecondsLeft / 60);
  const s = holdSecondsLeft % 60;
  document.getElementById('timerValue').textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

function goToCheckout() {
  if (selectedSeats.length === 0) return;
  saveAllState();
  location.href = 'checkout.html';
}
