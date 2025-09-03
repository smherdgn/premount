import type { Route } from "./+types/screen-b";
import { useNavigate } from "react-router";



function ScreenB() {
  const navigate = useNavigate();
  return (
    <main className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Screen B</h1>
      <p>Bu sayfa da router modül bazlı lazy yükleme ile gelir.</p>
      <button onClick={() => navigate("/")} className="underline text-blue-700 dark:text-blue-500">Geri dön</button>
    </main>
  );
}

export const Component = ScreenB;
export default ScreenB;

export async function clientLoader({}: Route.ClientLoaderArgs) {
  // Küçük bir gecikme: geçişte overlay görünür, lazy yükleme daha net hissedilir
  await new Promise((r) => setTimeout(r, 700));
  return null;
}
