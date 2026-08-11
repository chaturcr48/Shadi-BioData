import type { BiodataCategory, BiodataTemplate } from "@/types/biodata";

const asset = (name: string) => `/biodata_assets/processed/${name}`;

const designSeeds = [
  {
    name: "Classic Ivory",
    description: "Minimal vine border with a calm ivory paper and Om watermark.",
    theme: { background: "#f4f1eb", paper: "#fffdf8", primary: "#47372b", secondary: "#9a6a45", accent: "#d6b37d", text: "#251f1a", muted: "#75695f" },
    fontFamily: "Georgia, 'Times New Roman', serif",
    borderStyle: "double 6px #b98746",
    layout: "single",
    headingStyle: "underline",
    assets: {
      frame: asset("border_minimalist_vine.png"),
      watermark: asset("watermark_om_symbol.png"),
      flourish: asset("ornament_flourish_gold.png")
    },
    ornament: "divider"
  },
  {
    name: "Floral Blush",
    description: "Soft red floral border with a gentle Ganesha watermark.",
    theme: { background: "#fff1f2", paper: "#fffafa", primary: "#9f1239", secondary: "#be5b78", accent: "#f7b2c4", text: "#3b1f2b", muted: "#7f5a67" },
    fontFamily: "'Trebuchet MS', Arial, sans-serif",
    borderStyle: "solid 4px #f4a6bb",
    layout: "single",
    headingStyle: "underline",
    assets: {
      frame: asset("border_red_floral.png"),
      watermark: asset("watermark_ganesha_faded.png"),
      flourish: asset("ornament_divider_red.png")
    },
    ornament: "floral"
  },
  {
    name: "Gold Ornate Royale",
    description: "Grand golden corner work with a formal biodata body and traditional Ganesha watermark.",
    theme: { background: "#fff7e7", paper: "#fffefa", primary: "#aa7a12", secondary: "#c49a30", accent: "#efd58f", text: "#1f1710", muted: "#6f5a3a" },
    fontFamily: "'Trebuchet MS', Arial, sans-serif",
    borderStyle: "solid 3px #c9971a",
    layout: "single",
    headingStyle: "underline",
    assets: {
      frame: asset("border_royal_gold.png"),
      watermark: asset("ganesha_traditional_gold.png"),
      flourish: asset("ornament_flourish_gold.png")
    },
    ornament: "gold-ornate"
  },
  {
    name: "Ganesha Premium",
    description: "Premium Indian matrimonial biodata with Ganesha artwork and ornate gold border.",
    theme: { background: "#fff7e8", paper: "#fffdf7", primary: "#7f1d1d", secondary: "#a16207", accent: "#d8aa3d", text: "#1f1710", muted: "#6c5141" },
    fontFamily: "Georgia, 'Times New Roman', serif",
    borderStyle: "solid 1px #d8aa3d",
    layout: "single",
    headingStyle: "underline",
    assets: {
      frame: asset("frame_royal_ganesha.png"),
      watermark: asset("watermark_ganesha_faded.png"),
      icon: asset("ganesha_traditional_gold.png"),
      flourish: asset("ornament_flourish_gold.png")
    },
    ornament: "ganesha-premium"
  }
] as const;

const categoryAccents: Record<BiodataCategory, { label: string; primary: string; accent: string }> = {
  hindu: { label: "Hindu", primary: "#9a3412", accent: "#fed7aa" },
  muslim: { label: "Muslim", primary: "#047857", accent: "#bbf7d0" },
  sikh: { label: "Sikh", primary: "#b45309", accent: "#fde68a" },
  christian: { label: "Christian", primary: "#1d4ed8", accent: "#dbeafe" },
  general: { label: "General", primary: "#374151", accent: "#e5e7eb" }
};

export function makeTemplates(category: BiodataCategory): BiodataTemplate[] {
  const categoryTheme = categoryAccents[category];

  return designSeeds.map((seed, index) => ({
    ...seed,
    id: `${category}-${index + 1}`,
    name: `${categoryTheme.label} ${seed.name}`,
    category,
    description: `${seed.description} Tailored for ${categoryTheme.label.toLowerCase()} biodata.`,
    theme: {
      ...seed.theme,
      primary: index % 3 === 0 ? categoryTheme.primary : seed.theme.primary,
      accent: index % 4 === 0 ? categoryTheme.accent : seed.theme.accent
    }
  }));
}
