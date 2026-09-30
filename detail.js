// ============================================================
// detail.js — หน้ารายละเอียดคอนเสิร์ต
// ============================================================
loadPersistedState();
init();

// ถ้ายังไม่ได้เลือกคอนเสิร์ต ให้กลับหน้าหลัก
if (!currentConcert) {
  location.href = 'index.html';
} else {
  // โหลดข้อมูลลงหน้า (เทียบเท่า openDetail เดิม)
  document.getElementById('detailPoster').textContent = currentConcert.emoji;
  document.getElementById('detailTitle').textContent = currentConcert.title;
  document.getElementById('detailMeta').innerHTML = `
    <span>🎤 ${currentConcert.artist}</span>
    <span>📅 ${currentConcert.date} · ${currentConcert.time}</span>
    <span>📍 ${currentConcert.venue}</span>
  `;
  document.getElementById('detailDesc').textContent = currentConcert.desc;
  document.getElementById('detailZones').innerHTML = currentConcert.zones.map(z =>
    `<div class="zone-chip">${z.name}: <strong>฿${z.price.toLocaleString()}</strong></div>`
  ).join('');

  // Update seat prices from concert zones
  currentConcert.zones.forEach(z => {
    if (seatConfig[z.name]) seatConfig[z.name].price = z.price;
  });
}

function goToSeatMap() {
  if (!currentConcert) return;
  location.href = 'seats.html';
}
