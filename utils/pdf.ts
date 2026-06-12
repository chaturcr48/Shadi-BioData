export async function downloadElementAsPdf(element: HTMLElement, fileName: string) {
  const html2pdf = (await import("html2pdf.js")).default;

  await html2pdf()
    .set({
      margin: [0, 0, 0, 0],
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: 1200
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: {
        mode: ["css", "legacy"],
        before: [".pdf-page-break-before"],
        avoid: [".avoid-break", ".bio-section", ".bio-field", ".bio-field dd", ".bio-section h2"]
      }
    })
    .from(element)
    .save();
}
