import { encryptPassword } from './encryption.js';

const realPasswords = [
  '7cb89be263253e2196661f303926cfb1bc662a607220486a69266dffb737af02',
  '37766da024061aa60ba872415624f3bebd11d877d0fe098433c5948cccb7c6a8'
];

const form = document.getElementById('form');
const inputGroup = document.querySelector('.input-group');
const layer1 = document.getElementById('link1');
const layer2 = document.getElementById('link2');

layer1.classList.add('active');
let activeLayer = 1;
let passwordDone = 0;

function changeBackground(newLayer) {
  const fadeIn = newLayer === 1 ? layer1 : layer2;
  const fadeOut = newLayer === 1 ? layer2 : layer1;
  fadeIn.classList.add('active');
  fadeOut.classList.remove('active');
  activeLayer = newLayer;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value.trim();
  const hashedPassword = await encryptPassword(password);
  const currentHash = realPasswords[passwordDone];

  if (hashedPassword === currentHash) {
    inputGroup.className = 'input-group correct';
    changeBackground(passwordDone === 0 ? 2 : 1);
    passwordDone += 1;
  } else {
    inputGroup.className = 'input-group incorrect';
  }
});

[layer1, layer2].forEach(layer => {
  layer.addEventListener('click', e => {
    if (!layer.classList.contains('active')) e.preventDefault();
  });
});