export async function fetchAppInfo() {
  try {
    const res = await fetch("/api/about.json");
    if (!res.ok) return { error: `about.json status ${res.status}` };
    return await res.json();
  } catch (e) {
    return { error: "about.json unreachable", detail: String(e) };
  }
}

export async function fetchDemoUser() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

