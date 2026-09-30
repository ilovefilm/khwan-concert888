// ============================================================
// gate.js — หน้าสแกนบัตรเข้างาน (Gate Scanner)
// ============================================================
loadPersistedState();
init();

function simulateScan() {
  const cam = document.getElementById('scannerCam');
  const result = document.getElementById('scanResult');
  const manual = document.getElementById('manualCode').value.trim();

  cam.classList.remove('success', 'error');
  result.classList.remove('show', 'success', 'error');

  // Simulate scanning delay
  cam.textContent = '⏳';
  setTimeout(() => {
    let ticket = null;
    if (manual) {
      ticket = myTickets.find(t => t.id === manual || t.id.includes(manual));
    } else if (myTickets.length > 0) {
      // Simulate scanning the first valid ticket
      ticket = myTickets.find(t => t.status === 'valid') || myTickets[0];
    }

    if (ticket && ticket.status === 'valid') {
      ticket.status = 'used';
      usedTicketCodes.add(ticket.id);
      saveAllState();
      cam.classList.add('success');
      cam.textContent = '✅';
      result.className = 'scan-result show success';
      result.innerHTML = `
        <strong>บัตรถูกต้อง!</strong><br>
        ${ticket.concert}<br>
        โซน ${ticket.zone} · ที่นั่ง ${ticket.seat}<br>
        <small>บันทึกเวลาเข้างานแล้ว</small>
      `;
      showToast('เช็กอินสำเร็จ', 'success');
    } else if (ticket && ticket.status === 'used') {
      cam.classList.add('error');
      cam.textContent = '❌';
      result.className = 'scan-result show error';
      result.innerHTML = `<strong>บัตรนี้ถูกใช้งานแล้ว!</strong><br>ไม่สามารถเข้างานซ้ำได้`;
    } else if (ticket && ticket.status === 'refunded') {
      cam.classList.add('error');
      cam.textContent = '❌';
      result.className = 'scan-result show error';
      result.innerHTML = `<strong>บัตรนี้ถูกคืนแล้ว!</strong><br>ไม่สามารถใช้เข้างานได้`;
    } else {
      cam.classList.add('error');
      cam.textContent = '❌';
      result.className = 'scan-result show error';
      result.innerHTML = `<strong>ไม่พบบัตร</strong><br>กรุณาตรวจสอบรหัสหรือ QR Code`;
    }
  }, 800);
}
