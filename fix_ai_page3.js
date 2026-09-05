const fs = require('fs');
let code = fs.readFileSync('src/app/ai/page.tsx', 'utf8');

// 1. Add ArrowLeft to lucide-react import
code = code.replace(
  /import \{ Rocket, Briefcase, Building2, Wrench, AlertTriangle, Square, Copy, RefreshCcw, Paperclip, Mic, Table, Code2, Calculator, Handshake, CreditCard, Calendar \} from 'lucide-react';/,
  `import { Rocket, Briefcase, Building2, Wrench, AlertTriangle, Square, Copy, RefreshCcw, Paperclip, Mic, Table, Code2, Calculator, Handshake, CreditCard, Calendar, ArrowLeft } from 'lucide-react';`
);

// 2. Remove language state
code = code.replace(/const \[language, setLanguage\] = useState\('English'\);\n/, '');

// 3. Remove language mutation block
code = code.replace(/if \(language !== 'English'\) \{\s*payloadText = `\$\{payloadText\}\\n\(Please respond to me in \$\{language\} language\)`(?:;|)\s*\}/, '');

// 4. Remove language dropdown
code = code.replace(
  /<select[\s\S]*?<\/select>/,
  ''
);

// 5. Replace Exit with Back to Home
code = code.replace(
  /Exit\s*<\/a>/,
  `<ArrowLeft size={14} className="inline-block mr-1" /> Back to Home</a>`
);

// 6. Replace BrandLogo background watermark
code = code.replace(
  /<BrandLogo size=\{800\} \/>/,
  `<img src="/assets/logo.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.15, filter: 'grayscale(100%) brightness(200%)' }} />`
);

// 7. Center Welcome Screen & Fix Colors
code = code.replace(
  /<div className="welcome-title-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '760px', width: '100%', marginBottom: '48px', paddingLeft: '8px' }}>/,
  `<div className="welcome-title-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '760px', width: '100%', marginBottom: '48px' }}>`
);
code = code.replace(
  /color: '#5f6368'/g,
  `color: '#a1a1aa'` // zinc-400
);
code = code.replace(
  /color: '#8E918F'/g,
  `color: '#71717a'` // zinc-500
);

// Add the brief descriptive sentence
code = code.replace(
  /Founded by Vikash Saravanan • Coimbatore, Tamil Nadu, India\n\s*<\/div>/,
  `Founded by Vikash Saravanan • Coimbatore, Tamil Nadu, India
              </div>
              <div style={{ color: '#a1a1aa', fontSize: '16px', marginTop: '24px', lineHeight: '1.6', maxWidth: '600px' }}>
                I can help you scope custom software projects, generate business automation strategies, fetch pricing details, or answer technical questions about your infrastructure.
              </div>`
);

fs.writeFileSync('src/app/ai/page.tsx', code);
console.log("Updated ai page visual fixes!");
