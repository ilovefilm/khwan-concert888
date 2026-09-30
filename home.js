// ============================================================
// home.js — หน้าหลัก: ค้นหา + กรองหมวด + แสดงการ์ดคอนเสิร์ต
// ============================================================
loadPersistedState();
init();
renderConcerts();

// ========== HOME / CONCERTS ==========
function renderConcerts() {
  const grid = document.getElementById('concertGrid');
  const search = (document.getElementById('searchInput')?.value || '').toLowerCase();
  let list = concerts.filter(c => {
    const matchFilter = currentFilter === 'all' || c.category === currentFilter;
    const matchSearch = !search || c.title.toLowerCase().includes(search) || c.artist.toLowerCase().includes(search) || c.venue.toLowerCase().includes(search);
    return matchFilter && matchSearch;
  });

  if (list.length === 0) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:2rem;">ไม่พบคอนเสิร์ตที่ค้นหา</p>';
    return;
  }

  grid.innerHTML = list.map(c => `
    <div class="concert-card" onclick="openDetail(${c.id})">
      ${c.hot ? '<span class="badge-hot">HOT</span>' : ''}
      <div class="concert-poster"><span class="poster-emoji">${c.emoji}</span></div>
      <div class="concert-info">
        <h3>${c.title}</h3>
        <div class="concert-meta">
          <span>🎤 ${c.artist}</span>
          <span>📅 ${c.date} · ${c.time}</span>
          <span>📍 ${c.venue}</span>
        </div>
        <span class="price-tag">เริ่มต้น ฿${c.price.toLocaleString()}</span>
      </div>
    </div>
  `).join('');
}

function filterConcerts() {
  renderConcerts();
}

function setFilter(f) {
  currentFilter = f;
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.filter === f);
  });
  renderConcerts();
}

function openDetail(id) {
  store.set('currentConcertId', id);
  location.href = 'detail.html';
}
