# PACE Phase 0 and Phase 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Document PACE V1 and establish a verified React 18, TypeScript, Parcel, React Router, and Atlassian Design System foundation with one mobile-first proof screen.

**Architecture:** A small browser entry point initializes ADS theming and mounts a React Router application. The only current route renders an ADS-composed proof page; future Zustand, repository/service, and Dexie boundaries are documented but not implemented.

**Tech Stack:** React 18, TypeScript, Parcel, React Router, Zustand, Dexie, Atlassian Design System/Atlaskit, Vitest, Playwright, ESLint, npm, Git.

**Spec:** `docs/superpowers/specs/2026-08-20-pace-phase-0-phase-3-design.md`

## Global Constraints

- Work only on Phase 0 product documentation and Phase 3 repository/tool setup.
- Keep React and React DOM on major version 18.
- Use strict TypeScript and do not introduce `any`.
- Use the current compatible package releases available at installation time, except where a compatibility pin is explicitly shown.
- Use ADS components and token-backed ADS Primitives; do not recreate ADS components.
- Use `@atlaskit/primitives/compiled` and `@atlaskit/button/new` for the proof screen.
- The proof screen copy is exactly `PACE`, `Your personal running coach.`, and `Start`.
- Do not introduce Tailwind, another UI framework, a custom design system, hard-coded visual tokens, or custom replacement controls.
- Do not implement stores, IndexedDB schemas, training logic, PWA runtime, authentication, backend services, integrations, or AI APIs.
- Preserve the existing `.agents/`, `.codex/`, and `.impeccable/` support files unchanged.
- Do not commit automatically. Each task ends with a review checkpoint instead of a Git commit.

---

## File Map

### Product documentation

- `docs/PRODUCT.md`: product definition, V1 objective, success criteria, and non-goals.
- `docs/FEATURES.md`: V1, later, and not-now feature boundaries.
- `docs/USER-FLOW.md`: the supplied onboarding-to-progress flow.
- `docs/ARCHITECTURE.md`: current files, future layers, and dependency rules.
- `docs/ADS-USAGE.md`: enforceable ADS usage rules.

### Runtime

- `src/index.html`: Parcel HTML entry and React mount element.
- `src/index.tsx`: CSS reset, ADS theme initialization, root validation, and React mount.
- `src/app/App.tsx`: router provider.
- `src/app/router.tsx`: route table.
- `src/pages/ProofPage.tsx`: the only current screen.

### Tests and tooling

- `src/pages/ProofPage.test.tsx`: proof-screen component contract.
- `src/test/setup.ts`: Vitest DOM matcher setup.
- `tests/e2e/proof-screen.spec.ts`: mobile browser acceptance test.
- `package.json`, `package-lock.json`: dependencies and executable scripts.
- `tsconfig.json`: strict application and test type checking.
- `.parcelrc`, `.compiledcssrc`: ADS-recommended Parcel/Compiled pipeline.
- `.eslintrc.cjs`: TypeScript, React, accessibility, and ADS lint rules.
- `vitest.config.ts`, `playwright.config.ts`: automated test configuration.
- `.gitignore`: generated dependency, build, cache, coverage, and browser-test output.

---

### Task 1: Create Phase 0 Product Documentation

**Files:**

- Create: `docs/PRODUCT.md`
- Create: `docs/FEATURES.md`
- Create: `docs/USER-FLOW.md`
- Create: `docs/ARCHITECTURE.md`
- Create: `docs/ADS-USAGE.md`

**Interfaces:**

- Consumes: the approved design spec and the user's PACE scope.
- Produces: the durable product and architecture constraints used by every later task.

- [ ] **Step 1: Confirm the application area is still empty**

Run:

```bash
rg --hidden --files -g '!node_modules' -g '!dist' -g '!.git/**' . | sort
git status --short --branch
```

Expected: no `package.json` or `src/` tree exists; only the approved spec/plan plus pre-existing support files are present.

- [ ] **Step 2: Create `docs/PRODUCT.md`**

Write:

```markdown
# PACE Product

## Product statement

PACE is a personal running coach that provides a structured running plan and clearly shows what workout should be completed today.

## User

PACE V1 serves one runner using the application for personal training. It does not require an account or support multiple users.

## Main problem

Running plans are difficult to translate into a clear daily action. PACE should answer what to run today while making overall training progress understandable.

## V1 objective

Help one runner set a goal and availability, receive a structured rule-based plan, see today's workout, log completed runs, adjust the schedule, and review progress from locally persisted data.

## Success criteria

- The runner can understand today's workout without interpreting a full training calendar.
- The runner can complete the onboarding flow and generate a structured plan.
- Completed and rescheduled workouts remain available after closing the app.
- Training history and progress clearly reflect logged workouts.
- The application is usable on a phone and installable as a PWA.

## Non-goals

- Commercial accounts, payments, or subscriptions
- Social feeds, friends, or public profiles
- Human coaching, medical diagnosis, or nutrition guidance
- Cloud synchronization or third-party fitness integrations
- AI-generated training plans or generative AI APIs
```

