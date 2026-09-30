// ============================================================
// auth.js — หน้าเข้าสู่ระบบ / สมัครสมาชิก
// ============================================================
loadPersistedState();
init();

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((t, i) => {
    t.classList.toggle('active', (tab === 'login' && i === 0) || (tab === 'register' && i === 1));
  });
  document.getElementById('loginForm').classList.toggle('hidden', tab !== 'login');
  document.getElementById('registerForm').classList.toggle('hidden', tab !== 'register');
}

function doLogin() {
  const email = document.getElementById('loginEmail').value || 'user@khwan.com';
  isLoggedIn = true;
  store.set('isLoggedIn', true);
  store.set('userName', email.split('@')[0]);
  updateNavAuth();
  showToast('เข้าสู่ระบบสำเร็จ!', 'success');
  setTimeout(() => location.href = 'index.html', 600);
}

function doRegister() {
  const name = document.getElementById('regName').value;
  if (!name) {
    showToast('กรุณากรอกชื่อ', 'error');
    return;
  }
  isLoggedIn = true;
  store.set('isLoggedIn', true);
  store.set('userName', name.split(' ')[0]);
  updateNavAuth();
  showToast('สมัครสมาชิกสำเร็จ!', 'success');
  setTimeout(() => location.href = 'index.html', 600);
}
