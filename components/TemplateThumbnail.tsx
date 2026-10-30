"use client";

import { BiodataDocument } from "@/components/document/BiodataDocument";
import { DocumentViewport } from "@/components/document/DocumentViewport";
import { createSampleData } from "@/templates/sample";
import type { BiodataCategory, BiodataTemplate } from "@/types/biodata";
import { useMemo } from "react";

interface TemplateThumbnailProps {
  template: BiodataTemplate;
  category?: BiodataCategory;
  className?: string;
}

/** A real, scaled-down render of the first page of a template with sample data. */
export function TemplateThumbnail({ template, category, className = "" }: TemplateThumbnailProps) {
  const sampleCategory = category ?? template.suitedFor[0] ?? "general";
  const data = useMemo(() => createSampleData(sampleCategory, template.id), [sampleCategory, template.id]);

  return (
    <div className={`thumb ${className}`} aria-hidden="true">
      <DocumentViewport>
        <BiodataDocument data={data} template={template} mode="static" />
      </DocumentViewport>
    </div>
  );
}
