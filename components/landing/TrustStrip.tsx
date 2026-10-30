import { templates } from "@/templates";
import { Camera, FileText, IndianRupee, Lock } from "lucide-react";

const items = [
  { icon: FileText, title: `${templates.length}+ templates`, text: "Traditional, royal, floral, modern and minimal." },
  { icon: Camera, title: "Photo ready", text: "Add a portrait; every design frames it beautifully." },
  { icon: Lock, title: "100% private", text: "Your details stay in your browser. Nothing is uploaded." },
  { icon: IndianRupee, title: "Completely free", text: "No watermark, no sign-up, no hidden charges." }
];

export function TrustStrip() {
  return (
    <section className="border-y border-ivory-300 bg-ivory-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-4">
            <span className="feature-icon flex-none">
              <Icon size={20} />
            </span>
            <div>
              <p className="font-semibold">{title}</p>
              <p className="mt-0.5 text-sm text-mute">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
