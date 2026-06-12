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
          <h2 className="font-serif text-xl font-bold text-[#221816]">Choose a design template</h2>
          <p className="text-sm text-[#7d6f5c]">{categoryTemplates.length} printable A4 templates in this category.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-md border border-[#e6d3aa] bg-[#fffdf7] p-1 shadow-sm">
            <button
              type="button"
              className={`inline-flex h-9 w-9 items-center justify-center rounded ${
                viewMode === "grid" ? "bg-[#f4ecd8] text-[#8b2b34]" : "text-[#7d6f5c] hover:bg-[#f8f1e4]"
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
                viewMode === "list" ? "bg-[#f4ecd8] text-[#8b2b34]" : "text-[#7d6f5c] hover:bg-[#f8f1e4]"
              }`}
              aria-label="List view"
              title="List view"
              onClick={() => setViewMode("list")}
            >
              <List size={19} />
            </button>
          </div>
          <LayoutTemplate className="hidden text-[#c0a04e] sm:block" size={28} />
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
              className={`corner-card cursor-pointer overflow-hidden text-left transition hover:-translate-y-1 hover:shadow-soft ${
                isSelected ? "template-card-selected border-[#8b2b34]" : "border-[#ead7ac]"
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
                    <h3 className="font-serif text-base font-bold text-[#221816]">{template.name}</h3>
                    <p className="mt-1 text-sm leading-5 text-[#7d6f5c]">{template.description}</p>
                  </div>
                  {isSelected ? <Check className="shrink-0 text-[#8b2b34]" size={20} /> : null}
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#b79a4d]">
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
