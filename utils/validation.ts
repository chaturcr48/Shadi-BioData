import type { BiodataFormData } from "@/types/biodata";

export function validateBiodata(data: BiodataFormData): Record<string, string> {
  const errors: Record<string, string> = {};
  const email = data.fields.email?.trim();
  const mobile = data.fields.mobileNumber?.trim();
  const alternate = data.fields.alternateMobileNumber?.trim();

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (mobile && mobile.replace(/\D/g, "").length < 8) {
    errors.mobileNumber = "Mobile number looks too short.";
  }

  if (alternate && alternate.replace(/\D/g, "").length < 8) {
    errors.alternateMobileNumber = "Alternate mobile number looks too short.";
  }

  return errors;
}
