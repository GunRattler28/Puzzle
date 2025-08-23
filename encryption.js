const SALT = "goesBRR";

async function sha256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashWithSalt(input) {
  const saltedInput = SALT + input;
  return await sha256(saltedInput);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const passwordField = document.getElementById('password');

  if (!form || !passwordField) {
    console.error("Form or password field not found.");
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = passwordField.value.trim();
    const saltedHash = await hashWithSalt(password);
    console.log("Salted SHA-256 Hash:", saltedHash);
  });
});
