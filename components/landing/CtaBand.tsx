import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaBand() {
  return (
    <section className="section section-dark">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="eyebrow text-gold-300">Shubh Vivah</p>
        <h2 className="font-display mt-4 text-4xl font-bold leading-tight sm:text-5xl">Begin the search for a life partner with a biodata that stands out.</h2>
        <p className="lead mt-5">Free forever. No watermark. Beautiful on screen, on WhatsApp and on paper.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/create" className="btn btn-gold btn-lg">
            Create my biodata <ArrowRight size={18} />
          </Link>
          <Link href="/templates" className="btn btn-lg border border-ivory-50/30 text-ivory-50 hover:bg-ivory-50/10">
            See all templates
          </Link>
        </div>
      </div>
    </section>
  );
}
