# Geeks Near Me - Phase 1 Product Requirements Document

## Document control

- Status: Planning baseline - awaiting client decisions listed in "Open decisions"
- Product: Geeks Near Me online appointment request system
- Source of truth: `Geeks_Near_Me_Phase_1_Appointment_Booking_Instructions.pdf`, dated 10 May 2026
- Brand reference: supplied Geeks Near Me logo sheet
- Product boundary: public website, appointment request form, secure admin appointment management, and notifications

## Product summary

Geeks Near Me needs a polished website that allows a customer to **request an appointment** for local or remote IT support. The system does not promise or reserve the selected time. An administrator reviews each request and manually confirms, reschedules, or cancels it.

The experience should feel premium, modern, fast, and technically distinctive. Motion and 3D elements support the brand story, but must never make the request flow slower, harder to read, or inaccessible.

## Problem

Customers need a simple way to explain an IT problem and propose a suitable service time. Geeks Near Me must retain control over travel time, service area, technician availability, job suitability, and the final appointment time.

## Users

### Customer

- Home users, including elderly and less technical customers
- Small-business customers
- People requesting remote or on-site IT help
- Primary need: submit accurate details without learning technical terminology

### Administrator

- Geeks Near Me staff responsible for triage and scheduling
- Primary need: find, assess, update, and communicate appointment requests quickly

## Goals

1. Let a customer submit a valid request from mobile or desktop.
2. Make it unmistakable that the selected time is a preference, not a confirmed booking.
3. Notify the customer that the request was received and notify admin that action is required.
4. Let admin search, filter, inspect, annotate, and update every request securely.
5. Communicate confirmation, rescheduling, or cancellation professionally.
6. Deliver a visually exclusive experience without sacrificing speed, clarity, or accessibility.

## Non-goals for Phase 1

Do not build any of the following without written scope approval:

- Customer account, login, portal, or order history
- Technician account, dashboard, scoring, or automatic dispatch
- Payments, deposits, refunds, invoices, or receipts
- Mobile app or PWA expansion
- AI troubleshooting, live chat, GPS tracking, or route optimisation
- Marketplace, subscriptions, advanced analytics, or marketing automation
- Full job/order tracking beyond the defined appointment statuses

## Core language rule

- Primary CTA: **Request an Appointment**
- Never label the flow "Book Now" or imply that submission guarantees attendance.
- On the form and success state, repeat that admin must confirm the final date and time.

## Phase 1 experience

### Public website

Minimum proposed routes:

- `/` - premium landing page, services overview, remote/on-site explanation, trust content, process, contact CTA
- `/request-appointment` - focused appointment request flow
- `/request-appointment/success` - acknowledgement and next steps; no sensitive data in the URL
- `/privacy` and `/terms` - content supplied or approved by the client before launch
- `/admin/*` - authenticated admin application, excluded from public indexing

The exact marketing copy, testimonials, service area, opening hours, and legal copy are client-provided dependencies.

### Appointment request form

| Field | Requirement | Behaviour |
| --- | --- | --- |
| Service type | Required | Computer repair, laptop repair, WiFi/internet, printer setup, email setup, virus/malware, software installation, data transfer, business IT support, remote support, other |
| Support type | Required | Remote support or on-site visit |
| Customer name | Required | Plain-language label and autocomplete support |
| Phone number | Required | Prefer mobile; accept human-friendly formatting and normalize server-side |
| Email | Optional pending client confirmation | Document says "required if available"; phone remains the fallback contact method |
| Address | Conditionally required | Required for on-site; hidden or optional for remote support |
| Suburb/postcode | Required | Used for travel/service-area assessment |
| Preferred date | Required | Cannot be in the past; business availability rules are an open decision |
| Preferred time | Required | Use client-approved broad time windows rather than false exact availability |
| Issue description | Required | Prompt: "Briefly describe the problem." Apply sensible min/max limits |
| Photo/screenshot | Optional | Common image/PDF types only; size/type verified server-side |
| Terms acknowledgement | Required | Exact terms and privacy wording require client approval |

Form requirements:

- Clear progress, inline validation, error summary, preserved input after recoverable failure, and keyboard support
- Server-side validation is authoritative; client validation is only for feedback
- Protect against spam and repeated submissions without introducing unnecessary friction
- Create an opaque reference number after a successful submission
- Never expose another customer's data through a reference number
- Prevent duplicate writes when a customer retries or double-clicks submit

### Customer workflow

1. Customer selects **Request an Appointment**.
2. Customer chooses service and remote/on-site support.
3. Customer provides contact, location, preferred date/time, and issue details.
4. Customer optionally uploads supporting evidence and accepts the acknowledgement.
5. System validates and stores one request with status `NEW_REQUEST`.
6. Customer sees and, when possible, receives an acknowledgement explicitly marked as unconfirmed.
7. Admin reviews and confirms, reschedules, or cancels.
8. Customer receives the corresponding message through the approved channel.

### Admin application

Admin must be able to:

