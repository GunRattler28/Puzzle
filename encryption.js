let bcrypt = require('bcryptjs');
let realPassword = "Oui Oui Baguette";

bcrypt.genSalt(16, (err, salt) => {
    bcrypt.hash(realPassword, salt, (err, hash) => {
        console.log(hash);
    })
})

// async function sha256(message) {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(message);
//   const hashBuffer = await crypto.subtle.digest('SHA-256', data);
//   const hashArray = Array.from(new Uint8Array(hashBuffer));
//   return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
// }

// const capitalPassword = password.split(' ')
//     .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
//     .join(' ');

// const hashedPassword = await sha256(capitalPassword);