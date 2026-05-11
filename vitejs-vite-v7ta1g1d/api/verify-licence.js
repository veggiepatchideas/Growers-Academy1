export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { license_key } = req.body;
  if (!license_key) return res.status(400).json({ error: "Missing licence key" });

  try {
    const response = await fetch("https://api.gumroad.com/v2/licenses/verify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        access_token: "R8tILozaagu1-xC2y5LgeRPtU7wGUKYkquQcNhQcyHk",
        product_id: "iqvXTpQi-68wMeLvpNBlvg==",
        license_key: license_key.trim(),
        increment_uses_count: "false"
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ success: false, error: "Verification failed" });
  }
}
