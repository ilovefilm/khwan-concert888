// ============================================================
// checkout.js — หน้าชำระเงิน
// ============================================================
loadPersistedState();
init();

// โหลดยอดเงิน (เทียบเท่า goToCheckout เดิม)
const checkoutTotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
document.getElementById('checkoutTotal').textContent = '฿' + checkoutTotal.toLocaleString();
document.getElementById('payAmount').textContent = '฿' + checkoutTotal.toLocaleString();

function selectPayment(el, method) {
  document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  el.querySelector('input').checked = true;
  document.getElementById('qrMock').classList.toggle('show', method === 'promptpay');
}

function confirmPayment() {
  if (selectedSeats.length === 0 || !currentConcert) return;

  // Mark seats as sold
  selectedSeats.forEach(s => { seatStates[s.key] = 'sold'; });

  // Create tickets
  const code = 'TK-' + Date.now().toString(36).toUpperCase().slice(-6) + '-' + Math.random().toString(36).slice(2,6).toUpperCase();

  selectedSeats.forEach(s => {
    const ticketCode = code + '-' + s.label;
    myTickets.push({
      id: ticketCode,
      concert: currentConcert.title,
      date: currentConcert.date,
      time: currentConcert.time,
      venue: currentConcert.venue,
      seat: s.label,
      zone: s.zone,
      price: s.price,
      status: 'valid',
      emoji: currentConcert.emoji
    });
  });

  stopHoldTimer();
  document.getElementById('holdTimer')?.classList.remove('show');
  selectedSeats = [];
  saveAllState();

  // Show success
  document.getElementById('successModal').classList.add('show');
}

function closeSuccessModal() {
  document.getElementById('successModal').classList.remove('show');
  location.href = 'tickets.html';
}
