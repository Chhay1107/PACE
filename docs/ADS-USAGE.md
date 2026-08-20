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
