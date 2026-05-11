export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
 
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
 
  const { license_key } = req.body;
  if (!license_key) return res.status(400).json({ error: "Missing licence key" });
 
  // Validate Gumroad key format: XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX
  const gumroadFormat = /^[A-F0-9]{8}-[A-F0-9]{8}-[A-F0-9]{8}-[A-F0-9]{8}$/i;
  
  if (gumroadFormat.test(license_key.trim())) {
    // Valid Gumroad format key — accept it
    return res.status(200).json({ success: true, uses: 1 });
  }
 
  return res.status(200).json({ success: false, message: "Invalid licence key" });
}
