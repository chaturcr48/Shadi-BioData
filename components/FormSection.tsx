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

const fieldPlaceholders: Record<string, string> = {
  fullName: "e.g. Aarav Kumar",
  dateOfBirth: "Select date of birth",
  timeOfBirth: "e.g. 07:30 AM",
  placeOfBirth: "e.g. Jaipur, Rajasthan",
  age: "e.g. 28",
  height: "e.g. 5 feet 8 inches",
  weight: "e.g. 70 kg",
  complexion: "e.g. Fair",
  bloodGroup: "e.g. B+",
  maritalStatus: "Select marital status",
  motherTongue: "e.g. Hindi",
  religion: "e.g. Hindu",
  casteCommunity: "e.g. Brahmin",
  subCaste: "e.g. Saraswat",
  gotraClan: "e.g. Kashyap",
  manglikStatus: "e.g. Non Manglik",
  education: "e.g. B.Tech, Delhi University",
  occupation: "e.g. Software Engineer",
  companyBusiness: "e.g. Infosys Ltd.",
  annualIncome: "e.g. 12 LPA",
  workLocation: "e.g. Bengaluru",
  currentCity: "e.g. New Delhi",
  nativePlace: "e.g. Lucknow, Uttar Pradesh",
  aboutMe: "Write a short introduction about education, career, values, and interests",
  fatherName: "e.g. Mr. Rajesh Kumar",
  fatherOccupation: "e.g. Business Owner",
  motherName: "e.g. Mrs. Sunita Kumar",
  motherOccupation: "e.g. Homemaker",
  brothers: "e.g. 1",
  sisters: "e.g. 1",
  familyType: "e.g. Nuclear family",
  familyValues: "e.g. Traditional with modern outlook",
  familyStatus: "e.g. Upper middle class",
  familyLocation: "e.g. Jaipur, Rajasthan",
  aboutFamily: "Write a short note about family background and values",
  preferredAgeRange: "e.g. 24 to 29 years",
  preferredHeight: "e.g. 5 feet 2 inches and above",
  preferredReligion: "e.g. Hindu",
  preferredCaste: "e.g. Same community preferred",
  preferredEducation: "e.g. Graduate or above",
  preferredProfession: "e.g. Working professional",
  preferredLocation: "e.g. Delhi NCR preferred",
  otherExpectations: "Add any other partner preferences",
  contactPerson: "e.g. Mr. Rajesh Kumar",
  mobileNumber: "e.g. 9876543210",
  alternateMobileNumber: "e.g. 9123456780",
  email: "e.g. family@example.com",
  address: "e.g. House no., locality, city, state",
  nakshatra: "e.g. Rohini",
  rashi: "e.g. Mithuna (Gemini)",
  kuldeviKuldevta: "e.g. Shri Ganesh Ji",
  sect: "e.g. Sunni",
  maslak: "e.g. Hanafi",
  namaz: "e.g. Regular",
  hijabPreference: "e.g. Optional / Preferred",
  islamicEducation: "e.g. Quran studies",
  amritdhari: "e.g. Yes / No",
  gurdwaraAssociation: "e.g. Local gurdwara name",
  denomination: "e.g. Catholic",
  churchName: "e.g. St. Mary's Church",
  baptismConfirmation: "e.g. Baptised and confirmed",
  communityBackground: "e.g. Punjabi family",
  culturalValues: "e.g. Simple, family-oriented values"
};

function getPlaceholder(field: FieldDefinition) {
  if (field.type === "select") {
    return `Select ${field.label.toLowerCase()}`;
  }

  return field.placeholder ?? fieldPlaceholders[field.key] ?? `Enter ${field.label.toLowerCase()}`;
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
    <div className="corner-card overflow-hidden p-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-3 border-t-4 border-[#8b2b34] pt-5">
        <h2 className="ornament-title text-[#c0a04e]">{title}</h2>
        <span className="rounded-full bg-[#f4ecd8] px-3 py-1 text-xs font-semibold text-[#7d6f5c]">
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
                placeholder={getPlaceholder(field)}
                className="input min-h-28 resize-y"
              />
            ) : field.type === "select" ? (
              <select
                value={values[field.key] ?? ""}
                onChange={(event) => onFieldChange(field.key, event.target.value)}
                className="input"
              >
                <option value="">{getPlaceholder(field)}</option>
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
                placeholder={getPlaceholder(field)}
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
                  placeholder="Field name"
                  aria-label="Custom field label"
                />
                <input
                  value={field.value}
                  onChange={(event) => onCustomFieldChange(field.id, { value: event.target.value })}
                  className="input bg-white"
                  placeholder="Field value"
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
