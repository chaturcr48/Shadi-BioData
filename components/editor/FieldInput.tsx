"use client";

import type { FieldDefinition } from "@/types/biodata";

interface FieldInputProps {
  field: FieldDefinition;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export function FieldInput({ field, value, error, onChange }: FieldInputProps) {
  const id = `field-${field.key}`;
  const placeholder = field.placeholder ?? (field.type === "select" ? `Select ${field.label.toLowerCase()}` : `Enter ${field.label.toLowerCase()}`);

  return (
    <div className={field.wide || field.type === "textarea" ? "sm:col-span-2" : ""}>
      <label className="label" htmlFor={id}>
        {field.label}
      </label>
      {field.type === "textarea" ? (
        <textarea id={id} className="textarea" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} rows={3} />
      ) : field.type === "select" ? (
        <select id={id} className="select" value={value} onChange={(event) => onChange(event.target.value)}>
          <option value="">{placeholder}</option>
          {value && !field.options?.includes(value) ? <option value={value}>{value}</option> : null}
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          className="input"
          type={field.type ?? "text"}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="off"
        />
      )}
      {error ? <p className="field-error">{error}</p> : null}
    </div>
  );
}
