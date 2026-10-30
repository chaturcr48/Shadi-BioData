"use client";

import { TemplateThumbnail } from "@/components/TemplateThumbnail";
import { getTemplate, templates } from "@/templates";
import { ArrowRight, Check, FileDown, LayoutTemplate, ShieldCheck } from "lucide-react";
import Link from "next/link";

const heroTemplates = [getTemplate("blush-rose"), getTemplate("royal-ganesha"), getTemplate("maroon-classic")];

export function Hero() {
  return (
    <section className="hero">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-20">
        <div className="animate-fade-up">
          <p className="eyebrow eyebrow--left">Free · No sign-up · Private</p>
          <h1 className="title-xl mt-5">
            A marriage biodata your family will be <span className="accent-italic">proud</span> to share.
          </h1>
          <p className="lead mt-6 max-w-xl">
            Choose from {templates.length}+ designer templates, add your details and photo, and download a print-ready A4 PDF in minutes. Everything
            happens in your browser, so your information stays with you.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/create" className="btn btn-primary btn-lg">
              Create my biodata <ArrowRight size={18} />
            </Link>
            <Link href="/templates" className="btn btn-secondary btn-lg">
              <LayoutTemplate size={18} /> Browse templates
            </Link>
          </div>
          <ul className="mt-9 grid gap-3 text-sm font-medium text-ink/80 sm:grid-cols-3">
            {["Hindu, Muslim, Sikh, Christian & general formats", "Photo, custom fields and reorderable sections", "Smart multi-page layout, crisp PDF output"].map(
              (item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gold-500/20 text-gold-700">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div className="hero-stack">
            {heroTemplates.map((template, index) => (
              <Link key={template.id} href={`/create?template=${template.id}`} className={`hero-card hero-card-${index + 1}`} aria-label={`Start with ${template.name}`}>
                <TemplateThumbnail template={template} className="!rounded-none !shadow-none" />
              </Link>
            ))}
            <div className="hero-badge hero-badge--tl">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-maroon-700 text-ivory-50">
                <FileDown size={15} />
              </span>
              PDF ready in seconds
            </div>
            <div className="hero-badge hero-badge--br">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
                <ShieldCheck size={15} />
              </span>
              Nothing is uploaded
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
