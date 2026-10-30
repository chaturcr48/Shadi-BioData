"use client";

import { TemplateGallery } from "@/components/TemplateGallery";
import type { BiodataCategory } from "@/types/biodata";
import { categoryOrder } from "@/utils/fields";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function TemplatesBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const raw = params.get("category");
  const category = (categoryOrder as string[]).includes(raw ?? "") ? (raw as BiodataCategory) : "all";

  return (
    <TemplateGallery
      key={category}
      category={category}
      onCategoryChange={(next) => {
        const query = next === "all" ? "" : `?category=${next}`;
        router.replace(`${pathname}${query}`, { scroll: false });
      }}
    />
  );
}
