"use client";

import { TemplateCard } from "@/components/TemplateCard";
import { TemplatePreviewModal } from "@/components/TemplatePreviewModal";
import { templates } from "@/templates";
import type { BiodataTemplate } from "@/types/biodata";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const featured = templates.filter((template) => template.featured).slice(0, 8);

export function FeaturedTemplates() {
  const [preview, setPreview] = useState<BiodataTemplate | null>(null);

  return (
    <section className="section section-ivory" id="templates">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow--left">Popular designs</p>
            <h2 className="title-lg mt-4">Templates that look like they came from a designer</h2>
            <p className="lead mt-4">Real previews, not mock-ups. Hover any card to preview it with sample details or start filling it in right away.</p>
          </div>
          <Link href="/templates" className="btn btn-secondary">
            All {templates.length} templates <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
          {featured.map((template) => (
            <TemplateCard key={template.id} template={template} onPreview={setPreview} />
          ))}
        </div>
      </div>
      {preview ? <TemplatePreviewModal template={preview} onClose={() => setPreview(null)} /> : null}
    </section>
  );
}
