"use client";

import { TemplateGallery } from "@/components/TemplateGallery";
import type { BiodataCategory, BiodataTemplate } from "@/types/biodata";
import { X } from "lucide-react";
import { useEffect } from "react";

interface TemplateDrawerProps {
  category: BiodataCategory;
  selectedId: string;
  onSelect: (template: BiodataTemplate) => void;
  onClose: () => void;
}

export function TemplateDrawer({ category, selectedId, onSelect, onClose }: TemplateDrawerProps) {
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
    <div className="fixed inset-0 z-[70] flex flex-col bg-ivory-100" role="dialog" aria-modal="true" aria-label="Choose a template">
      <div className="editor-topbar">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-700">Change template</p>
            <h2 className="font-display text-2xl font-bold leading-tight">Your details stay exactly as they are</h2>
          </div>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            <X size={16} /> Done
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <TemplateGallery key={category} category={category} hideCategoryFilter selectedId={selectedId} onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
}
