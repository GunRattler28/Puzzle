const form = document.getElementById('form');
const inputGroup = document.querySelector('.input-group');

const backgrounds = ['images/Differently.jpg', 'images/lookCloser.png'];

for (let i = 0; i < backgrounds.length; i++) {
  const img = new Image();
  img.src = backgrounds[i];
}


const layer1 = document.getElementById('bg1');
const layer2 = document.getElementById('bg2');
let activeLayer = 1;
let currentBackgroundIndex = 0;

layer1.style.backgroundImage = `url('${backgrounds[0]}')`;
layer1.style.opacity = 1;
layer2.style.backgroundImage = `url('${backgrounds[1]}')`;
layer2.style.opacity = 0;

async function sha256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function changeBackground(newBackground) {
  const fadeOutLayer = activeLayer === 1 ? layer1 : layer2;
  const fadeInLayer = activeLayer === 1 ? layer2 : layer1;
  fadeInLayer.style.backgroundImage = `url('${newBackground}')`;
  fadeOutLayer.style.opacity = 0;
  fadeInLayer.style.opacity = 1;
  activeLayer = activeLayer === 1 ? 2 : 1;
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

  let passwordDone = 0;

  if ((hashedPassword === realPart1) && passwordDone === 0) {
    alert('✅ Correct password.');
    inputGroup.classList.remove('incorrect');
    inputGroup.classList.add('correct');
    changeBackground(backgrounds[1]);
    passwordDone += 1;
  } else if ((hashedPassword === realPart2) && passwordDone === 1) {
    alert('✅ Correct password.');
    inputGroup.classList.remove('incorrect');
    inputGroup.classList.add('correct');
    changeBackground(backgrounds[0]);
  } else {
    alert('❌ Incorrect password.');
    inputGroup.classList.remove('correct');
    inputGroup.classList.add('incorrect');
  }
});