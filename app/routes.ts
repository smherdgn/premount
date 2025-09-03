// Route manifest for React Router build. These module paths are code-split
// by Vite so each route loads lazily on navigation.
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("screen-a", "routes/screen-a.tsx"),
  route("screen-b", "routes/screen-b.tsx"),
  route("api/about", "routes/api.about.ts"),
] satisfies RouteConfig;
