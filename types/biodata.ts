export type BiodataCategory = "hindu" | "muslim" | "sikh" | "christian" | "general";

export type SectionKey = "basic" | "religion" | "career" | "family" | "partner" | "contact";

export type TemplateStyle = "traditional" | "royal" | "floral" | "modern" | "minimal";

/** How the decorative frame around the page is drawn. */
export type FrameKind =
  | "image" // full-page PNG frame from /public/biodata_assets
  | "double" // two thin rules inset from the edge
  | "pinline" // a single hairline with corner ticks
  | "corners" // SVG flourishes in the four corners
  | "band" // solid colour band across the top (and a thin one at the bottom)
  | "arch" // colour banner with a curved bottom edge
  | "edge" // patterned strip running around all four edges
  | "sidebar" // coloured column down the left side
  | "stripe" // slim vertical accent stripe at the left
  | "garland" // hanging marigold garland along the top
  | "none";

export type HeaderKind = "classic" | "banner" | "split" | "sidebar";
export type SectionHeadingKind = "underline" | "bar" | "ornate" | "caps" | "pill" | "boxed";
export type PhotoShape = "circle" | "rounded" | "arch" | "square";

export interface TemplateTheme {
  paper: string;
  ink: string;
  muted: string;
  primary: string;
  secondary: string;
  accent: string;
  /** Colour of the header band / sidebar when the frame uses one. */
  band: string;
  /** Text colour used on top of `band`. */
  onBand: string;
  /** Hairlines, rules and dividers. */
  line: string;
}

export interface TemplateFonts {
  heading: string;
  body: string;
}

export interface TemplateAssets {
  frame?: string;
  watermark?: string;
  emblem?: string;
}

export interface PagePadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface BiodataTemplate {
  id: string;
  name: string;
  description: string;
  style: TemplateStyle;
  /** Categories this design is recommended for. Every template can be used with every category. */
  suitedFor: BiodataCategory[];
  theme: TemplateTheme;
  fonts: TemplateFonts;
  frame: FrameKind;
  header: HeaderKind;
  headings: SectionHeadingKind;
  photo: PhotoShape;
  columns: 1 | 2;
  /** Padding of the printable body in millimetres. */
  padding: PagePadding;
  /** Background pattern (CSS `background-image` value), tiled across the page. */
  pattern?: string;
  patternOpacity?: number;
  /** Positioned ornaments (a full CSS `background` shorthand with layers). */
  decor?: string;
  /** Pattern tiled over the header band (banner headers only). */
  headerPattern?: string;
  /** Height of the header band in mm (frames `band` and `arch`). */
  bandHeight?: number;
  /** Width of the side column in mm (frame `sidebar`). */
  sideWidth?: number;
  assets?: TemplateAssets;
  watermarkOpacity?: number;
  dark?: boolean;
  /** Show a decorative rule with a diamond under the header. */
  headerRule?: boolean;
  featured?: boolean;
}

export interface CustomField {
  id: string;
  label: string;
  value: string;
  section: SectionKey;
}

export interface BiodataFormData {
  category: BiodataCategory;
  templateId: string;
  sectionOrder: SectionKey[];
  fields: Record<string, string>;
  customFields: CustomField[];
  /** Data URL of the profile photo. */
  photo?: string;
  /** Opening blessing line, e.g. "॥ श्री गणेशाय नमः ॥". Empty string hides it. */
  invocation?: string;
  /** Small caption under the name, e.g. "Marriage Biodata". */
  tagline?: string;
}

export interface FieldDefinition {
  key: string;
  label: string;
  section: SectionKey;
  type?: "text" | "email" | "tel" | "date" | "textarea" | "number" | "select";
  placeholder?: string;
  options?: string[];
  /** Field is rendered wide in the form. */
  wide?: boolean;
}

export interface SectionDefinition {
  key: SectionKey;
  title: string;
  hint: string;
}
