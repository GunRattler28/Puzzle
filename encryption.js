const SALT = "goesBRR";

async function sha256(message) {
  const buffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(message)
  );
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function encryptPassword(input) {
  const capitalized = input
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  const salted = SALT + capitalized;
  return await sha256(salted);
}
