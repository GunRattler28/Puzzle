const toggleBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const eyeIcon = toggleBtn.querySelector('i');

toggleBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  eyeIcon.classList.toggle('bi-eye');
  eyeIcon.classList.toggle('bi-eye-slash');
});
