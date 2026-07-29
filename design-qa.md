# Design QA — Fluid container and hero service cards

## Evidence

- Source visual truth, 1065 × 697 source pixels:
  `C:\Users\ROWTECH\AppData\Local\Temp\codex-clipboard-94750390-4c1c-4283-9f85-11f9041e4746.png`
- Laptop implementation, 1366 × 768 CSS-pixel viewport at 1× density:
  `D:\geeks-near-me\tmp\simplified-design\qa-v3\home-laptop-1366x768.png`
- Large-monitor implementation, 1920 × 1080 CSS-pixel viewport at 1× density:
  `D:\geeks-near-me\tmp\simplified-design\qa-v3\home-wide-1920x1080.png`
- Mobile implementation, 390 × 844 CSS-pixel viewport at 1× density:
  `D:\geeks-near-me\tmp\simplified-design\qa-v3\home-mobile-390x844.png`
- Normalized full-view and focused hero comparison:
  `D:\geeks-near-me\tmp\simplified-design\qa-v3\hero-reference-vs-fluid-result.png`
- FAQ source visual truth, 1990 × 632 source pixels:
  `C:\Users\ROWTECH\AppData\Local\Temp\codex-clipboard-3057ad9e-a12d-48b4-ae30-7690e1cd9eb5.png`
- Refined FAQ at 1366 × 768 CSS pixels, 1× density:
  `D:\geeks-near-me\tmp\simplified-design\qa-v4\faq-laptop-1366x768.png`
- Refined FAQ at 1920 × 900 CSS pixels, 1× density:
  `D:\geeks-near-me\tmp\simplified-design\qa-v4\faq-wide-1920x900.png`

The comparison board scales both the annotated source and laptop implementation
to 700 image pixels high. This is a visual normalization only; the browser
measurements above use the original CSS viewport sizes at 1× density.

## State

- Active route: `/`
- Homepage default state at desktop, compact-laptop, wide-monitor, and mobile widths.
- Hero service cards remain interactive callback triggers.
- Existing hover, focus, and reduced-motion behavior is preserved.

## Findings

- No actionable P0, P1, or P2 issue remains.
- Spacing and layout rhythm: navbar, hero, body shells, FAQ, CTA, and footer now
  use one page-level fluid gutter: `clamp(16px, 2.4vw, 48px)`. At the 1920 px
  viewport, measured header, hero, and body padding are all exactly 46.08 px.
  The former 1280 px maximum-width drift is removed from the active homepage.
- Hero grid: the service cards now use the requested 2 / 2 / 1 composition.
  Removing card numbers gives the icon and service title a single clear row and
  prevents the narrow three-column treatment shown in the source screenshot.
- Responsive behavior: cards measure approximately 307 px wide at 1366 px,
  447 px wide at 1920 px, and 226 px wide at the compact 1024 px laptop check.
  There is no overlap or horizontal page overflow. Mobile returns to one
  comfortable card per row.
- Fonts and typography: Plus Jakarta Sans, existing weights, optical hierarchy,
  and readable body sizes remain unchanged. Service titles and callback labels
  no longer compete with a separate number label.
- Colors and tokens: the navy, white, blue, and green brand palette is unchanged.
  Existing hover border and shadow tokens remain applied.
- Image quality: the supplied Sydney home-support raster image is unchanged,
  sharp, and correctly cropped at all tested widths.
- Copy and content: all five real service labels, descriptions, and callback
  actions remain present; no placeholder copy was introduced.
- Icons: existing Phosphor icons and the shared animated arrow are retained.
- Accessibility: semantic service buttons, focus states, minimum tap targets,
  and reduced-motion handling remain present.
- FAQ balance: the headline column is now slightly wider than the accordion
  column. The measured headline is two lines at both 1366 px and 1920 px, while
  the accordion remains 594 px and 849 px wide respectively. No copy, controls,
  hover behavior, or mobile stacking was removed.

## Comparison history

- Pass 1 — P1 responsive density: the annotated implementation used three narrow
  cards across, forcing titles and action labels into avoidable wraps. The grid
  was changed to two columns with the final card spanning both columns, and the
  nonessential numeric labels were removed.
- Pass 2 — P2 cross-section alignment: several active-page wrappers still used a
  1280 px maximum width while others subtracted the global gutter externally.
  A single page-level fluid gutter now controls header, hero, body, FAQ, CTA,
  footer, and policy-shell edges.
- Pass 3 — viewport verification: checked 1920 × 1080, 1366 × 768,
  1024 × 768, and 390 × 844. At 1920 px, the measured shared gutter is 46.08 px;
  at 390 px it is 16 px. Mobile `scrollWidth` is 375 px inside the 390 px browser
  viewport, confirming no new horizontal overflow.
- Pass 4 — P2 FAQ hierarchy: the FAQ intro was constrained to a narrow track,
  forcing the six-word headline into four lines while the accordion consumed
  disproportionate width. Rebalanced the tracks to `1.05fr / 1fr`, reduced the
  maximum gap, and capped the FAQ headline at 58 px. The post-fix capture measures
  exactly two headline lines at both tested desktop widths.

## Interaction and regression checks

- Service cards still expose their callback service values.
- Button/card hover and focus selectors remain unchanged.
- Callback popup implementation and preserved routes were not modified.
- Browser-rendered desktop, wide, compact-laptop, and mobile states were checked.
- Browser console is checked during final verification.
- TypeScript, ESLint, and the production build are checked before handoff.

## Preservation checks

- `/legacy-home` remains untouched.
- `/services` remains untouched.
- Existing callback flow and backend endpoint remain untouched.

final result: passed
