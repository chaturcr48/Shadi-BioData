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
  ornament: "none" | "floral" | "corner" | "divider" | "royal" | "header-footer";
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
  options?: string[];
}

export interface SectionDefinition {
  key: SectionKey;
  title: string;
}
