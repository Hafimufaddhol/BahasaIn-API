// public/js/reset-password.js
document.getElementById('reset-password-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    if (password !== confirmPassword) {
      document.getElementById('message').textContent = "Password dan konfirmasi password tidak cocok.";
      document.getElementById('message').classList.add('error');
      return;
    }
  
    // Implementasi fetch API untuk mengirim data reset password
    const token = window.location.pathname.split('/').pop();
    try {
      const response = await fetch(`/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, confirmPassword }),
      });
  
      const data = await response.json();
      const messageDiv = document.getElementById('message');
      if (response.ok) {
        messageDiv.textContent = data.message || 'Password berhasil direset!';
        messageDiv.classList.remove('error');
        messageDiv.classList.add('success');
      } else {
        messageDiv.textContent = data.error || 'Terjadi kesalahan';
        messageDiv.classList.add('error');
      }
    } catch (err) {
      console.error(err);
      document.getElementById('message').textContent = 'Terjadi kesalahan. Silakan coba lagi.';
      document.getElementById('message').classList.add('error');
    }
  });
  