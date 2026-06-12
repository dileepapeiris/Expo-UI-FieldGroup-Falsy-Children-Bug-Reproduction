# Expo UI `FieldGroup` Falsy Children Bug Reproduction

A minimal Expo app that reproduces a bug in [`@expo/ui`](https://docs.expo.dev/versions/latest/sdk/ui/)'s
`FieldGroup` component: when a `FieldGroup.Section` (or any other child) is conditionally rendered
using `{condition && <FieldGroup.Section>...</FieldGroup.Section>}` and `condition` is `false`,
`FieldGroup` rendered an empty, blank section/row instead of skipping it entirely.

<div align="center">
  <video src="https://github.com/user-attachments/assets/70563d01-24b2-4aa5-b4be-05bc52f74038" controls width="100%" style="max-width: 400px; margin: 20px 0;"></video>
</div>

This was most visible on Android, where the empty section showed up as a blank Material `ListItem`.

## Fixed in

This bug is fixed by [expo/expo#46874](https://github.com/expo/expo/pull/46874), which updates
`groupFieldGroupChildren` and `extractFieldSectionSlots` in `@expo/ui`'s universal `FieldGroup`
implementation to skip `false` / `null` / `undefined` children produced by conditional rendering.

<div align="center">
  <video src="https://github.com/user-attachments/assets/9001d1b4-8666-41fe-890f-249af01052ee" controls width="100%" style="max-width: 400px; margin: 20px 0;"></video>
</div>

## What this reproduces

In [`App.tsx`](./App.tsx), a `Picker` toggles `filterType` between `"always"` and `"custom"`.
The second `FieldGroup.Section` is rendered with:

```tsx
{filterType === "custom" && (
  <FieldGroup.Section title="Conditional Content Section">
    ...
  </FieldGroup.Section>
)}
```

With the unfixed `@expo/ui`, selecting `"Always shown"` (i.e. `filterType !== "custom"`) still
renders an empty section/row between "Filter Dropdown" and "Switch Toggle". With the fix applied,
that empty section/row disappears.

## How to run

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the project:

   ```sh
   npx expo start
   ```

3. Open on Android (the platform where the bug is most visible):

   ```sh
   npx expo run:android
   ```

   You can also try `npx expo run:ios` or `npx expo start --web`.

4. With `filterType` set to `"Always shown"` (the default), observe whether an empty section/row
   appears between "Filter Dropdown" and "Switch Toggle":
   - **Unfixed `@expo/ui`** (current published version): empty section/row is visible — bug reproduced.
   - **Fixed `@expo/ui`**: no empty section/row — bug resolved.

To test against the fix before it's published, point the `@expo/ui` dependency at a local checkout
of [expo/expo#46874](https://github.com/expo/expo/pull/46874) (e.g. via `npm link` or a `file:`
dependency on `packages/expo-ui`).
