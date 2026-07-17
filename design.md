# Geeks Near Me - Phase 1 Experience and Visual Design System

## Creative direction: "Human Help, Engineered Beautifully"

The site should feel like a premium local technology concierge: precise, calm, responsive, and reassuring rather than cold or overly corporate. "Exclusive and sexy" is interpreted as refined composition, confident typography, generous light space, tactile motion, and restrained 3D craft - not visual noise, overexposure, or a gaming aesthetic.

The central visual metaphor is a living network inside a monitor: blue structure, green connection nodes, and flowing signals. This directly evolves the supplied logo instead of introducing an unrelated sci-fi motif.

## Experience principles

1. **Trust before spectacle:** business identity, service promise, contact path, and CTA appear immediately.
2. **One obvious action:** the primary action is always **Request an Appointment**.
3. **Motion explains:** animation guides focus, demonstrates connection, or confirms state; it does not decorate every element.
4. **Premium restraint:** use generous space, crisp grids, a few high-impact moments, and consistent material behaviour.
5. **Comfort for all users:** plain language, large targets, strong contrast, and predictable form behaviour.
6. **Fast by design:** visual richness is layered after essential content and adapts to device capability.

## Brand foundation

The supplied JPEG shows a monitor/circuit-tree icon and blue-to-green brand family. The following values are working approximations sampled from that JPEG; replace them with official master values when the client supplies the vector brand pack.

| Token | Working value | Use |
| --- | --- | --- |
| `brand-blue-700` | `#0050A0` | Primary brand, strong headings, focus accents |
| `brand-blue-600` | `#0060B0` | Interactive primary gradient |
| `brand-teal-600` | `#008090` | Gradient bridge and data highlights |
| `brand-green-600` | `#109050` | Secondary brand and success accents |
| `brand-green-500` | `#10A050` | Luminous nodes/highlights |
| `ink-950` | `#07111F` | Main dark canvas |
| `ink-900` | `#0B1728` | Elevated dark surface |
| `ink-800` | `#13243A` | Borders and muted surfaces |
| `paper-50` | `#F7FAFC` | Light content canvas |
| `white` | `#FFFFFF` | High contrast text/surfaces |

Primary light gradient: `#0060B0 -> #008090 -> #10A050`.

Do not rely on the brand green for small text on white until contrast is verified. Use blue/ink for body copy and reserve luminous green for larger accents or dark surfaces.

## Typography

Use one type family throughout the public site:

- Display/headings: `Inter`, variable, bold weights with restrained tracking
- UI/body: `Inter`, variable, highly legible at small sizes
- Numeric/reference data: use Inter tabular figures; do not introduce a second display family

Self-host approved font files where licensing permits. Use a system fallback stack and size-adjust to limit layout shift.

Suggested fluid scale:

- Display: `clamp(3rem, 8vw, 7.5rem)`, short lines only
- H1: `clamp(2.5rem, 6vw, 5.5rem)`
- H2: `clamp(2rem, 4vw, 3.75rem)`
- H3: `clamp(1.35rem, 2vw, 1.75rem)`
- Body large: `clamp(1.05rem, 1.5vw, 1.25rem)`
- Body: `1rem`, comfortable line height around `1.6`
- Form labels: never below `1rem` on mobile

## Composition and surfaces

- Use a light, editorial canvas throughout. Brand blue, teal and green provide structure, emphasis and depth without creating dark cinematic sections.
- Use a 12-column desktop grid, 8-column tablet grid, and 4-column mobile grid.
- Content width approximately 1200-1320 px; text measure 60-72 characters.
- Cards use controlled translucent material only over simple backgrounds. Avoid glass behind dense text or tables.
- Corners are moderately rounded, not pill-shaped everywhere. Buttons may use compact rounded geometry.
- Hairline grid/circuit details can be used at low contrast to imply precision.

## Public page narrative

### Header

- Clean brand mark, Services, How It Works, About/Trust, Contact
- Services opens a wide, three-column mega menu: two scannable service groups plus one branded recommendation panel. It must work with hover, click, focus and Escape.
- Persistent **Request an Appointment** button
- On mobile: compact menu with the CTA still immediately reachable
- Header gains a subtle solid/blurry surface after scrolling; no distracting hide/show loop

### Hero - centred animated brand field

- Headline communicates local, human IT support in plain language and is deliberately limited to three controlled lines on desktop and mobile
- Supporting text explains remote/on-site and manual confirmation
- Primary CTA: **Request an Appointment**
- Secondary action: call `0403 171 348`
- Use one centred content column; do not split the hero into text and visual sides.
- No 3D object, computer illustration, floating card, or decorative product UI appears in the hero.
- Background uses deep brand blue/teal shades with a slow, subtle gradient drift. Motion stops in reduced-motion mode.

### Services

- Curated service cards using simple recognizable icons and plain-language descriptions
- Gentle magnetic/tilt response on precise-pointer devices only; no tilt on touch
- Do not show all content as an endless carousel

### How it works

Three clear steps: submit a request, admin confirms, expert helps. Animate the connecting line as the section enters, then stop.

