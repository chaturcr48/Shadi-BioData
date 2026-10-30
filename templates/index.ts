import type { BiodataCategory, BiodataTemplate, TemplateStyle } from "@/types/biodata";
import {
  arabesque,
  botanicalBranch,
  cornerFlourish,
  cornerTick,
  damask,
  dots,
  lattice,
  layers,
  leaves,
  paisley,
  rangoliCorner,
  roseSpray,
  starCross
} from "./patterns";

const asset = (name: string) => `/biodata_assets/processed/${name}`;

const FONT = {
  cormorant: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
  playfair: "var(--font-playfair), 'Playfair Display', Georgia, serif",
  cinzel: "var(--font-cinzel), Cinzel, 'Times New Roman', serif",
  lora: "var(--font-lora), Lora, Georgia, serif",
  manrope: "var(--font-manrope), Manrope, 'Segoe UI', Arial, sans-serif"
};

const ALL: BiodataCategory[] = ["hindu", "muslim", "sikh", "christian", "general"];

const corners = (urls: [string, string, string, string], size: string, inset: string) =>
  layers([
    [urls[0], `${inset} ${inset}`, size],
    [urls[1], `calc(100% - ${inset}) ${inset}`, size],
    [urls[2], `${inset} calc(100% - ${inset})`, size],
    [urls[3], `calc(100% - ${inset}) calc(100% - ${inset})`, size]
  ]);

const topCorners = (urls: [string, string, string, string], size: string, inset: string) =>
  layers([
    [urls[0], `${inset} ${inset}`, size],
    [urls[1], `calc(100% - ${inset}) ${inset}`, size]
  ]);