- [ ] **Step 3: Create `docs/FEATURES.md`**

Write:

```markdown
# PACE Features

## V1

- Runner profile
- Running goal
- Running availability
- Rule-based training-plan generation
- Today workout
- Workout details
- Workout logging
- Training history
- Progress
- Rescheduling
- IndexedDB persistence
- Installable PWA

## Later

- Telegram
- Supabase
- Cloud sync
- Strava
- Garmin
- COROS
- Apple Health
- AI explanations

## Not now

- Payments
- Social feed
- Friends
- Public profiles
- Human coaching
- Nutrition
- AI-generated training plans
```

- [ ] **Step 4: Create `docs/USER-FLOW.md`**

Write:

````markdown
# PACE User Flow

PACE moves the runner from a small amount of setup to a clear daily workout and visible progress.

```text
Welcome
   ↓
Choose Goal
   ↓
Running Profile
   ↓
Choose Training Days
   ↓
Generate Plan
   ↓
Today
   ↓
Workout Details
   ↓
Complete Run
   ↓
Progress
```

The V1 experience stays focused on this primary path. Navigation and exception states will be designed in later phases.
````

- [ ] **Step 5: Create `docs/ARCHITECTURE.md`**

Write:

````markdown
# PACE Architecture

## Current foundation

Phase 3 contains only the browser entry point, router, and proof page needed to verify React, TypeScript, Parcel, and ADS.

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

## Future application structure

```text
src/
├── app/
├── components/
├── pages/
├── stores/
├── database/
├── repositories/
├── services/
├── types/
├── utils/
└── index.tsx
```

Folders should be created only when a real feature needs them.

## Dependency direction

```text
React UI
    ↓
Zustand
    ↓
Repository / Service
    ↓
IndexedDB via Dexie
```

React pages and components display state and translate user actions into calls. Zustand coordinates client state. Repositories and services isolate persistence and application operations. Dexie is the only layer that talks directly to IndexedDB.

## Training flow

```text
Runner Profile
      +
Running Goal
      +
Schedule
      ↓
Training Engine
      ↓
Training Plan
      ↓
Workouts
```

Training-plan generation is domain logic. It must never be placed directly inside React components or coupled to IndexedDB.

## Boundary rules

- UI components do not access IndexedDB directly.
- Training services do not import React.
- Repositories hide persistence details from stores and services.
- PACE-specific UI components compose ADS components and primitives.
- Shared folders are introduced only when more than one real consumer exists.
````

- [ ] **Step 6: Create `docs/ADS-USAGE.md`**

Write:

```markdown
# Atlassian Design System Usage

## Required system

The Atlassian Design System is PACE's required design system. PACE must not create a competing or parallel design system.

## Rules

1. Check whether ADS provides a component before creating UI.
2. Prefer the current official ADS component and documented import.
3. Use ADS design tokens as the visual source of truth for color, spacing, radius, elevation, typography, and motion.
4. Use ADS Primitives such as Box, Stack, Inline, Grid, Text, and MetricText for layout and composition where appropriate.
5. Build PACE-specific components as compositions of ADS building blocks, not replacements for standard controls.
6. Avoid deprecated Atlaskit APIs and keep the ADS ESLint rules enabled.
7. Do not introduce Tailwind CSS or another component/styling system unless the architecture is explicitly reconsidered later.

## Valid PACE compositions

- WorkoutCard
- TrainingDayRow
- WorkoutMetricGroup
- WeeklyProgressSummary
- TrainingStatusPanel

## Components PACE must not replace

- Buttons
- Inputs and selects
- Checkboxes and radios
- Progress indicators
- Modals and dropdowns
- Standard typography
- Standard form controls
```

- [ ] **Step 7: Validate documentation coverage**

Run:

```bash
rg -n "Product statement|Success criteria|Non-goals" docs/PRODUCT.md
rg -n "^## V1|^## Later|^## Not now" docs/FEATURES.md
rg -n "Welcome|Choose Goal|Complete Run|Progress" docs/USER-FLOW.md
rg -n "Zustand|Repository / Service|IndexedDB via Dexie|Training Engine" docs/ARCHITECTURE.md
rg -n "required design system|design tokens|Primitives|deprecated|Tailwind" docs/ADS-USAGE.md
git diff --check
```

