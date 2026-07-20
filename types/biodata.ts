export type BiodataCategory = "hindu" | "muslim" | "sikh" | "christian" | "general";

export type SectionKey =
  | "basic"
  | "religion"
  | "career"
  | "family"
  | "partner"
  | "contact";

export type LayoutType = "single" | "two-column" | "centered" | "cards" | "resume";
export type HeadingStyle = "bar" | "underline" | "pill" | "plain" | "boxed";

export interface TemplateTheme {
  background: string;
  paper: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  muted: string;
}

export interface TemplateAssets {
  frame?: string;
  watermark?: string;
  icon?: string;
  flourish?: string;
}

export interface BiodataTemplate {
  id: string;
  name: string;
  category: BiodataCategory;
  description: string;
  theme: TemplateTheme;
  fontFamily: string;
  borderStyle: string;
  layout: LayoutType;
  headingStyle: HeadingStyle;
  assets?: TemplateAssets;
  ornament:
    | "none"
    | "floral"
    | "corner"
    | "divider"
    | "royal"
    | "header-footer"
    | "gold-ornate"
    | "blush-vines"
    | "red-elephant"
    | "temple-gold"
    | "dark-floral"
    | "ganesha-premium";
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
}

export interface FieldDefinition {
  key: string;
  label: string;
  section: SectionKey;
  type?: "text" | "email" | "tel" | "date" | "textarea" | "number" | "select";
  placeholder?: string;
  options?: string[];
}

export interface SectionDefinition {
  key: SectionKey;
  title: string;
}
