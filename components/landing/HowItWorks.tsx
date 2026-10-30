import { ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    title: "Choose a template",
    text: "Filter by community or style and preview each design with sample details before you commit."
  },
  {
    title: "Fill in your details",
    text: "Add your photo, personal, family and partner details. Reorder sections, add custom fields, and watch the preview update live."
  },
  {
    title: "Download and share",
    text: "Get a crisp A4 PDF in one click. Print it, or send it on WhatsApp and email to prospective families."
  }
];

export function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow eyebrow--left">How it works</p>
            <h2 className="title-lg mt-4">Three simple steps. About ten minutes.</h2>
            <p className="lead mt-4">
              No account to create and nothing to install. Your draft is saved on this device automatically, so you can come back and finish later.
            </p>
            <Link href="/create" className="btn btn-primary btn-lg mt-8">
              Start now <ArrowRight size={18} />
            </Link>
          </div>
          <ol className="grid gap-4">
            {steps.map((step, index) => (
              <li key={step.title} className="card flex gap-5 p-6">
                <span className="step-number flex-none">{index + 1}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold">{step.title}</h3>
                  <p className="mt-2 leading-7 text-mute">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
