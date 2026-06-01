# Portfolio 3D — Frontend Application

A creative, interactive 3D portfolio built from scratch with React, TypeScript, React Three Fiber, and Zustand. The application renders a navigable 3D workspace where portfolio sections (About, Projects, Skills, Contact, Menu) appear as HTML overlays projected onto in-scene monitor models. Content is consumed from a Strapi CMS instance; a separate `/products` route provides a 2D catalog page backed by Strapi and the FakeStore API.

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Technology Stack](#technology-stack)
3. [Architecture Overview](#architecture-overview)
4. [Directory Tree](#directory-tree)
5. [Design Patterns](#design-patterns)
6. [Technical Decisions](#technical-decisions)
7. [State Management Strategy](#state-management-strategy)
8. [Data Hydration Layer](#data-hydration-layer)
9. [API Contracts](#api-contracts)
10. [Mobile-First 3D Strategy](#mobile-first-3d-strategy)
11. [Performance Considerations](#performance-considerations)
12. [Scalability Considerations](#scalability-considerations)
13. [Development Setup](#development-setup)
14. [Development Commands](#development-commands)
15. [Testing Strategy](#testing-strategy)
16. [Commit Convention](#commit-convention)
17. [Future Roadmap](#future-roadmap)
18. [Technical Audit Report](#technical-audit-report)
19. [TODO](#todo)
20. [AI Usage](#ai-usage)

---

## Executive Summary

This repository contains the **frontend-only** application for a Creative 3D Portfolio. It was engineered from the ground up using a feature-driven architecture, strict TypeScript, and a separation between 3D rendering, UI overlays, and data fetching.


| Layer                            | Role                                                                                     |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| **React 19**                     | Component model, routing, and UI rendering                                               |
| **TypeScript**                   | Strict typing across API contracts, domain models, hooks, and 3D props                   |
| **Three.js / React Three Fiber** | WebGL 3D scene, GLTF models, camera navigation, HTML-in-3D overlays                      |
| **Zustand**                      | Lightweight global state for navigation, scene focus, theme, and notifications           |
| **Strapi CMS**                   | Headless content source for About, Projects, Skills, Contact, and Products page metadata |
| **EmailJS**                      | Client-side contact form submission (see [TODO](#todo) for migration recommendation)     |


The primary user experience lives at `/`: a loading screen transitions into a 3D room where the user navigates between portfolio sections via 3D float buttons, a HUD menu, and camera transitions. A secondary route at `/products` renders a conventional 2D products page.

---

## Technology Stack

### Runtime Dependencies


| Package                          | Version (declared) | Purpose                                                    |
| -------------------------------- | ------------------ | ---------------------------------------------------------- |
| `react` / `react-dom`            | ^19.2.6            | UI framework                                               |
| `react-router-dom`               | ^7.16.0            | Client-side routing (`/`, `/products`)                     |
| `three`                          | ^0.184.0           | WebGL 3D engine                                            |
| `@react-three/fiber`             | ^9.6.1             | React renderer for Three.js                                |
| `@react-three/drei`              | ^10.7.7            | R3F helpers (Html, useGLTF, Preload, CameraControls, etc.) |
| `@react-three/postprocessing`    | ^3.0.4             | Post-processing effects (Bloom)                            |
| `zustand`                        | ^5.0.14            | Global state management                                    |
| `detect-gpu`                     | ^5.0.70            | GPU tier detection for performance adaptation              |
| `@emailjs/browser`               | ^4.4.1             | Contact form email delivery                                |
| `react-slick` / `slick-carousel` | ^0.31.0 / ^1.8.1   | Projects and Skills carousels                              |


### Build & Tooling


| Package                                               | Purpose                               |
| ----------------------------------------------------- | ------------------------------------- |
| `vite` ^8.0.12                                        | Dev server, bundler, test runner host |
| `typescript` ~6.0.2                                   | Static typing (strict mode)           |
| `@vitejs/plugin-react`                                | React JSX/ Fast Refresh               |
| `vitest` ^4.1.7                                       | Unit test runner                      |
| `@testing-library/react`                              | Hook and component testing utilities  |
| `eslint` ^10.3.0                                      | Linting                               |
| `husky` ^8.0.0                                        | Git hooks                             |
| `@commitlint/cli` + `@commitlint/config-conventional` | Conventional commit validation        |
| `commitizen` + `@commitlint/cz-commitlint`            | Interactive commit prompts            |


---

## Architecture Overview

### Architectural Style

The codebase implements a **Feature-Driven Architecture (FDA)** combined with **Component-Based Architecture** and a **Layered Core**:

```
┌─────────────────────────────────────────────────────────────┐
│  Pages (route shells)                                       │
│  PortfolioPage · ProductsPage                               │
├─────────────────────────────────────────────────────────────┤
│  Features (domain modules)                                  │
│  3d-scene · about · projects · skills · contact · …         │
├─────────────────────────────────────────────────────────────┤
│  Shared UI + Store                                          │
│  src/ui/ · src/store/                                       │
├─────────────────────────────────────────────────────────────┤
│  Core (cross-cutting infrastructure)                        │
│  src/core/api · src/core/performance · src/core/constants   │
└─────────────────────────────────────────────────────────────┘
```

Evidence of this structure appears in:

- `src/features/` — 11 domain modules, each with colocated components, hooks, services, types, and styles
- `src/core/` — shared HTTP client, Result pattern, Strapi types, performance utilities, camera constants
- `src/ui/` — reusable primitives (Toast, FloatButton, ScreenHtml, Loader)
- `src/store/` — global Zustand stores
- `src/pages/` — thin route-level composition

### Feature Isolation

Each feature owns its UI, data hooks, services, and types. Cross-feature coupling is limited to shared core utilities, global stores, and the 3D orchestration layer (`SceneOrchestrator`) which composes screen features into the 3D scene.

### Separation of Concerns


| Concern                              | Location                                                  |
| ------------------------------------ | --------------------------------------------------------- |
| HTTP transport & error normalization | `src/core/api/httpClient.ts`                              |
| API → domain mapping                 | Feature services (and `useSkills` hook for skills)        |
| Data fetching lifecycle              | Feature hooks (`useAbout`, `useProjects`, etc.)           |
| 3D rendering & camera                | `src/features/3d-scene/`                                  |
| Global navigation state              | `src/store/navigationStore.ts`, `src/store/sceneStore.ts` |
| Presentation                         | Feature components + colocated CSS                        |


### Scalability Approach

New CMS-backed sections can follow the established pattern: define `*ApiResponse` and `*Content` types, add a service using `httpClient`, expose a custom hook, and mount the UI either as a 3D screen overlay or a standalone page.

---

## Directory Tree

Architecture-focused map of the project (major folders; not every file):

```
portfolio-3d/
├── public/
│   ├── Fonts/              # Custom typefaces (SUSE)
│   ├── Images/             # Static images (About, Contact, Icons, placeholder)
│   └── Models/             # GLB assets (Character, Chair, Scenario, Screens)
├── src/
│   ├── main.tsx            # React DOM entry point
│   ├── App.tsx             # Router, global Toast + ZoomDisabler wrappers
│   ├── setupTests.ts       # Vitest setup (@testing-library/jest-dom)
│   ├── styles/
│   │   └── globals.css     # CSS variables, base resets, dark color-scheme
│   ├── pages/
│   │   ├── Portfolio/      # 3D portfolio shell (LoadingScreen + Canvas stack)
│   │   └── Products/       # 2D products catalog page
│   ├── core/
│   │   ├── api/            # HttpClient, Result, AppError
│   │   ├── constants/      # Camera controls, environment presets, timing
│   │   ├── lib/            # Strapi media URL resolver
│   │   ├── performance/    # GPU/battery detection, useDeviceCapabilities
│   │   └── types/          # Strapi envelope, PortfolioView enum
│   ├── features/
│   │   ├── 3d-scene/       # R3F models, environment, camera, orchestration
│   │   ├── app-shell/      # Canvas wrapper, DPR/sizing hooks
│   │   ├── about/          # About screen + Strapi integration
│   │   ├── contact/        # Contact form (EmailJS) + social links
│   │   ├── loading/        # Loading screen + intro flow
│   │   ├── menu/           # Main menu screen
│   │   ├── navigation/     # HUD overlay (cancel, float menu, tutorial)
│   │   ├── products/       # Products page (Strapi + FakeStore)
│   │   ├── projects/       # Projects slider + Strapi integration
│   │   └── skills/         # Skills slider + Strapi integration
│   ├── store/
│   │   ├── navigationStore.ts
│   │   ├── sceneStore.ts
│   │   ├── themeStore.ts
│   │   └── toastStore.ts
│   └── ui/
│       ├── components/     # Toast, FloatButton, ScreenHtml, Loader, ZoomDisabler
│       ├── hooks/            # useScaleAnimation
│       └── icons/            # SVG icon components
├── docs/
│   ├── MIGRATION_PLAN.md   # Legacy → feature-driven migration planning doc
│   └── Front-End_Technical_Assessment.pdf
├── .husky/                 # pre-commit (npm test), commit-msg (commitlint)
├── commitlint.config.js
├── vite.config.ts
└── package.json
```

### Folder Responsibilities


| Folder           | Responsibility                                            |
| ---------------- | --------------------------------------------------------- |
| `src/core/`      | Cross-cutting infrastructure not tied to a single feature |
| `src/features/`  | Domain modules; primary unit of organization              |
| `src/pages/`     | Route-level shells that compose features                  |
| `src/store/`     | Global Zustand stores shared across features              |
| `src/ui/`        | Reusable, feature-agnostic UI primitives                  |
| `src/styles/`    | Global CSS variables and base styles                      |
| `public/Models/` | GLTF/GLB 3D assets loaded at runtime                      |
| `public/Images/` | Static fallback and decorative images                     |


---

## Design Patterns

Only patterns with direct evidence in the codebase are documented below.

### Result Pattern


|                |                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Purpose**    | Represent success/failure without throwing exceptions in the data layer                                             |
| **Benefits**   | Explicit error handling; composable with `isErr`/`isOk`; consistent toast integration                               |
| **Trade-offs** | Verbose call sites; not used uniformly (EmailJS form uses try/catch)                                                |
| **Location**   | `src/core/api/result.ts`, consumed by `httpClient`, all Strapi services, feature hooks, and `deviceCapabilities.ts` |


### Mapper Pattern (inline)


|                |                                                                                                                                                                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**    | Transform Strapi API response shapes into frontend domain contracts                                                                                                                                                                             |
| **Benefits**   | Decouples UI from CMS schema; normalizes optional fields and media URLs                                                                                                                                                                         |
| **Trade-offs** | Mappers are inline in services rather than centralized; skills mapping lives in the hook instead of the service                                                                                                                                 |
| **Location**   | `about.service.ts` (`mapAboutResponse`), `projects.service.ts` (`mapProjectResponse`), `fetchProductsPageContent.service.ts` (`mapProductsPageResponse`), `fetchFakeProducts.service.ts` (inline `.map()`), `useSkills.ts` (`mapSkillResponse`) |


### Custom Hooks Pattern


|                |                                                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**    | Encapsulate data-fetching, side effects, and derived state away from JSX                                                     |
| **Benefits**   | Testable logic; reusable across components; aligns with React conventions                                                    |
| **Trade-offs** | `useSkills` combines fetching, mapping, and grouping — higher hook complexity                                                |
| **Location**   | `src/features/*/hooks/`, `src/ui/hooks/`, `src/core/performance/useDeviceCapabilities.ts`, `src/features/3d-scene/**/hooks/` |


### Repository-like Service Pattern


|                |                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------ |
| **Purpose**    | Single-responsibility modules that encapsulate remote data access                          |
| **Benefits**   | Hooks depend on named functions (`fetchAbout`, `fetchProjects`) rather than raw HTTP calls |
| **Trade-offs** | No formal repository interface; services are plain async functions                         |
| **Location**   | `src/features/*/services/` (6 service files)                                               |


### Zustand State Pattern


|                |                                                                                 |
| -------------- | ------------------------------------------------------------------------------- |
| **Purpose**    | Minimal global state with selector-based subscriptions                          |
| **Benefits**   | Low boilerplate; fine-grained re-renders via selectors; no Provider nesting     |
| **Trade-offs** | No middleware or persistence layer observed; stores are module-level singletons |
| **Location**   | `src/store/*.ts`                                                                |


### Composition Pattern


|                |                                                                                      |
| -------------- | ------------------------------------------------------------------------------------ |
| **Purpose**    | Assemble complex UI from smaller, focused components                                 |
| **Benefits**   | `PortfolioPage` composes loading, navigation, canvas, and scene layers independently |
| **Trade-offs** | Deep component trees in the 3D stack                                                 |
| **Location**   | `PortfolioPage.tsx`, `SceneOrchestrator.tsx`, `App.tsx`                              |


### Adapter Pattern (UI-only)


|                |                                                                                       |
| -------------- | ------------------------------------------------------------------------------------- |
| **Purpose**    | Transform domain data for a specific UI library constraint                            |
| **Benefits**   | Isolates slick-carousel padding logic from project data                               |
| **Trade-offs** | Single occurrence; not a generalized adapter layer                                    |
| **Location**   | `ProjectSlider.tsx` (`projectsAdapter` — pads slider with empty placeholder projects) |


### Factory Pattern (limited)


|                |                                                              |
| -------------- | ------------------------------------------------------------ |
| **Purpose**    | Construct typed error objects with consistent shape          |
| **Benefits**   | Centralized error creation with code, message, status, cause |
| **Trade-offs** | Used for errors only, not general object creation            |
| **Location**   | `src/core/api/errors.ts` (`createAppError`)                  |


### Strategy Pattern (performance tiering)


|                |                                                                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**    | Select rendering quality based on detected device capabilities                                                                          |
| **Benefits**   | GPU tier drives environment presets, canvas DPR, bloom, and slider animations                                                           |
| **Trade-offs** | Tier resolution depends on browser APIs with limited fallback documentation                                                             |
| **Location**   | `src/core/performance/deviceCapabilities.ts`, `src/core/constants/environmentConfig.ts`, `useCanvasDpr.ts`, `useEnvironmentSettings.ts` |


---

## Technical Decisions

Decisions inferred from implementation evidence (not speculative intent).

### React + TypeScript


|                    |                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| **Why (inferred)** | Strict typing on API contracts, hook returns, and 3D props; `tsconfig.app.json` enables `strict: true` |
| **Benefits**       | Compile-time safety; self-documenting DTOs and domain types                                            |
| **Trade-offs**     | Higher upfront type maintenance; some casts remain (e.g., `type as SkillType` in `useSkills`)          |


### React Three Fiber over raw Three.js


|                    |                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| **Why (inferred)** | Declarative scene graph; `@react-three/drei` provides Html overlays, GLTF loading, camera controls |
| **Benefits**       | Integrates 3D with React lifecycle; `ScreenHtml` bridges DOM UI onto 3D monitors                   |
| **Trade-offs**     | React/Three state boundary must be managed carefully to avoid re-render cost                       |


### Zustand over Context/Redux


|                    |                                                                                 |
| ------------------ | ------------------------------------------------------------------------------- |
| **Why (inferred)** | Small number of focused global stores; selector pattern avoids Provider nesting |
| **Benefits**       | Minimal API surface; used for navigation, scene focus, theme, toasts            |
| **Trade-offs**     | No devtools or persistence configuration observed                               |


### Feature-driven structure


|                    |                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| **Why (inferred)** | Documented in `.cursor/rules/rules.mdc` and `docs/MIGRATION_PLAN.md`; 11 isolated feature folders |
| **Benefits**       | Clear ownership boundaries; colocated tests under `__tests__/`                                    |
| **Trade-offs**     | Some cross-feature imports through orchestration layer                                            |


### DTO mapping at the service layer


|                    |                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **Why (inferred)** | Separate `*ApiResponse` and `*Content` types per feature                                  |
| **Benefits**       | UI consumes stable domain shapes; Strapi schema quirks isolated (e.g., `Title` → `title`) |
| **Trade-offs**     | Inconsistent placement — skills mapping occurs in the hook, not the service               |


### Custom hooks for data hydration


|                    |                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------- |
| **Why (inferred)** | Project rules mandate no try/catch in UI; hooks evaluate `Result` and dispatch toasts |
| **Benefits**       | Uniform loading/error/unmount-cleanup pattern across About, Projects, Skills, Contact |
| **Trade-offs**     | Repeated hook boilerplate across features                                             |


### Modular CSS (no Tailwind)


|                    |                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| **Why (inferred)** | Each component/feature has colocated `.css` or `.module.css`; global variables in `globals.css` |
| **Benefits**       | Preserves legacy visual metrics; scoped styles via CSS Modules where used                       |
| **Trade-offs**     | No utility-first rapid prototyping; CSS spread across many files                                |


### GET-only HttpClient


|                    |                                                                |
| ------------------ | -------------------------------------------------------------- |
| **Why (inferred)** | Frontend is read-only for CMS; writes handled by EmailJS SDK   |
| **Benefits**       | Simple, typed fetch wrapper returning `Result<T, AppError>`    |
| **Trade-offs**     | No POST/PUT/DELETE abstraction for future backend integrations |


---

## State Management Strategy

### Local State

- **React `useState`** — form inputs, loading flags, slider indices, component-level UI state
- **Examples:** `Form.tsx` (submit loading/success), `useSkills` (`activeIndex`), feature loading states in data hooks

### Global State (Zustand)


| Store             | State Owned                                                                   | Consumers                                        |
| ----------------- | ----------------------------------------------------------------------------- | ------------------------------------------------ |
| `navigationStore` | Cancel/menu button visibility, menu view, float buttons, selected menu option | Navigation overlay, loading flow, menu screen    |
| `sceneStore`      | Active camera focus (`PortfolioView`), GPU tier, character animation flag     | Camera controller, scene orchestrator, 3D models |
| `themeStore`      | Scene theme (`Dark` / `Light`)                                                | Scene environment, floating menu                 |
| `toastStore`      | Toast queue, show/dismiss/clear                                               | All features on API errors; contact form errors  |


### State Ownership Strategy


| Data                                           | Owner                                                               |
| ---------------------------------------------- | ------------------------------------------------------------------- |
| CMS content (about, projects, skills, contact) | Feature hooks (local state) — fetched on mount, not cached globally |
| 3D navigation & camera focus                   | `sceneStore` + `navigationStore`                                    |
| Device GPU tier                                | Detected via `useDeviceCapabilities`, synced into `sceneStore`      |
| Theme preference                               | `themeStore`                                                        |
| User notifications                             | `toastStore`                                                        |


### React vs. Three.js Boundary

`useFrame` is used only in `useCharacterEyeDissolve.ts` for material interpolation. GPU tier and camera focus flow through Zustand into the 3D layer rather than triggering React state updates inside the render loop.

---

## Data Hydration Layer

### API Communication

```
Feature Hook → Feature Service → HttpClient.get() → Strapi / External API
                     ↓
              Result<T, AppError>
                     ↓
         isErr? → toastStore.showError()
              → setState with domain data
```

- **Singleton client:** `httpClient` configured with `VITE_API_BASE_URL` and Bearer `VITE_API_TOKEN`
- **Secondary client:** `fetchFakeProducts.service.ts` creates a dedicated `HttpClient` for `https://fakestoreapi.com`

### DTO Contracts

Each CMS feature defines paired types:


| Feature       | API Type                  | Domain Type           |
| ------------- | ------------------------- | --------------------- |
| About         | `AboutApiResponse`        | `AboutContent`        |
| Projects      | `ProjectApiResponse`      | `ProjectContent`      |
| Skills        | `SkillApiResponse`        | `SkillContent`        |
| Contact       | `ContactApiResponse`      | `ContactContent`      |
| Products page | `ProductsPageApiResponse` | `ProductsPageContent` |


Strapi responses are wrapped in `StrapiResponse<T>` (`{ data: T }`) from `src/core/types/strapi.ts`.

### Mapping Strategy

- **Service-level mapping:** About, Projects, Products page, FakeStore products
- **Hook-level mapping:** Skills (`mapSkillResponse` in `useSkills.ts`) plus grouping/chunking into `SkillGroup[]`
- **Pass-through:** Contact (identical API and domain shapes)

Media URLs are resolved via `resolveStrapiMediaUrl()` in `src/core/lib/strapiMedia.ts`, with fallback to `/Images/placeholder.png`.

### Separation from UI

Components do not call `fetch` directly for CMS data. They consume hooks that return typed state. Exception: `Form.tsx` calls EmailJS directly for form submission.

---

## API Contracts

All endpoints discovered in the codebase. Base URL for Strapi requests: `VITE_API_BASE_URL`.

### Strapi CMS (via `httpClient`)


| Endpoint                                                                        | Service                      | Response Domain Type                  |
| ------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------- |
| `GET /about?populate[image][fields][0]=url`                                     | `fetchAbout()`               | `AboutContent`                        |
| `GET /projects?populate[thumbnail][fields][0]=url`                              | `fetchProjects()`            | `readonly ProjectContent[]`           |
| `GET /skills?populate[icon][fields][0]=url`                                     | `fetchSkills()`              | `SkillApiResponse[]` (mapped in hook) |
| `GET /contact`                                                                  | `fetchContact()`             | `ContactContent`                      |
| `GET /product?populate[banner]…&populate[bannerMobile]…&populate[footerLinks]…` | `fetchProductsPageContent()` | `ProductsPageContent`                 |


**Authentication:** Bearer token via `VITE_API_TOKEN` header on all Strapi requests.

### External API


| Endpoint                                | Service               | Response Domain Type          |
| --------------------------------------- | --------------------- | ----------------------------- |
| `GET https://fakestoreapi.com/products` | `fetchFakeProducts()` | `readonly FakeStoreProduct[]` |


### Contact Form (EmailJS — not HttpClient)


| Integration | Details                                                       |
| ----------- | ------------------------------------------------------------- |
| SDK         | `@emailjs/browser`                                            |
| Init        | `emailjs.init(VITE_PUBLIC_KEY)`                               |
| Send        | `emailjs.sendForm(VITE_SERVICE_ID, "template_fybb9nr", form)` |
| Form fields | `email_id`, `message`                                         |


### Domain Contract Summaries

**AboutContent:** `name`, `age` (string), `role`, `description`, `imageUrl`

**ProjectContent:** `id`, `title`, `tags`, `description`, `link`, `image`

**SkillContent:** `id`, `name`, `type`, `imageUrl`, `points`, `y`

**ContactContent:** `gitHubUrl`, `emailUrl`, `whatsAppUrl`, `linkedinUrl`

**ProductsPageContent:** `title`, `description`, `footerTitle`, `bannerUrl`, `bannerMobileUrl`, `footerLinks`

**FakeStoreProduct:** `id`, `title`, `price`, `description`, `category`, `image`, `rating`

---

## Mobile-First 3D Strategy

There is **no separate mobile 3D route or reduced model set**. Responsiveness is achieved through viewport-driven configuration:

### Camera Adaptation

- `getCameraControls(viewportWidth)` and `getInitialCameraLookAt(viewportWidth)` in `src/core/constants/cameraControls.ts` interpolate camera positions/targets across breakpoints (768px, 1024px, 1440px).
- `useCameraNavigation` reapplies controls on window resize.

### Canvas Responsiveness

- `useEvenCanvasSize` — rounds window dimensions to even pixels for WebGL compatibility.
- `useCanvasDpr` — DPR 2 when GPU tier is 3, otherwise DPR 1 (not width-based).

### Overlay Systems

- **DOM HUD (outside canvas):** `NavigationOverlay` — cancel button, floating menu, move tutorial.
- **3D HTML overlays:** `ScreenHtml` wraps `@react-three/drei` `Html` for monitor content; `FloatButton` for in-scene navigation hotspots.

### Performance Tiering (device-adaptive)

- `detect-gpu` determines raw GPU tier; battery status may downgrade tier when not charging.
- Tier affects: environment presets, bloom intensity, canvas DPR, projects slider animation (enabled when `gpuTier >= 3`), low-res card backgrounds.

### Mobile UX Adaptations (observed)

- Loading screen CSS includes `@media (max-width: 767px)` rules (`LoadingScreen.css`).
- Products page banner uses `<source media="(max-width: 767px)">` for mobile image (`ProductsPageHead.tsx`).
- `ZoomDisablerWrapper` prevents pinch-zoom globally.

---

## Performance Considerations


| Technique                     | Evidence                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------- |
| **GPU tiering**               | `detect-gpu` + battery-aware downgrade → `sceneStore.gpuTier`                     |
| **Adaptive DPR**              | `useCanvasDpr` — tier 3 gets DPR 2                                                |
| **Environment quality tiers** | `environmentTier1/2/3` presets in `environmentConfig.ts`                          |
| **GLTF preloading**           | `useGLTF.preload()` in model files; `<Preload all />` in `PortfolioPage`          |
| **Suspense boundaries**       | `AppShell` wraps canvas children with `fallback={null}`                           |
| **Visibility gating**         | `useSceneVisibility`, conditional rendering in `Projects3D`, intro sequence flags |
| **Frustum culling override**  | `frustumCulled={false}` on character eye meshes (prevents incorrect culling)      |
| **useFrame isolation**        | Only `useCharacterEyeDissolve` uses `useFrame` (material lerp, no React setState) |
| **useMemo**                   | `useEnvironmentSettings` memoizes environment configuration                       |
| **useCallback**               | Heavy use in `useCameraNavigation`                                                |


**Not observed:** `React.lazy` / dynamic `import()` for code splitting; service worker; image lazy-loading beyond browser defaults.

---

## Scalability Considerations

### Feature Extensibility

Adding a new CMS-backed portfolio section follows a repeatable path: types → service → hook → component → (optional) 3D screen wrapper in `SceneOrchestrator`.

### CMS Extensibility

Strapi populate queries are co-located in services. Schema changes require updating `*ApiResponse` types and mappers. The `StrapiResponse<T>` envelope and `resolveStrapiMediaUrl` utility are reusable.

### Architectural Scalability

- Feature folders prevent monolithic growth (contrast with legacy monolithic store documented in `MIGRATION_PLAN.md`).
- Multiple `HttpClient` instances can target different base URLs (demonstrated by FakeStore client).

### Maintainability Factors

- Strict TypeScript and Result pattern reduce unhandled error paths for API calls.
- Colocated tests and Cursor testing rules (`testing.mdc`) define a testing standard.
- Commitlint + Husky enforce conventional commits and pre-commit test runs.

---

## Development Setup

### Prerequisites

- Node.js (version compatible with Vite 8 and React 19)
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# EmailJS — Contact form submission
VITE_PUBLIC_KEY=
VITE_SERVICE_ID=

# Strapi CMS — content API
VITE_API_BASE_URL=
VITE_API_TOKEN=
```

#### Local Strapi

```env
VITE_API_BASE_URL=http://localhost:1337
VITE_API_TOKEN=<your-local-strapi-api-token>
```

Intended for local development when running a Strapi instance alongside the frontend.

#### Hosted Strapi (demonstration)

```env
VITE_API_BASE_URL=https://competent-action-988b45f768.strapiapp.com
VITE_API_TOKEN=<provided-api-token>
```

- Available for demonstration without a local Strapi instance.
- Response times may be slower than local execution.
- Functionality remains operational when credentials are configured.

> **Note:** The codebase uses `VITE_API_BASE_URL` (not `VITE_API_URL`). Media URL resolution in `strapiMedia.ts` additionally references `STRAPI_API_BASE_URL` with a fallback to `http://localhost:1337`; this variable is not declared in `vite-env.d.ts` or `.env.example`.

---

## Development Commands


| Command           | Purpose                                    |
| ----------------- | ------------------------------------------ |
| `npm install`     | Install project dependencies               |
| `npm run dev`     | Start Vite development server with HMR     |
| `npm run build`   | Type-check (`tsc -b`) and production build |
| `npm run preview` | Serve the production build locally         |
| `npm run test`    | Run Vitest test suite once (`vitest run`)  |
| `npm run lint`    | Run ESLint across the project              |


> **Note:** `test:coverage` is **not currently defined** in `package.json`. Coverage tooling is not installed. To add coverage, install `@vitest/coverage-v8` and add a script.

---

## Testing Strategy

### Stack


| Tool                      | Role                                         |
| ------------------------- | -------------------------------------------- |
| Vitest ^4.1.7             | Test runner (configured in `vite.config.ts`) |
| jsdom                     | Browser environment simulation               |
| @testing-library/react    | `renderHook`, `waitFor`                      |
| @testing-library/jest-dom | DOM assertion matchers                       |


### Configuration

- Setup file: `src/setupTests.ts`
- Test glob: `src/**/*.{test,spec}.{js,ts,jsx,tsx}`
- Globals enabled; `passWithNoTests: true`

### Organization

Tests are colocated under feature `__tests__/` folders per `.cursor/rules/testing.mdc`:

```
src/features/about/__tests__/useAbout.test.ts
src/features/projects/__tests__/useProjects.test.ts
```

### Coverage Approach (documented standard)

`.cursor/rules/testing.mdc` defines priorities:

1. Domain mappers and services
2. Custom hooks
3. Complex UI behavior
4. Pure presentation components

### Current Maturity


| Area               | Status                             |
| ------------------ | ---------------------------------- |
| Hook tests         | 2 files (About, Projects)          |
| Service tests      | None                               |
| Mapper tests       | None                               |
| Component tests    | None                               |
| CI pipeline        | None (local Husky pre-commit only) |
| Coverage reporting | Not configured                     |


### Pre-commit Gate

`.husky/pre-commit` runs `npm test` before every commit.

---

## Commit Convention

The project enforces **Conventional Commits** with mandatory scopes.

### Tooling


| Tool                                     | Role                                 |
| ---------------------------------------- | ------------------------------------ |
| `@commitlint/config-conventional`        | Base rule set                        |
| `commitlint.config.js`                   | Custom scope/subject/header rules    |
| `.husky/commit-msg`                      | Validates commit messages on commit  |
| Commitizen (`@commitlint/cz-commitlint`) | Interactive commit prompt (`npx cz`) |


### Rules


| Rule    | Requirement                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| Scope   | Required, kebab-case, 2–30 characters                                                        |
| Subject | 10–72 characters, no trailing period, imperative mood                                        |
| Header  | 20–100 characters total                                                                      |
| Types   | `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert` |


### Examples

```
feat(about): add useAbout hook tests
fix(3d-scene): correct camera position on mobile viewports
docs(readme): document Strapi API contracts
test(projects): cover error toast on fetch failure
chore(deps): update react-three-fiber to 9.6.1
```

Scopes are free-form kebab-case strings (e.g., `about`, `3d-scene`, `core-api`, `ui-toast`).

---

## Future Roadmap

### Existing Functionality

- Feature-driven architecture with 11 domain modules
- 3D portfolio experience with GLTF models and HTML-in-3D overlays
- Strapi CMS integration for About, Projects, Skills, Contact, Products page
- FakeStore API integration for products catalog
- GPU-adaptive performance tiering
- Responsive camera controls across viewport breakpoints
- Light/Dark 3D environment toggle
- Contact form via EmailJS
- Conventional commit enforcement with Husky
- Hook unit tests for About and Projects

### Future Opportunities

- Expand unit test coverage (services, mappers, remaining hooks, critical UI)
- Add CI pipeline (GitHub Actions or equivalent)
- Configure test coverage reporting (`test:coverage` script)
- Migrate EmailJS to a backend-controlled endpoint (see [TODO](#todo))
- Add route-level code splitting (`React.lazy`)
- Align skills mapping into the service layer for consistency
- Complete `vite-env.d.ts` declarations for all env vars used in code
- Resolve `globals.css` comment ("Dark-only theme v1") vs. functional Light theme toggle
- Implement systematic accessibility audit (keyboard nav for 3D float buttons, ARIA on Html overlays)

---

## Technical Audit Report

### Strengths


| Area                       | Observation                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------- |
| **Architecture**           | Clear feature-driven layout with separated core, UI, store, and page layers           |
| **Type safety**            | Strict TypeScript; explicit API/domain type pairs per feature                         |
| **Error handling**         | Consistent Result pattern for HTTP and device capability detection                    |
| **Separation of concerns** | Data hooks isolate fetching from presentation; services isolate HTTP from UI          |
| **3D/React boundary**      | GPU tier and camera state in Zustand; minimal `useFrame` usage without React setState |
| **Performance awareness**  | GPU tiering, adaptive DPR, environment presets, asset preloading                      |
| **Commit hygiene**         | Conventional commits with mandatory scopes; pre-commit test gate                      |
| **Documentation culture**  | Cursor rules (`rules.mdc`, `testing.mdc`), migration plan, testing standards defined  |
| **Responsive 3D**          | Viewport-interpolated camera controls with resize handling                            |


### SOLID Principles (evidence-based)


| Principle                 | Evidence                                                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Single Responsibility** | Feature modules own one domain; stores split navigation/scene/theme/toast; services perform one fetch each |
| **Open/Closed**           | `HttpClient` accepts config for different base URLs; environment presets extend via tier constants         |
| **Liskov Substitution**   | Limited inheritance hierarchy; not a primary design axis in this codebase                                  |
| **Interface Segregation** | Zustand stores expose focused slices; hooks return minimal state shapes                                    |
| **Dependency Inversion**  | Hooks depend on service functions and store selectors, not raw `fetch` or DOM APIs                         |


### Risks


| Risk                               | Detail                                                                       |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| **Client-side secrets**            | EmailJS keys and Strapi bearer token exposed via `VITE_`* env vars           |
| **No CI/CD**                       | Tests run only locally via Husky; no automated pipeline detected             |
| **Low test coverage**              | Only 2 hook test files; no service, mapper, or component tests               |
| **Inconsistent mapping layer**     | Skills mapping in hook vs. services for other features                       |
| **EmailJS outside Result pattern** | Contact form uses try/catch while project rules mandate Result for API calls |
| **Single HTTP method**             | `HttpClient` implements GET only; future write operations require extension  |
| **Hardcoded EmailJS template**     | `"template_fybb9nr"` embedded in component source                            |


### Missing Best Practices


| Practice                          | Status                                                                     |
| --------------------------------- | -------------------------------------------------------------------------- |
| CI/CD pipeline                    | Not configured                                                             |
| Test coverage reporting           | Not configured                                                             |
| Error boundary components         | Not observed                                                               |
| Route-level code splitting        | Not observed                                                               |
| Centralized env type declarations | `VITE_API_TOKEN` and `STRAPI_API_BASE_URL` used but not in `vite-env.d.ts` |
| API response caching              | Not implemented (hooks fetch on every mount)                               |
| E2E tests                         | Not present                                                                |
| `.gitignore` coverage output      | No `coverage/` entry                                                       |


### Technical Debt


| Item                                | Location                                     | Impact                                                                      |
| ----------------------------------- | -------------------------------------------- | --------------------------------------------------------------------------- |
| Skills mapping in hook, not service | `useSkills.ts`                               | Inconsistent data layer; harder to unit test mapping in isolation           |
| Duplicate Contact types             | `contact.type.ts`                            | `ContactApiResponse` identical to `ContactContent`                          |
| Env var inconsistency               | `strapiMedia.ts` vs `.env.example`           | `STRAPI_API_BASE_URL` undocumented; media URLs may not match API base       |                                  |
| Legacy migration incomplete         | `docs/MIGRATION_PLAN.md`                     | Marked as planning-only; some globals.css comments reference "v1" dark-only |
| `PortfolioPage` internal name       | `PortfolioPage.tsx` exports `App` as default | Naming inconsistency                                                        |


### Scalability Risks


| Risk                           | Detail                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------- |
| **Monolithic 3D orchestrator** | `SceneOrchestrator` couples all screen features; growing sections increase composition complexity |
| **No data caching**            | Repeated mount/unmount of features re-fetches CMS content                                         |
| **GLB asset size**             | All models preloaded; no progressive/lazy model loading observed                                  |
| **Global canvas**              | Single R3F Canvas for entire portfolio; no route-based 3D teardown except `/products`             |


### Security Observations


| Observation                 | Detail                                                                                                          |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Bearer token in client      | `VITE_API_TOKEN` sent from browser; acceptable for read-only public content but limits token scope requirements |
| EmailJS public key exposure | Expected for EmailJS client SDK; spam/abuse risk without server-side rate limiting                              |
| No input sanitization layer | Contact form relies on EmailJS; no observed XSS sanitization beyond React defaults                              |
| External API call           | FakeStore API called directly from browser (public API, low risk)                                               |
| `.env` gitignored           | Correctly excluded from version control                                                                         |


### Accessibility Observations


| Observation           | Detail                                                                              |
| --------------------- | ----------------------------------------------------------------------------------- |
| Partial ARIA coverage | Toast (`role="alert"`), some buttons (`aria-label`), semantic HTML on products page |
| 3D float buttons      | `FloatButton` uses `<div onClick>` without keyboard support or `aria-label`         |
| Generic alt text      | About image uses `alt="IconAbout"`                                                  |
| ScreenHtml focus      | Default `tabIndex={0}` on 3D HTML overlays                                          |
| No skip navigation    | Not observed                                                                        |
| Color scheme          | `color-scheme: dark` set globally; theme toggle affects 3D environment              |


### Testing Gaps


| Gap                                               | Priority |
| ------------------------------------------------- | -------- |
| No service layer tests                            | High     |
| No mapper tests                                   | High     |
| `useSkills`, `useContact`, product hooks untested | High     |
| No component/integration tests                    | Medium   |
| No E2E tests for 3D navigation flow               | Medium   |
| No coverage thresholds enforced                   | Medium   |
| No CI to enforce tests on PRs                     | Medium   |


---

## TODO

### High Priority

- **Migrate email delivery from client-side EmailJS to a backend-controlled solution** (Strapi custom controller, serverless function, or dedicated backend endpoint) to improve security, enable rate limiting, and prevent exposing email integration credentials on the client.
- Add unit tests for remaining data hooks: `useSkills`, `useContact`, `useProductsPageCms`, `useProductsCatalog`.
- Add unit tests for service layer functions and mappers (About, Projects, Skills, Products).
- Declare all environment variables in `vite-env.d.ts` and `.env.example` (`VITE_API_TOKEN`, `STRAPI_API_BASE_URL`).
- Set up CI pipeline to run `npm test` and `npm run lint` on pull requests.

### Medium Priority

- Move skills mapping (`mapSkillResponse`) from `useSkills.ts` into `skills.service.ts` for consistency with other features.
- Add `test:coverage` script with `@vitest/coverage-v8` and document coverage thresholds.
- Extract hardcoded EmailJS template ID (`template_fybb9nr`) to an environment variable.
- Add React error boundaries around the 3D canvas and route-level shells.
- Implement keyboard accessibility and ARIA labels for `FloatButton` 3D navigation hotspots.
- Add `coverage/` to `.gitignore`.

### Low Priority

- Introduce route-level code splitting with `React.lazy` for `/products`.
- Consolidate duplicate Contact API/Content types or document intentional pass-through.
- Rename default export in `PortfolioPage.tsx` from `App` to `PortfolioPage` for clarity.
- Align `globals.css` documentation with functional Light/Dark theme support.
- Add E2E tests for critical user flows (loading → navigation → section view).

---

## AI Usage

AI tools were used as engineering assistants throughout the project lifecycle. All architectural decisions, implementation reviews, validations, and final integrations remained under developer control.

### AI Tools Used


| Tool              | Primary Role                                                                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cursor**        | Primary IDE-integrated AI agent for code generation, refactoring, TypeScript migration, documentation, and test implementation under developer supervision |
| **ChatGPT**       | Prompt engineering, architectural discussions, trade-off analysis, documentation planning, and phased development planning                                 |
| **Google Gemini** | Prompt refinement, technical questions, implementation strategy review, and documentation planning                                                         |
| **Claude**        | Focused support for specific files, alternative implementation proposals, refactoring suggestions, and bug fixing                                          |


### Development Workflow

AI participation was structured by responsibility rather than by autonomous execution:

```
┌──────────────────────────────────────────────────────────────────┐
│  Planning & Architecture (ChatGPT, Gemini)                       │
│  Prompt design · trade-offs · phased plans · strategy review       │
├──────────────────────────────────────────────────────────────────┤
│  Implementation (Cursor, Claude)                                 │
│  Code generation · refactoring · migration · bug fixes           │
├──────────────────────────────────────────────────────────────────┤
│  Validation (Developer)                                            │
│  Review · adjust · validate · integrate                          │
└──────────────────────────────────────────────────────────────────┘
```

**ChatGPT and Gemini** were used for:

- Prompt engineering and prompt refinement
- Architectural discussions and trade-off analysis
- General technical questions
- Documentation planning
- Review of implementation strategies
- Assistance in defining phased development plans

**Cursor** was used for:

- Code generation under developer supervision
- Refactoring assistance
- TypeScript migration support
- Architecture enforcement through project-specific rules
- Documentation generation
- Test implementation assistance

**Claude** was used for:

- Focused support for specific code files
- Alternative implementation proposals
- Refactoring suggestions
- Bug fixing and code review assistance

### Prompt Files and Rules

The repository contains AI-related project guidance used to constrain and direct agent behavior:


| Path                               | Purpose                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------------- |
| `.cursor/rules/rules.mdc`          | Architecture standards, TypeScript conventions, design patterns, folder structure     |
| `.cursor/rules/testing.mdc`        | Testing stack, hook/service testing standards, coverage priorities, test organization |     |
| `docs/promts/readme_promt.md`      | Structured prompt for architecture audit and README generation                        |                         |
| `docs/migration/MIGRATION_PLAN.md` | Migration planning artifact (companion copy)                                          |


The `.cursor/rules/` directory provided persistent guidance to the Cursor agent across sessions, covering architecture standards, TypeScript conventions, testing standards, refactoring guidelines, and feature-driven organization.

### AI-Assisted Architecture Decisions

AI contributed to discussions and validation around architectural choices that are reflected in the current codebase:

- Feature-driven architecture organization (`src/features/`)
- Separation between DTOs (`*ApiResponse`) and domain contracts (`*Content`)
- Service and mapper layers for Strapi data
- Custom hook extraction for data-fetching lifecycle
- State management organization using Zustand (`src/store/`)
- TypeScript strict-mode adoption (`tsconfig.app.json`)
- Project modularization strategies (core, ui, store, pages layers)

These decisions were discussed with AI tooling and validated by the developer before integration.

### AI-Assisted Refactoring

AI supported the modernization and restructuring of frontend functionality, helping identify opportunities for:

- Improved type safety across API contracts and hooks
- Better separation of concerns (hooks vs. components vs. services)
- Hook extraction from legacy monolithic patterns
- Service abstraction over raw HTTP calls
- Feature isolation aligned with the migration plan in `docs/MIGRATION_PLAN.md`

All refactoring outputs were reviewed and validated before being accepted into the codebase.

### AI-Assisted Testing

AI assisted with testing infrastructure and implementation:

- Vitest configuration guidance (`vite.config.ts`)
- React Testing Library setup (`src/setupTests.ts`)
- Test strategy definition (`.cursor/rules/testing.mdc`)
- Hook testing implementation (`useAbout.test.ts`, `useProjects.test.ts`)
- Coverage improvement recommendations (documented in audit and TODO sections)

### AI-Assisted Documentation

AI was used to support documentation artifacts in this repository:

- README generation and technical audit (this document)
- Architecture documentation and directory mapping
- Development planning artifacts (`docs/MIGRATION_PLAN.md`)
- Audit report generation (Strengths, Risks, Technical Debt, Testing Gaps)

### Validation Process

All AI-generated outputs followed a consistent review pipeline:

1. **Generate** — AI produces code, tests, or documentation based on prompts and project rules
2. **Review** — Developer inspects correctness, architecture alignment, and type safety
3. **Adjust** — Outputs are modified to match project conventions and requirements
4. **Validate** — Changes are verified through local builds, tests, and manual review
5. **Integrate** — Accepted changes are committed to the repository

No AI output was integrated without developer review and validation.