import type { BiodataCategory } from "@/types/biodata";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const categoryMeta: Record<BiodataCategory, { glyph: string; title: string; text: string }> = {
  hindu: { glyph: "ॐ", title: "Hindu", text: "Gotra, Rashi, Nakshatra, Manglik status and Kuldevta fields." },
  muslim: { glyph: "☪", title: "Muslim", text: "Sect, Maslak, Namaz and Islamic education, with Bismillah at the top." },
  sikh: { glyph: "ੴ", title: "Sikh", text: "Amritdhari, Keshdhari and Gurdwara details with Ik Onkar." },
  christian: { glyph: "✝", title: "Christian", text: "Denomination, parish and baptism or confirmation details." },
  general: { glyph: "✦", title: "General", text: "A neutral format for inter-faith, modern or any other family." }
};

export function CategoryGrid() {
  return (
    <section className="section" id="categories">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Made for every family</p>
          <h2 className="title-lg mt-4">Pick your community, get the right fields</h2>
          <p className="lead mt-4">
            Each format includes the details families actually ask for. Every template works with every community, so you can still choose any design
            you love.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {(Object.keys(categoryMeta) as BiodataCategory[]).map((key) => {
            const meta = categoryMeta[key];
            return (
              <Link key={key} href={`/templates?category=${key}`} className="category-card group">
                <span className="category-glyph">{meta.glyph}</span>
                <span className="font-display text-2xl font-bold">{meta.title} biodata</span>
                <span className="text-sm leading-6 text-mute">{meta.text}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-maroon-700">
                  View templates <ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
