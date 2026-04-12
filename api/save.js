import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { user_id, data } = req.body;
  if (!user_id) return res.status(400).json({ error: 'missing user_id' });

  const { error } = await supabase
    .from('archives')
    .upsert({ user_id, data }, { onConflict: 'user_id' });

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ ok: true });
}
