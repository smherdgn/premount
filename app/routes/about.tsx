import type { Route } from "./+types/about";
import { useLoaderData, Form } from "react-router";
// About demonstrates clientLoader (SPA data). We fetch both a local API
// and JSONPlaceholder inside the loader so the global overlay stays visible
// during the entire transition and data fetch.

function AboutPage() {
  // Type of useLoaderData derives from clientLoader in SPA mode
  const data = useLoaderData<typeof clientLoader>();

  return (
    <div className="container mx-auto p-4 space-y-6 relative">
      <h1 className="text-2xl font-semibold">About</h1>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">JSONPlaceholder Kullanıcı</h2>
        <div className="rounded border border-gray-200 dark:border-gray-800 p-3">
          {data.demo ? (
            <ul className="space-y-1">
              <li><span className="text-gray-500">Ad:</span> {data.demo.name}</li>
              <li><span className="text-gray-500">Email:</span> {data.demo.email}</li>
              <li><span className="text-gray-500">Şehir:</span> {data.demo.address?.city}</li>
              <li><span className="text-gray-500">Şirket:</span> {data.demo.company?.name}</li>
            </ul>
          ) : (
            <div>Veri yüklenemedi.</div>
          )}
        </div>
      </section>

      {data.app && (
        <section className="space-y-2">
          <h2 className="text-lg font-medium">Uygulama Bilgisi (/api/about)</h2>
          <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto">{JSON.stringify(data.app, null, 2)}</pre>
        </section>
      )}

      {/* Client-side action (SPA): handled by clientAction below */}
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
  // In SPA mode we use clientLoader so logs & requests appear in DevTools.
  let app: unknown = null;
  let demo: any | null = null;
  console.log("about.clientLoader");
  try {
    // Lazily import the service helpers so even fetch logic lives in a separate chunk
    const api = await import("../services/about.api");
    const [appData, demoData] = await Promise.all([
      api.fetchAppInfo(),
      api.fetchDemoUser(),
    ]);
    app = appData;
    demo = demoData;
  } catch (e) {
    app = { error: "about.json erişilemedi", detail: String(e) };
    demo = null;
  }
  // Small delay to make the transition overlay noticeable
  await new Promise((r) => setTimeout(r, 800));
  return { app, demo, from: "about.clientLoader", at: new Date().toISOString() };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  // Simple demo mutate handled on the client in SPA mode
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
