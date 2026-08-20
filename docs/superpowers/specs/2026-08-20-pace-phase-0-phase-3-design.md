# PACE Phase 0 and Phase 3 Design

**Date:** 2026-08-20

**Status:** Approved in chat; awaiting review of this written specification

## Purpose

Establish the smallest reliable foundation for PACE, a personal running-coach progressive web application that answers:

> What should I run today, and how is my training progressing?

This work covers only Phase 0 product documentation and Phase 3 repository/tool setup. It does not build the PACE application shell, training features, persistence, or PWA runtime.

## Previous Repository State

The repository has no commits and contains no application source, package manifest, build configuration, or product documentation. Its only existing files are untracked local Codex and agent-support files under `.agents/`, `.codex/`, and `.impeccable/`.

Those support files are outside the PACE application and will not be changed, deleted, or added to project configuration by this phase.

## Product Documentation

Create these durable project documents:

- `docs/PRODUCT.md` defines the product statement, personal user, main problem, V1 objective, success criteria, and non-goals.
- `docs/FEATURES.md` separates V1, later, and explicitly excluded capabilities.
- `docs/USER-FLOW.md` records the onboarding-to-progress flow supplied in the request.
- `docs/ARCHITECTURE.md` describes current and future source structure, dependency direction, and the separation of training logic from React.
- `docs/ADS-USAGE.md` records the rules for using the Atlassian Design System without creating a parallel design system.

The documents will consistently define PACE as a personal-use product focused on a structured running plan and a clear workout for today.

## Technology Foundation

Use npm and configure:

- React 18 and React DOM 18
- TypeScript in strict mode
- Parcel as the application and production bundler
- React Router as the routing foundation
- Zustand as the future client-state dependency, without creating stores yet
- Dexie and Dexie React Hooks as future persistence dependencies, without opening IndexedDB or defining a schema yet
- Vitest for focused automated tests
- Playwright for browser-level verification
- ESLint with TypeScript, React, accessibility, and Atlassian Design System rules

Use the current compatible package releases available at installation time while retaining React 18 as the explicit framework major version.

## Atlassian Design System Integration

Install and configure only the ADS packages required by this phase:

- `@atlaskit/css-reset` for the ADS baseline stylesheet
- `@atlaskit/tokens` for themes and design tokens
- `@atlaskit/primitives` for token-backed layout and body text
- `@atlaskit/button` for the official Start button
- `@atlaskit/heading` for the semantic page heading
- `@atlaskit/eslint-plugin-design-system` for component, token, and deprecation guidance
- `@compiled/parcel-config` for the Parcel integration recommended by ADS

At application startup:

1. Import `@atlaskit/css-reset` once at the root.
2. Call `setGlobalTheme({})` from `@atlaskit/tokens` so the default automatic theme, spacing, and typography token themes are mounted on the document.
3. Render the application only after theme initialization has been requested.

Configure `.parcelrc` to extend Parcel's default configuration with `@compiled/parcel-config`. Configure `.compiledcssrc` to run `@atlaskit/tokens/babel-plugin`, extract styles, inline required CSS, and sort shorthand declarations.

Use compiled ADS entry points where current official examples prefer them:

- `@atlaskit/primitives/compiled`
- `@atlaskit/button/new`

No Tailwind, CSS framework, custom component library, custom design tokens, hard-coded palette, or replacement UI primitives will be introduced.

## Application Structure

Create only files needed to make the foundation runnable and testable:

```text
src/
├── app/
│   ├── App.tsx
│   └── router.tsx
├── pages/
│   └── ProofPage.tsx
├── index.html
└── index.tsx
```

Supporting test and tool configuration will live at the repository root or beside the code it verifies. Future folders for components, stores, database, repositories, services, types, and utilities will be documented in `docs/ARCHITECTURE.md` but will not be created empty.

Responsibilities:

- `src/index.tsx` owns global ADS setup and mounts React.
- `src/app/router.tsx` owns the route definitions.
- `src/app/App.tsx` provides the router to React.
- `src/pages/ProofPage.tsx` owns only the Phase 3 proof screen.

## Proof Screen

The only route in this phase is `/`. It renders a mobile-first semantic `main` region containing:

- A level-one heading: `PACE`
- Body copy: `Your personal running coach.`
- One primary official ADS button: `Start`

The button is intentionally non-navigational in this phase because onboarding is outside the approved scope. It exists only to prove the ADS component pipeline.

Use `Box` and `Stack` from ADS Primitives for the layout, the official Heading component for `h1`, and Text for the description. Styling is limited to supported ADS token-backed primitive properties. The screen will use a restrained, content-first ADS product presentation rather than introducing a separate visual language.

## Routing and Data Flow

The current runtime flow is:

```text
index.tsx
    ↓
App
    ↓
React Router
    ↓
ProofPage
```

The future application flow documented in `docs/ARCHITECTURE.md` is:

```text
React UI
    ↓
Zustand
    ↓
Repository / Service
    ↓
IndexedDB via Dexie
```

The future training flow is:

```text
Runner Profile + Running Goal + Schedule
                    ↓
              Training Engine
                    ↓
              Training Plan
                    ↓
                 Workouts
```

React components must never contain training-plan generation logic or direct IndexedDB access.

## Error Handling

The entry point will fail clearly if the expected root DOM element is absent rather than silently doing nothing. No error boundary, logging service, or custom error UI will be added because there is no feature workflow in this phase.

Build, type, lint, and browser errors will be fixed at their source. Rules will not be disabled merely to make verification pass.

## Testing Strategy

Behavioral implementation follows red-green-refactor:

1. Add a focused Vitest test that describes the root route and proof-screen contract before creating the corresponding production modules.
2. Run it and confirm it fails because the production implementation is absent.
3. Add the minimal router and proof page required to pass.
4. Add a Playwright test before completing browser behavior. It verifies the heading, description, and Start button at a narrow mobile viewport, direct loading of `/`, and absence of browser console errors.
5. Run the Playwright test against the Parcel development server and make the minimal changes required for it to pass.

Documentation and build-tool configuration are declarative artifacts and do not receive artificial unit tests. Their correctness is verified through linting, compilation, production bundling, and browser execution.

## Verification

Before completion, run:

- TypeScript type checking with `tsc --noEmit`
- ESLint across TypeScript and TSX source and configuration as applicable
- Vitest in non-watch mode
- Playwright for the proof-screen browser test
- Parcel production build

Manual/browser verification will confirm:

- The application loads at `/`.
- No console errors occur.
- The official ADS Button renders.
- ADS reset, theme attributes, token styles, and compiled styles are active.
- The layout remains usable at approximately 390 pixels wide.
- Direct loading of the root route succeeds.

## Scope Exclusions

Do not implement in this phase:

- The real Today screen or application navigation shell
- Runner profile or goal forms
- Zustand stores
- IndexedDB databases or Dexie schemas
- Training-plan generation or any training engine
- Workout logging, history, progress, or rescheduling
- A web app manifest or service worker
- Authentication, backend services, or cloud synchronization
- Telegram, Strava, Garmin, COROS, or Apple Health integrations
- Generative AI APIs or AI-generated training plans
- Payments, social features, public profiles, coaching, or nutrition

## Completion Boundary

This phase is complete when the documentation exists, the proof route runs with React 18 and ADS, and all verification commands pass without suppressed errors.

The next recommended task is:

> Build the static PACE app shell and navigation using ADS components and fake data.

That task will not begin without a separate instruction.
