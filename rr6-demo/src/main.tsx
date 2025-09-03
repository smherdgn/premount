import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigation,
} from "react-router-dom";

// ---- Layout: keep previous screen, overlay while navigating ----
function AppLayout() {
  const navigation = useNavigation();
  const busy = navigation.state === "loading" || navigation.state === "submitting";

  return (
    <div style={{ position: "relative", minHeight: "100dvh" }}>
      {/* Previous screen remains visible while next route loads */}
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>

      {/* Transparent overlay + spinner */}
      {busy && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            background: "rgba(0,0,0,0.15)",
            backdropFilter: "blur(2px)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              border: "4px solid rgba(255,255,255,0.6)",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 0.9s linear infinite",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
    </div>
  );
}

// ---- Lazy route modules ----
const routes = [
  {
    element: <AppLayout />,
    children: [
      { path: "/", lazy: () => import("./routes/home.route") },
      { path: "/about", lazy: () => import("./routes/about.route") },
      { path: "/screen-a", lazy: () => import("./routes/screen-a.route") },
      { path: "/screen-b", lazy: () => import("./routes/screen-b.route") },
    ],
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