- Sign in securely and sign out
- View an appointment list with preferred date/time, name, phone, suburb, service, status, and last update
- Search by name, phone, email, suburb/postcode, service, date, status, and reference number
- Combine useful filters and clear them easily
- Open a detail view containing all submitted fields and authorized file links
- Add internal notes that are never included in customer responses
- Edit the appointment date/time after customer contact
- Move the request through allowed statuses
- Trigger or record the relevant customer notification
- Print or export one appointment's details in a safe, useful format
- Review an activity history for major actions where practical

Phase 1 uses a single admin role unless the client requests a multi-user permission model before implementation.

## Status model

| Status | Meaning | Customer communication |
| --- | --- | --- |
| `NEW_REQUEST` | Submitted and awaiting review | Acknowledgement only |
| `UNDER_REVIEW` | Admin is checking suitability/availability | None by default |
| `CONFIRMED` | Final appointment accepted | Confirmation required |
| `RESCHEDULED` | Date/time changed or a new time proposed | Reschedule message required |
| `COMPLETED` | Service attended/completed | None required in source scope |
| `CANCELLED` | Request will not proceed | Cancellation message where appropriate |

Every major status change records actor, timestamp, previous status, new status, and optional reason. Invalid transitions must be rejected server-side.

## Notifications

Required Phase 1 baseline:

- Admin email on new request
- Customer acknowledgement after submission when an email is present
- Customer confirmation, reschedule, and cancellation messages through the configured channel

Optional after provider/client approval:

- SMS notifications
- Google Calendar synchronization

Message templates must use the approved business name and contact number `0403 171 348`, avoid overpromising arrival time, and clearly distinguish requested from confirmed times.

## Visual and interaction requirements

- Premium "digital concierge" direction using the supplied blue/green identity
- Art-directed 3D hero object and subtle moving circuit/network elements on capable devices
- Smooth section reveals, tactile controls, and purposeful state transitions
- Animation must be progressively enhanced, pause when off-screen, and respect reduced-motion preferences
- The request form and admin tables prioritize clarity over spectacle
- Mobile-first rendering with no interaction blocked by WebGL or JavaScript-heavy decoration

Detailed rules live in [design.md](design.md).

## Security and privacy requirements

- Admin routes and data require authenticated, server-verified access
- Public responses never reveal whether a phone/email/reference already exists
- Allowlisted upload extensions are not enough: verify file signature, MIME type, and size; store files outside the public web root and require authorized access
- Escape untrusted content and apply validation at every write boundary
- Rate-limit authentication, form submission, upload, and notification actions
- Do not collect or store payment/card data
- Keep secrets server-side and out of source control and browser bundles
- Maintain backups and test restoration before launch
- Define retention/deletion and incident-contact procedures with the client before production

## Success measures

Initial operational measures, to be given numeric targets after baseline traffic is known:

- Valid request completion rate
- Form validation abandonment rate
- Admin median time from new request to first action
- Notification delivery/failure rate
- Duplicate/spam request rate
- Mobile Core Web Vitals and JavaScript error rate
- Accessibility test pass rate for the request flow

No advertising or analytics tracker is introduced until the client approves the provider and consent approach.

## Acceptance criteria

- [ ] Customer can submit a request on supported mobile and desktop browsers.
- [ ] Required and conditional fields validate on client and server.
- [ ] Submission creates exactly one `NEW_REQUEST` record and a reference number.
- [ ] Admin and eligible customer receive the correct acknowledgement.
- [ ] Admin can view, search, and filter all required appointment fields.
- [ ] Admin can add private notes and edit final date/time.
- [ ] Admin can use all six statuses and only allowed transitions.
- [ ] Confirmed/rescheduled/cancelled actions use the right customer template.
- [ ] Optional upload is private, allowlisted, size-limited, and safely retrievable by admin.
- [ ] Public CTA consistently says **Request an Appointment**.
- [ ] Decorative animation has a reduced-motion and no-WebGL fallback.
- [ ] No non-goal module is present.
- [ ] Critical flows pass accessibility, security, responsive, and failure-state QA.

## Open decisions requiring client confirmation

1. Which suburbs/postcodes are served, and should the form block or merely flag out-of-area requests?
2. What timezone, operating days, blackout dates, lead time, and preferred time windows should be used?
3. Is email truly optional? If absent, which messages must be sent by SMS or handled manually?
4. Which sender email/domain, admin recipients, SMS provider/number, and reply-to address are approved?
5. Is optional SMS included in the Phase 1 budget or deferred?
6. Is Google Calendar sync included or deferred?
7. What file types, maximum size, retention period, and deletion process are approved?
8. Will there be one admin or multiple staff accounts, and is MFA required?
9. What exact privacy policy, terms acknowledgement, cancellation wording, and consent text are approved?
10. Are export requirements print-only, PDF, or CSV, and which fields may be exported?
11. Please provide the original vector logo (`SVG`, `AI`, or `EPS`) and official brand colour/font values; the supplied JPEG is not a production master.
