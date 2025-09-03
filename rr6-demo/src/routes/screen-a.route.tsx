import { useNavigate } from "react-router-dom";

export function Component() {
  const navigate = useNavigate();
  return (
    <main style={{ padding: 24 }}>
      <h1>Screen A</h1>
      <p>This page is lazily loaded via route-level code-splitting.</p>
      <button onClick={() => navigate("/")}>Back</button>
    </main>
  );
}

export async function loader() {
  // Small delay to make the overlay noticeable on navigation
  await new Promise((r) => setTimeout(r, 600));
  return null;
}

