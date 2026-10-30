import type { BiodataFormData } from "@/types/biodata";

const DRAFT_KEY = "shadi-biodata-draft-v2";
const LEGACY_KEYS = ["marriage-biodata-draft-v1"];

function storage(): Storage | null {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null;
  }
}

export function saveDraft(data: BiodataFormData): boolean {
  const store = storage();
  if (!store) return false;
  try {
    store.setItem(DRAFT_KEY, JSON.stringify({ ...data, savedAt: new Date().toISOString() }));
    return true;
  } catch {
    // Usually the photo pushed the payload over the quota. Retry without it.
    try {
      store.setItem(DRAFT_KEY, JSON.stringify({ ...data, photo: undefined, savedAt: new Date().toISOString() }));
    } catch {
      /* ignore */
    }
    return false;
  }
}

export function loadDraft(): (BiodataFormData & { savedAt?: string }) | null {
  const store = storage();
  if (!store) return null;
  for (const key of [DRAFT_KEY, ...LEGACY_KEYS]) {
    const raw = store.getItem(key);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw) as BiodataFormData & { savedAt?: string };
      if (parsed && parsed.fields && parsed.category) return parsed;
    } catch {
      /* ignore corrupt drafts */
    }
  }
  return null;
}

export function clearDraft() {
  const store = storage();
  if (!store) return;
  [DRAFT_KEY, ...LEGACY_KEYS].forEach((key) => store.removeItem(key));
}

export function hasMeaningfulContent(data: BiodataFormData): boolean {
  return Object.values(data.fields).some((value) => value && value.trim()) || Boolean(data.photo) || data.customFields.length > 0;
}
