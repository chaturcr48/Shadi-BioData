import type { BiodataFormData } from "@/types/biodata";

const DRAFT_KEY = "marriage-biodata-draft-v1";

export function saveDraft(data: BiodataFormData) {
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
}

export function loadDraft(): BiodataFormData | null {
  const raw = window.localStorage.getItem(DRAFT_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as BiodataFormData;
  } catch {
    return null;
  }
}

export function clearDraft() {
  window.localStorage.removeItem(DRAFT_KEY);
}
