"use client";

import type { BiodataFormData, BiodataTemplate, FieldDefinition, SectionKey } from "@/types/biodata";
import { dividerOrnament, marigoldGarland } from "@/templates/patterns";
import { formatFieldValue, getFieldsForCategory, getSectionTitle } from "@/utils/fields";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

export interface BiodataDocumentProps {
  data: BiodataFormData;
  template: BiodataTemplate;
  id?: string;
  /**
   * `full` measures the real rendered heights and paginates onto as many A4 pages as needed.
   * `static` renders a single page without measuring (cheap; used for gallery thumbnails).
   */
  mode?: "full" | "static";
  /** Fires after pagination is settled (and again whenever it re-runs). */
  onReady?: (pageCount: number) => void;
}

interface Row {
  key: string;
  label: string;
  value: string;
}

interface Section {
  key: SectionKey;
  title: string;
  rows: Row[];
}

interface Chunk extends Section {
  continued: boolean;
}

type Column = Chunk[];
type Page = Column[];

const MM = 96 / 25.4;
const PAGE_HEIGHT_MM = 297;
const CONTINUED_TOP_MM = 18;

function buildSections(data: BiodataFormData, fields: FieldDefinition[]): Section[] {
  return data.sectionOrder
    .map((key) => {
      const builtIn = fields
        .filter((field) => field.section === key)
        .map((field) => ({ key: field.key, label: field.label, value: formatFieldValue(field, (data.fields[field.key] ?? "").trim()) }))
        .filter((row) => row.value);
      const custom = data.customFields
        .filter((field) => field.section === key && field.label.trim() && field.value.trim())
        .map((field) => ({ key: `custom-${field.id}`, label: field.label.trim(), value: field.value.trim() }));
      return { key, title: getSectionTitle(key), rows: [...builtIn, ...custom] };
    })
    .filter((section) => section.rows.length > 0);
}

/** Cheap column balancing for static thumbnails. */
function staticPages(sections: Section[], columns: 1 | 2): Page[] {
  if (columns === 1) return [[sections.map((section) => ({ ...section, continued: false }))]];
  const total = sections.reduce((sum, section) => sum + section.rows.length + 2, 0);
  const left: Chunk[] = [];
  const right: Chunk[] = [];
  let used = 0;
  sections.forEach((section) => {
    const weight = section.rows.length + 2;
    if (used + weight / 2 <= total / 2 || !left.length) {
      left.push({ ...section, continued: false });
      used += weight;
    } else {
      right.push({ ...section, continued: false });
    }
  });
  return [[left, right]];
}

