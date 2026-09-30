// ============================================================
// tickets.js — หน้าบัตรของฉัน (E-Ticket + คืนบัตร 90%)
// ============================================================
loadPersistedState();
init();
renderTickets();

function renderTickets() {
  const list = document.getElementById('ticketsList');
  if (myTickets.length === 0) {
    list.innerHTML = `
      <div class="text-center" style="padding:3rem;color:var(--text-muted);">
        <div style="font-size:3rem;margin-bottom:1rem;">🎟️</div>
        <p>ยังไม่มีบัตร<br>ไปเลือกคอนเสิร์ตที่ชอบแล้วจองเลย!</p>
        <button class="btn btn-primary mt-2" onclick="location.href='index.html'">ดูคอนเสิร์ต</button>
      </div>`;
    return;
  }

  list.innerHTML = myTickets.map((t, idx) => {
    let statusClass = 'status-valid';
    let statusText = '✓ ใช้ได้';
    if (t.status === 'used') {
      statusClass = 'status-used';
      statusText = '✓ เข้างานแล้ว';
    } else if (t.status === 'refunded') {
      statusClass = 'status-refunded';
      statusText = '↩ คืนบัตรแล้ว';
    }

    const refundBtn = t.status === 'valid'
      ? `<button class="btn-refund" onclick="openRefundModal(${idx})">↩ คืนบัตร (ได้คืน 90%)</button>`
      : '';

    const refundInfo = t.status === 'refunded'
      ? `<p style="font-size:0.85rem;color:var(--danger);margin-top:0.35rem;">เงินคืน ฿${Math.floor(t.price * 0.9).toLocaleString()} (90%)</p>`
      : '';

    return `
    <div class="ticket-card">
      <div class="ticket-info">
        <h3>${t.emoji} ${t.concert}</h3>
        <p>📅 ${t.date} · ${t.time}</p>
        <p>📍 ${t.venue}</p>
        <p>💺 โซน ${t.zone} · ที่นั่ง ${t.seat}</p>
        <p>💰 ฿${t.price.toLocaleString()}</p>
        <span class="ticket-status ${statusClass}">${statusText}</span>
        ${refundInfo}
        <p style="font-size:0.75rem;color:var(--text-muted);margin-top:0.4rem;">รหัส: ${t.id}</p>
        ${refundBtn}
      </div>
      <div class="ticket-qr" title="QR Code สำหรับเข้างาน" onclick="showToast('${t.status === 'valid' ? 'QR: ' + t.id : 'บัตรนี้ไม่สามารถใช้ได้แล้ว'}', '${t.status === 'valid' ? 'success' : 'error'}')">
        ${t.status === 'valid' ? '▦▦' : (t.status === 'refunded' ? '↩' : '✓')}
      </div>
    </div>`;
  }).join('');
}

function openRefundModal(idx) {
  const t = myTickets[idx];
  if (!t || t.status !== 'valid') return;
  const refundAmount = Math.floor(t.price * 0.9);
  document.getElementById('refundTicketInfo').innerHTML = `
    <strong>${t.concert}</strong><br>
    โซน ${t.zone} · ที่นั่ง ${t.seat}<br>
    ราคาเดิม ฿${t.price.toLocaleString()} → คืน ฿${refundAmount.toLocaleString()} (90%)
  `;
  document.getElementById('refundModal').dataset.idx = idx;
  document.getElementById('refundModal').classList.add('show');
}

function closeRefundModal() {
  document.getElementById('refundModal').classList.remove('show');
}

function confirmRefund() {
  const idx = parseInt(document.getElementById('refundModal').dataset.idx, 10);
  const t = myTickets[idx];
  if (!t || t.status !== 'valid') {
    closeRefundModal();
    return;
  }

  const refundAmount = Math.floor(t.price * 0.9);
  t.status = 'refunded';
  t.refundAmount = refundAmount;

  // คืนที่นั่งกลับเป็นว่าง (จำลอง)
  // หา key จาก seat label เช่น V1-5
  const seatKey = t.seat; // already in format like V1-5 or A1-3
  if (seatStates[seatKey] === 'sold') {
    seatStates[seatKey] = 'available';
  }

  saveAllState();
  closeRefundModal();
  renderTickets();
  showToast(`คืนบัตรสำเร็จ! ได้รับเงินคืน ฿${refundAmount.toLocaleString()} (90%)`, 'success');
}
