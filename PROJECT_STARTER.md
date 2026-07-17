# Geeks Near Me - Project Starter

## Start here

Read these files in order before writing application code:

1. [PRD.md](PRD.md) - what must and must not be built
2. [design.md](design.md) - experience, motion, 3D, brand, and accessibility direction
3. [Architecture.md](Architecture.md) - system boundaries and technical shape
4. [Phases.md](Phases.md) - delivery sequence and gates
5. [rules.md](rules.md) - non-negotiable working rules

The source PDF overrides an accidental contradiction in these planning files. Resolve the contradiction in writing before implementation.

## Current state

- Greenfield workspace; no application scaffold existed when these documents were created.
- Requirements have been extracted and visually checked across all five PDF pages.
- The supplied brand asset is a 1024x1024 JPEG logo sheet, suitable as direction but not as a production logo master.
- Coding should begin only after Stage 0 decisions that affect data, vendors, legal copy, and scheduling are answered.

## Recommended initial stack

- Next.js App Router and TypeScript with strict compiler settings
- pnpm with a committed lockfile and pinned runtime version
- CSS Modules plus global CSS layers and CSS custom-property design tokens; no Tailwind CSS
- Accessible project-owned component primitives
- Motion for interface animation
- React Three Fiber/Three.js for the single public 3D scene
- PostgreSQL with reviewed migrations, persistent VPS storage, and off-site backups
- Database-backed admin sessions and private upload routes; keep adapters ready for managed auth/object storage if later required
- Docker Compose on a Hostinger VPS with Caddy as the HTTPS reverse proxy
- Unit/integration test runner plus Playwright for critical end-to-end paths

Select exact versions during initialization from supported stable releases, then pin them. Do not copy an old starter template blindly.

## Bootstrap sequence

1. Record the selected Hostinger plan/region and remaining external provider choices in an architecture decision.
2. Initialize the application in this repository without overwriting these documents.
3. Add formatter, linter, strict typecheck, tests, pre-commit checks, and CI.
4. Add environment schema validation and `.env.example` containing names only.
5. Establish design tokens, fonts, global layout, accessibility primitives, and static brand assets.
6. Build the approved static hero/form prototype before database work.
7. Follow [Phases.md](Phases.md); do not start optional integrations early.

## Environment variable plan

Names are illustrative until providers are selected:

```dotenv
APP_URL=
DATABASE_URL=
AUTH_SECRET=
AUTH_PROVIDER_ISSUER=
AUTH_PROVIDER_CLIENT_ID=
AUTH_PROVIDER_CLIENT_SECRET=
STORAGE_ENDPOINT=
UPLOAD_ROOT=
BACKUP_TARGET=
EMAIL_API_KEY=
EMAIL_FROM=
ADMIN_NOTIFICATION_EMAILS=
SMS_ENABLED=false
SMS_API_KEY=
SMS_FROM=
CALENDAR_SYNC_ENABLED=false
CALENDAR_CREDENTIALS=
BOT_PROTECTION_SECRET=
WEBHOOK_SIGNING_SECRET=
ERROR_REPORTING_DSN=
```

Never place real values in documentation, committed env files, fixtures, screenshots, or browser code.

## Definition of ready for the first coding pass

- [ ] Client has answered schedule/service-area/email requirements.
- [ ] Deployment, database, auth, storage, and email ownership are known.
- [ ] Admin-user count and MFA decision are known.
- [ ] Legal/privacy/terms owner and approval route are known.
- [ ] Original vector logo and permission to use proposed fonts/assets are available.
- [ ] Desktop/mobile visual direction is approved.
- [ ] File upload inclusion, limits, scanning, and retention are approved.
- [ ] SMS and Calendar are explicitly included or deferred.

## First implementation slice

Deliver one thin vertical slice:

1. Public shell with final tokens and accessible navigation
2. Static, fallback-first hero with the correct CTA
3. Appointment form UI with schema-driven fields and no persistence
4. Responsive/reduced-motion tests and a production build

This slice validates the hardest visual and information-architecture decisions before introducing data or vendors.

## Pull request checklist

- Scope maps to a PRD acceptance criterion or approved technical task.
- No Phase 1 non-goal was introduced.
- Relevant unit/integration/end-to-end tests were added and passed.
- Loading, empty, validation, network error, and retry states were considered.
- Keyboard, focus, reduced motion, responsive layout, and contrast were checked.
- Authentication/authorization, PII, logging, uploads, and rate limits were reviewed where relevant.
- Bundle/3D performance impact was measured for visual changes.
- Documentation and environment examples match the implementation.
- Screenshots or short recordings show meaningful UI changes at mobile and desktop sizes.

## Handoff package before launch

- Approved source and lockfile
- Environment/secret inventory without secret values
- Database migration and rollback instructions
- Admin onboarding and MFA instructions
- Notification template inventory
- Backup/restore and incident runbooks
- Supported-browser/device and accessibility QA evidence
- Deployment/rollback and ownership notes
- Original design/3D/brand source assets with license/ownership record
