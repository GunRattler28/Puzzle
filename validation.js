import { encryptPassword } from './encryption.js';

const storedPasswords = [
  { salt: "f1e2d3c4b5a60718aabbccddeeff0011", hash: "2b6f6b0df4c9a1f8e3d7e6b8f5a9c4d2e1f7a6b9c3d4e5f6a7b8c9d0e1f2a3b4" },
  { salt: "2233445566778899aabbccddeeff0011", hash: "9c8b7a6d5e4f3b2a1d0c9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b" },
  { salt: "99aabbccddeeff001122334455667788", hash: "f1e2d3c4b5a60718293a4b5c6d7e8f09a1b2c3d4e5f60718293a4b5c6d7e8f0" }
];

const form = document.getElementById('form');
const inputGroup = document.querySelector('.input-group');
const layer1 = document.getElementById('link1');
const layer2 = document.getElementById('link2');
const layer3 = document.getElementById('link3');
layer1.classList.add('active');
let passwordStep = 0;

function changeBackground(step) {
  [layer1, layer2, layer3].forEach(layer => layer.classList.remove('active'));
  if(step === 0) layer2.classList.add('active');
  if(step === 1) layer3.classList.add('active');
  if(step === 2) layer1.classList.add('active'); 
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value.trim();
  const { salt, hash: storedHash } = storedPasswords[passwordStep];
  const userHash = await encryptPassword(password, salt);
  if (userHash === storedHash) {
    inputGroup.className = 'input-group correct';
    changeBackground(passwordStep);
    passwordStep += 1;
  } else {
    inputGroup.className = 'input-group incorrect';
  }
});

[layer1, layer2, layer3].forEach(layer => {
  layer.addEventListener('click', e => {
    if (!layer.classList.contains('active')) e.preventDefault();
  });
});