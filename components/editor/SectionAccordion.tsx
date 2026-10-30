"use client";

import { FieldInput } from "@/components/editor/FieldInput";
import type { CustomField, FieldDefinition, SectionKey } from "@/types/biodata";
import { getSectionHint, getSectionTitle } from "@/utils/fields";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface SectionAccordionProps {
  section: SectionKey;
  index: number;
  total: number;
  open: boolean;
  fields: FieldDefinition[];
  values: Record<string, string>;
  errors: Record<string, string>;
  customFields: CustomField[];
  onToggle: () => void;
  onMove: (direction: -1 | 1) => void;
  onFieldChange: (key: string, value: string) => void;
  onAddCustomField: (field: CustomField) => void;
  onCustomFieldChange: (id: string, patch: Partial<CustomField>) => void;
  onRemoveCustomField: (id: string) => void;
}

export function SectionAccordion({
  section,
  index,
  total,
  open,
  fields,
  values,
  errors,
  customFields,
  onToggle,
  onMove,
  onFieldChange,
  onAddCustomField,
  onCustomFieldChange,
  onRemoveCustomField
}: SectionAccordionProps) {
  const [newLabel, setNewLabel] = useState("");
  const filled = fields.filter((field) => values[field.key]?.trim()).length + customFields.filter((field) => field.value.trim()).length;
  const totalFields = fields.length + customFields.length;

  function addCustom() {
    const label = newLabel.trim();
    if (!label) return;
    onAddCustomField({ id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}`, label, value: "", section });
    setNewLabel("");
  }

  return (
    <div className="acc" data-open={open}>
      <div className="flex items-center">
        <button type="button" className="acc-head flex-1" onClick={onToggle} aria-expanded={open} aria-controls={`section-${section}`}>
          <span className="acc-index">{index + 1}</span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">{getSectionTitle(section)}</span>
            <span className="block text-xs text-mute">
              {filled ? `${filled} of ${totalFields} filled` : getSectionHint(section)}
            </span>
          </span>
          <ChevronDown size={18} className={`text-mute transition ${open ? "rotate-180" : ""}`} />
        </button>
        <div className="flex flex-col pr-2">
          <button type="button" className="rounded-md p-1 text-mute hover:bg-ivory-200 hover:text-ink disabled:opacity-30" onClick={() => onMove(-1)} disabled={index === 0} aria-label="Move section up" title="Move up">
            <ChevronUp size={16} />
          </button>
          <button type="button" className="rounded-md p-1 text-mute hover:bg-ivory-200 hover:text-ink disabled:opacity-30" onClick={() => onMove(1)} disabled={index === total - 1} aria-label="Move section down" title="Move down">
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {open ? (
        <div className="acc-body" id={`section-${section}`}>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <FieldInput key={field.key} field={field} value={values[field.key] ?? ""} error={errors[field.key]} onChange={(value) => onFieldChange(field.key, value)} />
            ))}
          </div>

          <div className="mt-6 border-t border-ivory-300 pt-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-mute">Custom fields</p>
            {customFields.length ? (
              <div className="mt-3 grid gap-2">
                {customFields.map((field) => (
                  <div key={field.id} className="grid gap-2 rounded-xl bg-ivory-100 p-2 sm:grid-cols-[1fr_1.4fr_auto]">
                    <input className="input" value={field.label} placeholder="Field name" aria-label="Custom field name" onChange={(event) => onCustomFieldChange(field.id, { label: event.target.value })} />
                    <input className="input" value={field.value} placeholder="Value" aria-label="Custom field value" onChange={(event) => onCustomFieldChange(field.id, { value: event.target.value })} />
                    <button type="button" className="btn btn-icon btn-ghost text-red-700" onClick={() => onRemoveCustomField(field.id)} aria-label="Remove custom field">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="mt-3 flex gap-2">
              <input
                className="input"
                value={newLabel}
                placeholder="Add a field, e.g. Horoscope, Languages known"
                onChange={(event) => setNewLabel(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addCustom();
                  }
                }}
              />
              <button type="button" className="btn btn-secondary" onClick={addCustom} disabled={!newLabel.trim()}>
                <Plus size={16} /> Add
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
