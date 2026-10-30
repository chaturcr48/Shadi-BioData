"use client";

import { BiodataDocument } from "@/components/document/BiodataDocument";
import { DocumentViewport } from "@/components/document/DocumentViewport";
import { PdfDownloadButton } from "@/components/PdfDownloadButton";
import { createSampleData } from "@/templates/sample";
import type { BiodataCategory, BiodataTemplate } from "@/types/biodata";
import { categoryLabels, categoryOrder } from "@/utils/fields";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface TemplatePreviewModalProps {
  template: BiodataTemplate;
  category?: BiodataCategory;
  onClose: () => void;
  /** When provided, the primary action selects the template instead of navigating. */
  onUse?: (template: BiodataTemplate) => void;
}

export function TemplatePreviewModal({ template, category, onClose, onUse }: TemplatePreviewModalProps) {
  const [sampleCategory, setSampleCategory] = useState<BiodataCategory>(category ?? template.suitedFor[0] ?? "general");
  const data = useMemo(() => createSampleData(sampleCategory, template.id), [sampleCategory, template.id]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${template.name} preview`} onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-doc">
          <div className="mx-auto max-w-[760px]">
            <DocumentViewport>
              <BiodataDocument data={data} template={template} mode="full" />
            </DocumentViewport>
          </div>
        </div>
        <aside className="modal-side">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-700">{template.style} template</p>
              <h2 className="font-display mt-1 text-3xl font-bold leading-tight">{template.name}</h2>
            </div>
            <button type="button" className="btn btn-icon btn-secondary" onClick={onClose} aria-label="Close preview">
              <X size={18} />
            </button>
          </div>
          <p className="text-sm leading-7 text-mute">{template.description}</p>

          <div>
            <p className="label">Preview with sample data for</p>
            <div className="flex flex-wrap gap-2">
              {categoryOrder.map((item) => (
                <button key={item} type="button" className="chip" aria-pressed={sampleCategory === item} onClick={() => setSampleCategory(item)}>
                  {categoryLabels[item]}
                </button>
              ))}
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-ivory-100 p-3">
              <dt className="text-xs font-semibold uppercase tracking-wider text-mute">Layout</dt>
              <dd className="mt-1 font-semibold">{template.columns === 2 ? "Two columns" : "Single column"}</dd>
            </div>
            <div className="rounded-xl bg-ivory-100 p-3">
              <dt className="text-xs font-semibold uppercase tracking-wider text-mute">Photo</dt>
              <dd className="mt-1 font-semibold capitalize">{template.photo}</dd>
            </div>
            <div className="col-span-2 rounded-xl bg-ivory-100 p-3">
              <dt className="text-xs font-semibold uppercase tracking-wider text-mute">Recommended for</dt>
              <dd className="mt-1 font-semibold">{template.suitedFor.length === 5 ? "All communities" : template.suitedFor.map((item) => categoryLabels[item]).join(", ")}</dd>
            </div>
          </dl>

          <div className="mt-auto flex flex-col gap-2">
            {onUse ? (
              <button type="button" className="btn btn-primary btn-lg" onClick={() => onUse(template)}>
                Use this template <ArrowRight size={17} />
              </button>
            ) : (
              <Link href={`/create?template=${template.id}&category=${sampleCategory}`} className="btn btn-primary btn-lg">
                Use this template <ArrowRight size={17} />
              </Link>
            )}
            <PdfDownloadButton data={data} template={template} className="btn btn-secondary" label="Download sample PDF" />
          </div>
        </aside>
      </div>
    </div>
  );
}