### Trust and local proof

- Service area, real contact details, approved reviews/testimonials, business credentials, and response expectations
- Never invent ratings, reviews, partner logos, or guarantee language

### Final CTA

A focused high-contrast panel that repeats the unconfirmed-request explanation and offers the form/call paths.

## Appointment flow design

Recommended presentation is a short, clearly labelled multi-step flow with persistent data:

1. **Service** - service type and remote/on-site
2. **Your details** - name, phone, email, conditional address, suburb/postcode
3. **Preferred time & issue** - date, broad time window, description, optional file
4. **Review & send** - readable summary, terms acknowledgement, submit

Rules:

- Use a real step label and progress text, not progress by colour alone.
- Back does not clear data. Browser refresh/recovery behaviour is defined and privacy-aware.
- Every step can be completed with keyboard and screen reader.
- Conditional address changes are announced and do not cause layout jumps.
- Errors appear beside fields and in a linked summary.
- Submit has clear pending state and is idempotent; success uses a calm confirmation sequence.
- Success copy says the request is received but **not confirmed**.
- 3D is limited to a lightweight ambient emblem; the form itself stays stable.

## Admin design

The admin is a focused operational workspace, visually related to the brand but not cinematic.

- Desktop: compact table/list, sticky filters, strong status chips, useful density
- Mobile: stacked appointment cards with the same information hierarchy
- Detail: customer/contact, service/problem, requested/final time, attachments, private notes, activity
- Primary status action is explicit and confirms message consequences
- Destructive cancellation requires intention and optional/required reason based on business decision
- Never communicate status by colour alone; every chip has text/icon
- Decorative movement is limited to short state transitions and feedback

## Motion language

### Timing

- Micro feedback: 120-180 ms
- Component enter/exit: 220-360 ms
- Section reveal: 450-700 ms
- Cinematic hero sequence: 900-1600 ms, interruptible and never blocks interaction

### Easing

- Standard exit: fast ease-in
- Standard entry: smooth ease-out
- Premium reveal: restrained custom cubic-bezier with no elastic overshoot
- Spring motion is limited to draggable/pointer-reactive decorative objects

### Choreography rules

- Animate `transform` and `opacity` by default; avoid layout-triggering properties.
- Reveal groups in short stagger sets, not entire pages one word at a time.
- Pause requestAnimationFrame/render loops when hidden or off-screen.
- Pointer parallax is capped to a few pixels/degrees and disabled for touch/reduced motion.
- Scroll progress animation must remain correct when users jump, resize, or navigate back.
- No auto-playing audio, flashing, constant cursor replacement, or scroll hijacking.

### Reduced-motion mode

- Replace camera/orbit/parallax movement with a static poster.
- Remove stagger and translate; use instant state or a brief opacity change.
- Stop decorative signal loops.
- Preserve all information, focus order, status feedback, and controls.

## 3D production rules

- Create the logo-derived scene from project-owned geometry/assets; do not trace low-quality JPEG edges as a final master.
- Use compressed geometry/textures and simple physically plausible materials.
- Limit lights, draw calls, transparent layers, texture resolution, and post-processing.
- Do not render 3D in the admin application.
- Load the scene after the hero text/CTA, use a reserved aspect-ratio box, and provide a poster.
- Test WebGL context loss, low-power devices, zoom, rotation, and tab backgrounding.
- Every loop and observer must clean up on unmount.

## Component foundation

- Buttons: primary gradient, secondary outline, tertiary text; all with loading/disabled/focus states
- Fields: 48 px minimum control height, visible labels, hint/error slots, no placeholder-only labels
- Cards: service, process, trust, and appointment variants share spacing/material tokens
- Status chips: named icon + label + accessible contrast
- Modal/dialog: only for focused confirmation; never for the main form
- Toasts: supplementary feedback, never the only error/success message
- Skeletons: reserved-size and limited; do not simulate content indefinitely

## Accessibility and content quality

- Aim for WCAG 2.2 AA behaviour and verify critical flows manually; do not claim conformance from automated tests alone.
- Logical heading hierarchy, landmarks, skip link, visible focus, and predictable tab order
- Respect 200% zoom and reflow without horizontal page scrolling
- Minimum 44x44 px interactive targets where possible
- Plain Australian English; avoid unexplained technical terms
- Use sentence case and direct action labels
- Alternative text describes meaning; decorative 3D/circuit patterns use empty alt/hidden semantics

## Design QA checklist

- [ ] Client approves one desktop and one mobile hero direction before full production.
- [ ] Original vector logo and brand values replace sampled working tokens.
- [ ] CTA copy is consistently **Request an Appointment**.
- [ ] Form remains clear with animation/JavaScript/WebGL unavailable.
- [ ] Reduced-motion behaviour is designed, not added as an afterthought.
- [ ] Text/background and control states pass contrast checks.
- [ ] Mobile keyboard, safe areas, zoom, and long error content are tested.
- [ ] 3D asset and runtime budgets are measured on representative mid-range devices.
- [ ] No invented reviews, statistics, badges, or service promises appear.
