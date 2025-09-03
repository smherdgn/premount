import { useNavigate } from "react-router-dom";

export function Component() {
  const navigate = useNavigate();
  return (
    <main style={{ padding: 24 }}>
      <h1>Screen B</h1>
      <p>This page is also lazily loaded; transitions show the overlay.</p>
      <button onClick={() => navigate("/")}>Back</button>
    </main>
  );
}

export async function loader() {
  // Slightly different delay to vary the feel
  await new Promise((r) => setTimeout(r, 700));
  return null;
}

