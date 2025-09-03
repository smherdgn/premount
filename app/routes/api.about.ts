// API route for /api/about
// Kept minimal on purpose: used by About page to show a local fetch
// in SPA mode (so it appears in browser DevTools).
import type { Route } from "./+types/api.about";

export async function loader() {
  return Response.json({ name: "Premount", version: "1.0.0" });
}
