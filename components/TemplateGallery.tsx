"use client";

import { TemplateCard } from "@/components/TemplateCard";
import { TemplatePreviewModal } from "@/components/TemplatePreviewModal";
import { templates, templateStyles } from "@/templates";
import type { BiodataCategory, BiodataTemplate, TemplateStyle } from "@/types/biodata";
import { categoryLabels, categoryOrder } from "@/utils/fields";
import { useMemo, useState } from "react";

interface TemplateGalleryProps {
  /** Initial community filter. */
  category?: BiodataCategory | "all";
  onCategoryChange?: (category: BiodataCategory | "all") => void;
  selectedId?: string;
  onSelect?: (template: BiodataTemplate) => void;
  /** Hide the community filter row (the editor already knows the category). */
  hideCategoryFilter?: boolean;
  columnsClass?: string;
  limit?: number;
}

export function TemplateGallery({
  category: initialCategory = "all",
  onCategoryChange,
  selectedId,
  onSelect,
  hideCategoryFilter = false,
  columnsClass = "grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
  limit
}: TemplateGalleryProps) {
  const [category, setCategory] = useState<BiodataCategory | "all">(initialCategory);
  const [style, setStyle] = useState<TemplateStyle | "all">("all");
  const [preview, setPreview] = useState<BiodataTemplate | null>(null);

  const visible = useMemo(() => {
    let list = templates.filter((template) => style === "all" || template.style === style);
    if (category !== "all") {
      list = [...list].sort((a, b) => Number(b.suitedFor.includes(category)) - Number(a.suitedFor.includes(category)));
    }
    return limit ? list.slice(0, limit) : list;
  }, [category, style, limit]);

  const changeCategory = (next: BiodataCategory | "all") => {
    setCategory(next);
    onCategoryChange?.(next);
  };

  const sampleCategory: BiodataCategory | undefined = category === "all" ? undefined : category;

  return (
    <div>
      <div className="flex flex-col gap-3">
        {!hideCategoryFilter ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-bold uppercase tracking-[0.2em] text-mute">Community</span>
            <button type="button" className="chip" aria-pressed={category === "all"} onClick={() => changeCategory("all")}>
              All
            </button>
            {categoryOrder.map((item) => (
              <button key={item} type="button" className="chip" aria-pressed={category === item} onClick={() => changeCategory(item)}>
                {categoryLabels[item]}
              </button>
            ))}
          </div>
        ) : null}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-bold uppercase tracking-[0.2em] text-mute">Style</span>
          {templateStyles.map((item) => (
            <button key={item.key} type="button" className="chip" aria-pressed={style === item.key} onClick={() => setStyle(item.key)}>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`mt-8 grid gap-5 ${columnsClass}`}>
        {visible.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            category={sampleCategory}
            selected={selectedId === template.id}
            onPreview={setPreview}
            onSelect={onSelect}
          />
        ))}
      </div>

      {preview ? (
        <TemplatePreviewModal
          template={preview}
          category={sampleCategory}
          onClose={() => setPreview(null)}
          onUse={
            onSelect
              ? (template) => {
                  onSelect(template);
                  setPreview(null);
                }
              : undefined
          }
        />
      ) : null}
    </div>
  );
}
