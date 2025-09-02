import { encryptPassword } from './encryption.js';

const storedPasswords = [
  { salt: "f1e2d3c4b5a60718aabbccddeeff0011", hash: "a950f729eb6bf4813aceb1f710dd164e59dfd9459243e2dd67b8111e60b41b1d" },
  { salt: "2233445566778899aabbccddeeff0011", hash: "322014550cf4dc4563261f4bd4a325d2d93c41d1859fec32ac53d57587eb33ae" },
  { salt: "8e4882703df151aef59d718ea1cd3519", hash: "6321bf9a484de3d0698858c87c8d64bb4d67793b7734a1a970bfff7af0b47985" },
  { salt: "65ffffada8fb4923e3fafc4f4b42a247", hash: "d7c7dbd35443042b5c5aa4bb9174c8654392d202038ce246ba3606c2a291b4ae" }
];

const form = document.getElementById('form');
const inputGroup = document.querySelector('.input-group');
const layer1 = document.getElementById('link1');
const layer2 = document.getElementById('link2');
const layer3 = document.getElementById('link3');
const layer4 = document.getElementById('link4');
layer1.classList.add('active');
const title = document.querySelector('h1');
const codeBlock = document.getElementById('code');
let passwordStep = 0;

function changeBackground(step) {
  const layers = [layer1, layer2, layer3, layer4];
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
    if (passwordStep == 2) {
      console.log("s2UCIJ4_KAo");
    } 
    if (passwordStep == 3) {
      console.log("Password step 3 reached: draggable submit + clue button");
      const submitButton = document.querySelector('button[type="submit"]');
      const originalLeft = submitButton.offsetLeft;
      const originalTop = submitButton.offsetTop;
      submitButton.style.position = "absolute";
      submitButton.style.cursor = "grab";
      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;

      submitButton.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - submitButton.offsetLeft;
        offsetY = e.clientY - submitButton.offsetTop;
        submitButton.style.cursor = "grabbing";
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        submitButton.style.left = `${e.clientX - offsetX}px`;
        submitButton.style.top = `${e.clientY - offsetY}px`;
      });

      document.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;
        submitButton.style.cursor = "grab";

        setTimeout(() => {
          submitButton.style.left = `${originalLeft}px`;
          submitButton.style.top = `${originalTop}px`;
        }, 3000);
      });

      const clueButton = document.createElement("button");
      clueButton.type = "button";
      clueButton.textContent = "Reveal Clue";
      clueButton.style.display = "block";
      clueButton.style.marginTop = "10px";

      clueButton.addEventListener("click", () => {
        alert(`5. Born of ___ and Void
    You shall seal the blinding light that plagues their dreams
    You are the vessel 
    You are the Hollow Knight`);
      });

      submitButton.insertAdjacentElement("afterend", clueButton);
      console.log("\n 1. In wilds beyond they speak your name with reverence and regret,\nFor none could tame our ______ souls yet you the challenge met,\nUnder palest watch, you taught, we changed, base instincts were redeemed,\nA world you gave to bug and beast as they had never dreamed.\n");
      codeBlock.textContent = "3. He stands where currents twist and decay lingers, once a loyal sentinel of old. The name he first bore is rarely spoken aloud. Utter it to continue.";
      title.style.cursor = 'pointer';
      title.addEventListener('click', () => {
      alert("4. So you'd pursue the deeper truth? It isn't one the weak could bear. Prove yourself ready to face it. I'll not hold back. My _____ is lethal and I'd feel no sadness in a weakling's demise. Show me you can accept this Kingdom's past and claim responsibility for its future.");
      });
    }
  } else {
    inputGroup.className = 'input-group incorrect';
    alert('Password incorrect! Try again.');
  }
});

[layer1, layer2, layer3, layer4].forEach(layer => {
  layer.addEventListener('click', e => {
    if (!layer.classList.contains('active')) {
      e.preventDefault();
    } else {
      e.preventDefault(); 
      window.open(layer.href, '_blank');
    }
  });
});