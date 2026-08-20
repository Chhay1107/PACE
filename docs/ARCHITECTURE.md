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
