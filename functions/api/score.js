export async function onRequest({ request, env }) {
  const headers = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Content-Type": "application/json; charset=utf-8" };
  if (request.method === "OPTIONS") return new Response(null, { headers });
  if (request.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405, headers });
  try {
    const body = await request.json();
    const name = String(body.name || "Shinobi").trim().slice(0, 18) || "Shinobi";
    const score = Number(body.score);
    if (!Number.isSafeInteger(score) || score < 0 || score > 10000000) {
      return Response.json({ error: "Skor tidak valid." }, { status: 400, headers });
    }
    await env.DB.prepare("INSERT INTO scores (name, score) VALUES (?, ?)").bind(name, score).run();
    return Response.json({ ok: true }, { status: 201, headers });
  } catch {
    return Response.json({ error: "Tidak bisa menyimpan skor." }, { status: 400, headers });
  }
}