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
    <section className="mx-auto max-w-6xl px-0 py-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category) => (
          <button
            key={category.key}
            type="button"
            onClick={() => onSelect(category.key)}
            className={`category-card corner-card min-h-36 p-4 text-left transition hover:-translate-y-0.5 ${
              selected === category.key ? "category-card-selected border-[#c4a553]" : "border-[#ead7ac]"
            }`}
          >
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f4ecd8] text-[#8b2b34]">
              {category.icon}
            </span>
            <span className="block font-serif text-base font-bold text-[#221816]">{category.title}</span>
            <span className="mt-2 block text-sm leading-6 text-[#7d6f5c]">{category.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
