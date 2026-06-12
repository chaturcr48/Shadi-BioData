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

export function PreviewRenderer({ data, template, id = "biodata-pdf" }: PreviewRendererProps) {
  const fields = useMemo(() => getFieldsForCategory(data.category), [data.category]);
  const fullName = data.fields.fullName?.trim() || "Marriage Biodata";
  const visibleSections = data.sectionOrder
    .map((section) => ({ section, rows: fieldRows(fields, data, section) }))
    .filter((section) => section.rows.length);

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
      <article
        id={id}
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
            visibleSections.map(({ section, rows }) => (
              <section key={section} className="bio-section avoid-break">
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
        </footer>
      </article>
    </div>
  );
}
