// API route for /api/about
import type { Route } from "./+types/api.about";

export async function loader() {
  return Response.json({ name: "Premount", version: "1.0.0" });
}
