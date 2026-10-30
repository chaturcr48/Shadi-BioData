import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TemplatesBrowser } from "@/components/TemplatesBrowser";
import { templates } from "@/templates";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Marriage Biodata Templates",
  description: `Browse ${templates.length} beautiful marriage biodata templates for Hindu, Muslim, Sikh, Christian and general biodata. Preview with sample data and download a free PDF.`
};

export default function TemplatesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-8 lg:pt-16">
            <p className="eyebrow eyebrow--left">Template gallery</p>
            <h1 className="title-lg mt-4">{templates.length} templates. One perfect biodata.</h1>
            <p className="lead mt-4 max-w-2xl">
              Every card is a real render with sample details. Filter by community to see recommended designs first, or by style to match your taste.
            </p>
          </div>
        </section>
        <section className="pb-20 pt-4">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Suspense fallback={null}>
              <TemplatesBrowser />
            </Suspense>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
