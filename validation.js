const form = document.getElementById('form');
const inputGroup = document.querySelector('.input-group');
const backgroundContainer = document.getElementById('background');

const backgrounds = ['images/Differently.jpg', 'images/lookCloser.png'];

async function sha256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function changeBackground(newBackground) {
  backgroundContainer.style.backgroundImage = `url(${newBackground})`;
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

  if (hashedPassword === realPart1) {
    alert('✅ Correct password.');
    inputGroup.classList.remove('incorrect');
    inputGroup.classList.add('correct');
    changeBackground(backgrounds[1]);
  } else if (hashedPassword === realPart2) {
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