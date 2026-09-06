# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Prisma data layer

## Current Goal

- Add the project database models and Prisma client foundation.

## Completed

- Cleaned up Next.js boilerplate.
- Initialized shadcn/ui.
- Added Button, Card, Dialog, Input, Tabs, Textarea, and ScrollArea.
- Installed lucide-react.
- Added the reusable `cn()` helper in `lib/utils.ts`.
- Configured dark-only design tokens in `app/globals.css`.
- Confirmed lint passes.
- Confirmed the production build passes.
- Added the reusable editor navbar with sidebar toggle state.
- Added the floating project sidebar with project tabs and new-project action.
- Integrated the editor navbar and project sidebar into the application shell.
- Extracted the stateful editor chrome composition into a reusable EditorLayout.
- Confirmed the existing token-based Dialog primitives provide title, description, and footer action composition.
- Added the Clerk root provider with the dark theme and CSS-variable-based appearance overrides.
- Added protected route enforcement via `proxy.ts` using the existing public auth env vars.
- Added sign-in and sign-up pages with the required two-panel auth layout and minimal dark styling.
- Added the authenticated redirect flow from `/` to `/editor` and unauthenticated redirect to `/sign-in`.
- Added the Clerk `UserButton` to the editor navbar for profile settings and logout.
- Added a reusable `useProjectDialogs` hook with mock project state and slug generation.
- Added the editor home empty state with the `New Project` CTA and the `Create Project` dialog.
- Added sidebar project actions for owned projects: rename and delete, with shared projects hidden from action controls.
- Added mobile sidebar scrim/backdrop behavior and project dialog wiring without persistence or API calls.
- Verified the production build passes with the final Clerk integration.
- Added the Project and ProjectCollaborator Prisma models with the required relations, indexes, and constraints.
- Added the cached Prisma 7 client singleton with direct PostgreSQL and Accelerate connection branches.
- Created and applied the initial Prisma migration and verified the production build passes.
- Added authenticated project list/create API routes and owner-checked rename/delete API routes.
- Added explicit `401`, `403`, `404`, and input validation responses for project mutations.
- Updated the Clerk middleware boundary so project API handlers can return `401` responses directly.
- Verified the production build passes with the project API routes registered.
- Added server-side owned/shared project loading for the editor home.
- Added API-backed create, rename, and delete project actions with aligned room/project IDs and workspace navigation.
- Wired real project data and mutation dialogs into the editor home sidebar.
- Verified TypeScript and lint pass for the editor home wiring.

## In Progress

- Verify the complete production build after editor home wiring.

## Next Up

- Proceed with the next feature after the verified editor home wiring.

## Open Questions

- None.

## Architecture Decisions

- Use shadcn/ui primitives generated through the CLI and keep generated files unmodified.
- Keep the interface dark-only through semantic CSS tokens in `globals.css`.
- Use Clerk’s built-in auth UI and user menu without replacing Clerk internals.

## Session Notes

- The project database foundation is ready for authenticated project persistence.
