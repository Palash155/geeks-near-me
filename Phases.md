# Geeks Near Me - Phase 1 Delivery Plan

This file divides the approved product Phase 1 into safe delivery stages. It does not add future product phases such as payments, portals, AI, GPS, or marketplace features.

## Stage 0 - Decisions and project readiness

### Outcomes

- Client answers the open decisions in [PRD.md](PRD.md).
- Production owner, accounts, budget, data region, and vendors are approved.
- Original vector logo, brand values, copy, privacy/terms, services, areas, hours, and message templates are supplied.
- One technical stack/deployment record and one design direction are approved.

### Gate

No production implementation starts with unresolved decisions that change data collection, notification channels, authentication, or scheduling behaviour.

## Stage 1 - Foundation and visual prototype

### Build

- Initialize the TypeScript application, CI, environments, lint/type/test tooling, and design tokens.
- Implement global layout, semantic navigation, font loading, accessible primitives, error boundaries, and telemetry foundation.
- Produce desktop/mobile hero prototype with static fallback and reduced-motion mode.
- Prototype the appointment flow with no backend persistence.
- Establish measured performance budgets on agreed target devices.

### Evidence

- Client sign-off on visual direction and form information architecture
- Keyboard/reduced-motion review
- Baseline production build and bundle report

## Stage 2 - Public website

### Build

- Landing page narrative: hero, services, process, trust/local proof, contact/final CTA
- Appointment route shell and approved legal routes/content
- Responsive images, metadata, social share image, sitemap, robots policy, and 404/error experiences
- Progressive/lazy 3D enhancement and poster fallback

### Gate

- Mobile/desktop content sign-off
- No fabricated claims or placeholder copy in release candidate
- Essential content and CTA work when 3D is unavailable

## Stage 3 - Appointment request backend

### Build

- Database schema/migrations and shared validation
- Multi-step form, conditional address, server validation, reference generation, idempotent submission
- Optional private upload pipeline if approved
- Spam/rate-limit controls and safe error handling
- Customer success state and audit event creation

### Tests

- Unit tests for schemas, conditional requirements, reference generation, and status policy
- Integration tests for valid/invalid/duplicate requests and upload authorization
- End-to-end mobile/desktop submission including failure recovery

### Gate

One valid request produces one auditable record; invalid/duplicate/unsafe requests do not leak data or create uncontrolled side effects.

## Stage 4 - Secure admin management

### Build

- Admin authentication and route/data authorization
- Paginated list, search, required filters, empty/loading/error states
- Appointment detail, private notes, final date/time editing, attachments
- Allowed status transitions, activity events, print/export option as approved
- Responsive admin card/table experience

### Tests

- Authentication/authorization and direct-object-access tests
- Search/filter combinations and pagination
- Status transition and concurrency tests
- Note privacy and attachment-link expiry

### Gate

An unauthenticated or unauthorized request cannot access any customer detail, file, export, or mutation.

## Stage 5 - Notifications and optional integrations

### Build

- Versioned admin alert and customer message templates
- Durable job/outbox processing, retries, delivery records, webhook verification
- Confirmation/reschedule/cancellation notification coupling
- SMS and/or Google Calendar only if already approved in Stage 0

### Tests

- Template snapshot/content tests
- Provider sandbox tests, invalid webhook/replay tests, transient/permanent failure tests
- Idempotency tests to prevent duplicate messages/events

### Gate

Notification failure never loses the appointment or misrepresents its status; failures are observable and recoverable.

## Stage 6 - QA, security, accessibility, and launch

### QA matrix

- Supported desktop/mobile browsers and representative mid-range hardware
- Happy path, validation, network failure, retry, double submit, long content, and upload edge cases
- Keyboard-only and screen-reader smoke tests
- Reduced-motion, no-WebGL, slow connection, zoom/reflow, and colour contrast
- Auth abuse, authorization, input handling, upload, webhook, rate-limit, CSP, and secrets review
- Backup/restore rehearsal and production rollback rehearsal
- Email deliverability setup and test delivery

### Launch gate

- All PRD acceptance criteria have evidence.
- No open critical/high-severity security or data-loss issue.
- Monitoring, alerts, backups, runbook, support ownership, and rollback are active.
- Client approves production copy, legal text, message templates, and final visual build.

## Post-launch stabilization

- Monitor errors, form abandonment, duplicates/spam, notification failure, performance, and admin response time.
- Fix Phase 1 defects and friction before proposing scope expansion.
- Evaluate future features only through a new PRD and written approval.

## Change control

Any request involving payment, customer/technician accounts, AI, live chat, GPS, dispatch, subscriptions, mobile app, marketplace, or advanced analytics is a new scope decision. Record it as a future proposal; do not hide it inside a Phase 1 task.

