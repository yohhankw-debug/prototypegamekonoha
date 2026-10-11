export async function onRequest({ request, env }) {
  const headers = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json; charset=utf-8" };
  if (request.method !== "GET") return Response.json({ error: "Method not allowed" }, { status: 405, headers });
  try {
    const { results } = await env.DB.prepare(
      "SELECT name, score, created_at AS date FROM scores ORDER BY score DESC, created_at ASC LIMIT 10"
    ).all();
    return Response.json({ scores: results }, { headers });
  } catch {
    return Response.json({ error: "D1 belum siap. Jalankan schema.sql." }, { status: 503, headers });
  }
}