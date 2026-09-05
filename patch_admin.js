const fs = require('fs');

let code = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

code = code.replace(
  /import \{ DollarSign, Briefcase, MessageSquare, Ticket \} from "lucide-react";/,
  `import { DollarSign, Briefcase, MessageSquare, Ticket } from "lucide-react";
import { AdminTriggers } from "./components/AdminTriggers";`
);

code = code.replace(
  /<\/div>\n    <\/div>\n  \);\n\}/,
  `      </div>

      <AdminTriggers />
    </div>
  );
}`
);

fs.writeFileSync('src/app/admin/page.tsx', code);
console.log("Patched admin page");
