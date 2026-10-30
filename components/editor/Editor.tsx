"use client";

import { BiodataDocument } from "@/components/document/BiodataDocument";
import { DocumentViewport } from "@/components/document/DocumentViewport";
import { PhotoUpload } from "@/components/editor/PhotoUpload";
import { SectionAccordion } from "@/components/editor/SectionAccordion";
import { TemplateDrawer } from "@/components/editor/TemplateDrawer";
import { LogoMark } from "@/components/Logo";
import { PdfDownloadButton } from "@/components/PdfDownloadButton";
import { useToast } from "@/components/useToast";
import { defaultTemplateFor, getTemplate, templateById } from "@/templates";
import { createSampleData } from "@/templates/sample";
import type { BiodataCategory, BiodataFormData, CustomField, SectionKey } from "@/types/biodata";
import {
  DEFAULT_TAGLINE,
  categoryLabels,
  categoryOrder,
  defaultInvocation,
  defaultSectionOrder,
  getFieldsForCategory,
  invocationSuggestions
} from "@/utils/fields";
import { clearDraft, hasMeaningfulContent, loadDraft, saveDraft } from "@/utils/localStorage";
import { validateBiodata } from "@/utils/validation";
import { Check, ChevronLeft, Download, Eye, FileJson, LayoutTemplate, MoreHorizontal, PencilLine, RotateCcw, Upload, Wand2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function isCategory(value: string | null): value is BiodataCategory {
  return (categoryOrder as string[]).includes(value ?? "");
}

function createInitialData(category: BiodataCategory, templateId?: string): BiodataFormData {
  return {
    category,
    templateId: templateId && templateById.has(templateId) ? templateId : defaultTemplateFor(category).id,
    sectionOrder: [...defaultSectionOrder],
    fields: category === "general" ? {} : { religion: categoryLabels[category] },
    customFields: [],
    invocation: defaultInvocation[category],
    tagline: DEFAULT_TAGLINE
  };
}

function normalise(input: Partial<BiodataFormData>): BiodataFormData {
  const category = isCategory(input.category ?? null) ? (input.category as BiodataCategory) : "hindu";
  const base = createInitialData(category, input.templateId);
  const order = (input.sectionOrder ?? []).filter((key): key is SectionKey => defaultSectionOrder.includes(key));
  return {
    ...base,
    ...input,
    category,
    templateId: base.templateId,
    sectionOrder: order.length === defaultSectionOrder.length ? order : [...defaultSectionOrder],
    fields: input.fields ?? {},
    customFields: Array.isArray(input.customFields) ? input.customFields : [],
    invocation: input.invocation ?? base.invocation,
    tagline: input.tagline ?? base.tagline
  };
}

export function Editor() {
  const params = useSearchParams();
  const router = useRouter();
  const queryTemplate = params.get("template");
  const queryCategory = params.get("category");

  const [data, setData] = useState<BiodataFormData>(() => createInitialData(isCategory(queryCategory) ? queryCategory : "hindu", queryTemplate ?? undefined));
  const [hydrated, setHydrated] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [openSection, setOpenSection] = useState<SectionKey | null>("basic");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  const [pageCount, setPageCount] = useState(1);
  const importRef = useRef<HTMLInputElement>(null);
  const { show, toast } = useToast();

  // Restore the saved draft once on the client, honouring template/category query overrides.
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      const restored = normalise(draft);
      const category = isCategory(queryCategory) ? queryCategory : restored.category;
      const next = applyCategory(restored, category);
      setData({ ...next, templateId: queryTemplate && templateById.has(queryTemplate) ? queryTemplate : next.templateId });
    }
    setHydrated(true);
    if (queryTemplate || queryCategory) router.replace("/create", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced autosave.
  useEffect(() => {
    if (!hydrated) return;
    setSaveState("saving");
    const timer = window.setTimeout(() => {
      saveDraft(data);
      setSaveState("saved");
    }, 600);
    return () => window.clearTimeout(timer);
  }, [data, hydrated]);

  const template = useMemo(() => getTemplate(data.templateId), [data.templateId]);
  const fields = useMemo(() => getFieldsForCategory(data.category), [data.category]);
  const errors = useMemo(() => validateBiodata(data), [data]);

  const filledCount = fields.filter((field) => data.fields[field.key]?.trim()).length + data.customFields.filter((field) => field.value.trim()).length;
  const totalCount = fields.length + data.customFields.length;
  const progress = Math.round((filledCount / Math.max(1, totalCount)) * 100);

  const patch = useCallback((next: Partial<BiodataFormData>) => setData((current) => ({ ...current, ...next })), []);

  function setField(key: string, value: string) {
    setData((current) => ({ ...current, fields: { ...current.fields, [key]: value } }));
  }

  function changeCategory(category: BiodataCategory) {
    setData((current) => applyCategory(current, category));
  }

  function moveSection(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= data.sectionOrder.length) return;
    const order = [...data.sectionOrder];
    [order[index], order[target]] = [order[target], order[index]];
    patch({ sectionOrder: order });
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(data.fields.fullName || "biodata").trim().replace(/\s+/g, "-").toLowerCase()}-draft.json`;
    link.click();
    URL.revokeObjectURL(url);
    setMenuOpen(false);
    show("Backup downloaded.");
  }

  async function importJson(file: File) {
    try {
      const parsed = JSON.parse(await file.text()) as Partial<BiodataFormData>;
      if (!parsed || typeof parsed !== "object" || !parsed.fields) throw new Error("bad");
      setData(normalise(parsed));
      show("Draft imported.");
    } catch {
      show("That file is not a valid biodata backup.");
    }
    setMenuOpen(false);
  }

  function loadSample() {
    setData({ ...createSampleData(data.category, data.templateId, false), photo: data.photo });
    setMenuOpen(false);
    show("Sample details loaded. Replace them with yours.");
  }

  function startOver() {
    if (hasMeaningfulContent(data) && !window.confirm("Clear all details and start a new biodata? This cannot be undone.")) return;
    clearDraft();
    setData(createInitialData(data.category, data.templateId));
    setOpenSection("basic");
    setMenuOpen(false);
    show("Started a fresh biodata.");
  }

  const preview = (
    <div className="preview-stage">
      <DocumentViewport>
        <BiodataDocument data={data} template={template} mode="full" onReady={setPageCount} />
      </DocumentViewport>
    </div>
  );

  return (
    <div className="min-h-screen pb-24 lg:pb-10">
      <header className="editor-topbar">
        <div className="mx-auto flex max-w-[1500px] items-center gap-3 px-4 py-2.5 sm:px-6">
          <Link href="/" className="btn btn-icon btn-ghost" aria-label="Back to home">
            <ChevronLeft size={20} />
          </Link>
          <Link href="/" className="hidden items-center gap-2 sm:inline-flex" aria-label="Shadi BioData">
            <LogoMark size={30} />
          </Link>

          <button type="button" className="btn btn-secondary min-w-0 max-w-[260px]" onClick={() => setDrawerOpen(true)} title="Change template">
            <span className="inline-block h-4 w-4 flex-none rounded-full border border-black/10" style={{ background: `linear-gradient(135deg, ${template.theme.primary}, ${template.theme.accent})` }} />
            <span className="truncate">{template.name}</span>
            <LayoutTemplate size={15} className="flex-none text-mute" />
          </button>

          <label className="hidden items-center gap-2 md:flex">
            <span className="sr-only">Community</span>
            <select className="select !min-h-[44px] !w-auto !rounded-full !py-0 pl-4 text-sm font-semibold" value={data.category} onChange={(event) => changeCategory(event.target.value as BiodataCategory)}>
              {categoryOrder.map((category) => (
                <option key={category} value={category}>
                  {categoryLabels[category]} biodata
                </option>
              ))}
            </select>
          </label>

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden items-center gap-1.5 text-xs font-semibold text-mute sm:inline-flex" aria-live="polite">
              {saveState === "saving" ? "Saving…" : saveState === "saved" ? (
                <>
                  <Check size={14} className="text-emerald-600" /> Saved on this device
                </>
              ) : null}
            </span>

            <div className="relative">
              <button type="button" className="btn btn-icon btn-secondary" aria-label="More options" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
                <MoreHorizontal size={18} />
              </button>
              {menuOpen ? (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <div className="card absolute right-0 z-20 mt-2 w-64 p-2 text-sm">
                    <MenuItem icon={Wand2} label="Fill with sample details" onClick={loadSample} />
                    <MenuItem icon={FileJson} label="Export backup (JSON)" onClick={exportJson} />
                    <MenuItem icon={Upload} label="Import backup (JSON)" onClick={() => importRef.current?.click()} />
                    <div className="my-1 border-t border-ivory-300" />
                    <MenuItem icon={RotateCcw} label="Start over" onClick={startOver} danger />
                  </div>
                </>
              ) : null}
              <input
                ref={importRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void importJson(file);
                  event.currentTarget.value = "";
                }}
              />
            </div>

            <div className="hidden lg:block">
              <PdfDownloadButton data={data} template={template} onError={show} onDone={() => show("PDF downloaded.")} />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-4 pt-5 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
          <div className="segmented">
            <button type="button" aria-pressed={mobileView === "edit"} onClick={() => setMobileView("edit")}>
              <PencilLine size={14} className="mr-1 inline" /> Edit
            </button>
            <button type="button" aria-pressed={mobileView === "preview"} onClick={() => setMobileView("preview")}>
              <Eye size={14} className="mr-1 inline" /> Preview
            </button>
          </div>
          <select className="select !w-auto !min-h-[40px] text-sm" value={data.category} onChange={(event) => changeCategory(event.target.value as BiodataCategory)} aria-label="Community">
            {categoryOrder.map((category) => (
              <option key={category} value={category}>
                {categoryLabels[category]}
              </option>
            ))}
          </select>
        </div>

        <div className="editor-shell">
          <div className={`flex flex-col gap-4 ${mobileView === "preview" ? "hidden lg:flex" : ""}`}>
            <div className="card p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl font-bold leading-tight">Your biodata</h1>
                  <p className="mt-0.5 text-sm text-mute">Only filled fields appear. Empty ones are hidden automatically.</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-3xl font-bold text-maroon-700">{progress}%</p>
                  <p className="text-xs text-mute">
                    {filledCount} / {totalCount} fields
                  </p>
                </div>
              </div>
              <div className="progress mt-4">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="card p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-mute">Photo & heading</p>
              <div className="mt-3">
                <PhotoUpload value={data.photo} onChange={(photo) => patch({ photo })} onError={show} />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="invocation">
                    Opening line
                  </label>
                  <input id="invocation" className="input" list="invocation-suggestions" value={data.invocation ?? ""} placeholder="Leave empty to hide" onChange={(event) => patch({ invocation: event.target.value })} />
                  <datalist id="invocation-suggestions">
                    {invocationSuggestions[data.category].map((item) => (
                      <option key={item} value={item} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="label" htmlFor="tagline">
                    Caption under name
                  </label>
                  <input id="tagline" className="input" value={data.tagline ?? ""} placeholder="e.g. Marriage Biodata" onChange={(event) => patch({ tagline: event.target.value })} />
                </div>
              </div>
            </div>

            {data.sectionOrder.map((section, index) => (
              <SectionAccordion
                key={section}
                section={section}
                index={index}
                total={data.sectionOrder.length}
                open={openSection === section}
                fields={fields.filter((field) => field.section === section)}
                values={data.fields}
                errors={errors}
                customFields={data.customFields.filter((field) => field.section === section)}
                onToggle={() => setOpenSection((current) => (current === section ? null : section))}
                onMove={(direction) => moveSection(index, direction)}
                onFieldChange={setField}
                onAddCustomField={(field: CustomField) => patch({ customFields: [...data.customFields, field] })}
                onCustomFieldChange={(id, fieldPatch) => patch({ customFields: data.customFields.map((field) => (field.id === id ? { ...field, ...fieldPatch } : field)) })}
                onRemoveCustomField={(id) => patch({ customFields: data.customFields.filter((field) => field.id !== id) })}
              />
            ))}
          </div>

          <div className={`preview-pane ${mobileView === "edit" ? "hidden lg:block" : ""}`}>
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <p className="text-sm font-semibold text-mute">
                Live preview · {pageCount} {pageCount === 1 ? "page" : "pages"} · A4
              </p>
              <button type="button" className="btn btn-sm btn-secondary" onClick={() => setDrawerOpen(true)}>
                <LayoutTemplate size={14} /> Change template
              </button>
            </div>
            {preview}
          </div>
        </div>
      </div>

      <div className="mobile-bar lg:hidden">
        <button type="button" className="btn btn-secondary flex-1" onClick={() => setMobileView((view) => (view === "edit" ? "preview" : "edit"))}>
          {mobileView === "edit" ? <Eye size={16} /> : <PencilLine size={16} />} {mobileView === "edit" ? "Preview" : "Edit"}
        </button>
        <PdfDownloadButton data={data} template={template} className="btn btn-primary flex-1" onError={show} onDone={() => show("PDF downloaded.")} />
      </div>

      {drawerOpen ? (
        <TemplateDrawer
          category={data.category}
          selectedId={data.templateId}
          onSelect={(next) => {
            patch({ templateId: next.id });
            setDrawerOpen(false);
            show(`Switched to ${next.name}.`);
          }}
          onClose={() => setDrawerOpen(false)}
        />
      ) : null}

      {toast}
    </div>
  );
}

function applyCategory(current: BiodataFormData, category: BiodataCategory): BiodataFormData {
  if (current.category === category) return current;
  const oldLabel = current.category === "general" ? "" : categoryLabels[current.category];
  const religion = current.fields.religion;
  const nextReligion = category === "general" ? religion : !religion || religion === oldLabel ? categoryLabels[category] : religion;
  const invocation = !current.invocation || current.invocation === defaultInvocation[current.category] ? defaultInvocation[category] : current.invocation;
  return {
    ...current,
    category,
    fields: { ...current.fields, ...(nextReligion !== undefined ? { religion: nextReligion } : {}) },
    invocation
  };
}

function MenuItem({ icon: Icon, label, onClick, danger = false }: { icon: typeof Download; label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button type="button" className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left font-medium hover:bg-ivory-100 ${danger ? "text-red-700" : ""}`} onClick={onClick}>
      <Icon size={16} className={danger ? "" : "text-mute"} /> {label}
    </button>
  );
}
