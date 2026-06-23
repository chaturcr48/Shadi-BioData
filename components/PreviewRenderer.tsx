"use client";

import type { BiodataFormData, BiodataTemplate, FieldDefinition, SectionKey } from "@/types/biodata";
import { getFieldsForCategory, getSectionTitle } from "@/utils/fields";
import { useMemo } from "react";

interface PreviewRendererProps {
  data: BiodataFormData;
  template: BiodataTemplate;
  id?: string;
}

interface PreviewField {
  label: string;
  value: string;
}

interface PreviewSection {
  section: SectionKey;
  rows: PreviewField[];
}

function fieldRows(fields: FieldDefinition[], data: BiodataFormData, section: SectionKey): PreviewField[] {
  const builtIn = fields
    .filter((field) => field.section === section)
    .map((field) => ({ label: field.label, value: data.fields[field.key]?.trim() ?? "" }))
    .filter((field) => field.value);

  const custom = data.customFields
    .filter((field) => field.section === section && field.label.trim() && field.value.trim())
    .map((field) => ({ label: field.label.trim(), value: field.value.trim() }));

  return [...builtIn, ...custom];
}

function sectionWeight(section: PreviewSection, template: BiodataTemplate) {
  const headingWeight = 3;
  const rowWeight = template.ornament === "gold-ornate" ? 1.15 : 1;
  return headingWeight + section.rows.length * rowWeight;
}

function paginateSections(sections: PreviewSection[], template: BiodataTemplate): PreviewSection[][] {
  if (!sections.length) return [[]];

  if (template.ornament === "gold-ornate") {
    const totalWeight = sections.reduce((total, section) => total + sectionWeight(section, template), 0);

    if (totalWeight <= 34) {
      return [sections];
    }

    const targetFirstPageWeight = totalWeight / 2;
    const firstPage: PreviewSection[] = [];
    const secondPage: PreviewSection[] = [];
    let firstPageWeight = 0;

    sections.forEach((section) => {
      const nextWeight = sectionWeight(section, template);
      const shouldStayOnFirstPage =
        !firstPage.length || firstPageWeight + nextWeight <= targetFirstPageWeight || !secondPage.length && firstPage.length < 3;

      if (shouldStayOnFirstPage) {
        firstPage.push(section);
        firstPageWeight += nextWeight;
      } else {
        secondPage.push(section);
      }
    });

    return secondPage.length ? [firstPage, secondPage] : [firstPage];
  }

  const maxWeight = 36;
  const pages: PreviewSection[][] = [];
  let currentPage: PreviewSection[] = [];
  let currentWeight = 0;

  sections.forEach((section) => {
    const nextWeight = sectionWeight(section, template);

    if (currentPage.length && currentWeight + nextWeight > maxWeight) {
      pages.push(currentPage);
      currentPage = [];
      currentWeight = 0;
    }

    currentPage.push(section);
    currentWeight += nextWeight;
  });

  if (currentPage.length) pages.push(currentPage);

  return pages;
}

export function PreviewRenderer({ data, template, id = "biodata-pdf" }: PreviewRendererProps) {
  const fields = useMemo(() => getFieldsForCategory(data.category), [data.category]);
  const fullName = data.fields.fullName?.trim() || "Marriage Biodata";
  const visibleSections = data.sectionOrder
    .map((section) => ({ section, rows: fieldRows(fields, data, section) }))
    .filter((section) => section.rows.length);
  const pages = paginateSections(visibleSections, template);

  const style = {
    "--bio-bg": template.theme.background,
    "--bio-paper": template.theme.paper,
    "--bio-primary": template.theme.primary,
    "--bio-secondary": template.theme.secondary,
    "--bio-accent": template.theme.accent,
    "--bio-card-bg": template.theme.background,
    "--bio-text": template.theme.text,
    "--bio-muted": template.theme.muted,
    "--bio-border": template.borderStyle,
    "--bio-font": template.fontFamily
  } as React.CSSProperties;

  return (
    <div className="preview-shell" style={style}>
      <div id={id} className="bio-document" style={style}>
        {pages.map((pageSections, pageIndex) => (
          <article
            key={`page-${pageIndex}`}
            style={style}
            className={`bio-page layout-${template.layout} heading-${template.headingStyle} ornament-${template.ornament}`}
          >
            <header className="bio-header avoid-break">
              <div className="bio-mark" aria-hidden="true">
                <span className="bio-heart">&hearts;</span>
              </div>
              <p className="bio-kicker">{template.name}</p>
              <h1>{fullName}</h1>
              <p className="bio-subtitle">Marriage Biodata</p>
            </header>

            <div className="bio-content">
              {visibleSections.length ? (
                pageSections.map(({ section, rows }) => (
                  <section key={`${pageIndex}-${section}`} className="bio-section avoid-break">
                    <h2>{getSectionTitle(section)}</h2>
                    <div className="bio-fields">
                      {rows.map((row) => (
                        <div key={`${section}-${row.label}`} className="bio-field">
                          <dt>{row.label}</dt>
                          <dd>{row.value}</dd>
                        </div>
                      ))}
                    </div>
                  </section>
                ))
              ) : (
                <section className="bio-section avoid-break">
                  <h2>Preview</h2>
                  <p className="bio-empty">Fill the form to see your biodata here.</p>
                </section>
              )}
            </div>

            <footer className="bio-footer avoid-break">
              <span>Created with Free Marriage Biodata Maker</span>
              {pages.length > 1 ? <span>Page {pageIndex + 1} of {pages.length}</span> : null}
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
