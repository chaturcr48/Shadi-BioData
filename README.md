# Shadi BioData

Free, private marriage biodata maker. Pick one of 25 templates, fill in your details and photo, preview live, and download a print-ready A4 PDF. Everything runs in the browser; nothing is uploaded.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

| Path | What it is |
| --- | --- |
| `app/page.tsx` | Landing page (hero, categories, featured templates, how it works, FAQ). |
| `app/templates` | Template gallery and per-template detail pages (`/templates/[id]`). |
| `app/create` | The editor: form on the left, live A4 preview on the right, PDF export. |
| `app/document.css` | All biodata document styles, sized in millimetres so screen, PDF and print match. |
| `components/document/BiodataDocument.tsx` | Renders a biodata onto A4 pages. Measures real heights in a hidden copy and paginates so headings never orphan. |
| `templates/index.ts` | The template catalogue. Each template is plain data: colours, fonts, frame type, ornaments, padding. |
| `templates/patterns.ts` | Inline SVG ornaments (damask, arabesque, rangoli corners, marigold garland…) used as CSS backgrounds. |
| `utils/fields.ts` | Field definitions per community, section titles, default invocations. |
| `utils/pdf.ts` | html2canvas + jsPDF export of each `.bio-page`. |
| `public/biodata_assets/processed` | Frame and watermark artwork (WebP versions are the ones in use). |

## Adding a template

Add an entry to `templates/index.ts`. Combine a `frame` (`image`, `double`, `pinline`, `band`, `arch`, `edge`, `sidebar`, `stripe`, `garland`, `none`), a `header` (`classic`, `split`, `banner`, `sidebar`), a `headings` style, a `photo` shape, `columns` and `padding` (mm). Optional `pattern`, `decor` and `headerPattern` take values from `templates/patterns.ts`. Template-specific tweaks go under `.tpl-<id>` in `app/document.css`.
