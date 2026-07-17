# Geeks Near Me - Project Rules

These rules apply to every human and AI contributor. If a rule conflicts with an approved client change, update the PRD and this file in the same reviewed change.

## 1. Product boundary

1. The product accepts appointment **requests**; it does not guarantee an instant booking.
2. The primary CTA is exactly **Request an Appointment**. Do not use "Book Now".
3. Phase 1 contains the public website, request form, admin appointment management, and approved notifications only.
4. Do not add customer/technician portals, payments, invoices, AI, live chat, GPS, dispatch, subscriptions, mobile app, marketplace, or advanced analytics without written approval.
5. Never invent testimonials, ratings, response times, service areas, prices, certifications, availability, or guarantees.

## 2. Requirements and decisions

1. [PRD.md](PRD.md) is the functional baseline; [design.md](design.md) and [Architecture.md](Architecture.md) define experience and engineering constraints.
2. Mark an unknown as an assumption or open decision. Do not silently turn it into a requirement.
3. Material scope, data, vendor, legal, scheduling, or notification changes require a recorded decision before implementation.
4. Keep acceptance criteria testable and update documentation in the same change as behaviour.

## 3. Code quality

1. Use strict TypeScript. Avoid `any`; narrow `unknown` at boundaries.
2. Prefer small domain-focused modules and explicit names over clever abstractions.
3. Keep business rules out of presentation components and vendor SDK calls behind adapters.
4. Validate environment configuration at startup and fail with safe, actionable messages.
5. Pin runtime/dependency versions and commit the lockfile.
6. Do not leave dead code, commented-out alternatives, unexplained magic values, or permanent TODOs without an owner/reason.
7. Formatting, lint, typecheck, tests, and production build must pass before merge.

## 4. Data and server rules

1. The server is authoritative for validation, identity, authorization, allowed status transitions, and notification triggers.
2. Every write is validated using an allowlisted schema with size limits.
3. Request creation and consequential admin actions must be idempotent.
4. Major admin actions create an immutable audit event.
5. Use reviewed migrations; never edit production data manually as a normal deployment step.
6. Use UTC instants for events/audits and the approved business timezone for appointment display and scheduling rules.
7. Do not log raw issue descriptions, addresses, tokens, secrets, attachment URLs, or unnecessary contact data.

## 5. Security and privacy

1. Treat names, phone numbers, email, address, issue description, notes, and uploads as private customer data.
2. Authenticate and authorize every admin page, query, mutation, file link, and export on the server.
3. Never make customer uploads public. Use generated keys and short-lived authorized URLs.
4. Check upload bytes, detected MIME, extension, size, ownership, and safety state.
5. Apply CSRF/origin, rate-limit, bot-abuse, secure-header, and webhook-signature controls where applicable.
6. Secrets exist only in approved secret stores/local ignored env files and never in client bundles or logs.
7. Public errors are generic; internal logs use correlation IDs and redaction.
8. Do not collect payment data in Phase 1.
9. Backups are incomplete until restoration has been tested.

## 6. UI and content

1. Mobile-first and responsive are default, not a later pass.
2. Use semantic HTML before adding ARIA. Every control has a persistent label and visible focus.
3. Do not rely on placeholder text, colour, animation, hover, or toast alone to communicate essential information.
4. Preserve user input after recoverable validation/network failures.
5. Use plain language suitable for elderly and non-technical customers.
6. The admin prioritizes speed, scanning, and clarity; it does not reuse cinematic marketing animation.
7. Do not ship placeholder copy, stock claims, fake data, or unlicensed assets.

## 7. Motion and 3D

1. Motion must serve hierarchy, orientation, causality, or feedback.
2. Essential content, CTA, and form functionality must not depend on WebGL, pointer motion, or animation completion.
3. Respect `prefers-reduced-motion`; provide a complete static fallback.
4. Lazy-load 3D after essential content and reserve its layout space.
5. Pause off-screen/background loops and dispose geometry, textures, listeners, observers, and frames on teardown.
6. Prefer transform/opacity animation; measure before accepting layout or main-thread-heavy effects.
7. No scroll hijacking, forced cursor replacement, autoplay audio, flashing effects, or constant decorative movement.
8. Measure the asset, bundle, frame-rate, memory, and Core Web Vitals impact of every major animated feature.

## 8. Testing

1. Behaviour changes require tests at the lowest useful level and critical flows require end-to-end coverage.
2. Test successful, invalid, empty, unauthorized, slow, offline/failure, retry, duplicate, and concurrent paths as relevant.
3. Critical end-to-end flows: submit request, admin login, search/filter, view detail, add note, update each allowed status, and notification failure recovery.
4. Accessibility checks include keyboard, focus, error announcements, zoom/reflow, contrast, and reduced motion; automated scans alone are insufficient.
5. Test representative mobile devices and constrained networks, not only a desktop development machine.
6. Never claim a test passed unless it was actually run against the stated revision/environment.

## 9. Git and delivery

1. Keep changes small and reviewable; do not mix unrelated refactors with product work.
2. Never commit secrets, personal production data, generated build output, or unapproved source assets.
3. Do not rewrite shared history, deploy, migrate production, or change external services without explicit authorization.
4. Each release needs migration, monitoring, backup, rollback, and ownership notes proportional to risk.
5. A failed notification, upload processor, or optional integration must not take down the core request/admin system.

## 10. Definition of done

A task is done only when its acceptance criteria are met, relevant checks pass, failure/accessibility/security states are covered, documentation is current, and no known critical issue is hidden. Visual polish without reliable behaviour is not done; reliable behaviour with an unusable interface is also not done.

