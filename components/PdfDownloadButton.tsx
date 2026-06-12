"use client";

import { downloadElementAsPdf } from "@/utils/pdf";
import { Download } from "lucide-react";
import { useState } from "react";

interface PdfDownloadButtonProps {
  targetId: string;
  fileName: string;
}

export function PdfDownloadButton({ targetId, fileName }: PdfDownloadButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    const element = document.getElementById(targetId);
    if (!element) return;
    setLoading(true);
    try {
      await downloadElementAsPdf(element, fileName);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button type="button" className="btn-primary" onClick={handleDownload} disabled={loading}>
      <Download size={18} /> {loading ? "Preparing PDF..." : "Download PDF"}
    </button>
  );
}
