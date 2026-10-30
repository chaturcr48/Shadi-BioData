"use client";

import { TemplateThumbnail } from "@/components/TemplateThumbnail";
import type { BiodataCategory, BiodataTemplate } from "@/types/biodata";
import { categoryLabels } from "@/utils/fields";
import { Check, Eye } from "lucide-react";
import Link from "next/link";

interface TemplateCardProps {
  template: BiodataTemplate;
  category?: BiodataCategory;
  selected?: boolean;
  onPreview?: (template: BiodataTemplate) => void;
  /** When provided the card selects instead of navigating. */
  onSelect?: (template: BiodataTemplate) => void;
  ctaLabel?: string;
}

export function TemplateCard({ template, category, selected = false, onPreview, onSelect, ctaLabel = "Use this template" }: TemplateCardProps) {
  const useHref = `/create?template=${template.id}${category ? `&category=${category}` : ""}`;
  const recommended = category ? template.suitedFor.includes(category) : false;

  return (
    <article className={`tcard ${selected ? "tcard-selected" : ""}`}>
      <div className="tcard-media">
        {selected ? (
          <span className="tcard-check" aria-label="Selected">
            <Check size={16} />
          </span>
        ) : null}
        <TemplateThumbnail template={template} category={category} />
        <div className="tcard-overlay">
          {onPreview ? (
            <button type="button" className="btn btn-sm btn-secondary" onClick={() => onPreview(template)}>
              <Eye size={15} /> Preview
            </button>
          ) : null}
          {onSelect ? (
            <button type="button" className="btn btn-sm btn-gold" onClick={() => onSelect(template)}>
              {selected ? "Selected" : ctaLabel}
            </button>
          ) : (
            <Link href={useHref} className="btn btn-sm btn-gold">
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
      <div className="flex items-start justify-between gap-3 px-2 pb-1 pt-3">
        <div className="min-w-0">
          <h3 className="font-display truncate text-lg font-bold leading-tight text-ink">{template.name}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-mute">{template.style}</p>
        </div>
        {recommended ? <span className="tag tag-soft flex-none">For {categoryLabels[category!]}</span> : template.dark ? <span className="tag flex-none">Dark</span> : null}
      </div>
    </article>
  );
}
