import { Form, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

type LoaderData = {
  app: unknown;
  from: string;
  at: string;
};

export function Component() {
  const data = useLoaderData() as LoaderData;
  const [demo, setDemo] = useState<any>(null);
  const [demoError, setDemoError] = useState<string | null>(null);
  const [demoLoading, setDemoLoading] = useState<boolean>(true);

  useEffect(() => {
    let alive = true;
    setDemoLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((r) => {
        if (!r.ok) throw new Error("JSONPlaceholder error");
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
    <main style={{ padding: 24 }}>
      <h1>About</h1>
      <p>Simulates a longer load to better show the overlay and mirrors the RR7 demo.</p>

      <section style={{ marginTop: 16 }}>
        <h3>JSONPlaceholder User</h3>
        <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          {demoLoading && <div>Loading…</div>}
          {demoError && <div style={{ color: "#c00" }}>Error: {demoError}</div>}
          {demo && (
            <ul>
              <li>Name: {demo.name}</li>
              <li>Email: {demo.email}</li>
              <li>City: {demo.address?.city}</li>
              <li>Company: {demo.company?.name}</li>
            </ul>
          )}
        </div>
      </section>

      {data?.app && (
        <section style={{ marginTop: 16 }}>
          <h3>Local App Info (/api/about.json)</h3>
          <pre style={{ background: "#f6f8fa", padding: 12, borderRadius: 8, overflow: "auto" }}>
            {JSON.stringify(data.app, null, 2)}
          </pre>
        </section>
      )}

      <section style={{ marginTop: 16 }}>
        <h3>Loader Data (debug)</h3>
        <pre style={{ background: "#f6f8fa", padding: 12, borderRadius: 8, overflow: "auto" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>Demo Form</h3>
        <Form method="post">
          <input name="foo" placeholder="foo" />
          <button type="submit" style={{ marginLeft: 8 }}>Save</button>
        </Form>
      </section>
    </main>
  );
}

export async function loader() {
  let app: unknown = null;
  try {
    // Local file served by Vite (public folder)
    const res = await fetch("/api/about.json");
    if (res.ok) app = await res.json();
    else app = { error: `api/about.json status ${res.status}` };
  } catch (e) {
    app = { error: "api/about.json unreachable", detail: String(e) };
  }
  // Delay to clearly show the overlay
  await new Promise((r) => setTimeout(r, 1000));
  return { app, from: "about.loader", at: new Date().toISOString() } as LoaderData;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  return { ok: true, received: Object.fromEntries(formData.entries()) };
}
