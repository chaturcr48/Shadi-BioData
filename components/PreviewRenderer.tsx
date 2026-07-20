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
  section: string;
  title: string;
  rows: PreviewField[];
  continued?: boolean;
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

function rowWeight(row: PreviewField, template: BiodataTemplate) {
  const charsPerLine = template.layout === "two-column" || template.ornament === "gold-ornate" || template.ornament === "ganesha-premium" ? 34 : 48;
  const valueLines = Math.max(1, Math.ceil(row.value.length / charsPerLine));
  const labelLines = row.label.length > 28 ? 1.25 : 1;
  return labelLines + Math.max(0, valueLines - 1) * 0.8;
}

function sectionWeight(section: PreviewSection, template: BiodataTemplate) {
  const headingWeight = section.continued ? 2.2 : 3;
  const rowMultiplier = template.ornament === "gold-ornate" ? 0.9 : 1;
  return headingWeight + section.rows.reduce((total, row) => total + rowWeight(row, template) * rowMultiplier, 0);
}

function pageWeightLimit(template: BiodataTemplate) {
  if (template.ornament === "ganesha-premium") return 24;
  if (template.ornament === "red-elephant") return 23;
  if (template.ornament === "dark-floral") return 18;
  if (template.ornament === "temple-gold") return 20;
  if (template.ornament === "blush-vines") return 27;
  if (template.layout === "cards") return 24;
  if (template.layout === "centered") return 26;
  if (template.layout === "two-column") return 29;
  return 28;
}

function splitSection(section: PreviewSection, template: BiodataTemplate, maxWeight: number): PreviewSection[] {
  if (sectionWeight(section, template) <= maxWeight) return [section];

  const chunks: PreviewSection[] = [];
  let currentRows: PreviewField[] = [];
  let currentWeight = 3;

  section.rows.forEach((row) => {
    const nextWeight = rowWeight(row, template) * (template.ornament === "gold-ornate" ? 0.9 : 1);

    if (currentRows.length && currentWeight + nextWeight > maxWeight) {
      chunks.push({ section: section.section, title: section.title, rows: currentRows, continued: chunks.length > 0 });
      currentRows = [];
      currentWeight = 2.2;
    }

    currentRows.push(row);
    currentWeight += nextWeight;
  });

  if (currentRows.length) {
    chunks.push({ section: section.section, title: section.title, rows: currentRows, continued: chunks.length > 0 });
  }

  return chunks;
}

function paginateSections(sections: PreviewSection[], template: BiodataTemplate): PreviewSection[][] {
  if (!sections.length) return [[]];

  if (template.ornament === "gold-ornate") {
    const firstPageLimit = 52;
    const totalWeight = sections.reduce((total, section) => total + sectionWeight(section, template), 0);

    if (totalWeight <= firstPageLimit) {
      return [sections];
    }

    const firstPage: PreviewSection[] = [];
    const secondPage: PreviewSection[] = [];
    let firstPageWeight = 0;

    sections.forEach((section) => {
      const nextWeight = sectionWeight(section, template);
      const shouldStayOnFirstPage = !firstPage.length || firstPageWeight + nextWeight <= firstPageLimit;

      if (shouldStayOnFirstPage) {
        firstPage.push(section);
        firstPageWeight += nextWeight;
      } else {
        secondPage.push(section);
      }
    });

    return secondPage.length ? [firstPage, secondPage] : [firstPage];
  }

  const maxWeight = pageWeightLimit(template);
  const pages: PreviewSection[][] = [];
  let currentPage: PreviewSection[] = [];
  let currentWeight = 0;

  sections.forEach((section) => {
    const chunks = splitSection(section, template, Math.max(10, maxWeight - 2));

    chunks.forEach((chunk) => {
      const nextWeight = sectionWeight(chunk, template);

      if (currentPage.length && currentWeight + nextWeight > maxWeight) {
        pages.push(currentPage);
        currentPage = [];
        currentWeight = 0;
      }

      currentPage.push(chunk);
      currentWeight += nextWeight;
    });
  });

  if (currentPage.length) pages.push(currentPage);

  return pages;
}

export function PreviewRenderer({ data, template, id = "biodata-pdf" }: PreviewRendererProps) {
  const fields = useMemo(() => getFieldsForCategory(data.category), [data.category]);
  const fullName = data.fields.fullName?.trim() || "Marriage Biodata";
  const isGoldOrnate = template.ornament === "gold-ornate";
  const visibleSections = data.sectionOrder
    .map((section) => ({ section, title: getSectionTitle(section), rows: fieldRows(fields, data, section) }))
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
    "--bio-font": template.fontFamily,
    "--bio-frame-image": template.assets?.frame ? `url("${template.assets.frame}")` : "none",
    "--bio-watermark-image": template.assets?.watermark ? `url("${template.assets.watermark}")` : "none",
    "--bio-icon-image": template.assets?.icon ? `url("${template.assets.icon}")` : "none",
    "--bio-flourish-image": template.assets?.flourish ? `url("${template.assets.flourish}")` : "none"
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
              {!isGoldOrnate ? (
                <div className="bio-mark" aria-hidden="true">
                  <span className="bio-heart">&hearts;</span>
                </div>
              ) : null}
              {template.ornament === "ganesha-premium" || isGoldOrnate ? <p className="bio-invocation">ॐ गणेशाय नमः</p> : null}
              {!isGoldOrnate ? <p className="bio-kicker">{template.name}</p> : null}
              <h1>{fullName}</h1>
              <p className="bio-subtitle">Marriage Biodata</p>
            </header>

            <div className="bio-content">
              {visibleSections.length ? (
                pageSections.map(({ section, title, rows, continued }, sectionIndex) => (
                  <section key={`${pageIndex}-${section}-${sectionIndex}`} className="bio-section avoid-break">
                    <h2>{title}{continued ? " (continued)" : ""}</h2>
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

          </article>
        ))}
      </div>
    </div>
  );
}
