import type { Route } from "./+types/home";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lazy Load Demo" },
    { name: "description", content: "React Router 7 Lazy Routes" },
  ];
}

export async function clientLoader() {
  // Demo gecikme: geçişte overlay'in görünmesini sağla (SPA mode)
  await new Promise((r) => setTimeout(r, 400));
  return null;
}

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-10 min-h-0">
        <header className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-semibold">Ana Ekran</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Aşağıdaki sayfalara gidin; geçişte transparan loader gözüksün.
          </p>
        </header>
        <nav className="w-full max-w-sm rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <ul className="space-y-2">
            <li>
              <button
                className="block w-full text-left p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-900 underline text-blue-700 dark:text-blue-500"
                onClick={() => navigate("/about")}
              >
                About (API)
              </button>
            </li>
            <li>
              <button
                className="block w-full text-left p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-900 underline text-blue-700 dark:text-blue-500"
                onClick={() => navigate("/screen-a")}
              >
                Screen A
              </button>
            </li>
            <li>
              <button
                className="block w-full text-left p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-900 underline text-blue-700 dark:text-blue-500"
                onClick={() => navigate("/screen-b")}
              >
                Screen B
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
