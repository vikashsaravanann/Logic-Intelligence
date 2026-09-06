/**
 * Backfill knowledge_chunks.embedding via OpenAI text-embedding-3-small.
 * Uses Supabase REST (service role) — no local node_modules required.
 *
 * Env: OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "").replace(/\/$/, "");
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const openaiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small";

if (!url || !serviceKey || !openaiKey) {
  console.error("Need OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const headers = {
  apikey: serviceKey,
  Authorization: `Bearer ${serviceKey}`,
  "Content-Type": "application/json",
};

async function embed(text) {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model, input: text.slice(0, 8000) }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${(await res.text()).slice(0, 400)}`);
  const json = await res.json();
  return json.data[0].embedding;
}

const listRes = await fetch(
  `${url}/rest/v1/knowledge_chunks?select=id,title,content,embedding&order=created_at.asc`,
  { headers }
);
if (!listRes.ok) {
  console.error("List failed", await listRes.text());
  process.exit(1);
}
const rows = await listRes.json();

let updated = 0;
let skipped = 0;
for (const row of rows) {
  if (row.embedding) {
    skipped += 1;
    continue;
  }
  try {
    const vector = await embed(`${row.title}\n\n${row.content}`);
    const up = await fetch(`${url}/rest/v1/knowledge_chunks?id=eq.${row.id}`, {
      method: "PATCH",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify({
        embedding: vector,
        updated_at: new Date().toISOString(),
      }),
    });
    if (!up.ok) {
      console.error("Update failed", row.id, await up.text());
      process.exitCode = 1;
      continue;
    }
    updated += 1;
    console.log("embedded", row.title);
    await new Promise((r) => setTimeout(r, 250));
  } catch (e) {
    console.error("Embed failed:", e.message || e);
    process.exitCode = 1;
    break;
  }
}
console.log(`Done. updated=${updated} skipped_existing=${skipped} total=${rows.length}`);
