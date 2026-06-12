"use client";

import type { BiodataCategory, BiodataTemplate } from "@/types/biodata";
import { Check, Eye, Grid2X2, LayoutTemplate, List } from "lucide-react";
import { useState } from "react";

interface TemplateGalleryProps {
  category: BiodataCategory;
  templates: BiodataTemplate[];
  selectedId: string;
  onSelect: (templateId: string) => void;
  onFillDetails: () => void;
  onPreview: (template: BiodataTemplate) => void;
}

export function TemplateGallery({ category, templates, selectedId, onSelect, onFillDetails, onPreview }: TemplateGalleryProps) {
  const categoryTemplates = templates.filter((template) => template.category === category);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-stone-950">Choose a design template</h2>
          <p className="text-sm text-stone-600">{categoryTemplates.length} printable A4 templates in this category.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-md border border-stone-300 bg-white p-1 shadow-sm">
            <button
              type="button"
              className={`inline-flex h-9 w-9 items-center justify-center rounded ${
                viewMode === "grid" ? "bg-amber-100 text-amber-800" : "text-stone-600 hover:bg-stone-100"
              }`}
              aria-label="Grid view"
              title="Grid view"
              onClick={() => setViewMode("grid")}
            >
              <Grid2X2 size={18} />
            </button>
            <button
              type="button"
              className={`inline-flex h-9 w-9 items-center justify-center rounded ${
                viewMode === "list" ? "bg-amber-100 text-amber-800" : "text-stone-600 hover:bg-stone-100"
              }`}
              aria-label="List view"
              title="List view"
              onClick={() => setViewMode("list")}
            >
              <List size={19} />
            </button>
          </div>
          <LayoutTemplate className="hidden text-amber-700 sm:block" size={28} />
        </div>
      </div>
      <div className={viewMode === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-4"}>
        {categoryTemplates.map((template) => {
          const isSelected = selectedId === template.id;

          return (
            <article
              key={template.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onClick={() => onSelect(template.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(template.id);
                }
              }}
              className={`cursor-pointer overflow-hidden rounded-lg border bg-white text-left shadow-sm transition hover:shadow-soft ${
                isSelected ? "border-amber-500 ring-2 ring-amber-200" : "border-stone-200"
              } ${viewMode === "list" ? "sm:grid sm:grid-cols-[260px_1fr]" : ""}`}
            >
              <div
                className={viewMode === "list" ? "h-36 p-4 sm:h-full" : "h-28 p-4"}
                style={{
                  background: template.theme.background,
                  color: template.theme.text
                }}
              >
                <div className="h-full rounded-md bg-white/80 p-3" style={{ border: template.borderStyle }}>
                  <div className="h-3 w-2/3 rounded" style={{ background: template.theme.primary }} />
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <span className="h-2 rounded" style={{ background: template.theme.accent }} />
                    <span className="h-2 rounded bg-stone-200" />
                    <span className="h-2 rounded bg-stone-200" />
                    <span className="h-2 rounded" style={{ background: template.theme.secondary }} />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-stone-950">{template.name}</h3>
                    <p className="mt-1 text-sm leading-5 text-stone-600">{template.description}</p>
                  </div>
                  {isSelected ? <Check className="shrink-0 text-amber-700" size={20} /> : null}
                </div>
                <p className="mt-3 text-xs uppercase tracking-wide text-stone-500">
                  {template.layout} / {template.headingStyle}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn-secondary flex-1 justify-center sm:flex-none"
                    onClick={(event) => {
                      event.stopPropagation();
                      onPreview(template);
                    }}
                  >
                    <Eye size={18} /> Preview
                  </button>
                  {isSelected ? (
                    <button
                      type="button"
                      className="btn-primary flex-1 justify-center sm:flex-none"
                      onClick={(event) => {
                        event.stopPropagation();
                        onFillDetails();
                      }}
                    >
                      <Check size={18} /> Select and fill details
                    </button>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
