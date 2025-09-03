# React Router 7 – Lazy Loading Demo (SPA)

This project showcases React Router 7 with route-level lazy loading and a global transparent loading overlay that keeps the previous screen visible during navigation.

Useful for demonstrating: code-splitting of route modules, SPA mode data APIs, and smooth UX during transitions.

## Highlights

- Lazy-loaded route modules via RR7 build (Vite code-splitting)
- Global transparent overlay on navigation using `useNavigation()`
- SPA mode (SSR disabled) so loaders/actions run on the client
- TypeScript + Tailwind CSS

## App Structure

- Routes config: `app/routes.ts:1`
- Root layout + overlay: `app/root.tsx:1`
- Screens:
  - Home: `app/routes/home.tsx:1` (uses `clientLoader` to simulate delay)
  - About: `app/routes/about.tsx:1` (client fetch + `clientLoader` delay)
  - Screen A/B: `app/routes/screen-a.tsx:1`, `app/routes/screen-b.tsx:1` (each with `clientLoader`)
- Overlay component: `app/components/TransparentLoader.tsx:1`
- SPA config: `react-router.config.ts:1` (`ssr: false`)

## Global Loading Overlay

Root layout renders the current route and, when navigation is pending, displays an absolute, semi‑transparent overlay on top.

- Implementation: `app/root.tsx:1`
- The overlay component: `app/components/TransparentLoader.tsx:1`
- Trigger: `useNavigation().state === "loading" || "submitting"`

## Data Loading (SPA Mode)

SSR is disabled for this demo to surface client logs and network requests.

- SPA config: `react-router.config.ts:1` → `ssr: false`
- Client-only data APIs are used:
  - `clientLoader` instead of `loader`
  - `clientAction` instead of `action`
- About route fetches local API (`/api/about`) and also fetches JSONPlaceholder user data on the client with `useEffect`.

## Development

Install dependencies:

```bash
npm install
```

Start dev server with HMR:

```bash
npm run dev
```

Open `http://localhost:5173`.

## Production Build

Create a production build:

```bash
npm run build
```

Serve or deploy the build output. If you want server‑side rendering, set `ssr: true` in `react-router.config.ts` and migrate `clientLoader/clientAction` back to `loader/action`.

## Troubleshooting

- Empty page on navigation: ensure each route module exports a component (`export const Component = ...` or default export).
- SPA mode export error: switch `loader/action` to `clientLoader/clientAction`.
- Console logs missing: in SSR they appear server‑side; in SPA mode they appear in DevTools.

---

Built with React Router 7 and Vite.
