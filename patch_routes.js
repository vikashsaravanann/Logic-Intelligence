const fs = require('fs');

const processFile = (file) => {
  let code = fs.readFileSync(file, 'utf8');
  
  code = code.replace(
    /await sendEmail\(\{([\s\S]*?)\}\);/g,
    (match, p1) => {
      // If there's already an assignment, skip
      if (match.includes("const emailResult")) return match;
      return `const emailResult = await sendEmail({${p1}});
      if (!emailResult.success) {
        console.error("[Email Error] Failed to send email:", emailResult.message);
      }`;
    }
  );
  
  fs.writeFileSync(file, code);
}

processFile('src/app/api/contact/route.ts');
processFile('src/app/api/free-demo/route.ts');
processFile('src/app/api/checklist/route.ts');
console.log("Patched API routes");
