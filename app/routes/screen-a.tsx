import type { Route } from "./+types/screen-a";
import { useNavigate } from "react-router";
// Minimal screen to demonstrate route-level code-splitting and clientLoader delay.


function ScreenA() {
  const navigate = useNavigate();
  return (
    <main className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Screen A</h1>
      <p>Bu sayfa router modül bazlı lazy yükleme ile gelir.</p>
      <button onClick={() => navigate("/")} className="underline text-blue-700 dark:text-blue-500">Geri dön</button>
    </main>
  );
}

export const Component = ScreenA;
export default ScreenA;

export async function clientLoader({}: Route.ClientLoaderArgs) {
  // Small delay so navigation shows loading and overlay is visible
  await new Promise((r) => setTimeout(r, 600));
  return null;
}
