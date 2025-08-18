const form = document.getElementById('form');
const inputGroup = document.querySelector('.input-group');

const layer1 = document.getElementById('link1');
const layer2 = document.getElementById('link2');
let activeLayer = 1;
let passwordDone = 0;

layer1.style.opacity = 1;
layer2.style.opacity = 0;

layer1.classList.add('active');

async function sha256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}


function changeBackground(newLayer) {
  layer1.classList.remove('active');
  layer2.classList.remove('active');
  const fadeIn = newLayer === 1 ? layer1 : layer2;
  const fadeOut = activeLayer === 1 ? layer1 : layer2;
  fadeOut.style.opacity = 0;
  fadeIn.style.opacity = 1;
  fadeIn.classList.add('active');
  activeLayer = newLayer;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const password = document.getElementById('password').value;
  const capitalPassword = password.split(' ')
    .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(' ');

  const hashedPassword = await sha256(capitalPassword);
  const realPart1 = '7cb89be263253e2196661f303926cfb1bc662a607220486a69266dffb737af02';
  const realPart2 = '37766da024061aa60ba872415624f3bebd11d877d0fe098433c5948cccb7c6a8';

  if ((hashedPassword === realPart1) && passwordDone === 0) {
    alert('✅ Correct password.');
    inputGroup.classList.remove('incorrect');
    inputGroup.classList.add('correct');
    changeBackground(2);
    passwordDone += 1;
  } else if ((hashedPassword === realPart2) && passwordDone === 1) {
    alert('✅ Correct password.');
    inputGroup.classList.remove('incorrect');
    inputGroup.classList.add('correct');
    changeBackground(1);
  } else {
    alert('❌ Incorrect password.');
    inputGroup.classList.remove('correct');
    inputGroup.classList.add('incorrect');
  }
});

layer1.addEventListener('click', (e) => {
  if (!layer1.classList.contains('active')) e.preventDefault();
});

layer2.addEventListener('click', (e) => {
  if (!layer2.classList.contains('active')) e.preventDefault();
});