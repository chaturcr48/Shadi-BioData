import type { BiodataCategory, BiodataTemplate } from "@/types/biodata";

const designSeeds = [
  {
    name: "Classic Ivory",
    description: "Formal serif layout with a balanced matrimonial structure.",
    theme: { background: "#f4f1eb", paper: "#fffdf8", primary: "#47372b", secondary: "#9a6a45", accent: "#d6b37d", text: "#251f1a", muted: "#75695f" },
    fontFamily: "Georgia, 'Times New Roman', serif",
    borderStyle: "double 6px #b98746",
    layout: "single",
    headingStyle: "underline",
    ornament: "divider"
  },
  {
    name: "Modern Slate",
    description: "Minimal, crisp spacing with strong professional headings.",
    theme: { background: "#eef2f6", paper: "#ffffff", primary: "#1f2937", secondary: "#475569", accent: "#0f766e", text: "#111827", muted: "#64748b" },
    fontFamily: "Arial, Helvetica, sans-serif",
    borderStyle: "solid 1px #cbd5e1",
    layout: "resume",
    headingStyle: "bar",
    ornament: "none"
  },
  {
    name: "Floral Blush",
    description: "Soft floral corners with a warm family-friendly feel.",
    theme: { background: "#fff1f2", paper: "#fffafa", primary: "#9f1239", secondary: "#be5b78", accent: "#f7b2c4", text: "#3b1f2b", muted: "#7f5a67" },
    fontFamily: "'Trebuchet MS', Arial, sans-serif",
    borderStyle: "solid 4px #f4a6bb",
    layout: "cards",
    headingStyle: "pill",
    ornament: "floral"
  },
  {
    name: "Premium Gold",
    description: "Gold accents and refined sections for a premium PDF.",
    theme: { background: "#f8f3e7", paper: "#fffdf7", primary: "#7a4d05", secondary: "#9b741f", accent: "#d6a931", text: "#231a0f", muted: "#735f40" },
    fontFamily: "Georgia, 'Times New Roman', serif",
    borderStyle: "solid 3px #c69214",
    layout: "two-column",
    headingStyle: "boxed",
    ornament: "royal"
  },
  {
    name: "Pastel Calm",
    description: "Soft pastel panels and gentle section separation.",
    theme: { background: "#effaf7", paper: "#ffffff", primary: "#0f766e", secondary: "#5b8f88", accent: "#bfe8df", text: "#12302c", muted: "#5f7773" },
    fontFamily: "'Segoe UI', Arial, sans-serif",
    borderStyle: "solid 2px #a7d8ce",
    layout: "cards",
    headingStyle: "plain",
    ornament: "corner"
  },
  {
    name: "Royal Maroon",
    description: "Traditional deep maroon style with ornamental dividers.",
    theme: { background: "#fff7ed", paper: "#fffaf3", primary: "#7f1d1d", secondary: "#a16207", accent: "#f2c879", text: "#281313", muted: "#76534d" },
    fontFamily: "Georgia, 'Times New Roman', serif",
    borderStyle: "ridge 5px #9a3412",
    layout: "centered",
    headingStyle: "bar",
    ornament: "royal"
  },
  {
    name: "Black Tie",
    description: "Clean black-and-white biodata with sharp print contrast.",
    theme: { background: "#f4f4f5", paper: "#ffffff", primary: "#111111", secondary: "#3f3f46", accent: "#d4d4d8", text: "#111111", muted: "#52525b" },
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    borderStyle: "solid 2px #111111",
    layout: "resume",
    headingStyle: "underline",
    ornament: "header-footer"
  },
  {
    name: "Lotus Pearl",
    description: "Elegant border and centered opening for ceremonial biodata.",
    theme: { background: "#fdf2f8", paper: "#fffefe", primary: "#86198f", secondary: "#a855f7", accent: "#e9d5ff", text: "#2f1734", muted: "#75577c" },
    fontFamily: "'Palatino Linotype', Georgia, serif",
    borderStyle: "double 5px #c084fc",
    layout: "centered",
    headingStyle: "pill",
    ornament: "floral"
  },
  {
    name: "Heritage Green",
    description: "Traditional green accents with a composed formal layout.",
    theme: { background: "#f0fdf4", paper: "#fffffb", primary: "#166534", secondary: "#4d7c0f", accent: "#bbd58b", text: "#15291c", muted: "#60705f" },
    fontFamily: "Georgia, 'Times New Roman', serif",
    borderStyle: "solid 4px #65a30d",
    layout: "two-column",
    headingStyle: "boxed",
    ornament: "corner"
  },
  {
    name: "Clean Resume",
    description: "Compact resume-inspired sections for practical sharing.",
    theme: { background: "#f8fafc", paper: "#ffffff", primary: "#0f172a", secondary: "#2563eb", accent: "#dbeafe", text: "#0f172a", muted: "#64748b" },
    fontFamily: "'Segoe UI', Arial, sans-serif",
    borderStyle: "solid 1px #e2e8f0",
    layout: "resume",
    headingStyle: "bar",
    ornament: "none"
  },
  {
    name: "Rose Gold",
    description: "Warm rose-gold styling with decorative section cards.",
    theme: { background: "#fff7f3", paper: "#fffefd", primary: "#9d174d", secondary: "#b45309", accent: "#fecdd3", text: "#3d1c22", muted: "#815763" },
    fontFamily: "'Segoe UI', Arial, sans-serif",
    borderStyle: "solid 3px #f0a7a0",
    layout: "cards",
    headingStyle: "pill",
    ornament: "header-footer"
  },
  {
    name: "Temple Line",
    description: "Decorative header/footer with classic Indian formality.",
    theme: { background: "#fffbeb", paper: "#fffdf5", primary: "#92400e", secondary: "#b45309", accent: "#f8d585", text: "#2d1b0d", muted: "#7c603c" },
    fontFamily: "'Palatino Linotype', Georgia, serif",
    borderStyle: "groove 5px #d97706",
    layout: "single",
    headingStyle: "boxed",
    ornament: "header-footer"
  },
  {
    name: "Blue Ledger",
    description: "Organized two-column format with professional blue accents.",
    theme: { background: "#eff6ff", paper: "#ffffff", primary: "#1d4ed8", secondary: "#334155", accent: "#bfdbfe", text: "#172033", muted: "#64748b" },
    fontFamily: "'Segoe UI', Arial, sans-serif",
    borderStyle: "solid 2px #93c5fd",
    layout: "two-column",
    headingStyle: "bar",
    ornament: "divider"
  },
  {
    name: "Minimal Sand",
    description: "Simple, breathable layout with restrained neutral accents.",
    theme: { background: "#fafaf9", paper: "#ffffff", primary: "#57534e", secondary: "#78716c", accent: "#e7e5e4", text: "#292524", muted: "#78716c" },
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    borderStyle: "solid 1px #d6d3d1",
    layout: "single",
    headingStyle: "plain",
    ornament: "none"
  },
  {
    name: "Ceremonial Plum",
    description: "Rich plum tone, center alignment, and premium details.",
    theme: { background: "#faf5ff", paper: "#fffefe", primary: "#581c87", secondary: "#7e22ce", accent: "#ddd6fe", text: "#24102f", muted: "#71567d" },
    fontFamily: "Georgia, 'Times New Roman', serif",
    borderStyle: "double 6px #7e22ce",
    layout: "centered",
    headingStyle: "underline",
    ornament: "royal"
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
