# Konoha vs Zombies 🌿🧟

A small browser tower-defense satire prototype inspired by lane-defense games. Public-figure-inspired zombie characters are fictional parody characters, not factual claims.

## Play locally
Open `index.html` in a modern browser. The game runs without a build step. Local top scores use browser localStorage.

## Files
- `index.html` — playable canvas game and UI.
- `worker.js` — optional Cloudflare Worker API for online scores.
- `schema.sql` — D1 leaderboard table.
- `wrangler.toml` — Worker/D1 configuration for database `prototypegamekonoha`.

## Set up online leaderboard
1. Install Wrangler and authenticate: `npx wrangler login`.
2. Apply the schema: `npx wrangler d1 execute prototypegamekonoha --remote --file=./schema.sql`.
3. Deploy the API Worker: `npx wrangler deploy`.
4. Serve `index.html` from a site origin that routes `/api/*` to this Worker. For a separate Worker domain, update the frontend fetch URLs to that domain and configure CORS narrowly before public launch.

The database is optional; the game itself is playable without it.

## Controls
Choose a defense card, then click a tile. Click floating suns to collect energy. Stop three waves of zombies before they reach the gate.

## Note
This is a prototype, not production-hardened. Before public deployment, add rate limiting and stronger score validation to the API.
