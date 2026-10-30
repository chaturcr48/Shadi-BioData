const faqs = [
  {
    q: "Is Shadi BioData really free?",
    a: "Yes. Every template, the photo upload and the PDF download are free, with no watermark and no account required."
  },
  {
    q: "Is my personal information safe?",
    a: "Your details never leave your device. The biodata is built and converted to PDF entirely inside your browser, and drafts are stored only in your browser's local storage."
  },
  {
    q: "Can I add a photo?",
    a: "Yes. Upload a JPG or PNG in the editor. Each template frames the portrait in its own style, and you can remove or replace it at any time."
  },
  {
    q: "Can I switch templates after filling in my details?",
    a: "Absolutely. Use the Change template button in the editor. Your details stay exactly as they are and the preview updates instantly."
  },
  {
    q: "What if my biodata is longer than one page?",
    a: "The layout flows onto additional A4 pages automatically. Section headings stay with their content and the design continues on every page."
  },
  {
    q: "How do I continue on another device?",
    a: "Use Export JSON in the editor to download a small backup file, then Import it on your other device. You can also email the PDF to yourself."
  }
];

export function Faq() {
  return (
    <section className="section" id="faq">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <p className="eyebrow">Questions</p>
          <h2 className="title-lg mt-4">Frequently asked</h2>
        </div>
        <div className="faq mt-10">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
