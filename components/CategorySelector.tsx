"use client";

import type { BiodataCategory } from "@/types/biodata";
import { Church, Flower2, Landmark, Sparkles, Star } from "lucide-react";

const categories: Array<{ key: BiodataCategory; title: string; description: string; icon: React.ReactNode }> = [
  { key: "hindu", title: "Hindu Biodata", description: "Gotra, Manglik, Nakshatra and Rashi-ready.", icon: <Flower2 size={24} /> },
  { key: "muslim", title: "Muslim Biodata", description: "Sect, Maslak, Namaz and Islamic education fields.", icon: <Landmark size={24} /> },
  { key: "sikh", title: "Sikh Biodata", description: "Community, Amritdhari and Gurdwara fields.", icon: <Star size={24} /> },
  { key: "christian", title: "Christian Biodata", description: "Denomination, church and sacrament details.", icon: <Church size={24} /> },
  { key: "general", title: "General Biodata", description: "Neutral biodata format for any background.", icon: <Sparkles size={24} /> }
];

interface CategorySelectorProps {
  selected: BiodataCategory;
  onSelect: (category: BiodataCategory) => void;
}

export function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category) => (
          <button
            key={category.key}
            type="button"
            onClick={() => onSelect(category.key)}
            className={`min-h-40 rounded-lg border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft ${
              selected === category.key ? "border-amber-500 ring-2 ring-amber-200" : "border-stone-200"
            }`}
          >
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-800">
              {category.icon}
            </span>
            <span className="block text-base font-bold text-stone-950">{category.title}</span>
            <span className="mt-2 block text-sm leading-5 text-stone-600">{category.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
