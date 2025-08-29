# Repository Guidelines

## Project Structure & Module Organization
- src/: React + TypeScript source. Key folders: `components/`, `pages/`, `content/` (data/JSON-LD helpers), `lib/` (utils), `styles/`, `assets/`.
- tests/: Playwright specs (`*.spec.ts`) and `__screenshots__/` baselines. Test artifacts output to `test-results/`.
- public/: Static assets served by Vite. dist/: Production build (or `wp-plugin/mtech-knowledge-hub/assets` for WP builds).
- docs/: Design/architecture notes; scripts/: maintenance utilities (e.g., file size checks).
- Path alias: `@` maps to `src/` (see `vite.config.ts`).

## Build, Test, and Development Commands
- `pnpm install`: Install dependencies.
- `pnpm dev`: Start Vite dev server at `http://localhost:5173`.
- `pnpm build`: Type-check then build single-bundle assets to `dist/`.
- `pnpm build:wp`: Build with `OUT_DIR=wp-plugin/mtech-knowledge-hub/assets` for WordPress enqueue.
- `pnpm preview`: Serve a built app locally.
- `pnpm test`: Run Playwright tests. Tip: run `pnpm dev` in a second terminal or set `BASE_URL` (e.g., `BASE_URL=http://localhost:5173 pnpm test`).
- `pnpm lint`: Lint TypeScript/React files.

## Coding Style & Naming Conventions
- TypeScript + React 19; 2-space indent; functional components.
- Tailwind CSS for styles; keep class lists readable and composable.
- Keep files small: warn ≥350 lines, max 400 (see `scripts/check-file-sizes.mjs`). Prefer splitting components and moving data to `src/content/`.
- Imports: prefer alias `@/...` for local modules.

## Testing Guidelines
- Framework: Playwright (`@playwright/test`). Specs end with `.spec.ts`.
- Run flow: start app (`pnpm dev`) then `pnpm test` (or set `BASE_URL`).
- Visuals: screenshots live in `tests/__screenshots__/`; update intentionally and commit diffs.
- Aim to keep coverage of key routes: landing, section pages, quiz, downloads, schema JSON-LD, and a11y smoke checks.

## Commit & Pull Request Guidelines
- Commits: use Conventional Commits (e.g., `feat:`, `fix:`, `docs:`, `chore:`). Imperative mood, ≤72-char subject.
- PRs: clear description, link issues, list test steps and affected routes; include before/after screenshots for UI changes; note schema or content impacts.

## Security & Configuration Tips
- WordPress dev: set `define('MTECH_KH_DEV', true);` and use shortcode `[mtech_knowledge_hub]`.
- Build constraints: single JS/CSS bundle is intentional (see `vite.config.ts` `manualChunks: undefined`).
- Env: `OUT_DIR` for WP builds; `BASE_URL` for tests; `MAX_LINES`/`WARN_LINES` for file size checks.
