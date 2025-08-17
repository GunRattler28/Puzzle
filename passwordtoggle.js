console.log("Et tu brute?")

const button = document.getElementById('togglePassword');
const passwordType = document.getElementById('password');
const eyeIcon = document.getElementById('eye')

button.addEventListener("click", () => {
  if (passwordType.type === "password") {
    passwordType.type = "text";
    eyeIcon.className = "bi bi-eye"
  } else {
    passwordType.type = "password";
    eyeIcon.className = "bi bi-eye-slash"
  }
})