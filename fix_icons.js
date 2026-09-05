const fs = require('fs');
let code = fs.readFileSync('src/app/ai/page.tsx', 'utf8');

// Add Lucide imports
code = code.replace(
  /import \{ Rocket, Briefcase, Building2, Wrench, AlertTriangle, Square, Copy, RefreshCcw \} from 'lucide-react';/,
  `import { Rocket, Briefcase, Building2, Wrench, AlertTriangle, Square, Copy, RefreshCcw, Paperclip, Mic, Table, Code2, Calculator, Handshake, CreditCard, Calendar } from 'lucide-react';`
);

// Replace emojis in Artifacts
code = code.replace(/<span className="icon">📊<\/span>/g, '<span className="icon"><Table size={20} className="text-[#00bfff]" /></span>');
code = code.replace(/<span className="icon">💻<\/span>/g, '<span className="icon"><Code2 size={20} className="text-[#00bfff]" /></span>');
code = code.replace(/<span className="icon">💰<\/span>/g, '<span className="icon"><Calculator size={20} className="text-[#00bfff]" /></span>');
code = code.replace(/<span className="icon">🤝<\/span>/g, '<span className="icon"><Handshake size={20} className="text-[#00bfff]" /></span>');
code = code.replace(/<span className="icon">💳<\/span>/g, '<span className="icon"><CreditCard size={20} className="text-[#00bfff]" /></span>');
code = code.replace(/<span className="icon">📅<\/span>/g, '<span className="icon"><Calendar size={20} className="text-[#00bfff]" /></span>');

// Replace emojis in input bar
code = code.replace(
  />\s*📎\s*<\/button>/g,
  `><Paperclip size={18} /></button>`
);
code = code.replace(
  />\s*🎤\s*<\/button>/g,
  `><Mic size={18} /></button>`
);

fs.writeFileSync('src/app/ai/page.tsx', code);
console.log("Icons fixed!");
