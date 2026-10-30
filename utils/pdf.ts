/**
 * Rasterises every `.bio-page` inside `root` and stitches them into an A4 PDF.
 * Pages are captured at 2.4x for crisp print output while keeping the file small.
 */
export async function downloadPagesAsPdf(root: HTMLElement, fileName: string) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);

  await waitForAssets(root);

  const pages = Array.from(root.querySelectorAll<HTMLElement>(".bio-page"));
  if (!pages.length) throw new Error("Nothing to export.");

  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });

  for (const [index, page] of pages.entries()) {
    const canvas = await html2canvas(page, {
      scale: 2.4,
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
      logging: false,
      width: page.offsetWidth,
      height: page.offsetHeight,
      windowWidth: page.offsetWidth,
      windowHeight: page.offsetHeight,
      scrollX: 0,
      scrollY: 0
    });
    const image = canvas.toDataURL("image/jpeg", 0.93);
    if (index > 0) pdf.addPage("a4", "portrait");
    pdf.addImage(image, "JPEG", 0, 0, 210, 297, undefined, "FAST");
  }

  pdf.save(fileName);
}

async function waitForAssets(root: HTMLElement) {
  if (typeof document !== "undefined" && "fonts" in document) {
    try {
      await document.fonts.ready;
    } catch {
      /* ignore */
    }
  }

  const images = Array.from(root.querySelectorAll("img"));
  const backgroundUrls = new Set<string>();
  root.querySelectorAll<HTMLElement>("*").forEach((element) => {
    const bg = getComputedStyle(element).backgroundImage;
    const matches = bg.matchAll(/url\("?([^")]+)"?\)/g);
    for (const match of matches) {
      if (!match[1].startsWith("data:")) backgroundUrls.add(match[1]);
    }
  });

  await Promise.all([
    ...images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) return resolve();
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        })
    ),
    ...Array.from(backgroundUrls).map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = url;
        })
    )
  ]);
}

export function safeFileName(name: string, fallback = "marriage-biodata") {
  const cleaned = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${cleaned || fallback}.pdf`;
}
