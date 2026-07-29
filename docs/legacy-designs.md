# Preserved design routes

The simplified one-page website is the active homepage at `/`.

The previous designs remain available and their source files have not been
rewritten:

- Previous homepage: `/legacy-home`
- Previous services landing page: `/services`

## Source locations

- `app/legacy-home/page.tsx`
- `app/legacy-home/page.module.css`
- `app/services/page.tsx`
- `app/services/page.module.css`
- `components/services/`

The active homepage and callback form use isolated files:

- `app/page.tsx`
- `app/page.module.css`
- `components/callback/`

To restore the former homepage later, copy the two files from
`app/legacy-home/` back to `app/` and remove or relocate the simplified
homepage files first. The `/legacy-home` route is marked `noindex` so search
engines do not treat it as a second public homepage.
