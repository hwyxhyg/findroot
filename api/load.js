export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { user_id } = req.body;
  if (!user_id) return res.status(400).json({ error: 'missing user_id' });

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/archives?user_id=eq.${encodeURIComponent(user_id)}&select=data`,
    {
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`
      }
    }
  );

  if (!response.ok) return res.status(200).json({ data: null });
  const rows = await response.json();
  res.status(200).json({ data: rows[0]?.data || null });
}
