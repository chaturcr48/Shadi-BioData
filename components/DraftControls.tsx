"use client";

import type { BiodataFormData } from "@/types/biodata";
import { clearDraft, loadDraft, saveDraft } from "@/utils/localStorage";
import { Eraser, FolderOpen, Save } from "lucide-react";
import { useState } from "react";

interface DraftControlsProps {
  data: BiodataFormData;
  onLoad: (data: BiodataFormData) => void;
}

export function DraftControls({ data, onLoad }: DraftControlsProps) {
  const [message, setMessage] = useState("");

  function flash(text: string) {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2500);
  }

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <p className="text-sm text-stone-600">
        Your data is not uploaded to any server. Draft is saved only in your browser if you click Save Draft.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn-secondary" onClick={() => { saveDraft(data); flash("Draft saved on this browser."); }}>
          <Save size={18} /> Save Draft
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            const draft = loadDraft();
            if (draft) {
              onLoad(draft);
              flash("Saved draft loaded.");
            } else {
              flash("No saved draft found.");
            }
          }}
        >
          <FolderOpen size={18} /> Load Saved Draft
        </button>
        <button type="button" className="btn-secondary" onClick={() => { clearDraft(); flash("Draft cleared."); }}>
          <Eraser size={18} /> Clear Draft
        </button>
      </div>
      {message ? <p className="mt-3 text-sm font-medium text-emerald-700">{message}</p> : null}
    </div>
  );
}
