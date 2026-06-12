"use client";

import { BiodataForm } from "@/components/BiodataForm";
import { CategorySelector } from "@/components/CategorySelector";
import { DraftControls } from "@/components/DraftControls";
import { JsonImportExport } from "@/components/JsonImportExport";
import { PdfDownloadButton } from "@/components/PdfDownloadButton";
import { PreviewRenderer } from "@/components/PreviewRenderer";
import { TemplateGallery } from "@/components/TemplateGallery";
import { allTemplates } from "@/templates";
import type { BiodataCategory, BiodataFormData, BiodataTemplate } from "@/types/biodata";
import { defaultSectionOrder } from "@/utils/fields";
import { ArrowRight, Check, ChevronLeft, Eye, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";

type AppStep = "category" | "template" | "form" | "preview";

function firstTemplateId(category: BiodataCategory) {
  return allTemplates.find((template) => template.category === category)?.id ?? allTemplates[0].id;
}

function createInitialData(category: BiodataCategory = "hindu"): BiodataFormData {
  return {
    category,
    templateId: firstTemplateId(category),
    sectionOrder: [...defaultSectionOrder],
    fields: { religion: category === "general" ? "" : category[0].toUpperCase() + category.slice(1) },
    customFields: []
  };
}

function createSampleData(category: BiodataCategory, templateId: string): BiodataFormData {
  const religionLabel = category === "general" ? "Open / Neutral" : category[0].toUpperCase() + category.slice(1);
  const categorySpecific: Record<BiodataCategory, Record<string, string>> = {
    hindu: {
      gotraClan: "Kashyap",
      manglikStatus: "Non Manglik",
      nakshatra: "Rohini",
      rashi: "Vrishabha",
      kuldeviKuldevta: "Shri Ganesh"
    },
    muslim: {
      sect: "Sunni",
      maslak: "Hanafi",
      namaz: "Regular",
      islamicEducation: "Quran and basic Islamic studies"
    },
    sikh: {
      casteCommunity: "Khatri",
      amritdhari: "No",
      gurdwaraAssociation: "Local Gurdwara Sahib"
    },
    christian: {
      denomination: "Catholic",
      churchName: "St. Mary's Church",
      baptismConfirmation: "Baptized and confirmed"
    },
    general: {
      communityBackground: "Educated urban family",
      culturalValues: "Modern with traditional values"
    }
  };

  return {
    category,
    templateId,
    sectionOrder: [...defaultSectionOrder],
    customFields: [
      { id: "sample-hobbies", section: "basic", label: "Hobbies", value: "Reading, music, travel" }
    ],
    fields: {
      fullName: "Aarav Sharma",
      dateOfBirth: "1995-08-18",
      timeOfBirth: "07:35 AM",
      placeOfBirth: "Jaipur, Rajasthan",
      age: "30",
      height: "5 ft 10 in",
      weight: "72 kg",
      complexion: "Fair",
      bloodGroup: "B+",
      maritalStatus: "Never Married",
      motherTongue: "Hindi",
      religion: religionLabel,
      casteCommunity: "Community Name",
      subCaste: "Sub-community",
      education: "MBA, University of Delhi",
      occupation: "Product Manager",
      companyBusiness: "Private Limited Company",
      annualIncome: "18 LPA",
      workLocation: "Bengaluru",
      currentCity: "Bengaluru",
      nativePlace: "Jaipur",
      aboutMe: "Calm, family-oriented and career-focused person who values honesty, respect and meaningful relationships.",
      fatherName: "Rajesh Sharma",
      fatherOccupation: "Business Owner",
      motherName: "Sunita Sharma",
      motherOccupation: "Homemaker",
      brothers: "1",
      sisters: "1",
      familyType: "Nuclear",
      familyValues: "Traditional and progressive",
      familyStatus: "Upper middle class",
      familyLocation: "Jaipur",
      aboutFamily: "Well-settled, educated family with strong cultural values and a supportive outlook.",
      preferredAgeRange: "25 - 30",
      preferredHeight: "5 ft 2 in and above",
      preferredReligion: religionLabel,
      preferredEducation: "Graduate or above",
      preferredProfession: "Any respectable profession",
      preferredLocation: "India or abroad",
      otherExpectations: "Looking for a kind, educated and family-oriented partner.",
      contactPerson: "Rajesh Sharma",
      mobileNumber: "+91 98765 43210",
      email: "sample@example.com",
      address: "Jaipur, Rajasthan, India",
      ...categorySpecific[category]
    }
  };
}

function BrandLogo() {
  return (
    <span className="brand-lockup">
      <span className="brand-lotus" aria-hidden="true">
        <span className="lotus-petal lotus-petal-left" />
        <span className="lotus-petal lotus-petal-center-left" />
        <span className="lotus-petal lotus-petal-center" />
        <span className="lotus-petal lotus-petal-center-right" />
        <span className="lotus-petal lotus-petal-right" />
        <span className="lotus-stem" />
      </span>
      <span className="brand-wordmark">
        <span className="brand-name">Shadi BioData</span>
        <span className="brand-rule">
          <span className="brand-rule-dot" />
          <span className="brand-rule-line" />
          <span className="brand-rule-ornament" />
          <span className="brand-rule-line" />
          <span className="brand-rule-dot" />
        </span>
      </span>
    </span>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-eyebrow">
      <span className="section-eyebrow-row">
        <span />
        <Sparkles size={18} />
        <span />
      </span>
      <strong>{children}</strong>
      <span className="section-eyebrow-row">
        <span />
        <Sparkles size={18} />
        <span />
      </span>
    </div>
  );
}

function MiniBiodataCard() {
  const rows = [
    ["Date of Birth", "15 March 1997"],
    ["Height", "5'4\""],
    ["Education", "B.Tech, Delhi University"],
    ["Profession", "Software Engineer"],
    ["Religion", "Hindu - Brahmin"],
    ["City", "New Delhi"]
  ];

  return (
    <div className="hero-preview-card">
      <div className="hero-preview-paper">
        <div className="hero-preview-flower">*</div>
        <h3>Priya Sharma</h3>
        <p>Marriage Bio-Data</p>
        <div className="ornamental-divider"><span />*<span /></div>
        <dl>
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className="ornamental-divider"><span />*<span /></div>
        <p className="hero-preview-contact">Contact: +91 98765 43210</p>
      </div>
    </div>
  );
}

interface LandingHomeProps {
  category: BiodataCategory;
  onCategorySelect: (category: BiodataCategory) => void;
  onStartCreate: () => void;
  onOpenPopularTemplates: () => void;
  onOpenAllTemplates: () => void;
  onPreviewTemplate: (template: BiodataTemplate) => void;
  onUseTemplate: (template: BiodataTemplate) => void;
}

function LandingHome({
  category,
  onCategorySelect,
  onStartCreate,
  onOpenPopularTemplates,
  onOpenAllTemplates,
  onPreviewTemplate,
  onUseTemplate
}: LandingHomeProps) {
  const popularTemplateIds = ["hindu-1", "hindu-4", "muslim-3", "sikh-6", "christian-10", "general-14"];
  const popularTemplates = popularTemplateIds
    .map((id) => allTemplates.find((template) => template.id === id))
    .filter((template): template is BiodataTemplate => Boolean(template));

  return (
    <>
      <section className="hero-section" id="home">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
          <div>
            <SectionEyebrow>Matrimonial Bio-Data Maker</SectionEyebrow>
            <h2 className="hero-title">
              Create Your <span>Perfect</span> Marriage Bio-Data
            </h2>
            <p className="hero-copy">
              Create a clean, professional marriage bio-data in minutes. Choose a template, fill your details,
              preview it, and download a print-ready PDF.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button type="button" className="btn-primary btn-large" onClick={onStartCreate}>
                Create Bio-Data Free <ArrowRight size={19} />
              </button>
              <button type="button" className="link-button" onClick={onOpenPopularTemplates}>
                Browse Popular Templates
              </button>
            </div>
            <div className="hero-stats">
              <div><strong>10,000+</strong><span>Bio-datas created</span></div>
              <div><strong>75+</strong><span>Elegant templates</span></div>
              <div><strong>Free</strong><span>PDF download</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <MiniBiodataCard />
          </div>
        </div>
      </section>

      <section className="landing-band" id="create">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Start Here</SectionEyebrow>
            <h2 className="section-title">Choose Your Bio-Data Category</h2>
            <p className="section-copy">Select the format that fits your family, culture, and community details.</p>
          </div>
          <CategorySelector selected={category} onSelect={onCategorySelect} />
        </div>
      </section>

      <section className="process-section" id="how-it-works">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Simple Process</SectionEyebrow>
            <h2 className="section-title">Choose template {'->'} Fill your details {'->'} Download as PDF</h2>
          </div>
          <div className="process-grid">
            {[
              ["01", "Choose a Template", "Start with your category, then browse elegant bio-data templates and pick your favourite."],
              ["02", "Fill Your Details", "Enter your personal, family, education, career, and contact information in a guided form."],
              ["03", "Download as PDF", "Preview your bio-data and download a beautifully formatted, print-ready PDF instantly."]
            ].map(([number, title, copy]) => (
              <article key={number} className="process-card">
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <button type="button" className="btn-primary btn-large" onClick={onStartCreate}>
              Start Creating Now <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </section>

      <section className="featured-section" id="popular-templates">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Popular Templates</SectionEyebrow>
            <h2 className="section-title">Popular Bio-Data Templates</h2>
            <p className="section-copy">A quick look at some of the most useful designs from our existing template collection.</p>
          </div>
          <div className="featured-grid">
            {popularTemplates.map((template) => (
              <article key={template.id} className="featured-template" style={{ background: template.theme.background }}>
                <div style={{ border: template.borderStyle }}>
                  <h3>{template.name.replace(/^(Hindu|Muslim|Sikh|Christian|General)\s/, "")}</h3>
                  <p>{template.layout} layout</p>
                  <div className="featured-actions">
                    <button
                      type="button"
                      className="featured-preview-button"
                      onClick={() => onPreviewTemplate(template)}
                      aria-label={`Preview ${template.name}`}
                      title="Preview"
                    >
                      <Eye size={18} />
                    </button>
                    <button type="button" className="featured-select-button" onClick={() => onUseTemplate(template)}>
                      Select and fill <Check size={17} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button type="button" className="link-button" onClick={onOpenAllTemplates}>
              View all templates {'->'}
            </button>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Families Love Us</SectionEyebrow>
            <h2 className="section-title">Trusted by Thousands of Families</h2>
          </div>
          <div className="testimonial-grid">
            {[
              ["Sunita Agarwal", "Jaipur, Rajasthan", "We created our daughter's bio-data in just 10 minutes. The templates are so beautiful and everyone loved the final PDF."],
              ["Ramesh Iyer", "Chennai, Tamil Nadu", "Very easy to use and the PDF quality is excellent. We printed copies and they looked absolutely professional."],
              ["Meena Kapoor", "Lucknow, Uttar Pradesh", "The designs feel like a proper wedding invitation. My son's bio-data received so many compliments."]
            ].map(([name, city, quote]) => (
              <article key={name} className="testimonial-card">
                <div className="stars">5/5 rating</div>
                <p>"{quote}"</p>
                <strong>{name}</strong>
                <span>{city}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FooterCta onCreate={onStartCreate} />
    </>
  );
}

function FooterCta({ onCreate }: { onCreate: () => void }) {
  return (
    <footer className="site-footer">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <div>
          <BrandLogo />
          <p>Create beautiful, professional marriage bio-datas in minutes. Private, browser-only, and ready for PDF download.</p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <button type="button" onClick={onCreate}>Create Bio-Data</button>
          <a href="#popular-templates">Popular Templates</a>
          <a href="#how-it-works">How It Works</a>
        </div>
        <div>
          <h3>Get Started Today</h3>
          <p>Your perfect bio-data is just minutes away.</p>
          <button type="button" className="btn-primary" onClick={onCreate}>
            Create Bio-Data Free <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [step, setStep] = useState<AppStep>("category");
  const [data, setData] = useState<BiodataFormData>(() => createInitialData());
  const [previewTemplate, setPreviewTemplate] = useState<BiodataTemplate | null>(null);

  const selectedTemplate = useMemo(
    () => allTemplates.find((template) => template.id === data.templateId) ?? allTemplates[0],
    [data.templateId]
  );

  function setCategory(category: BiodataCategory) {
    setData((current) => ({
      ...current,
      category,
      templateId: firstTemplateId(category),
      fields: {
        ...current.fields,
        religion: category === "general" ? "" : category[0].toUpperCase() + category.slice(1)
      }
    }));
  }

  function chooseCategoryAndOpenTemplates(category: BiodataCategory) {
    setCategory(category);
    setStep("template");
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  }

  function usePopularTemplate(template: BiodataTemplate) {
    setData((current) => ({
      ...current,
      category: template.category,
      templateId: template.id,
      fields: {
        ...current.fields,
        religion: template.category === "general" ? "" : template.category[0].toUpperCase() + template.category.slice(1)
      }
    }));
    setStep("form");
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  }

  function importData(imported: BiodataFormData) {
    const templateExists = allTemplates.some((template) => template.id === imported.templateId);
    setData({
      ...imported,
      templateId: templateExists ? imported.templateId : firstTemplateId(imported.category),
      sectionOrder: imported.sectionOrder?.length ? imported.sectionOrder : [...defaultSectionOrder],
      customFields: imported.customFields ?? []
    });
    setStep("form");
  }

  function goHome() {
    setPreviewTemplate(null);
    setStep("category");
    window.setTimeout(() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }), 0);
  }

  function goCreate() {
    setPreviewTemplate(null);
    setStep("category");
    window.setTimeout(() => document.getElementById("create")?.scrollIntoView({ behavior: "smooth" }), 0);
  }

  function goTemplates() {
    setPreviewTemplate(null);
    setStep("template");
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  }

  function goPopularTemplates() {
    setPreviewTemplate(null);
    setStep("category");
    window.setTimeout(() => document.getElementById("popular-templates")?.scrollIntoView({ behavior: "smooth" }), 0);
  }

  function goHowItWorks() {
    setPreviewTemplate(null);
    setStep("category");
    window.setTimeout(() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" }), 0);
  }

  return (
    <main>
      <header className="site-header">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <button
            type="button"
            className="text-left"
            onClick={goHome}
            aria-label="Go to homepage"
          >
            <BrandLogo />
          </button>
          <nav className="hidden items-center gap-9 text-sm font-semibold text-stone-700 md:flex">
            <button type="button" onClick={goHome}>Home</button>
            <button type="button" onClick={goPopularTemplates}>Popular Templates</button>
            <button type="button" onClick={goHowItWorks}>How It Works</button>
          </nav>
          {step === "category" ? (
            <button type="button" className="btn-primary hidden sm:inline-flex" onClick={goCreate}>
              Create Bio-Data
            </button>
          ) : null}
          {step !== "category" ? (
            <button
              type="button"
              className="btn-secondary hidden lg:inline-flex"
              onClick={() => setStep(step === "preview" ? "form" : step === "form" ? "template" : "category")}
            >
              <ChevronLeft size={18} /> Back
            </button>
          ) : null}
        </div>
      </header>

      {step === "category" ? (
        <LandingHome
          category={data.category}
          onCategorySelect={chooseCategoryAndOpenTemplates}
          onStartCreate={goCreate}
          onOpenPopularTemplates={goPopularTemplates}
          onOpenAllTemplates={goTemplates}
          onPreviewTemplate={setPreviewTemplate}
          onUseTemplate={usePopularTemplate}
        />
      ) : null}

      {step === "template" ? (
        <>
          <section className="app-intro">
            <div className="mx-auto max-w-4xl px-4 py-10 text-center">
              <SectionEyebrow>Template Gallery</SectionEyebrow>
              <h2 className="section-title">Choose a Design Template</h2>
              <p className="section-copy">Select a design, preview it with sample data, then fill your details.</p>
            </div>
          </section>
          <TemplateGallery
            category={data.category}
            templates={allTemplates}
            selectedId={data.templateId}
            onSelect={(templateId) => setData((current) => ({ ...current, templateId }))}
            onFillDetails={() => setStep("form")}
            onPreview={setPreviewTemplate}
          />
          <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-4 pb-8">
            <button type="button" className="btn-secondary" onClick={() => setStep("category")}>
              <ChevronLeft size={18} /> Categories
            </button>
          </div>
        </>
      ) : null}

      {step === "form" ? (
        <>
          <section className="app-intro">
            <div className="mx-auto max-w-4xl px-4 py-10 text-center">
              <h2 className="section-title">Create Your Bio-Data</h2>
              <p className="section-copy">Fill in your details, preview the selected template, and download as PDF.</p>
            </div>
          </section>
          <section className="mx-auto grid max-w-6xl gap-4 px-4 pt-6 lg:grid-cols-2">
            <DraftControls data={data} onLoad={importData} />
            <JsonImportExport data={data} onImport={importData} />
          </section>
          <BiodataForm data={data} onChange={setData} onPreview={() => setStep("preview")} />
        </>
      ) : null}

      {step === "preview" ? (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white p-4">
            <div>
              <h2 className="text-xl font-bold text-stone-950">Preview & Download</h2>
              <p className="text-sm text-stone-600">Empty fields are hidden in the PDF. Long biodata can continue onto more pages.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-secondary" onClick={() => setStep("form")}>
                <ChevronLeft size={18} /> Edit Data
              </button>
              <PdfDownloadButton
                targetId="biodata-pdf"
                fileName={`${data.fields.fullName?.trim() || "marriage-biodata"}.pdf`}
              />
            </div>
          </div>
          <PreviewRenderer data={data} template={selectedTemplate} id="biodata-pdf" />
        </section>
      ) : null}

      {previewTemplate ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 p-3 sm:p-6" role="dialog" aria-modal="true">
          <div className="mx-auto max-w-5xl">
            <div className="sticky top-3 z-10 mb-3 flex items-center justify-between gap-3 rounded-lg bg-white p-3 shadow-soft">
              <div>
                <h2 className="text-base font-bold text-stone-950">{previewTemplate.name}</h2>
                <p className="text-sm text-stone-600">Sample biodata preview</p>
              </div>
              <div className="flex gap-2">
                <PdfDownloadButton
                  targetId="template-sample-preview"
                  fileName={`${previewTemplate.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-sample.pdf`}
                />
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Close template preview"
                  title="Close"
                  onClick={() => setPreviewTemplate(null)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <PreviewRenderer
              data={createSampleData(previewTemplate.category, previewTemplate.id)}
              template={previewTemplate}
              id="template-sample-preview"
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}
