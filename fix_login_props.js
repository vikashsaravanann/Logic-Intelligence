const fs = require('fs');

const fixFile = (file) => {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(
    /userEmail: session\.user\.email,/,
    `email: session.user.email,`
  );
  code = code.replace(
    /time: new Date\(\)\.toLocaleString\('en-IN', \{ timeZone: 'Asia\/Kolkata' \}\),/,
    `loginTimestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),`
  );
  code = code.replace(
    /device: request\.headers\.get\("user-agent"\) \|\| "Unknown Device",/,
    `userAgent: request.headers.get("user-agent") || "Unknown Device",`
  );
  code = code.replace(
    /location: "India"/,
    `deviceSummary: "Unknown Location"`
  );
  fs.writeFileSync(file, code);
}

fixFile('src/app/auth/callback/route.ts');
fixFile('src/app/api/auth/login-notification/route.ts');
console.log("Fixed props!");
