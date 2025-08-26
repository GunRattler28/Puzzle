import { encryptPassword } from './encryption.js';

const storedPasswords = [
  { salt: "f1e2d3c4b5a60718aabbccddeeff0011", hash: "a950f729eb6bf4813aceb1f710dd164e59dfd9459243e2dd67b8111e60b41b1d" },
  { salt: "2233445566778899aabbccddeeff0011", hash: "322014550cf4dc4563261f4bd4a325d2d93c41d1859fec32ac53d57587eb33ae" },
  { salt: "99aabbccddeeff001122334455667788", hash: "a51684872d95e768205520eb0f91818c806e878bc28edb34b8176cd9691985dc" }
];

const form = document.getElementById('form');
const inputGroup = document.querySelector('.input-group');
const layer1 = document.getElementById('link1');
const layer2 = document.getElementById('link2');
const layer3 = document.getElementById('link3');
layer1.classList.add('active');
let passwordStep = 0;

function changeBackground(step) {
  const layers = [layer1, layer2, layer3];
  const current = document.querySelector('.background a.active');
  const next = layers[step % layers.length];
  if (current === next) return;
  next.classList.add('active');
  if (current) {
    current.classList.add('fading-out');
    setTimeout(() => {
      current.classList.remove('active', 'fading-out');
    }, 2500);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value.trim();
  const { salt, hash: storedHash } = storedPasswords[passwordStep];
  const userHash = await encryptPassword(password, salt);
  if (userHash === storedHash) {
    inputGroup.className = 'input-group correct';
    alert('Password correct! Proceeding to next step.');
    passwordStep += 1;
    changeBackground(passwordStep);
  } else {
    inputGroup.className = 'input-group incorrect';
    alert('Password incorrect! Try again.');
  }
});

[layer1, layer2, layer3].forEach(layer => {
  layer.addEventListener('click', e => {
    if (!layer.classList.contains('active')) e.preventDefault();
  });
});