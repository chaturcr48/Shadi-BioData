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
import { ChevronLeft, FileText, X } from "lucide-react";
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

  return (
    <main>
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <button
            type="button"
            className="flex items-center gap-3 text-left"
            onClick={() => {
              setPreviewTemplate(null);
              setStep("category");
            }}
            aria-label="Go to homepage"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-800">
              <FileText size={24} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Private, browser-only</p>
              <h1 className="text-xl font-black text-stone-950 sm:text-2xl">Free Marriage Biodata Maker</h1>
            </div>
          </button>
          {step !== "category" ? (
            <button
              type="button"
              className="btn-secondary hidden sm:inline-flex"
              onClick={() => setStep(step === "preview" ? "form" : step === "form" ? "template" : "category")}
            >
              <ChevronLeft size={18} /> Back
            </button>
          ) : null}
        </div>
      </header>

      <section className="bg-gradient-to-b from-white to-amber-50/70">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black leading-tight text-stone-950 sm:text-5xl">Free Marriage Biodata Maker</h2>
            <p className="mt-4 text-lg leading-8 text-stone-700">
              Create beautiful marriage biodata online and download PDF for free.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
              No login, no backend, no database, no photo upload. Save drafts only on this device/browser, or move them with JSON export and import.
            </p>
          </div>
        </div>
      </section>

      {step === "category" ? (
        <>
          <CategorySelector selected={data.category} onSelect={setCategory} />
          <div className="mx-auto flex max-w-6xl justify-end px-4 pb-8">
            <button type="button" className="btn-primary" onClick={() => setStep("template")}>
              Choose Template
            </button>
          </div>
        </>
      ) : null}

      {step === "template" ? (
        <>
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
          <section className="mx-auto grid max-w-6xl gap-4 px-4 pt-6 lg:grid-cols-2">
            <DraftControls data={data} onLoad={importData} />
            <JsonImportExport data={data} onImport={importData} />
          </section>
          <BiodataForm data={data} onChange={setData} onPreview={() => setStep("preview")} />
        </>
      ) : null}

      {step === "preview" ? (
        <section className="mx-auto max-w-6xl px-4 py-6">
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