export const templates: BiodataTemplate[] = [
  /* ────────────────────────── Traditional & royal (image frames) ────────────────────────── */
  {
    id: "royal-ganesha",
    name: "Royal Ganesha",
    description: "Ornate maroon and gold frame crowned with Lord Ganesha. The classic choice for a Hindu biodata.",
    style: "royal",
    suitedFor: ["hindu"],
    featured: true,
    theme: {
      paper: "#fffdf7",
      ink: "#2a1a12",
      muted: "#7a5c48",
      primary: "#7f1d1d",
      secondary: "#a16207",
      accent: "#d8aa3d",
      band: "#7f1d1d",
      onBand: "#fde68a",
      line: "#d8aa3d"
    },
    fonts: { heading: FONT.cinzel, body: FONT.lora },
    frame: "image",
    header: "classic",
    headings: "ornate",
    photo: "arch",
    columns: 2,
    padding: { top: 98, right: 34, bottom: 34, left: 34 },
    assets: { frame: asset("frame_royal_ganesha.webp") }
  },
  {
    id: "golden-heritage",
    name: "Golden Heritage",
    description: "Filigree gold border with a soft Ganesha watermark and a formal two-column layout.",
    style: "royal",
    suitedFor: ["hindu", "general", "sikh"],
    featured: true,
    theme: {
      paper: "#fffdf8",
      ink: "#241a10",
      muted: "#7b6547",
      primary: "#8a5a10",
      secondary: "#a16207",
      accent: "#d4af37",
      band: "#8a5a10",
      onBand: "#fff7e0",
      line: "#e0c068"
    },
    fonts: { heading: FONT.cinzel, body: FONT.lora },
    frame: "image",
    header: "classic",
    headings: "underline",
    photo: "circle",
    columns: 2,
    padding: { top: 32, right: 32, bottom: 32, left: 32 },
    assets: { frame: asset("border_royal_gold.webp"), watermark: asset("ganesha_traditional_gold.webp") },
    watermarkOpacity: 0.07,
    headerRule: true
  },
  {
    id: "crimson-floral",
    name: "Crimson Floral",
    description: "Deep red border blooming with golden flowers, paired with a faint Om watermark.",
    style: "traditional",
    suitedFor: ["hindu"],
    featured: true,
    theme: {
      paper: "#fffaf7",
      ink: "#2b1414",
      muted: "#7c5252",
      primary: "#9b1c1c",
      secondary: "#b45309",
      accent: "#d97706",
      band: "#9b1c1c",
      onBand: "#fef3c7",
      line: "#e3b07a"
    },
    fonts: { heading: FONT.playfair, body: FONT.lora },
    frame: "image",
    header: "classic",
    headings: "underline",
    photo: "rounded",
    columns: 2,
    padding: { top: 48, right: 32, bottom: 46, left: 32 },
    assets: { frame: asset("border_red_floral.webp"), watermark: asset("watermark_om_symbol.webp") },
    watermarkOpacity: 0.05
  },
  {
    id: "ivory-vine",
    name: "Ivory Vine",
    description: "Hand-drawn olive vines on warm ivory. Quiet, elegant, and easy to read.",
    style: "minimal",
    suitedFor: ALL,
    featured: true,
    theme: {
      paper: "#fffdf9",
      ink: "#26221c",
      muted: "#73695b",
      primary: "#5b6b3a",
      secondary: "#a3823a",
      accent: "#c8a951",
      band: "#5b6b3a",
      onBand: "#fefbe8",
      line: "#d9c78a"
    },
    fonts: { heading: FONT.cormorant, body: FONT.lora },
    frame: "image",
    header: "classic",
    headings: "caps",
    photo: "circle",
    columns: 1,
    padding: { top: 30, right: 32, bottom: 30, left: 32 },
    assets: { frame: asset("border_minimalist_vine.webp") },
    headerRule: true
  },
  {
    id: "mandala-gold",
    name: "Mandala Gold",
    description: "Golden mandala quarters in every corner with a soft trellis and Om watermark.",
    style: "traditional",
    suitedFor: ["hindu", "general", "sikh"],
    theme: {
      paper: "#fffcf5",
      ink: "#2b2114",
      muted: "#7a6a4f",
      primary: "#9a6b12",
      secondary: "#b7791f",
      accent: "#d4a72c",
      band: "#9a6b12",
      onBand: "#fff8e1",
      line: "#e6cc7a"
    },
    fonts: { heading: FONT.cinzel, body: FONT.lora },
    frame: "image",
    header: "classic",
    headings: "ornate",
    photo: "circle",
    columns: 2,
    padding: { top: 54, right: 26, bottom: 56, left: 26 },
    pattern: lattice("#d4a72c"),
    patternOpacity: 0.09,
    assets: { frame: asset("frame_mandala_corners.webp"), watermark: asset("watermark_om_symbol.webp") },
    watermarkOpacity: 0.05
  },
  {
    id: "peacock-garden",
    name: "Peacock Garden",
    description: "Jewelled peacocks perch on the top corners of a slim golden frame.",
    style: "royal",
    suitedFor: ["hindu", "general", "sikh"],
    featured: true,
    theme: {
      paper: "#fffdfa",
      ink: "#1f2233",
      muted: "#5f6478",
      primary: "#1e3a8a",
      secondary: "#0f766e",
      accent: "#d4a72c",
      band: "#1e3a8a",
      onBand: "#fef3c7",
      line: "#dcc27a"
    },
    fonts: { heading: FONT.playfair, body: FONT.lora },
    frame: "image",
    header: "classic",
    headings: "underline",
    photo: "arch",
    columns: 2,
    padding: { top: 30, right: 26, bottom: 26, left: 26 },
    assets: { frame: asset("frame_peacock_top.webp") },
    headerRule: true
  },

  /* ────────────────────────── Traditional (drawn ornaments) ────────────────────────── */
  {
    id: "maroon-classic",
    name: "Maroon Classic",
    description: "A rich maroon header band with gold lettering. Timeless and print-friendly.",
    style: "traditional",
    suitedFor: ALL,
    featured: true,
    theme: {
      paper: "#fffbf5",
      ink: "#2a1b17",
      muted: "#7a625b",
      primary: "#7a1f2b",
      secondary: "#9c3848",
      accent: "#c9a227",
      band: "#7a1f2b",
      onBand: "#f8e7c9",
      line: "#e5cf94"
    },
    fonts: { heading: FONT.cinzel, body: FONT.lora },
    frame: "band",
    bandHeight: 46,
    header: "banner",
    headings: "bar",
    photo: "circle",
    columns: 2,
    padding: { top: 54, right: 20, bottom: 22, left: 20 }
  },
  {
    id: "terracotta-rangoli",
    name: "Terracotta Rangoli",
    description: "Rangoli petals in terracotta and mustard bloom from each corner.",
    style: "traditional",
    suitedFor: ["hindu", "general"],
    theme: {
      paper: "#fff8ef",
      ink: "#2c1a12",
      muted: "#7c5a4c",
      primary: "#b5432a",
      secondary: "#9a3412",
      accent: "#e0a112",
      band: "#b5432a",
      onBand: "#fff3e0",
      line: "#eabf8a"
    },
    fonts: { heading: FONT.playfair, body: FONT.lora },
    frame: "pinline",
    header: "classic",
    headings: "bar",
    photo: "circle",
    columns: 2,
    padding: { top: 30, right: 26, bottom: 40, left: 26 },
    decor: corners(rangoliCorner("#b5432a", "#e0a112"), "34mm 34mm", "6mm")
  },
  {
    id: "marigold-garland",
    name: "Marigold Garland",
    description: "A festive garland of marigolds hangs across the top, like a wedding mandap.",
    style: "traditional",
    suitedFor: ["hindu", "sikh", "general"],
    featured: true,
    theme: {
      paper: "#fffbeb",
      ink: "#2c1b0f",
      muted: "#7c5b3c",
      primary: "#9a3412",
      secondary: "#b45309",
      accent: "#f59e0b",
      band: "#7c2d12",
      onBand: "#fff7e6",
      line: "#f0c674"
    },
    fonts: { heading: FONT.playfair, body: FONT.lora },
    frame: "garland",
    header: "classic",
    headings: "bar",
    photo: "circle",
    columns: 2,
    padding: { top: 34, right: 24, bottom: 24, left: 24 }
  },
  {
    id: "khalsa-saffron",
    name: "Khalsa Saffron",
    description: "Saffron and navy in the spirit of the Nishan Sahib, with Ik Onkar at the top.",
    style: "traditional",
    suitedFor: ["sikh"],
    featured: true,
    theme: {
      paper: "#fffaf0",
      ink: "#1f2440",
      muted: "#5c5f78",
      primary: "#1e3a8a",
      secondary: "#c2410c",
      accent: "#f59e0b",
      band: "#f59e0b",
      onBand: "#1e2a5a",
      line: "#f2c98a"
    },
    fonts: { heading: FONT.playfair, body: FONT.lora },
    frame: "band",
    bandHeight: 44,
    header: "banner",
    headings: "bar",
    photo: "circle",
    columns: 2,
    padding: { top: 52, right: 20, bottom: 22, left: 20 }
  },
  {
    id: "cathedral-ivory",
    name: "Cathedral Ivory",
    description: "Burgundy and antique gold with a graceful arched portrait. Ideal for Christian families.",
    style: "traditional",
    suitedFor: ["christian", "general"],
    featured: true,
    theme: {
      paper: "#fffdf9",
      ink: "#2a1a1d",
      muted: "#72595e",
      primary: "#6b1d2a",
      secondary: "#8b5e34",
      accent: "#c9a227",
      band: "#6b1d2a",
      onBand: "#fbeee0",
      line: "#dcc48f"
    },
    fonts: { heading: FONT.cormorant, body: FONT.lora },
    frame: "double",
    header: "classic",
    headings: "ornate",
    photo: "arch",
    columns: 1,
    padding: { top: 28, right: 30, bottom: 28, left: 30 },
    decor: corners(cornerFlourish("#c9a227", "#6b1d2a"), "24mm 24mm", "12mm")
  },

  /* ────────────────────────── Muslim-inspired geometric designs ────────────────────────── */
  {
    id: "emerald-arabesque",
    name: "Emerald Arabesque",
    description: "Emerald star-and-cross border with gold accents and Bismillah at the head.",
    style: "royal",
    suitedFor: ["muslim"],
    featured: true,
    theme: {
      paper: "#fbfdfb",
      ink: "#12271f",
      muted: "#56705f",
      primary: "#065f46",
      secondary: "#0f766e",
      accent: "#c9a227",
      band: "#065f46",
      onBand: "#ecfdf5",
      line: "#cdbf7a"
    },
    fonts: { heading: FONT.playfair, body: FONT.lora },
    frame: "edge",
    header: "classic",
    headings: "boxed",
    photo: "rounded",
    columns: 2,
    padding: { top: 24, right: 24, bottom: 24, left: 24 },
    pattern: starCross("#d4c07a", "#0b6b52"),
    headerRule: true
  },
  {
    id: "noor-blue",
    name: "Noor Blue",
    description: "Cobalt geometric lattice around crisp white paper. Calm and modern.",
    style: "modern",
    suitedFor: ["muslim", "general"],
    featured: true,
    theme: {
      paper: "#ffffff",
      ink: "#14213d",
      muted: "#5b6478",
      primary: "#1e40af",
      secondary: "#0e7490",
      accent: "#c9a227",
      band: "#1e40af",
      onBand: "#eff6ff",
      line: "#c7d2fe"
    },
    fonts: { heading: FONT.playfair, body: FONT.lora },
    frame: "edge",
    header: "split",
    headings: "underline",
    photo: "rounded",
    columns: 2,
    padding: { top: 24, right: 24, bottom: 24, left: 24 },
    pattern: arabesque("#93a7f0"),
    headerRule: true
  },
  {
    id: "teal-lattice",
    name: "Teal Lattice",
    description: "Teal banner over a geometric lattice, finished with warm amber highlights.",
    style: "modern",
    suitedFor: ["muslim", "general", "christian"],
    theme: {
      paper: "#fbfefe",
      ink: "#0f2a2a",
      muted: "#517272",
      primary: "#0f766e",
      secondary: "#115e59",
      accent: "#f59e0b",
      band: "#0f766e",
      onBand: "#ecfeff",
      line: "#b9dedb"
    },
    fonts: { heading: FONT.playfair, body: FONT.manrope },
    frame: "band",
    bandHeight: 44,
    header: "banner",
    headings: "bar",
    photo: "circle",
    columns: 2,
    padding: { top: 52, right: 20, bottom: 22, left: 20 },
    headerPattern: arabesque("rgba(255,255,255,0.16)")
  },

  /* ────────────────────────── Royal & dark ────────────────────────── */
  {
    id: "midnight-gold",
    name: "Midnight Gold",
    description: "Gold type on midnight blue with a whisper of damask. Dramatic and luxurious.",
    style: "royal",
    suitedFor: ALL,
    featured: true,
    dark: true,
    theme: {
      paper: "#0f1f3d",
      ink: "#f5ead3",
      muted: "#b8a98a",
      primary: "#e2c275",
      secondary: "#d4af37",
      accent: "#b8963e",
      band: "#0b1730",
      onBand: "#f5ead3",
      line: "#8f7a45"
    },
    fonts: { heading: FONT.cinzel, body: FONT.lora },
    frame: "double",
    header: "classic",
    headings: "ornate",
    photo: "circle",
    columns: 2,
    padding: { top: 26, right: 24, bottom: 26, left: 24 },
    pattern: damask("#e2c275"),
    patternOpacity: 0.07,
    headerRule: true
  },
  {
    id: "royal-blue-damask",
    name: "Royal Blue Damask",
    description: "Regal blue banner and gold boxed headings over a subtle damask paper.",
    style: "royal",
    suitedFor: ["sikh", "general", "christian", "hindu"],
    theme: {
      paper: "#f8fafc",
      ink: "#111a33",
      muted: "#566180",
      primary: "#1e3a8a",
      secondary: "#1d4ed8",
      accent: "#d4a72c",
      band: "#1e3a8a",
      onBand: "#fef3c7",
      line: "#cbd5e1"
    },
    fonts: { heading: FONT.cinzel, body: FONT.lora },
    frame: "band",
    bandHeight: 46,
    header: "banner",
    headings: "boxed",
    photo: "circle",
    columns: 2,
    padding: { top: 54, right: 20, bottom: 22, left: 20 },
    pattern: damask("#1e3a8a"),
    patternOpacity: 0.05,
    headerPattern: damask("rgba(255,255,255,0.14)")
  },
  {
    id: "rosegold-onyx",
    name: "Rose Gold Onyx",
    description: "Charcoal paper with rose-gold accents and a slim stripe. Sleek and contemporary.",
    style: "modern",
    suitedFor: ["general", "christian"],
    dark: true,
    theme: {
      paper: "#1c1917",
      ink: "#f5f0eb",
      muted: "#b8a9a1",
      primary: "#e8b4a6",
      secondary: "#d19a8a",
      accent: "#b76e79",
      band: "#b76e79",
      onBand: "#fff5f2",
      line: "#5c4d48"
    },
    fonts: { heading: FONT.cormorant, body: FONT.manrope },
    frame: "stripe",
    header: "split",
    headings: "caps",
    photo: "rounded",
    columns: 1,
    padding: { top: 26, right: 24, bottom: 26, left: 32 }
  },

  /* ────────────────────────── Floral ────────────────────────── */
  {
    id: "blush-rose",
    name: "Blush Rose",
    description: "Watercolour roses in the corners of soft blush paper. Romantic and light.",
    style: "floral",
    suitedFor: ALL,
    featured: true,
    theme: {
      paper: "#fff7f7",
      ink: "#3b1f2b",
      muted: "#7f5a67",
      primary: "#9d174d",
      secondary: "#be185d",
      accent: "#f9a8d4",
      band: "#9d174d",
      onBand: "#fff1f2",
      line: "#f3c4d6"
    },
    fonts: { heading: FONT.cormorant, body: FONT.lora },
    frame: "none",
    header: "classic",
    headings: "underline",
    photo: "circle",
    columns: 1,
    padding: { top: 30, right: 28, bottom: 30, left: 28 },
    pattern: dots("#f9a8d4"),
    patternOpacity: 0.4,
    decor: topCorners(roseSpray("#f9a8d4", "#db2777", "#86a37a"), "56mm 56mm", "4mm"),
    headerRule: true
  },
  {
    id: "sage-botanical",
    name: "Sage Botanical",
    description: "Eucalyptus sprigs and a hairline frame. Fresh, modern, and understated.",
    style: "floral",
    suitedFor: ALL,
    featured: true,
    theme: {
      paper: "#fbfcf8",
      ink: "#1f2a1a",
      muted: "#65705c",
      primary: "#3f6212",
      secondary: "#65a30d",
      accent: "#a3b18a",
      band: "#3f6212",
      onBand: "#f7fee7",
      line: "#cfd8c3"
    },
    fonts: { heading: FONT.cormorant, body: FONT.manrope },
    frame: "pinline",
    header: "split",
    headings: "caps",
    photo: "rounded",
    columns: 1,
    padding: { top: 30, right: 28, bottom: 44, left: 28 },
    decor: (() => {
      const branch = botanicalBranch("#9db08a", "#6b7f5a");
      return layers([
        [branch[1], "calc(100% - 6mm) 6mm", "52mm 52mm"],
        [branch[2], "6mm calc(100% - 6mm)", "40mm 40mm"]
      ]);
    })()
  },
  {
    id: "lavender-elegance",
    name: "Lavender Elegance",
    description: "Lavender paisley on lilac paper with an arched portrait and pill headings.",
    style: "floral",
    suitedFor: ALL,
    theme: {
      paper: "#faf7ff",
      ink: "#2a1f3d",
      muted: "#6b5f85",
      primary: "#5b21b6",
      secondary: "#7c3aed",
      accent: "#c4b5fd",
      band: "#5b21b6",
      onBand: "#f5f3ff",
      line: "#ddd6fe"
    },
    fonts: { heading: FONT.cormorant, body: FONT.manrope },
    frame: "double",
    header: "classic",
    headings: "pill",
    photo: "arch",
    columns: 2,
    padding: { top: 26, right: 24, bottom: 26, left: 24 },
    pattern: paisley("#c4b5fd"),
    patternOpacity: 0.45
  },
  {
    id: "meadow-leaves",
    name: "Meadow Leaves",
    description: "Scattered leaf outlines on cream with forest-green headings.",
    style: "floral",
    suitedFor: ["general", "christian", "hindu"],
    theme: {
      paper: "#fefdf6",
      ink: "#1d2a1f",
      muted: "#5e6e60",
      primary: "#166534",
      secondary: "#15803d",
      accent: "#bbf7d0",
      band: "#166534",
      onBand: "#f0fdf4",
      line: "#cfe3d3"
    },
    fonts: { heading: FONT.playfair, body: FONT.manrope },
    frame: "pinline",
    header: "classic",
    headings: "pill",
    photo: "circle",
    columns: 2,
    padding: { top: 26, right: 24, bottom: 26, left: 24 },
    pattern: leaves("#86b596"),
    patternOpacity: 0.3
  },

  /* ────────────────────────── Modern ────────────────────────── */
  {
    id: "saffron-sunrise",
    name: "Saffron Sunrise",
    description: "A warm saffron-to-rose gradient banner with a curved edge. Bright and modern.",
    style: "modern",
    suitedFor: ["hindu", "general"],
    featured: true,
    theme: {
      paper: "#fffdfa",
      ink: "#2a1a10",
      muted: "#7b5a47",
      primary: "#c2410c",
      secondary: "#9a3412",
      accent: "#f59e0b",
      band: "#ea580c",
      onBand: "#fff7ed",
      line: "#fcd9b6"
    },
    fonts: { heading: FONT.playfair, body: FONT.manrope },
    frame: "arch",
    bandHeight: 50,
    header: "banner",
    headings: "pill",
    photo: "circle",
    columns: 2,
    padding: { top: 60, right: 20, bottom: 22, left: 20 }
  },
  {
    id: "slate-executive",
    name: "Slate Executive",
    description: "A dark side column carries the photo and contact details. Clean, resume-like structure.",
    style: "modern",
    suitedFor: ["general", "christian", "muslim"],
    featured: true,
    theme: {
      paper: "#ffffff",
      ink: "#111827",
      muted: "#6b7280",
      primary: "#111827",
      secondary: "#4b5563",
      accent: "#d97706",
      band: "#1f2937",
      onBand: "#f9fafb",
      line: "#e5e7eb"
    },
    fonts: { heading: FONT.manrope, body: FONT.manrope },
    frame: "sidebar",
    sideWidth: 64,
    header: "sidebar",
    headings: "caps",
    photo: "rounded",
    columns: 1,
    padding: { top: 22, right: 18, bottom: 22, left: 76 }
  },
  {
    id: "pearl-minimal",
    name: "Pearl Minimal",
    description: "Pure white, hairline rules, and generous spacing. Nothing but the essentials.",
    style: "minimal",
    suitedFor: ALL,
    featured: true,
    theme: {
      paper: "#ffffff",
      ink: "#0f172a",
      muted: "#64748b",
      primary: "#0f172a",
      secondary: "#475569",
      accent: "#94a3b8",
      band: "#0f172a",
      onBand: "#f8fafc",
      line: "#e2e8f0"
    },
    fonts: { heading: FONT.cormorant, body: FONT.manrope },
    frame: "pinline",
    header: "split",
    headings: "caps",
    photo: "rounded",
    columns: 1,
    padding: { top: 28, right: 28, bottom: 28, left: 28 }
  },
  {
    id: "ivory-serif",
    name: "Ivory Serif",
    description: "Centred serif typography with fine rules and corner ticks. Quietly formal.",
    style: "minimal",
    suitedFor: ALL,
    theme: {
      paper: "#fffdf8",
      ink: "#1c1917",
      muted: "#6f645a",
      primary: "#1c1917",
      secondary: "#78350f",
      accent: "#b45309",
      band: "#1c1917",
      onBand: "#fffbeb",
      line: "#d6cdbf"
    },
    fonts: { heading: FONT.playfair, body: FONT.lora },
    frame: "none",
    header: "classic",
    headings: "ornate",
    photo: "rounded",
    columns: 1,
    padding: { top: 28, right: 32, bottom: 28, left: 32 },
    decor: corners(cornerTick("#b45309"), "10mm 10mm", "10mm"),
    headerRule: true
  }
];

export const templateById = new Map(templates.map((template) => [template.id, template]));

export function getTemplate(id: string | null | undefined): BiodataTemplate {
  return (id && templateById.get(id)) || templates[0];
}

export function templatesFor(category: BiodataCategory): BiodataTemplate[] {
  return [...templates].sort((a, b) => Number(b.suitedFor.includes(category)) - Number(a.suitedFor.includes(category)));
}

export function defaultTemplateFor(category: BiodataCategory): BiodataTemplate {
  return templates.find((template) => template.featured && template.suitedFor[0] === category) ?? templatesFor(category)[0];
}

export const templateStyles: Array<{ key: TemplateStyle | "all"; label: string }> = [
  { key: "all", label: "All styles" },
  { key: "traditional", label: "Traditional" },
  { key: "royal", label: "Royal" },
  { key: "floral", label: "Floral" },
  { key: "modern", label: "Modern" },
  { key: "minimal", label: "Minimal" }
];
