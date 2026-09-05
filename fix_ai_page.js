const fs = require('fs');

let code = fs.readFileSync('src/app/ai/page.tsx', 'utf8');

// 1. Remove duplicate branding and fix sidebar branding
// In sidebar
code = code.replace(
  /<div className="sidebar-brand">[\s\S]*?<\/div>\s*<\/div>/,
  `<div className="sidebar-brand">
          <img src="/assets/image.png" alt="Logic Intelligence Technologies" style={{ height: '24px', width: 'auto', objectFit: 'contain' }} />
        </div>`
);

// In top-bar
code = code.replace(
  /<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>\s*<img src={COMPANY.logoIconPath}.*?\/>\s*<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>[\s\S]*?<\/div>\s*<\/div>/,
  `<div className="top-bar-title" style={{ display: isMobile ? 'flex' : 'none', alignItems: 'center' }}>
              <img src="/assets/image.png" alt="Logic Intelligence Technologies" style={{ height: '20px', width: 'auto', objectFit: 'contain' }} />
            </div>`
);

// 2. Add ThinkingStatus Component
const thinkingStatusCode = `
const ThinkingStatus = ({ activeMessage }: { activeMessage?: string }) => {
  const [tick, setTick] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 2500);
    return () => clearInterval(interval);
  }, []);

  const text = activeMessage || "";
  let phase = 0;
  if (text.includes('\`\`\`')) {
    phase = 3;
  } else if (text.length > 50) {
    phase = 2;
  } else {
    phase = tick % 2;
  }

  const phases = ["Thinking...", "Planning the response...", "Formulating answer...", "Writing code..."];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} 
        style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(0, 191, 255, 0.2)', borderTopColor: '#00bfff' }} 
      />
      <div style={{ position: 'relative', height: '20px', display: 'flex', alignItems: 'center', minWidth: '160px' }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={phase}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            style={{ fontSize: '13px', color: '#00bfff', fontWeight: '500', position: 'absolute', left: 0, whiteSpace: 'nowrap' }}
          >
            {phases[phase]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function GeminiAiChatPage() {`;

code = code.replace(/export default function GeminiAiChatPage\(\) \{/, thinkingStatusCode);

// 3. Replace loading state with ThinkingStatus
code = code.replace(
  /<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>\s*<div className="typing-dots">[\s\S]*?<\/div>\s*<\/div>/,
  `<ThinkingStatus activeMessage={activeChat?.messages[activeChat.messages.length - 1]?.text} />`
);

// 4. User Avatar replacement
code = code.replace(
  /user\?\.user_metadata\?\.avatar_url \? \(\s*<img src=\{user\.user_metadata\.avatar_url\} alt="User" \/>\s*\) : \(\s*'U'\s*\)/,
  `user?.user_metadata?.avatar_url || user?.user_metadata?.picture ? (
                    <img src={user.user_metadata.avatar_url || user.user_metadata.picture} alt="User" />
                  ) : (
                    user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || 'U'
                  )`
);

code = code.replace(
  /<img src=\{user\.user_metadata\?\.avatar_url \|\| ''\} alt="Profile".*?\/>/,
  `{(user.user_metadata?.avatar_url || user.user_metadata?.picture) ? (
                  <img src={user.user_metadata.avatar_url || user.user_metadata.picture} alt="Profile" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer' }} title="Go to Dashboard" />
                ) : (
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#282A2C', color: '#E3E3E3', fontWeight: 'bold' }}>
                    {user.user_metadata?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}`
);

// Ensure emoji is removed if present
code = code.replace(/Hello! 👋/g, 'Hello!');

fs.writeFileSync('src/app/ai/page.tsx', code);
console.log("Replaced successfully!");