Expected: every search returns the intended section and `git diff --check` reports no whitespace errors.

- [ ] **Step 8: Review checkpoint without committing**

Run:

```bash
git status --short
sed -n '1,260p' docs/PRODUCT.md docs/FEATURES.md docs/USER-FLOW.md docs/ARCHITECTURE.md docs/ADS-USAGE.md
```

Expected: only the five requested product documents are added by this task. Do not commit.

---

### Task 2: Configure React, TypeScript, Parcel, Tests, and ADS

**Files:**

- Create: `package.json`
- Create: `package-lock.json`
- Create: `.gitignore`
- Create: `tsconfig.json`
- Create: `.parcelrc`
- Create: `.compiledcssrc`
- Create: `.eslintrc.cjs`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/index.html`
- Create: `src/index.tsx`

**Interfaces:**

- Consumes: the ADS rules in `docs/ADS-USAGE.md`.
- Produces: npm scripts `start`, `build`, `test`, `test:e2e`, `typecheck`, and `lint`; a validated `#root` mount; initialized ADS themes; configured test runners for Task 3.

- [ ] **Step 1: Initialize the npm package**

Run:

```bash
npm init -y
npm pkg set name=pace version=0.1.0 type=module
npm pkg set private=true --json
npm pkg set scripts.start="parcel src/index.html"
npm pkg set scripts.build="parcel build src/index.html"
npm pkg set scripts.test="vitest run"
npm pkg set scripts.test:e2e="playwright test"
npm pkg set scripts.typecheck="tsc --noEmit"
npm pkg set scripts.lint="eslint . --ext .ts,.tsx"
```

Expected: `package.json` contains the six named scripts and `private` is the JSON boolean `true`.

- [ ] **Step 2: Install runtime dependencies**

Run:

```bash
npm install react@18 react-dom@18 react-router-dom zustand dexie dexie-react-hooks @atlaskit/css-reset @atlaskit/tokens @atlaskit/primitives @atlaskit/button @atlaskit/heading
```

Expected: npm completes without peer-dependency errors and React resolves to major version 18.

- [ ] **Step 3: Install development dependencies**

Run:

```bash
npm install --save-dev typescript parcel vitest @playwright/test @testing-library/react @testing-library/jest-dom jsdom @types/react@18 @types/react-dom@18 @types/node eslint@8.57.1 @typescript-eslint/parser@7.18.0 @typescript-eslint/eslint-plugin@7.18.0 eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y @atlaskit/eslint-plugin-design-system @compiled/parcel-config
```

Expected: npm completes without unresolved peer dependencies. ESLint is intentionally pinned to its final v8 release because the official ADS documentation supplies the legacy shared-config integration used below.

- [ ] **Step 4: Create `.gitignore`**

Write:

```gitignore
node_modules/
dist/
.parcel-cache/
coverage/
playwright-report/
test-results/
```

- [ ] **Step 5: Create `tsconfig.json`**

Write:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["node", "vitest/globals"]
  },
  "include": [
    "src",
    "tests",
    "vitest.config.ts",
    "playwright.config.ts"
  ]
}
```

- [ ] **Step 6: Create the ADS Parcel configuration**

Create `.parcelrc`:

```json
{
  "extends": ["@parcel/config-default", "@compiled/parcel-config"]
}
```

Create `.compiledcssrc`:

```json
{
  "transformerBabelPlugins": [["@atlaskit/tokens/babel-plugin"]],
  "extract": true,
  "inlineCss": true,
  "sortShorthand": true
}
```

- [ ] **Step 7: Create `.eslintrc.cjs`**

Write:

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    '@atlaskit/design-system',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@atlaskit/design-system/recommended',
  ],
  settings: {
    react: { version: 'detect' },
  },
  ignorePatterns: [
    'dist/',
    '.parcel-cache/',
    'node_modules/',
    'playwright-report/',
    'test-results/',
  ],
};
```

- [ ] **Step 8: Create Vitest configuration**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

Create `src/test/setup.ts`:

```typescript
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 9: Create Playwright configuration**

Create `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:1234',
    viewport: { width: 390, height: 844 },
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run start -- --host 127.0.0.1 --port 1234',
    url: 'http://127.0.0.1:1234',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'mobile-chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
```

- [ ] **Step 10: Create the Parcel HTML entry**

Create `src/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="PACE personal running coach" />
    <title>PACE</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./index.tsx"></script>
  </body>
