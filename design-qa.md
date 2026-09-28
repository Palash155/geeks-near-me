# Design QA

Reference set:

- `C:\Users\ROWTECH\Downloads\Geeks for me\1.jpeg`
- `C:\Users\ROWTECH\Downloads\Geeks for me\2.jpeg`
- `C:\Users\ROWTECH\Downloads\Geeks for me\3.jpeg`
- `C:\Users\ROWTECH\Downloads\Geeks for me\Pop UP.jpeg`

Implementation evidence:

- `D:\geeks-near-me\tmp\qa-desktop.png`
- `D:\geeks-near-me\tmp\qa-mobile.png`
- `D:\geeks-near-me\tmp\design-qa-comparison.png`

## Findings

- Typography and hierarchy: passed. The supplied headings, support line, service names, advice, CTA copy and callback form labels are reproduced without demo copy.
- Layout and spacing: passed. Header, safety banner, centered introduction, 3×2 desktop service grid, support CTA and existing rich footer follow the supplied structure. Responsive checks at 1440×1000 and 390×844 show no horizontal overflow.
- Colour and styling: passed. Navy, blue, green, red-alert and pale-blue surfaces match the reference direction while retaining the existing project tokens.
- Logo: passed. The existing Geeks Near Me logo remains in the site and callback popup.
- Interaction: passed. Every service card opens the popup with the correct selected service and prefilled description. Generic call-back triggers use “Not sure yet”. Close, keyboard Escape, focus return, validation, preferred-time selection and preview submission were checked.
- Motion: passed. Existing card/button hover behaviour is retained; page entrance and popup open/close motion are smooth and respect reduced-motion preferences.
- Responsive and accessibility: passed. Mobile header controls remain reachable, the form becomes single-column, labels are associated with fields, the dialog traps focus and Escape closes it.
- Runtime: passed. No browser console warnings/errors were found. ESLint, TypeScript and production build all pass.

final result: passed

## Latest two-page reference redesign

- Compared the rendered homepage at a 665 px viewport with client reference image 1. Confirmed the header, photo hero, two-column six-service grid, call-back panel, help banner, benefit row, and replacement footer.
- Compared the rendered appointment page at a 1024 px viewport with client reference image 2. Confirmed the selected service, one-column input stack, right-side support panels, bottom location panel, and shared footer.
- Checked a 390 px mobile viewport: the form remains single-column and usable. Both pages have no horizontal overflow.
- Clicked a service card and confirmed the booking page receives the selected service in its URL and visible panel.
- `npm run typecheck`, `npm run lint`, and `npm run build` passed.
- Booking page buttons are intentionally visual-only pending the next implementation phase; they do not submit or navigate.

final result: passed
