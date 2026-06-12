"use client";

import type { BiodataFormData, CustomField, FieldDefinition, SectionKey } from "@/types/biodata";
import { defaultSectionOrder, getFieldsForCategory, getSectionTitle, sectionDefinitions } from "@/utils/fields";
import { validateBiodata } from "@/utils/validation";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Eye } from "lucide-react";
import { useMemo, useState } from "react";
import { FormSection } from "./FormSection";

interface BiodataFormProps {
  data: BiodataFormData;
  onChange: (data: BiodataFormData) => void;
  onPreview: () => void;
}

export function BiodataForm({ data, onChange, onPreview }: BiodataFormProps) {
  const [step, setStep] = useState(0);
  const fields = useMemo(() => getFieldsForCategory(data.category), [data.category]);
  const errors = validateBiodata(data);
  const activeSection = data.sectionOrder[step] ?? defaultSectionOrder[0];
  const progress = Math.round(((step + 1) / (data.sectionOrder.length + 1)) * 100);

  function patch(next: Partial<BiodataFormData>) {
    onChange({ ...data, ...next });
  }

  function updateSectionOrder(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= data.sectionOrder.length) return;
    const nextOrder = [...data.sectionOrder];
    [nextOrder[index], nextOrder[nextIndex]] = [nextOrder[nextIndex], nextOrder[index]];
    patch({ sectionOrder: nextOrder });
    setStep(nextIndex);
  }

  function addCustomField(field: CustomField) {
    patch({ customFields: [...data.customFields, field] });
  }

  function setCustomField(id: string, patchField: Partial<CustomField>) {
    patch({
      customFields: data.customFields.map((field) => (field.id === id ? { ...field, ...patchField } : field))
    });
  }

  function removeCustomField(id: string) {
    patch({ customFields: data.customFields.filter((field) => field.id !== id) });
  }

  const activeFields: FieldDefinition[] = fields.filter((field) => field.section === activeSection);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:pb-10">
      <div className="mb-5 rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-amber-700">Step {step + 1} of {data.sectionOrder.length + 1}</p>
            <h2 className="text-lg font-bold text-stone-950">{getSectionTitle(activeSection)}</h2>
          </div>
          <button type="button" className="btn-secondary hidden sm:inline-flex" onClick={onPreview}>
            <Eye size={18} /> Preview
          </button>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-stone-100">
          <div className="h-full rounded-full bg-amber-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {data.sectionOrder.map((section, index) => (
            <button
              key={section}
              type="button"
              onClick={() => setStep(index)}
              className={`rounded-md border px-3 py-2 text-left text-sm font-semibold ${
                index === step ? "border-amber-500 bg-amber-50 text-amber-900" : "border-stone-200 text-stone-600"
              }`}
            >
              {getSectionTitle(section)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button type="button" className="btn-secondary" onClick={() => updateSectionOrder(step, -1)}>
          <ArrowUp size={18} /> Move Section Up
        </button>
        <button type="button" className="btn-secondary" onClick={() => updateSectionOrder(step, 1)}>
          <ArrowDown size={18} /> Move Section Down
        </button>
        <button type="button" className="btn-secondary" onClick={() => patch({ sectionOrder: defaultSectionOrder })}>
          Reset Order
        </button>
      </div>

      <FormSection
        title={sectionDefinitions.find((section) => section.key === activeSection)?.title ?? activeSection}
        section={activeSection}
        fields={activeFields}
        values={data.fields}
        errors={errors}
        customFields={data.customFields}
        onFieldChange={(key, value) => patch({ fields: { ...data.fields, [key]: value } })}
        onAddCustomField={addCustomField}
        onRemoveCustomField={removeCustomField}
        onCustomFieldChange={setCustomField}
      />

      <div className="mt-6 hidden justify-between sm:flex">
        <button type="button" className="btn-secondary" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>
          <ArrowLeft size={18} /> Back
        </button>
        {step === data.sectionOrder.length - 1 ? (
          <button type="button" className="btn-primary" onClick={onPreview}>
            <Eye size={18} /> Preview & Download
          </button>
        ) : (
          <button type="button" className="btn-primary" onClick={() => setStep((current) => Math.min(data.sectionOrder.length - 1, current + 1))}>
            Next <ArrowRight size={18} />
          </button>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-stone-200 bg-white p-3 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] sm:hidden">
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
          <button type="button" className="btn-secondary justify-center" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>
            <ArrowLeft size={18} /> Back
          </button>
          <button type="button" className="btn-secondary justify-center" onClick={onPreview}>
            <Eye size={18} /> Preview
          </button>
          <button
            type="button"
            className="btn-primary justify-center"
            onClick={() => {
              if (step === data.sectionOrder.length - 1) onPreview();
              else setStep((current) => Math.min(data.sectionOrder.length - 1, current + 1));
            }}
          >
            Next <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
