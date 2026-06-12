import type { BiodataCategory, FieldDefinition, SectionDefinition, SectionKey } from "@/types/biodata";

export const sectionDefinitions: SectionDefinition[] = [
  { key: "basic", title: "Basic Details" },
  { key: "religion", title: "Religion/Community Details" },
  { key: "career", title: "Education & Career" },
  { key: "family", title: "Family Details" },
  { key: "partner", title: "Partner Preferences" },
  { key: "contact", title: "Contact Details" }
];

export const defaultSectionOrder: SectionKey[] = ["basic", "religion", "career", "family", "partner", "contact"];

const commonFields: FieldDefinition[] = [
  { key: "fullName", label: "Full Name", section: "basic" },
  { key: "dateOfBirth", label: "Date of Birth", section: "basic", type: "date" },
  { key: "timeOfBirth", label: "Time of Birth", section: "basic" },
  { key: "placeOfBirth", label: "Place of Birth", section: "basic" },
  { key: "age", label: "Age", section: "basic", type: "number" },
  { key: "height", label: "Height", section: "basic" },
  { key: "weight", label: "Weight", section: "basic" },
  { key: "complexion", label: "Complexion", section: "basic" },
  { key: "bloodGroup", label: "Blood Group", section: "basic" },
  { key: "maritalStatus", label: "Marital Status", section: "basic", type: "select", options: ["Never Married", "Divorced", "Widowed", "Separated"] },
  { key: "motherTongue", label: "Mother Tongue", section: "basic" },
  { key: "religion", label: "Religion", section: "religion" },
  { key: "casteCommunity", label: "Caste / Community", section: "religion" },
  { key: "subCaste", label: "Sub-caste", section: "religion" },
  { key: "gotraClan", label: "Gotra / Clan", section: "religion" },
  { key: "manglikStatus", label: "Manglik Status", section: "religion" },
  { key: "education", label: "Education", section: "career" },
  { key: "occupation", label: "Occupation", section: "career" },
  { key: "companyBusiness", label: "Company / Business Name", section: "career" },
  { key: "annualIncome", label: "Annual Income", section: "career" },
  { key: "workLocation", label: "Work Location", section: "career" },
  { key: "currentCity", label: "Current City", section: "career" },
  { key: "nativePlace", label: "Native Place", section: "career" },
  { key: "aboutMe", label: "About Me", section: "career", type: "textarea" },
  { key: "fatherName", label: "Father's Name", section: "family" },
  { key: "fatherOccupation", label: "Father's Occupation", section: "family" },
  { key: "motherName", label: "Mother's Name", section: "family" },
  { key: "motherOccupation", label: "Mother's Occupation", section: "family" },
  { key: "brothers", label: "Number of Brothers", section: "family", type: "number" },
  { key: "sisters", label: "Number of Sisters", section: "family", type: "number" },
  { key: "familyType", label: "Family Type", section: "family" },
  { key: "familyValues", label: "Family Values", section: "family" },
  { key: "familyStatus", label: "Family Status", section: "family" },
  { key: "familyLocation", label: "Family Location", section: "family" },
  { key: "aboutFamily", label: "About Family", section: "family", type: "textarea" },
  { key: "preferredAgeRange", label: "Preferred Age Range", section: "partner" },
  { key: "preferredHeight", label: "Preferred Height", section: "partner" },
  { key: "preferredReligion", label: "Preferred Religion", section: "partner" },
  { key: "preferredCaste", label: "Preferred Caste / Community", section: "partner" },
  { key: "preferredEducation", label: "Preferred Education", section: "partner" },
  { key: "preferredProfession", label: "Preferred Profession", section: "partner" },
  { key: "preferredLocation", label: "Preferred Location", section: "partner" },
  { key: "otherExpectations", label: "Other Expectations", section: "partner", type: "textarea" },
  { key: "contactPerson", label: "Contact Person Name", section: "contact" },
  { key: "mobileNumber", label: "Mobile Number", section: "contact", type: "tel" },
  { key: "alternateMobileNumber", label: "Alternate Mobile Number", section: "contact", type: "tel" },
  { key: "email", label: "Email", section: "contact", type: "email" },
  { key: "address", label: "Address", section: "contact", type: "textarea" }
];

const categoryFields: Record<BiodataCategory, FieldDefinition[]> = {
  hindu: [
    { key: "nakshatra", label: "Nakshatra", section: "religion" },
    { key: "rashi", label: "Rashi", section: "religion" },
    { key: "kuldeviKuldevta", label: "Kuldevi/Kuldevta", section: "religion" }
  ],
  muslim: [
    { key: "sect", label: "Sect", section: "religion" },
    { key: "maslak", label: "Maslak", section: "religion" },
    { key: "namaz", label: "Namaz", section: "religion" },
    { key: "hijabPreference", label: "Hijab Preference, if applicable", section: "religion" },
    { key: "islamicEducation", label: "Islamic Education", section: "religion" }
  ],
  sikh: [
    { key: "amritdhari", label: "Amritdhari", section: "religion" },
    { key: "gurdwaraAssociation", label: "Gurdwara Association, if applicable", section: "religion" }
  ],
  christian: [
    { key: "denomination", label: "Denomination", section: "religion" },
    { key: "churchName", label: "Church Name", section: "religion" },
    { key: "baptismConfirmation", label: "Baptism/Confirmation Details, if applicable", section: "religion" }
  ],
  general: [
    { key: "communityBackground", label: "Community Background", section: "religion" },
    { key: "culturalValues", label: "Cultural Values", section: "religion" }
  ]
};

export function getFieldsForCategory(category: BiodataCategory): FieldDefinition[] {
  const fields = commonFields.filter((field) => {
    if (category === "general") {
      return !["religion", "gotraClan", "manglikStatus"].includes(field.key);
    }

    if (category !== "hindu" && ["manglikStatus"].includes(field.key)) {
      return false;
    }

    return true;
  });

  return [...fields, ...categoryFields[category]];
}

export function getSectionTitle(key: SectionKey): string {
  return sectionDefinitions.find((section) => section.key === key)?.title ?? key;
}
