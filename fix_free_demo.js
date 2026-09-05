const fs = require('fs');
let code = fs.readFileSync('src/app/api/free-demo/route.ts', 'utf8');

code = code.replace(
  /import LeadConfirmationEmail from "@\/emails\/lead-confirmation-email";/,
  `import FreeDemoConfirmationEmail from "@/emails/free-demo-confirmation-email";`
);

code = code.replace(
  /react: React\.createElement\(LeadConfirmationEmail, \{ fullName: name, service: service_type \}\),/g,
  `react: React.createElement(FreeDemoConfirmationEmail, { fullName: name }),`
);

fs.writeFileSync('src/app/api/free-demo/route.ts', code);
console.log("Updated free demo route");