</html>
```

- [ ] **Step 11: Create the configuration-only blank React entry**

Create `src/index.tsx`:

```tsx
import '@atlaskit/css-reset';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { setGlobalTheme } from '@atlaskit/tokens';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('PACE could not find the root element.');
}

async function startApp(): Promise<void> {
  await setGlobalTheme({});
  createRoot(rootElement).render(<StrictMode />);
}

void startApp();
```

This blank mount is scaffolding needed to verify the build and provide a running page for the test-first failure in Task 3. It contains no product UI.

- [ ] **Step 12: Verify dependency and configuration health**

Run:

```bash
npm ls react react-dom react-router-dom @atlaskit/button @atlaskit/primitives @atlaskit/tokens
npm run typecheck
npm run lint
npm run build
```

Expected: React and React DOM are version 18; all commands exit successfully; Parcel produces `dist/`.

- [ ] **Step 13: Review checkpoint without committing**

Run:

```bash
git status --short
git diff --check
sed -n '1,260p' package.json .gitignore tsconfig.json .parcelrc .compiledcssrc .eslintrc.cjs vitest.config.ts playwright.config.ts src/index.html src/index.tsx src/test/setup.ts
```

Expected: only the planned foundation files and npm lockfile are added. Do not commit.

---

### Task 3: Build the Proof Route Test-First

**Files:**

- Create: `src/pages/ProofPage.test.tsx`
- Create: `tests/e2e/proof-screen.spec.ts`
- Create: `src/pages/ProofPage.tsx`
- Create: `src/app/router.tsx`
- Create: `src/app/App.tsx`
- Modify: `src/index.tsx`

**Interfaces:**

- Consumes: the configured React root, Vitest environment, Playwright server, and ADS packages from Task 2.
- Produces: `ProofPage(): React.JSX.Element`, exported `router`, `App(): React.JSX.Element`, and the `/` route.

- [ ] **Step 1: Write the failing component test**

Create `src/pages/ProofPage.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProofPage } from './ProofPage';

describe('ProofPage', () => {
  it('presents the PACE foundation with one clear start action', () => {
    render(<ProofPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'PACE' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Your personal running coach.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
  });
});
```

The production change that makes this pass is adding `ProofPage` with the exact semantic content and official ADS button.

- [ ] **Step 2: Run the component test and verify RED**

Run:

```bash
npm test -- src/pages/ProofPage.test.tsx
```

Expected: FAIL because `./ProofPage` does not exist. The failure must be an unresolved module, not a test syntax error.

- [ ] **Step 3: Write the failing browser acceptance test**

Create `tests/e2e/proof-screen.spec.ts`:

```typescript
import { expect, test } from '@playwright/test';

test('loads the ADS proof screen at mobile width without console errors', async ({
  page,
}) => {
  const consoleErrors: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'PACE' }),
  ).toBeVisible();
  await expect(page.getByText('Your personal running coach.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', /light:/);

  const bodyMargin = await page.locator('body').evaluate((body) => {
    return window.getComputedStyle(body).margin;
  });

  expect(bodyMargin).toBe('0px');
  expect(consoleErrors).toEqual([]);
});
```

The production change that makes this pass is routing `/` to the proof page while preserving theme initialization and the ADS reset.

- [ ] **Step 4: Install the Playwright Chromium runtime**

Run:

```bash
npx playwright install chromium
```

Expected: Chromium installs successfully for the current machine.

- [ ] **Step 5: Run the browser test and verify RED**

Run:

```bash
npm run test:e2e -- tests/e2e/proof-screen.spec.ts
```

Expected: FAIL because the configured page is blank and the `PACE` heading cannot be found. Parcel itself must start successfully.

- [ ] **Step 6: Create the minimal ADS proof page**

Create `src/pages/ProofPage.tsx`:

```tsx
import Button from '@atlaskit/button/new';
import Heading from '@atlaskit/heading';
import { Box, Stack, Text } from '@atlaskit/primitives/compiled';

export function ProofPage(): React.JSX.Element {
  return (
    <Box
      as="main"
      backgroundColor="elevation.surface"
      padding="space.400"
    >
      <Stack alignInline="start" space="space.300">
        <Heading as="h1" size="xlarge">
          PACE
        </Heading>
        <Text as="p">Your personal running coach.</Text>
        <Button appearance="primary">Start</Button>
      </Stack>
    </Box>
  );
}
```

- [ ] **Step 7: Create the route table**

Create `src/app/router.tsx`:

```tsx
import { createBrowserRouter } from 'react-router-dom';

