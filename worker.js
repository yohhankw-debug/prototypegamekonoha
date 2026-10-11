export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json; charset=utf-8"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (url.pathname === "/api/leaderboard" && request.method === "GET") {
      try {
        const { results } = await env.DB.prepare(
          "SELECT name, score, created_at AS date FROM scores ORDER BY score DESC, created_at ASC LIMIT 10"
        ).all();
        return Response.json({ scores: results }, { headers: cors });
      } catch (e) {
        return Response.json({ error: "Database belum siap. Jalankan schema.sql." }, { status: 503, headers: cors });
      }
    }
    if (url.pathname === "/api/score" && request.method === "POST") {
      try {
        const body = await request.json();
        const name = String(body.name || "Shinobi").trim().slice(0, 18) || "Shinobi";
        const score = Number(body.score);
        if (!Number.isSafeInteger(score) || score < 0 || score > 10000000) {
          return Response.json({ error: "Skor tidak valid." }, { status: 400, headers: cors });
        }
        await env.DB.prepare("INSERT INTO scores (name, score) VALUES (?, ?)").bind(name, score).run();
        return Response.json({ ok: true }, { status: 201, headers: cors });
      } catch (e) {
        return Response.json({ error: "Tidak bisa menyimpan skor." }, { status: 400, headers: cors });
      }
    }
    return Response.json({ error: "Not found" }, { status: 404, headers: cors });
  }
};