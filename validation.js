import { encryptPassword } from './encryption.js';

const storedPasswords = [
  { salt: "f1e2d3c4b5a60718aabbccddeeff0011", hash: "a950f729eb6bf4813aceb1f710dd164e59dfd9459243e2dd67b8111e60b41b1d" },
  { salt: "2233445566778899aabbccddeeff0011", hash: "322014550cf4dc4563261f4bd4a325d2d93c41d1859fec32ac53d57587eb33ae" },
  { salt: "8e4882703df151aef59d718ea1cd3519", hash: "6321bf9a484de3d0698858c87c8d64bb4d67793b7734a1a970bfff7af0b47985" },
  { salt: "65ffffada8fb4923e3fafc4f4b42a247", hash: "d7c7dbd35443042b5c5aa4bb9174c8654392d202038ce246ba3606c2a291b4ae" }
];

const form = document.getElementById('form');
const inputGroup = document.querySelector('.input-group');
const layers = [
  document.getElementById('link1'),
  document.getElementById('link2'),
  document.getElementById('link3'),
  document.getElementById('link4')
];
layers[0].classList.add('active');

const title = document.querySelector('h1');
const codeBlock = document.getElementById('code');
const submitContainer = document.getElementById('submit-container');
const submitButton = document.getElementById('submit');
let passwordStep = 0;

function changeBackground(step) {
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

function enableStep3Features() {
  submitButton.onmousedown = null;
  document.onmousemove = null;
  document.onmouseup = null;
  let isDragging = false;
  let offsetX = 0, offsetY = 0;
  const originalLeft = submitButton.offsetLeft - submitContainer.offsetLeft;
  const originalTop = submitButton.offsetTop - submitContainer.offsetTop;
  submitButton.style.position = 'absolute';
  submitButton.style.cursor = 'grab';

  submitButton.onmousedown = e => {
    isDragging = true;
    offsetX = e.clientX - submitButton.offsetLeft;
    offsetY = e.clientY - submitButton.offsetTop;
    submitButton.style.cursor = 'grabbing';
  };

  document.onmousemove = e => {
    if (!isDragging) return;
    submitButton.style.left = `${e.clientX - offsetX}px`;
    submitButton.style.top = `${e.clientY - offsetY}px`;
  };

  document.onmouseup = () => {
    if (!isDragging) return;
    isDragging = false;
    submitButton.style.cursor = 'grab';

    if (!document.getElementById('clueButton')) {
      const clueButton = document.createElement('button');
      clueButton.id = 'clueButton';
      clueButton.type = 'button';
      clueButton.textContent = 'Clue';
      clueButton.style.display = 'block';
      clueButton.style.margin = '10px auto';
      clueButton.style.padding = '.5em 1em';
      clueButton.style.borderRadius = '1000px';
      clueButton.style.background = '#333';
      clueButton.style.color = '#fff';
      clueButton.style.border = 'none';
      clueButton.style.cursor = 'pointer';
      clueButton.onclick = () => {
        alert(`Born of ___ and Void
You shall seal the blinding light that plagues their dreams
You are the vessel
You are the Hollow Knight`);
      };
      submitContainer.appendChild(clueButton);
    }

    setTimeout(() => {
      submitButton.style.transition = "left 0.5s ease, top 0.5s ease";
      submitButton.style.left = `${originalLeft}px`;
      submitButton.style.top = `${originalTop}px`;
      setTimeout(() => submitButton.style.transition = '', 500);
    }, 3000);
  };

  codeBlock.textContent = "3. He stands where currents twist and decay lingers, once a loyal sentinel of old. The name he first bore is rarely spoken aloud. Utter it to continue.";

  title.style.cursor = 'pointer';
  title.onclick = () => {
    alert("4. So you'd pursue the deeper truth? It isn't one the weak could bear. Prove yourself ready to face it. I'll not hold back. My _____ is lethal and I'd feel no sadness in a weakling's demise. Show me you can accept this Kingdom's past and claim responsibility for its future.");
  };

  console.log('Step 3 features enabled: draggable submit + clue button.');
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const password = document.getElementById('password').value.trim();
  const { salt, hash: storedHash } = storedPasswords[passwordStep];
  const userHash = await encryptPassword(password, salt);
  if (userHash === storedHash) {
    inputGroup.className = 'input-group correct';
    alert('Password correct! Proceeding to next step.');
    passwordStep++;
    changeBackground(passwordStep);

    if (passwordStep === 2) console.log('s2UCIJ4_KAo');
    if (passwordStep === 3) enableStep3Features();
  } else {
    inputGroup.className = 'input-group incorrect';
    alert('Password incorrect! Try again.');
  }
});

layers.forEach(layer => {
  layer.addEventListener('click', e => {
    if (!layer.classList.contains('active')) e.preventDefault();
    else {
      e.preventDefault();
      window.open(layer.href, '_blank');
    }
  });
});