import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const backendUrl =
    process.env.BACKEND_URL ||
    (process.env.NODE_ENV !== "production" ? "http://localhost:8080" : undefined);

  if (!backendUrl) {
    console.error("BACKEND_URL is not set — cannot proxy /api/messages");
    res.status(500).json({ error: "Server misconfigured: BACKEND_URL is not set" });
    return;
  }

  const backendRes = await fetch(`${backendUrl}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });

  const data = await backendRes.json();
  res.status(backendRes.status).json(data);
}
