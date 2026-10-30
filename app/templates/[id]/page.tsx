import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TemplateDetail } from "@/components/TemplateDetail";
import { templateById, templates } from "@/templates";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Params {
  params: { id: string };
}

export function generateStaticParams() {
  return templates.map((template) => ({ id: template.id }));
}

export function generateMetadata({ params }: Params): Metadata {
  const template = templateById.get(params.id);
  if (!template) return {};
  return {
    title: `${template.name} marriage biodata template`,
    description: `${template.description} Preview with sample details and create your own biodata for free.`
  };
}

export default function TemplateDetailPage({ params }: Params) {
  const template = templateById.get(params.id);
  if (!template) notFound();

  return (
    <>
      <SiteHeader />
      <main className="pb-20">
        <Suspense fallback={null}>
          <TemplateDetail template={template} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
