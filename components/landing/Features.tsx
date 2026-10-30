import { Camera, Eye, FileText, Layers, ListOrdered, ShieldCheck } from "lucide-react";

const features = [
  { icon: FileText, title: "Designer templates", text: "Ornate frames, geometric borders, florals and clean modern layouts, all tuned for A4 printing." },
  { icon: Eye, title: "Live preview", text: "See your biodata take shape as you type. What you see is exactly what the PDF will look like." },
  { icon: Camera, title: "Photo support", text: "Upload a portrait and every template frames it in its own style: circle, arch or rounded." },
  { icon: ListOrdered, title: "Fully flexible", text: "Reorder sections, hide what you leave blank, and add custom fields like Hobbies or Horoscope." },
  { icon: Layers, title: "Smart pagination", text: "Long biodatas flow neatly onto extra pages with headings kept together and nothing cut off." },
  { icon: ShieldCheck, title: "Private by design", text: "There is no server and no account. Drafts stay in your browser and export as a JSON backup." }
];

export function Features() {
  return (
    <section className="section section-ivory">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Everything you need</p>
          <h2 className="title-lg mt-4">Thoughtful details, beautifully printed</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card card-hover p-6">
              <span className="feature-icon">
                <Icon size={22} />
              </span>
              <h3 className="font-display mt-5 text-2xl font-bold">{title}</h3>
              <p className="mt-2 leading-7 text-mute">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
