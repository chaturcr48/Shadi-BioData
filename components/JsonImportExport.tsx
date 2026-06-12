"use client";

import type { BiodataFormData } from "@/types/biodata";
import { Download, Upload } from "lucide-react";
import { useRef, useState } from "react";

interface JsonImportExportProps {
  data: BiodataFormData;
  onImport: (data: BiodataFormData) => void;
}

export function JsonImportExport({ data, onImport }: JsonImportExportProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  function exportJson() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "marriage-biodata-draft.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function importJson(file: File) {
    try {
      const parsed = JSON.parse(await file.text()) as BiodataFormData;
      if (!parsed.category || !parsed.fields || !parsed.sectionOrder) {
        throw new Error("Invalid biodata draft.");
      }
      onImport(parsed);
      setMessage("JSON draft imported.");
    } catch {
      setMessage("Could not import this JSON file.");
    }
  }

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <p className="text-sm text-stone-600">Export JSON to move your draft between phone and laptop manually.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn-secondary" onClick={exportJson}>
          <Download size={18} /> Export JSON
        </button>
        <button type="button" className="btn-secondary" onClick={() => inputRef.current?.click()}>
          <Upload size={18} /> Import JSON
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void importJson(file);
          event.currentTarget.value = "";
        }}
      />
      {message ? <p className="mt-3 text-sm font-medium text-emerald-700">{message}</p> : null}
    </div>
  );
}
