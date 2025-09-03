import { useNavigate } from "react-router-dom";

export function Component() {
  const navigate = useNavigate();
  return (
    <main style={{ padding: 24 }}>
      <h1>Home</h1>
      <p>Navigate to screens; during transitions, the previous screen remains and a transparent overlay appears.</p>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={() => navigate("/about")}>About (API)</button>
        <button onClick={() => navigate("/screen-a")}>Screen A</button>
        <button onClick={() => navigate("/screen-b")}>Screen B</button>
      </div>
    </main>
  );
}

export async function loader() {
  // Optional delay to see overlay when coming back to Home
  await new Promise((r) => setTimeout(r, 400));
  return null;
}
