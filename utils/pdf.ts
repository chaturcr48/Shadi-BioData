export async function downloadElementAsPdf(element: HTMLElement, fileName: string) {
  const html2canvas = (await import("html2canvas")).default;
  const { jsPDF } = await import("jspdf");
  const pages = Array.from(element.querySelectorAll<HTMLElement>(".bio-page"));
  const printablePages = pages.length ? pages : [element];
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });

  for (const [index, page] of printablePages.entries()) {
    const canvas = await html2canvas(page, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      windowWidth: Math.max(1200, page.scrollWidth),
      width: page.offsetWidth,
      height: page.offsetHeight,
      scrollX: 0,
      scrollY: 0
    });

    const image = canvas.toDataURL("image/jpeg", 0.98);

    if (index > 0) {
      pdf.addPage("a4", "portrait");
    }

    pdf.addImage(image, "JPEG", 0, 0, 210, 297, undefined, "FAST");
  }

  pdf.save(fileName);
}
