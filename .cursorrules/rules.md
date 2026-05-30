# Project Context: Dynamic 3D Portfolio

You are an expert software engineer specializing in React, TypeScript, Three.js (React Three Fiber), and Tailwind CSS. Your goal is to help migrate a static legacy JavaScript portfolio into a modern, dynamic, and strictly typed architecture[cite: 3].

## Tech Stack

- Frontend: React 18, Vite[cite: 33].
- 3D: Three.js, React Three Fiber (@react-three/fiber), @react-three/drei[cite: 33].
- State Management: Zustand[cite: 33].
- Styling: Tailwind CSS (with Light/Dark mode support)[cite: 47].
- Language: Strict TypeScript[cite: 47].

## Architecture & Folder Structure (Feature-Driven)

Organize the project by domains/features, not by technical file types[cite: 53].

- `src/core/`: Base configuration, HttpClient, Result Pattern, global utilities.
- `src/ui/`: Reusable base components (Buttons, Toasts, Modals, Layouts).
- `src/features/`: App domains (e.g., projects/, about/, skills/, 3d-scene/). Each feature must have its own components, hooks, and types[cite: 11].
- `src/store/`: Global Zustand stores (e.g., theme state, notifications)[cite: 13].
- `src/styles/`: Global Tailwind configuration and CSS variables.
- **No Unnecessary Barrel Files:** Do not create `index.ts` files inside internal folders (like individual feature subfolders, stores, or hooks) unless explicitly requested[cite: 278]. Prefer direct, explicit file-to-file imports to keep the codebase lightweight and highly indexable[cite: 278].

## Mandatory Design Patterns

- **Error Handling (Result Pattern):** NEVER use try/catch blocks inside React components or UI hooks[cite: 51]. All API calls must use the HttpClient from src/core/api which returns a Result<T, AppError>[cite: 35, 42]. In the UI, evaluate errors with if (isErr(result)) and dispatch an error Toast[cite: 46, 51].
- **Componentization:** Avoid files larger than 150-200 lines[cite: 47]. Separate business logic (custom hooks) from the view (JSX).
- **Design System (Tailwind):** Do not use plain CSS or .css files per component. Exclusively use Tailwind utility classes and CSS variables mapped in tailwind.config.js for theming[cite: 47].
- **3D Optimization:** Keep UI state (Zustand/React state) strictly SEPARATED from the 3D rendering loop[cite: 13]. Use useFrame for continuous animations, but NEVER update React state inside it to avoid FPS drops[cite: 28]. Reuse geometries and materials using useMemo.

## Strict TypeScript Rules

- **No `any`:** FORBIDDEN use of any[cite: 47]. If the exact type is unknown, use unknown or define an appropriate generic type.
- **Typing:** Infer types where obvious, but explicitly type component props, complex hook returns, and API contracts.

## Interaction Instructions

- **Propose structure:** Before writing code for a new feature, present a structure and data types proposal.
- **Ask before assuming:** If you encounter complex legacy JS code, ask me how I prefer to refactor it before making assumptions[cite: 58].

