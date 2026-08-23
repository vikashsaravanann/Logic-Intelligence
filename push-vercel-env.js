const fs = require('fs');
const { execSync } = require('child_process');

const envContent = fs.readFileSync('.env.local', 'utf8');
const lines = envContent.split('\n');

for (const line of lines) {
  if (line.trim() === '' || line.startsWith('#')) continue;
  
  const [key, ...valueParts] = line.split('=');
  if (!key) continue;
  
  const value = valueParts.join('=').trim();
  
  // Escape quotes if any
  const escapedValue = value.replace(/"/g, '\\"');
  
  try {
    console.log(`Setting ${key} in Vercel...`);
    try { execSync(`vercel env rm ${key} production -y`, { stdio: 'ignore' }); } catch(e) {}
    try { execSync(`vercel env rm ${key} preview -y`, { stdio: 'ignore' }); } catch(e) {}
    try { execSync(`vercel env rm ${key} development -y`, { stdio: 'ignore' }); } catch(e) {}

    execSync(`vercel env add ${key} production --value "${escapedValue}" --yes --force`, { stdio: 'pipe' });
    execSync(`vercel env add ${key} preview --value "${escapedValue}" --yes --force`, { stdio: 'pipe' });
    execSync(`vercel env add ${key} development --value "${escapedValue}" --yes --force`, { stdio: 'pipe' });
    console.log(`Successfully set ${key}`);
  } catch (err) {
    console.error(`Failed to set ${key}:`, err.message);
  }
}
console.log('Done uploading env vars to Vercel.');
