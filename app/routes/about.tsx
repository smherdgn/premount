import type { Route } from "./+types/about";
import { useLoaderData, Form } from "react-router";
import { useEffect, useState } from "react";

function AboutPage() {
  const data = useLoaderData<typeof clientLoader>();
  const [demo, setDemo] = useState<any>(null);
  const [demoError, setDemoError] = useState<string | null>(null);
  const [demoLoading, setDemoLoading] = useState<boolean>(true);

  useEffect(() => {
    let alive = true;
    setDemoLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((r) => {
        if (!r.ok) throw new Error("JSONPlaceholder hata");
        return r.json();
      })
      .then((j) => alive && setDemo(j))
      .catch((e) => alive && setDemoError(String(e)))
      .finally(() => alive && setDemoLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6 relative">
      <h1 className="text-2xl font-semibold">About</h1>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">JSONPlaceholder Kullanıcı</h2>
        <div className="rounded border border-gray-200 dark:border-gray-800 p-3">
          {demoLoading && <div>Yükleniyor...</div>}
          {demoError && <div className="text-red-600">Hata: {demoError}</div>}
          {demo && (
            <ul className="space-y-1">
              <li><span className="text-gray-500">Ad:</span> {demo.name}</li>
              <li><span className="text-gray-500">Email:</span> {demo.email}</li>
              <li><span className="text-gray-500">Şehir:</span> {demo.address?.city}</li>
              <li><span className="text-gray-500">Şirket:</span> {demo.company?.name}</li>
            </ul>
          )}
        </div>
      </section>

      {data.app && (
        <section className="space-y-2">
          <h2 className="text-lg font-medium">Uygulama Bilgisi (/api/about)</h2>
          <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto">{JSON.stringify(data.app, null, 2)}</pre>
        </section>
      )}

      <Form method="post" className="space-x-2">
        <input name="foo" placeholder="foo" className="border p-2" />
        <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">Kaydet</button>
      </Form>

      {/* Loader verisini görünür kılmak için debug alanı */}
      <section className="space-y-2">
        <h2 className="text-lg font-medium">Loader Verisi</h2>
        <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
      </section>
    </div>
  );
}

export const Component = AboutPage;
export default AboutPage;

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  let app: unknown = null;
    console.log("about.loader");
  try {
    const appUrl = new URL("/api/about", request.url);
    const res = await fetch(appUrl);
    if (res.ok) app = await res.json();
    else app = { error: `api/about status ${res.status}` };
  } catch (e) {
    app = { error: "api/about erişilemedi", detail: String(e) };
  }
  // Demo: küçük gecikme, lazy route + overlay hissi için
  await new Promise((r) => setTimeout(r, 800));
  return { app, from: "about.loader", at: new Date().toISOString() };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  console.log( "about.action");

  // Demo: pretend to save
  return { ok: true, received: Object.fromEntries(formData.entries()) };
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Bilinmeyen hata";
  if (typeof error === "string") message = error;
  else if (error && typeof error === "object" && "message" in error) {
    message = String((error as any).message);
  }
  return <div>Hata: {message}</div>;
}
