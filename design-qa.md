# Homepage Appointment Launcher — Design QA

## Scope

- Feature: the homepage “Ready to get started?” appointment area.
- Source review: `C:\Users\ROWTECH\AppData\Local\Temp\codex-clipboard-db9e3c74-6dd7-4b64-b091-fb271c349fc4.png`
- Implementation review: `http://localhost:3000/#request` at the same desktop state.

## Comparison evidence

- The supplied reference and the local implementation were reviewed together in one visual comparison.
- The two-column section, quiet blue/green background, left-side call-to-action, and floating white card remain aligned with the established homepage design.
- Intentional improvement: the static, incomplete mini-form is replaced by four clear service launchers and one full-request action.

## Visual review

- The card has a concise “Guided in 4 steps” header and a brand-colour progress line, so it communicates the full journey without pretending that the homepage itself is a multi-step form.
- Each service launcher has a distinct Phosphor icon, strong label, short helper text, and an outward action arrow. Hover and keyboard-focus states use the existing blue surface and motion language.
- The large CTA remains visually dominant, while the manual-confirmation note is retained directly beneath it.
- Responsive behaviour retains the existing one-column service grid on smaller screens.

## Interaction QA

- Clicking **Computer & laptop** opens the full appointment popup and preselects **Computer & laptop**.
- Clicking **Open full appointment request** opens the first appointment step with no preselected service.
- The popup exposes its close control and preserves the existing smooth open/close animation.
- `pnpm typecheck`: passed.
- `pnpm lint`: passed.
- `pnpm run build`: passed after allowing the configured Google Font request; optimized server and standalone output were generated.

final result: passed
