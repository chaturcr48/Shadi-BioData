"use client";

import { BiodataDocument } from "@/components/document/BiodataDocument";
import type { BiodataFormData, BiodataTemplate } from "@/types/biodata";
import { downloadPagesAsPdf, safeFileName } from "@/utils/pdf";
import { Download, Loader2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PdfDownloadButtonProps {
  data: BiodataFormData;
  template: BiodataTemplate;
  className?: string;
  label?: string;
  onError?: (message: string) => void;
  onDone?: () => void;
}

/**
 * Renders the document unscaled in an off-screen container, waits for pagination
 * and fonts, rasterises each page and saves a PDF.
 */
export function PdfDownloadButton({ data, template, className = "btn btn-primary", label = "Download PDF", onError, onDone }: PdfDownloadButtonProps) {
  const [exporting, setExporting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  const handleReady = useCallback(async () => {
    if (startedRef.current || !containerRef.current) return;
    startedRef.current = true;
    // Two frames so the final pagination pass has painted.
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    try {
      await downloadPagesAsPdf(containerRef.current, safeFileName(data.fields.fullName ?? ""));
      onDone?.();
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Could not create the PDF. Please try again.");
    } finally {
      setExporting(false);
      startedRef.current = false;
    }
  }, [data.fields.fullName, onDone, onError]);

  return (
    <>
      <button type="button" className={className} onClick={() => setExporting(true)} disabled={exporting}>
        {exporting ? <Loader2 size={17} className="animate-spin" /> : <Download size={17} />}
        {exporting ? "Preparing PDF…" : label}
      </button>
      {exporting && typeof document !== "undefined"
        ? createPortal(
            <div className="pdf-offscreen" ref={containerRef} aria-hidden="true">
              <BiodataDocument data={data} template={template} mode="full" onReady={handleReady} />
            </div>,
            document.body
          )
        : null}
    </>
  );
}
