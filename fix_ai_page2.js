const fs = require('fs');
let code = fs.readFileSync('src/app/ai/page.tsx', 'utf8');

code = code.replace(
  /<ThinkingStatus activeMessage=\{activeChat\?\.messages\[activeChat\.messages\.length - 1\]\?\.text\} \/>\s*\)\}/,
  `<ThinkingStatus activeMessage={activeChat?.messages[activeChat.messages.length - 1]?.text} />\n              </div>\n            )}`
);

fs.writeFileSync('src/app/ai/page.tsx', code);
console.log("Fixed missing div");