import { ProofPage } from '../pages/ProofPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProofPage />,
  },
]);
```

- [ ] **Step 8: Create the application component**

Create `src/app/App.tsx`:

```tsx
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

export function App(): React.JSX.Element {
  return <RouterProvider router={router} />;
}
```

- [ ] **Step 9: Mount the application after ADS theme initialization**

Replace the contents of `src/index.tsx` with:

```tsx
import '@atlaskit/css-reset';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { setGlobalTheme } from '@atlaskit/tokens';

import { App } from './app/App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('PACE could not find the root element.');
}

async function startApp(): Promise<void> {
  await setGlobalTheme({});
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

void startApp();
```

- [ ] **Step 10: Run the component test and verify GREEN**

Run:

```bash
npm test -- src/pages/ProofPage.test.tsx
```

Expected: PASS with one test.

- [ ] **Step 11: Run the browser test and verify GREEN**

Run:

```bash
npm run test:e2e -- tests/e2e/proof-screen.spec.ts
```

Expected: PASS in the `mobile-chromium` project with no collected console errors.

- [ ] **Step 12: Refactor only if the green implementation contains duplication**

Inspect the five runtime/test files. The expected implementation is already minimal, so make no change unless there is concrete duplication or a naming issue. If a refactor is made, rerun:

```bash
npm test -- src/pages/ProofPage.test.tsx
npm run test:e2e -- tests/e2e/proof-screen.spec.ts
```

Expected: both remain green.

- [ ] **Step 13: Review checkpoint without committing**

Run:

```bash
git diff --check
git status --short
sed -n '1,260p' src/pages/ProofPage.test.tsx tests/e2e/proof-screen.spec.ts src/pages/ProofPage.tsx src/app/router.tsx src/app/App.tsx src/index.tsx
```

Expected: only the planned proof screen, routing, mount, and tests are added or modified. Do not commit.

---

### Task 4: Run Full Verification and Inspect the Mobile Result

**Files:**

- Modify only if verification exposes a root-cause defect in a planned file.

**Interfaces:**

- Consumes: all documentation, runtime, and tooling from Tasks 1–3.
- Produces: evidence for the final report; no new product behavior.

- [ ] **Step 1: Run the complete automated verification suite**

Run:

```bash
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
```

Expected: all five commands exit successfully without suppressed errors.

- [ ] **Step 2: Check the production output**

Run:

```bash
find dist -maxdepth 2 -type f -print | sort
```

Expected: Parcel emits an HTML entry plus compiled JavaScript and CSS assets.

- [ ] **Step 3: Inspect the mobile screen and runtime state**

Start the application:

```bash
npm run start -- --host 127.0.0.1 --port 1234
```

At a 390 × 844 browser viewport, verify:

- The page loads directly at `/`.
- `PACE`, `Your personal running coach.`, and `Start` are visible.
- The Start control is rendered as the official ADS primary Button.
- The layout fits without horizontal scrolling.
- The browser console contains no errors.
- `<html>` has ADS `data-theme` and `data-color-mode` attributes.
- Body margin is zero, demonstrating the CSS reset is active.

Stop the server cleanly after inspection.

- [ ] **Step 4: Audit for prohibited technology and accidental scope expansion**

Run:

```bash
rg -n "tailwind|material-ui|@mui|shadcn|bootstrap|chakra|supabase|telegram|openai|anthropic" package.json src || true
rg -n "indexedDB|new Dexie|from ['\"]zustand['\"]|createStore|useStore" src || true
find src -maxdepth 3 -type f -print | sort
```

Expected: no prohibited dependency or implementation appears; Zustand and Dexie are installed but unused; only the planned source files exist.

- [ ] **Step 5: Review the complete change set**

Run:

```bash
git diff --check
git status --short
find docs src tests -type f -print | sort
```

Expected: no whitespace errors, no changes under `.agents/`, `.codex/`, or `.impeccable/`, and no unrelated files.

- [ ] **Step 6: Prepare the final report without committing**

Report:

1. Previous state: empty application repository with only local agent-support files.
2. Changes: list every created or modified project file.
3. Architecture: explain UI → Zustand → repository/service → Dexie and the separate training engine in beginner-friendly language.
4. ADS integration: explain css-reset, tokens, primitives, Heading, Button, Compiled Parcel configuration, and ADS ESLint tooling.
5. Verification: include each command and its result plus mobile/browser checks.
6. Issues: disclose warnings, package compatibility concerns, or state that none remain.
7. Next recommended task: `Build the static PACE app shell and navigation using ADS components and fake data.`
8. Suggested commit only: `chore: initialize PACE React and ADS foundation`.

Do not start the next task and do not create the suggested commit.
