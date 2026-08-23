const fs = require('fs');
const { execSync } = require('child_process');

const envContent = fs.readFileSync('.env.local', 'utf8');
const lines = envContent.split('\n');

for (const line of lines) {
  if (line.trim() === '' || line.startsWith('#')) continue;
  
  const [key, ...valueParts] = line.split('=');
  if (!key) continue;
  
  const value = valueParts.join('=').trim();
  
  try {
    console.log(`Setting ${key} in Vercel...`);
    // Run vercel env add interactively or pipe it
    // vercel env add requires piping for non-interactive
    execSync(`printf "%s" "${value}" | vercel env add ${key} production`, { stdio: 'pipe' });
    execSync(`printf "%s" "${value}" | vercel env add ${key} preview`, { stdio: 'pipe' });
    execSync(`printf "%s" "${value}" | vercel env add ${key} development`, { stdio: 'pipe' });
    console.log(`Successfully set ${key}`);
  } catch (err) {
    // If it already exists, Vercel might throw an error or we might need to use `vercel env rm` first.
    // To make it simple, we can just remove it and add it again
    try {
      try { execSync(`vercel env rm ${key} production -y`, { stdio: 'pipe' }); } catch(e) {}
      try { execSync(`vercel env rm ${key} preview -y`, { stdio: 'pipe' }); } catch(e) {}
      try { execSync(`vercel env rm ${key} development -y`, { stdio: 'pipe' }); } catch(e) {}

      execSync(`printf "%s" "${value}" | vercel env add ${key} production`, { stdio: 'pipe' });
      execSync(`printf "%s" "${value}" | vercel env add ${key} preview`, { stdio: 'pipe' });
      execSync(`printf "%s" "${value}" | vercel env add ${key} development`, { stdio: 'pipe' });
      console.log(`Successfully replaced and set ${key}`);
    } catch (e) {
      console.error(`Failed to set ${key}: ${e.message}`);
    }
  }
}
console.log('Done uploading env vars to Vercel.');
