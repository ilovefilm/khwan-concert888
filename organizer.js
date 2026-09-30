// ============================================================
// organizer.js — แดชบอร์ดผู้จัดงาน
// ============================================================
loadPersistedState();
init();

function openCreateModal() {
  document.getElementById('createModal').classList.add('show');
}

function closeCreateModal() {
  document.getElementById('createModal').classList.remove('show');
}

function createConcert() {
  const name = document.getElementById('newConcertName').value;
  if (!name) {
    showToast('กรุณากรอกชื่อคอนเสิร์ต', 'error');
    return;
  }
  const tbody = document.getElementById('orgTableBody');
  const dateVal = document.getElementById('newConcertDate').value || 'TBD';
  const venue = document.getElementById('newConcertVenue').value || '-';
  tbody.innerHTML += `
    <tr>
      <td>${name}</td>
      <td>${dateVal}</td>
      <td>${venue}</td>
      <td>0 / 500</td>
      <td><span class="ticket-status status-valid">เปิดขาย</span></td>
    </tr>`;
  closeCreateModal();
  showToast('สร้างคอนเสิร์ตสำเร็จ!', 'success');
}
