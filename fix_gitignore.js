const fs = require('fs');
let code = fs.readFileSync('.gitignore', 'utf8');
code = code.replace(/\*\.PNG/g, ''); // Remove the line ignoring all PNGs!
fs.writeFileSync('.gitignore', code);
