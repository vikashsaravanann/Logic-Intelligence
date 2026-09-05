const fs = require('fs');

let code = fs.readFileSync('src/app/(auth)/login/page.tsx', 'utf8');

code = code.replace(
  /const \{ error \} = await supabase\.auth\.signInWithPassword\(\{ email, password \}\);\s*if \(error\) throw error;\s*router\.push\("\/dashboard"\);/,
  `const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // Trigger login notification quietly in background
        fetch('/api/auth/login-notification', { method: 'POST' }).catch(() => {});
        router.push("/dashboard");`
);

fs.writeFileSync('src/app/(auth)/login/page.tsx', code);
console.log("Patched login");