function tint(hex: string, alpha: number) {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!match) return hex;
  const [r, g, b] = [match[1], match[2], match[3]].map((part) => parseInt(part, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function cssVars(template: BiodataTemplate): React.CSSProperties {
  const { theme, fonts, padding } = template;
  return {
    "--bio-primary-tint": tint(theme.primary, template.dark ? 0.16 : 0.08),
    "--bio-accent-tint": tint(theme.accent, template.dark ? 0.2 : 0.16),
    "--bio-rule-image": dividerOrnament(theme.accent),
    "--bio-garland": marigoldGarland(),
    "--bio-paper": theme.paper,
    "--bio-ink": theme.ink,
    "--bio-muted": theme.muted,
    "--bio-primary": theme.primary,
    "--bio-secondary": theme.secondary,
    "--bio-accent": theme.accent,
    "--bio-band": theme.band,
    "--bio-on-band": theme.onBand,
    "--bio-line": theme.line,
    "--bio-font-heading": fonts.heading,
    "--bio-font-body": fonts.body,
    "--pad-top": `${padding.top}mm`,
    "--pad-right": `${padding.right}mm`,
    "--pad-bottom": `${padding.bottom}mm`,
    "--pad-left": `${padding.left}mm`,
    "--band-h": `${template.bandHeight ?? 44}mm`,
    "--side-w": `${template.sideWidth ?? 62}mm`,
    "--bio-frame-image": template.assets?.frame ? `url("${template.assets.frame}")` : "none",
    "--bio-watermark": template.assets?.watermark ? `url("${template.assets.watermark}")` : "none",
    "--bio-watermark-opacity": template.watermarkOpacity ?? 0.06,
    "--bio-pattern": template.pattern ?? "none",
    "--bio-pattern-opacity": template.patternOpacity ?? 0.1,
    "--bio-decor": template.decor ?? "none",
    "--bio-header-pattern": template.headerPattern ?? "none"
  } as React.CSSProperties;
}

export function BiodataDocument({ data, template, id, mode = "full", onReady }: BiodataDocumentProps) {
  const fields = useMemo(() => getFieldsForCategory(data.category), [data.category]);
  const sections = useMemo(() => buildSections(data, fields), [data, fields]);
  const measureRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<Page[] | null>(null);
  const [fontsTick, setFontsTick] = useState(0);

  const isStatic = mode === "static";

  const paginate = useCallback(() => {
    const root = measureRef.current;
    if (!root) return;

    const header = root.querySelector<HTMLElement>(".bio-header");
    const columnEl = root.querySelector<HTMLElement>(".bio-col");
    if (!columnEl) return;

    const headerHeight = header ? outerHeight(header) : 0;
    const bodyHeight = (PAGE_HEIGHT_MM - template.padding.top - template.padding.bottom) * MM;
    const continuedTop = Math.max(template.padding.top, template.header === "banner" ? CONTINUED_TOP_MM : template.padding.top);
    const continuedBodyHeight = (PAGE_HEIGHT_MM - continuedTop - template.padding.bottom) * MM;
    const sectionGap = parseFloat(getComputedStyle(columnEl).rowGap || getComputedStyle(columnEl).gap || "0") || 0;

    const measured = sections.map((section) => {
      const sectionEl = root.querySelector<HTMLElement>(`[data-section="${section.key}"]`);
      const headingEl = sectionEl?.querySelector<HTMLElement>("h2");
      const rowsEl = sectionEl?.querySelector<HTMLElement>(".bio-rows");
      const rowGap = rowsEl ? parseFloat(getComputedStyle(rowsEl).rowGap || "0") || 0 : 0;
      const headingHeight = headingEl ? outerHeight(headingEl) : 0;
      const rowHeights = section.rows.map((row) => {
        const rowEl = sectionEl?.querySelector<HTMLElement>(`[data-row="${cssEscape(row.key)}"]`);
        return rowEl ? rowEl.getBoundingClientRect().height : 0;
      });
      return { headingHeight, rowGap, rowHeights };
    });

    const result: Page[] = [];
    let page: Page = [];
    let column: Column = [];
    let columnIndex = 0;
    let used = 0;
    const columnsPerPage = template.columns;

    const availableFor = (pageIndex: number) => (pageIndex === 0 ? bodyHeight - headerHeight : continuedBodyHeight);

    const closeColumn = () => {
      page.push(column);
      column = [];
      used = 0;
      columnIndex += 1;
      if (columnIndex >= columnsPerPage) {
        result.push(page);
        page = [];
        columnIndex = 0;
      }
    };

    sections.forEach((section, sectionIndex) => {
      const { headingHeight, rowGap, rowHeights } = measured[sectionIndex];
      let remaining = section.rows.map((row, index) => ({ row, height: rowHeights[index] }));
      let continued = false;

      while (remaining.length) {
        const available = availableFor(result.length);
        const lead = (column.length ? sectionGap : 0) + headingHeight;
        let consumed = lead;
        let count = 0;

        while (count < remaining.length) {
          const extra = remaining[count].height + (count > 0 ? rowGap : 0);
          if (used + consumed + extra > available + 0.5) break;
          consumed += extra;
          count += 1;
        }

        const columnEmpty = column.length === 0;
        const orphanHeading = count < 2 && remaining.length > 2;

        if ((count === 0 || orphanHeading) && !columnEmpty) {
          closeColumn();
          continue;
        }
        if (count === 0) count = 1; // a single row taller than a page: place it anyway

        column.push({ ...section, rows: remaining.slice(0, count).map((item) => item.row), continued });
        used += consumed;
        remaining = remaining.slice(count);
        continued = true;
      }
    });

    if (column.length || page.length) {
      page.push(column);
      while (page.length < columnsPerPage) page.push([]);
      result.push(page);
    }

    if (!result.length) result.push([[]]);
    setPages(result);
  }, [sections, template]);

  useLayoutEffect(() => {
    if (isStatic) return;
    paginate();
  }, [paginate, isStatic, data.photo, data.invocation, data.tagline, fontsTick]);

  useEffect(() => {
    if (isStatic || typeof document === "undefined" || !("fonts" in document)) return;
    let cancelled = false;
    const bump = () => {
      if (!cancelled) setFontsTick((tick) => tick + 1);
    };
    document.fonts.ready.then(bump);
    // Fonts referenced only by this document may start loading after mount.
    document.fonts.addEventListener("loadingdone", bump);
    return () => {
      cancelled = true;
      document.fonts.removeEventListener("loadingdone", bump);
    };
  }, [isStatic]);

  useEffect(() => {
    if (pages && onReady) onReady(pages.length);
  }, [pages, onReady]);

  const finalPages: Page[] = isStatic ? staticPages(sections, template.columns) : pages ?? staticPages(sections, template.columns);
  const style = cssVars(template);
  const pageClass = [
    "bio-page",
    `tpl-${template.id}`,
    `frame-${template.frame}`,
    `header-${template.header}`,
    `headings-${template.headings}`,
    `photo-${template.photo}`,
    `cols-${template.columns}`,
    template.dark ? "bio-dark" : ""
  ].join(" ");

  return (
    <div className="bio-document" id={id} style={style}>
      {finalPages.map((page, pageIndex) => (
        <article
          key={pageIndex}
          className={`${pageClass} ${pageIndex === 0 ? "bio-page--first" : "bio-page--continued"}`}
          aria-label={`Page ${pageIndex + 1} of ${finalPages.length}`}
        >
          <PageChrome template={template} />
          {template.header === "sidebar" ? <Sidebar data={data} template={template} first={pageIndex === 0} /> : null}
          <div className="bio-body">
            {pageIndex === 0 && template.header !== "sidebar" ? <Header data={data} template={template} /> : null}
            {sections.length === 0 && pageIndex === 0 ? (
              <div className="bio-empty">
                <strong>Your biodata will appear here.</strong>
                <span>Start filling in the form and the preview updates live.</span>
              </div>
            ) : null}
            <div className="bio-columns">
              {page.map((column, columnIndex) => (
                <div key={columnIndex} className="bio-col">
                  {column.map((chunk, chunkIndex) => (
                    <SectionBlock key={`${chunk.key}-${chunkIndex}`} chunk={chunk} />
                  ))}
                </div>
              ))}
            </div>
          </div>
          {finalPages.length > 1 && template.frame !== "image" ? (
            <div className="bio-pagenum">
              {pageIndex + 1} / {finalPages.length}
            </div>
          ) : null}
        </article>
      ))}

      {!isStatic ? (
        <div className="bio-measure" ref={measureRef} aria-hidden="true">
          <article className={`${pageClass} bio-page--first bio-page--measure`}>
            {template.header === "sidebar" ? <Sidebar data={data} template={template} first /> : null}
            <div className="bio-body">
              {template.header !== "sidebar" ? <Header data={data} template={template} /> : null}
              <div className="bio-columns">
                <div className="bio-col">
                  {sections.map((section) => (
                    <SectionBlock key={section.key} chunk={{ ...section, continued: false }} measure />
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </div>
  );
}

function PageChrome({ template }: { template: BiodataTemplate }) {
  return (
    <>
      <div className="bio-pattern" />
      <div className="bio-frame-layer" />
      <div className="bio-decor" />
      {template.assets?.watermark ? <div className="bio-watermark" /> : null}
    </>
  );
}

function Photo({ src, alt }: { src?: string; alt: string }) {
  if (!src) return null;
  return (
    <div className="bio-photo">
      <img src={src} alt={alt} />
    </div>
  );
}

function Header({ data, template }: { data: BiodataFormData; template: BiodataTemplate }) {
  const name = data.fields.fullName?.trim() || "Your Name";
  const invocation = data.invocation?.trim();
  const tagline = data.tagline?.trim();
  const script = scriptFor(invocation);

  return (
    <header className="bio-header">
      {invocation ? <p className={`bio-invocation ${script}`}>{invocation}</p> : null}
      <div className="bio-identity">
        <Photo src={data.photo} alt={name} />
        <div className="bio-identity-text">
          <h1 className="bio-name">{name}</h1>
          {tagline ? <p className="bio-tagline">{tagline}</p> : null}
        </div>
      </div>
      {template.headerRule || template.headings === "ornate" ? <div className="bio-rule" /> : null}
    </header>
  );
}

function Sidebar({ data, first }: { data: BiodataFormData; template: BiodataTemplate; first: boolean }) {
  const name = data.fields.fullName?.trim() || "Your Name";
  const invocation = data.invocation?.trim();
  return (
    <aside className="bio-side">
      {first ? (
        <>
          {invocation ? <p className={`bio-invocation ${scriptFor(invocation)}`}>{invocation}</p> : null}
          <Photo src={data.photo} alt={name} />
          <h1 className="bio-name">{name}</h1>
          {data.tagline?.trim() ? <p className="bio-tagline">{data.tagline}</p> : null}
        </>
      ) : (
        <p className="bio-side-name">{name}</p>
      )}
    </aside>
  );
}

function SectionBlock({ chunk, measure = false }: { chunk: Chunk; measure?: boolean }) {
  return (
    <section className="bio-section" data-section={measure ? chunk.key : undefined}>
      <h2>
        <span>{chunk.title}</span>
        {chunk.continued ? <em className="bio-continued">(contd.)</em> : null}
      </h2>
      <dl className="bio-rows">
        {chunk.rows.map((row) => (
          <div key={row.key} className="bio-row" data-row={measure ? row.key : undefined}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function scriptFor(text?: string) {
  if (!text) return "";
  if (/[؀-ۿ]/.test(text)) return "script-arabic";
  if (/[਀-੿]/.test(text)) return "script-gurmukhi";
  if (/[ऀ-ॿ]/.test(text)) return "script-devanagari";
  return "script-latin";
}

function outerHeight(element: HTMLElement) {
  const style = getComputedStyle(element);
  return element.getBoundingClientRect().height + (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0);
}

function cssEscape(value: string) {
  return typeof CSS !== "undefined" && CSS.escape ? CSS.escape(value) : value.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}
