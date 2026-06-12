"use client";

import type { CustomField, FieldDefinition, SectionKey } from "@/types/biodata";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface FormSectionProps {
  title: string;
  section: SectionKey;
  fields: FieldDefinition[];
  values: Record<string, string>;
  errors: Record<string, string>;
  customFields: CustomField[];
  onFieldChange: (key: string, value: string) => void;
  onAddCustomField: (field: CustomField) => void;
  onRemoveCustomField: (id: string) => void;
  onCustomFieldChange: (id: string, patch: Partial<CustomField>) => void;
}

export function FormSection({
  title,
  section,
  fields,
  values,
  errors,
  customFields,
  onFieldChange,
  onAddCustomField,
  onRemoveCustomField,
  onCustomFieldChange
}: FormSectionProps) {
  const [customLabel, setCustomLabel] = useState("");

  const sectionCustomFields = customFields.filter((field) => field.section === section);

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-stone-950">{title}</h2>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">
          Optional fields
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.key} className={field.type === "textarea" ? "md:col-span-2" : ""}>
            <span className="mb-1 block text-sm font-semibold text-stone-700">{field.label}</span>
            {field.type === "textarea" ? (
              <textarea
                value={values[field.key] ?? ""}
                onChange={(event) => onFieldChange(field.key, event.target.value)}
                className="input min-h-28 resize-y"
              />
            ) : field.type === "select" ? (
              <select
                value={values[field.key] ?? ""}
                onChange={(event) => onFieldChange(field.key, event.target.value)}
                className="input"
              >
                <option value="">Select</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type ?? "text"}
                value={values[field.key] ?? ""}
                onChange={(event) => onFieldChange(field.key, event.target.value)}
                className="input"
              />
            )}
            {errors[field.key] ? <span className="mt-1 block text-sm text-red-600">{errors[field.key]}</span> : null}
          </label>
        ))}
      </div>

      <div className="mt-6 border-t border-stone-200 pt-5">
        <h3 className="text-sm font-bold uppercase tracking-wide text-stone-600">Custom Fields</h3>
        <div className="mt-3 flex gap-2">
          <input
            value={customLabel}
            onChange={(event) => setCustomLabel(event.target.value)}
            placeholder="Add a field name"
            className="input"
          />
          <button
            type="button"
            className="icon-button"
            aria-label="Add custom field"
            title="Add custom field"
            onClick={() => {
              if (!customLabel.trim()) return;
              onAddCustomField({
                id: crypto.randomUUID(),
                label: customLabel.trim(),
                value: "",
                section
              });
              setCustomLabel("");
            }}
          >
            <Plus size={20} />
          </button>
        </div>
        {sectionCustomFields.length ? (
          <div className="mt-4 grid gap-3">
            {sectionCustomFields.map((field) => (
              <div key={field.id} className="grid gap-2 rounded-lg bg-stone-50 p-3 sm:grid-cols-[1fr_1.5fr_auto]">
                <input
                  value={field.label}
                  onChange={(event) => onCustomFieldChange(field.id, { label: event.target.value })}
                  className="input bg-white"
                  aria-label="Custom field label"
                />
                <input
                  value={field.value}
                  onChange={(event) => onCustomFieldChange(field.id, { value: event.target.value })}
                  className="input bg-white"
                  aria-label="Custom field value"
                />
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Remove custom field"
                  title="Remove custom field"
                  onClick={() => onRemoveCustomField(field.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
