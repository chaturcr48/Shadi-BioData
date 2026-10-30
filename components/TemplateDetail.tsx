"use client";

import { BiodataDocument } from "@/components/document/BiodataDocument";
import { DocumentViewport } from "@/components/document/DocumentViewport";
import { PdfDownloadButton } from "@/components/PdfDownloadButton";
import { TemplateCard } from "@/components/TemplateCard";
import { templates } from "@/templates";
import { createSampleData } from "@/templates/sample";
import type { BiodataCategory, BiodataTemplate } from "@/types/biodata";
import { categoryLabels, categoryOrder } from "@/utils/fields";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export function TemplateDetail({ template }: { template: BiodataTemplate }) {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("category");
  const [category, setCategory] = useState<BiodataCategory>(
    (categoryOrder as string[]).includes(initial ?? "") ? (initial as BiodataCategory) : template.suitedFor[0] ?? "general"
  );
  const long = params.get("sample") === "long";

  const data = useMemo(() => {
    const sample = createSampleData(category, template.id);
    if (!long) return sample;
    // Stress sample used to check multi-page flow.
    return {
      ...sample,
      customFields: Array.from({ length: 26 }, (_, index) => ({
        id: `extra-${index}`,
        section: (["basic", "career", "family", "partner"] as const)[index % 4],
        label: `Additional detail ${index + 1}`,
        value: index % 3 === 0 ? "A longer value that wraps onto two lines to test how the layout handles multi-line content gracefully." : `Value ${index + 1}`
      }))
    };
  }, [category, template.id, long]);

  const related = templates.filter((item) => item.id !== template.id && item.style === template.style).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-10 sm:px-8 lg:pt-14">
          <Link href="/templates" className="inline-flex items-center gap-1.5 text-sm font-semibold text-mute hover:text-maroon-700">
            <ArrowLeft size={15} /> All templates
          </Link>
          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="order-2 lg:order-1">
              <DocumentViewport className="rounded-2xl">
                <BiodataDocument data={data} template={template} mode="full" />
              </DocumentViewport>
            </div>
            <aside className="order-1 lg:order-2 lg:sticky lg:top-24">
              <p className="eyebrow eyebrow--left">{template.style} template</p>
              <h1 className="title-lg mt-3">{template.name}</h1>
              <p className="lead mt-4">{template.description}</p>

              <p className="label mt-6">Preview with sample details for</p>
              <div className="flex flex-wrap gap-2">
                {categoryOrder.map((item) => (
                  <button key={item} type="button" className="chip" aria-pressed={category === item} onClick={() => setCategory(item)}>
                    {categoryLabels[item]}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-2">
                <Link href={`/create?template=${template.id}&category=${category}`} className="btn btn-primary btn-lg">
                  Use this template <ArrowRight size={17} />
                </Link>
                <PdfDownloadButton data={data} template={template} className="btn btn-secondary" label="Download sample PDF" />
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-3 text-sm">
                <div className="card p-3">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-mute">Layout</dt>
                  <dd className="mt-1 font-semibold">{template.columns === 2 ? "Two columns" : "Single column"}</dd>
                </div>
                <div className="card p-3">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-mute">Photo style</dt>
                  <dd className="mt-1 font-semibold capitalize">{template.photo}</dd>
                </div>
                <div className="card col-span-2 p-3">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-mute">Recommended for</dt>
                  <dd className="mt-1 font-semibold">{template.suitedFor.length === 5 ? "All communities" : template.suitedFor.map((item) => categoryLabels[item]).join(", ")}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
          <h2 className="title-md">More {template.style} templates</h2>
          <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
            {related.map((item) => (
              <TemplateCard key={item.id} template={item} category={category} ctaLabel="View template" onSelect={(next) => router.push(`/templates/${next.id}?category=${category}`)} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
