# Homepage Design QA

## Appointment launcher

- Feature: the homepage "Ready to get started?" appointment area.
- Source: `C:\Users\ROWTECH\AppData\Local\Temp\codex-clipboard-db9e3c74-6dd7-4b64-b091-fb271c349fc4.png`.
- Implementation: `http://localhost:3000/#request`.
- The supplied reference and local implementation were reviewed together. The incomplete mini-form was replaced by four clear service launchers and one full-request action while preserving the two-column structure, brand-colour progress cue and manual-confirmation message.
- Computer & laptop preselection and the full appointment popup were verified.

## Mobile responsive follow-up

- Source: `C:\Users\ROWTECH\AppData\Local\Temp\codex-clipboard-682c699f-e3ab-4576-8952-8e6ae05e6ee4.png`.
- Implementation: `http://localhost:3000/` at 390 x 844 and 320px narrow-width checks.
- The mobile hero and navigation remain inside the viewport. The mobile menu exposes Services, Support options, How it works and FAQ.
- All rendered hero paragraphs have a computed minimum font size of 13px.

## Modern hero slider

### Visual truth and implementation evidence

- Reference 1: `C:\Users\ROWTECH\Downloads\Screenshot 2026-07-21 140428.png`.
- Reference 2: `C:\Users\ROWTECH\AppData\Local\Temp\codex-clipboard-e44600f4-42a2-4a5a-99ca-e74355b49be8.png`.
- Desktop implementation capture: `D:\geeks-near-me\tmp\qa\hero-desktop-final.png` at 1440 x 900.
- Mobile implementation capture: `D:\geeks-near-me\tmp\qa\hero-mobile-native.png` at 390 x 844.
- Both supplied references and the desktop implementation were opened together in one visual comparison.

### Visual comparison

- The implementation preserves the strongest reference qualities: full-bleed service imagery, a dark brand-led surface, high-contrast copy on the left, a clear human/technology subject on the right and an immediately visible booking action.
- The old-style dots-and-arrows pattern was intentionally replaced with a glassy four-part story rail that names each service. This makes the slider state understandable without waiting for the next slide.
- Four original, on-brand image assets were generated for on-site support, Wi-Fi help, device setup and small-business IT, then compressed to production-friendly JPEGs.
- Desktop spacing keeps the H1, support copy, primary CTA, phone action, confirmation note and full story rail visible in the first viewport.
- Mobile keeps the service story readable, stacks both CTAs, exposes a pause control and uses a two-column service rail without horizontal document overflow.

### Content and interaction QA

- Slide content is real and SEO-focused: Sydney IT support, Wi-Fi and home network help, new-device/printer/software setup and small-business IT support.
- Automatic progression runs every seven seconds and pauses on hover, keyboard focus or the explicit pause control.
- Previous/next controls, direct story selection, ArrowLeft/ArrowRight keyboard navigation and touch-swipe logic are implemented.
- The Business IT hero CTA opened the appointment popup with "Small business IT" already selected.
- All four hero images loaded successfully at their natural dimensions. No new browser console errors or warnings appeared after the final eager-loading update.
- Reduced-motion users receive immediate transitions and no animated progress rail.

## Validation

- `pnpm typecheck`: passed.
- `pnpm lint`: passed.
- `pnpm run build`: passed; the homepage and not-found route were statically generated.

## Brand, employee imagery and footer refresh

### Source and implementation evidence

- Official logo source: `C:\Users\ROWTECH\Downloads\Untitled (512 x 200 px) (1).svg`.
- Announcement-bar reference: `C:\Users\ROWTECH\AppData\Local\Temp\codex-clipboard-2bbd1f8d-0590-4c71-85fe-fe5fb0266df6.png`.
- Desktop hero/header capture: `D:\geeks-near-me\tmp\qa\desktop-brand-footer.png` at 1440 x 900.
- Branded Business IT slide capture: `D:\geeks-near-me\tmp\qa\desktop-business-slide.png` at 1440 x 900.
- Desktop footer capture: `D:\geeks-near-me\tmp\qa\desktop-footer.png` at 1440 x 900.
- Mobile header/hero capture: `D:\geeks-near-me\tmp\qa\mobile-header-hero.png` at 390 x 844.
- Mobile footer capture: `D:\geeks-near-me\tmp\qa\mobile-footer.png` at 390 x 844.
- The supplied logo and top-strip reference were reviewed together with the desktop and mobile implementation captures.

### Visual and interaction QA

- The supplied blue/green horizontal logo is used in the header, appointment popup and footer with its original proportions preserved.
- Hero slides 1 and 4 use edited employee imagery with the supplied Geeks Near Me mark on employee polo shirts; people, equipment and scene composition remain intact.
- The duplicate top-strip appointment link was removed and the availability message is centered at desktop and mobile widths.
- The footer now includes a conversion CTA, brand summary, navigation, popular services, contact details, operating availability, manual-confirmation reassurance and the official Facebook page.
- The Facebook link resolves to `https://www.facebook.com/geeksnearme` and opens in a new tab.
- The footer Computer & laptop link opened the appointment popup with Computer & laptop already selected; the popup closed cleanly back to the same page state.
- Mobile navigation opened and closed successfully, and the footer changed from four columns to one without horizontal overflow.
- Desktop and mobile captures show no clipped logo, CTA, hero copy or footer column at the tested viewports.

## Final validation

- `pnpm typecheck`: passed.
- `pnpm lint`: passed.
- `pnpm run build`: passed; the homepage and not-found route were statically generated.

final result: passed
