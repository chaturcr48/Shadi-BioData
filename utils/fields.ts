import type { BiodataCategory, FieldDefinition, SectionDefinition, SectionKey } from "@/types/biodata";

export const sectionDefinitions: SectionDefinition[] = [
  { key: "basic", title: "Personal Details", hint: "Name, birth details, height and appearance." },
  { key: "religion", title: "Religion & Community", hint: "Faith, community and astrological details." },
  { key: "career", title: "Education & Career", hint: "Qualifications, profession and income." },
  { key: "family", title: "Family Details", hint: "Parents, siblings and family background." },
  { key: "partner", title: "Partner Preferences", hint: "What you are looking for in a life partner." },
  { key: "contact", title: "Contact Details", hint: "How families can reach you." }
];

export const defaultSectionOrder: SectionKey[] = ["basic", "religion", "career", "family", "partner", "contact"];

export const categoryLabels: Record<BiodataCategory, string> = {
  hindu: "Hindu",
  muslim: "Muslim",
  sikh: "Sikh",
  christian: "Christian",
  general: "General"
};

export const categoryOrder: BiodataCategory[] = ["hindu", "muslim", "sikh", "christian", "general"];

export const defaultInvocation: Record<BiodataCategory, string> = {
  hindu: "॥ श्री गणेशाय नमः ॥",
  muslim: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
  sikh: "ੴ ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ",
  christian: "With the Blessings of God",
  general: ""
};

export const invocationSuggestions: Record<BiodataCategory, string[]> = {
  hindu: ["॥ श्री गणेशाय नमः ॥", "॥ ॐ ॥", "श्री", "॥ जय श्री राम ॥", "॥ श्री स्वामी समर्थ ॥", "ॐ नमः शिवाय"],
  muslim: ["بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "Bismillah-ir-Rahman-ir-Rahim", "In the name of Allah"],
  sikh: ["ੴ ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ", "ੴ", "ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖ਼ਾਲਸਾ", "Ik Onkar"],
  christian: ["With the Blessings of God", "✝ In God We Trust ✝", "By the Grace of God"],
  general: ["Biodata", "Matrimonial Profile", "With Best Wishes"]
};

export const DEFAULT_TAGLINE = "Marriage Biodata";

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, index) => `${from + index}`);

const heightOptions = [
  "4 ft 6 in (137 cm)",
  "4 ft 7 in (140 cm)",
  "4 ft 8 in (142 cm)",
  "4 ft 9 in (145 cm)",
  "4 ft 10 in (147 cm)",
  "4 ft 11 in (150 cm)",
  "5 ft (152 cm)",
  "5 ft 1 in (155 cm)",
  "5 ft 2 in (157 cm)",
  "5 ft 3 in (160 cm)",
  "5 ft 4 in (163 cm)",
  "5 ft 5 in (165 cm)",
  "5 ft 6 in (168 cm)",
  "5 ft 7 in (170 cm)",
  "5 ft 8 in (173 cm)",
  "5 ft 9 in (175 cm)",
  "5 ft 10 in (178 cm)",
  "5 ft 11 in (180 cm)",
  "6 ft (183 cm)",
  "6 ft 1 in (185 cm)",
  "6 ft 2 in (188 cm)",
  "6 ft 3 in (191 cm)",
  "6 ft 4 in (193 cm)"
];
const weightOptions = ["40-45 kg", "45-50 kg", "50-55 kg", "55-60 kg", "60-65 kg", "65-70 kg", "70-75 kg", "75-80 kg", "80-85 kg", "85-90 kg", "90-95 kg", "95-100 kg", "100 kg+"];
const complexionOptions = ["Very Fair", "Fair", "Wheatish", "Wheatish Fair", "Dusky", "Dark"];
const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const maritalStatusOptions = ["Never Married", "Divorced", "Widowed", "Separated", "Awaiting Divorce"];
const motherTongueOptions = ["Hindi", "English", "Bengali", "Gujarati", "Kannada", "Malayalam", "Marathi", "Punjabi", "Tamil", "Telugu", "Urdu", "Odia", "Assamese", "Konkani", "Other"];
const religionOptions = ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Buddhist", "Parsi", "Other"];
const manglikOptions = ["Manglik", "Non Manglik", "Anshik Manglik", "Don't Know"];
const incomeOptions = ["Below 3 LPA", "3-5 LPA", "5-7 LPA", "7-10 LPA", "10-15 LPA", "15-20 LPA", "20-30 LPA", "30-50 LPA", "50 LPA - 1 Cr", "1 Cr+", "Prefer not to mention"];
const countOptions = ["None", "1", "2", "3", "4", "5+"];
const familyTypeOptions = ["Nuclear Family", "Joint Family", "Extended Family"];
const familyValuesOptions = ["Traditional", "Moderate", "Liberal", "Traditional with modern outlook"];
const familyStatusOptions = ["Middle Class", "Upper Middle Class", "Rich / Affluent"];
const dietOptions = ["Vegetarian", "Eggetarian", "Non-Vegetarian", "Jain", "Vegan"];
const preferredAgeOptions = ["18-23 years", "21-25 years", "23-26 years", "25-28 years", "26-30 years", "28-32 years", "30-35 years", "35-40 years", "40+ years", "Flexible"];
const preferredHeightOptions = ["Below 5 ft", "5 ft and above", "5 ft 2 in and above", "5 ft 4 in and above", "5 ft 6 in and above", "5 ft 8 in and above", "5 ft 10 in and above", "Flexible"];
const preferredEducationOptions = ["Graduate", "Post Graduate", "Professional Degree", "Doctorate", "Well educated", "Flexible"];
const preferredProfessionOptions = ["Working Professional", "Business", "Government Job", "Private Sector", "Doctor / Medical", "Engineer / IT", "Self Employed", "Flexible"];
const preferredLocationOptions = ["Same City", "Same State", "Metro City", "Anywhere in India", "Abroad", "Flexible"];
const yesNoOptions = ["Yes", "No"];

const commonFields: FieldDefinition[] = [
  { key: "fullName", label: "Full Name", section: "basic" },
  { key: "dateOfBirth", label: "Date of Birth", section: "basic", type: "date" },
  { key: "timeOfBirth", label: "Time of Birth", section: "basic", placeholder: "e.g. 07:30 AM" },
  { key: "placeOfBirth", label: "Place of Birth", section: "basic", placeholder: "e.g. Jaipur, Rajasthan" },
  { key: "age", label: "Age", section: "basic", type: "select", options: range(18, 60) },
  { key: "height", label: "Height", section: "basic", type: "select", options: heightOptions },
  { key: "weight", label: "Weight", section: "basic", type: "select", options: weightOptions },
  { key: "complexion", label: "Complexion", section: "basic", type: "select", options: complexionOptions },
  { key: "bloodGroup", label: "Blood Group", section: "basic", type: "select", options: bloodGroupOptions },
  { key: "maritalStatus", label: "Marital Status", section: "basic", type: "select", options: maritalStatusOptions },
  { key: "motherTongue", label: "Mother Tongue", section: "basic", type: "select", options: motherTongueOptions },
  { key: "diet", label: "Diet", section: "basic", type: "select", options: dietOptions },
  { key: "hobbies", label: "Hobbies & Interests", section: "basic", placeholder: "e.g. Reading, music, travel" },

  { key: "religion", label: "Religion", section: "religion", type: "select", options: religionOptions },
  { key: "casteCommunity", label: "Caste / Community", section: "religion", placeholder: "e.g. Brahmin" },
  { key: "subCaste", label: "Sub-caste", section: "religion", placeholder: "e.g. Saraswat" },
  { key: "gotraClan", label: "Gotra", section: "religion", placeholder: "e.g. Kashyap" },
  { key: "manglikStatus", label: "Manglik Status", section: "religion", type: "select", options: manglikOptions },

  { key: "education", label: "Education", section: "career", placeholder: "e.g. B.Tech, IIT Delhi" },
  { key: "occupation", label: "Occupation", section: "career", placeholder: "e.g. Software Engineer" },
  { key: "companyBusiness", label: "Company / Business", section: "career", placeholder: "e.g. Infosys Ltd." },
  { key: "annualIncome", label: "Annual Income", section: "career", type: "select", options: incomeOptions },
  { key: "workLocation", label: "Work Location", section: "career", placeholder: "e.g. Bengaluru" },
  { key: "currentCity", label: "Current City", section: "career", placeholder: "e.g. New Delhi" },
  { key: "nativePlace", label: "Native Place", section: "career", placeholder: "e.g. Lucknow, Uttar Pradesh" },
  { key: "aboutMe", label: "About Me", section: "career", type: "textarea", wide: true, placeholder: "A few lines about your nature, values, career and interests." },

  { key: "fatherName", label: "Father's Name", section: "family", placeholder: "e.g. Mr. Rajesh Kumar" },
  { key: "fatherOccupation", label: "Father's Occupation", section: "family", placeholder: "e.g. Business Owner" },
  { key: "motherName", label: "Mother's Name", section: "family", placeholder: "e.g. Mrs. Sunita Kumar" },
  { key: "motherOccupation", label: "Mother's Occupation", section: "family", placeholder: "e.g. Homemaker" },
  { key: "brothers", label: "Brothers", section: "family", type: "select", options: countOptions },
  { key: "sisters", label: "Sisters", section: "family", type: "select", options: countOptions },
  { key: "siblingsDetails", label: "Siblings Details", section: "family", placeholder: "e.g. 1 elder brother (married), 1 younger sister" },
  { key: "familyType", label: "Family Type", section: "family", type: "select", options: familyTypeOptions },
  { key: "familyValues", label: "Family Values", section: "family", type: "select", options: familyValuesOptions },
  { key: "familyStatus", label: "Family Status", section: "family", type: "select", options: familyStatusOptions },
  { key: "familyLocation", label: "Family Location", section: "family", placeholder: "e.g. Jaipur, Rajasthan" },
  { key: "aboutFamily", label: "About Family", section: "family", type: "textarea", wide: true, placeholder: "A short note about your family background and values." },

  { key: "preferredAgeRange", label: "Age", section: "partner", type: "select", options: preferredAgeOptions },
  { key: "preferredHeight", label: "Height", section: "partner", type: "select", options: preferredHeightOptions },
  { key: "preferredMaritalStatus", label: "Marital Status", section: "partner", type: "select", options: ["Never Married", "Divorced", "Widowed", "Flexible"] },
  { key: "preferredReligion", label: "Religion", section: "partner", type: "select", options: religionOptions },
  { key: "preferredCaste", label: "Caste / Community", section: "partner", placeholder: "e.g. Same community preferred" },
  { key: "preferredEducation", label: "Education", section: "partner", type: "select", options: preferredEducationOptions },
  { key: "preferredProfession", label: "Profession", section: "partner", type: "select", options: preferredProfessionOptions },
  { key: "preferredLocation", label: "Location", section: "partner", type: "select", options: preferredLocationOptions },
  { key: "otherExpectations", label: "Other Expectations", section: "partner", type: "textarea", wide: true, placeholder: "Anything else that matters to you." },

  { key: "contactPerson", label: "Contact Person", section: "contact", placeholder: "e.g. Mr. Rajesh Kumar (Father)" },
  { key: "mobileNumber", label: "Mobile Number", section: "contact", type: "tel", placeholder: "e.g. +91 98765 43210" },
  { key: "alternateMobileNumber", label: "Alternate Number", section: "contact", type: "tel", placeholder: "e.g. +91 91234 56780" },
  { key: "email", label: "Email", section: "contact", type: "email", placeholder: "e.g. family@example.com" },
  { key: "address", label: "Address", section: "contact", type: "textarea", wide: true, placeholder: "House no., locality, city, state, PIN" }
];

const categoryFields: Record<BiodataCategory, FieldDefinition[]> = {
  hindu: [
    { key: "rashi", label: "Rashi", section: "religion", type: "select", options: ["Mesh (Aries)", "Vrishabh (Taurus)", "Mithun (Gemini)", "Kark (Cancer)", "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrishchik (Scorpio)", "Dhanu (Sagittarius)", "Makar (Capricorn)", "Kumbh (Aquarius)", "Meen (Pisces)"] },
    { key: "nakshatra", label: "Nakshatra", section: "religion", placeholder: "e.g. Rohini" },
    { key: "kuldeviKuldevta", label: "Kuldevi / Kuldevta", section: "religion", placeholder: "e.g. Shri Ganesh Ji" }
  ],
  muslim: [
    { key: "sect", label: "Sect", section: "religion", type: "select", options: ["Sunni", "Shia", "Ahmadiyya", "Other"] },
    { key: "maslak", label: "Maslak", section: "religion", placeholder: "e.g. Hanafi" },
    { key: "namaz", label: "Namaz", section: "religion", type: "select", options: ["Regular", "Sometimes", "Learning", "Prefer not to mention"] },
    { key: "hijabPreference", label: "Hijab", section: "religion", type: "select", options: ["Yes", "No", "Optional", "Prefer not to mention"] },
    { key: "islamicEducation", label: "Islamic Education", section: "religion", placeholder: "e.g. Quran & basic Islamic studies" }
  ],
  sikh: [
    { key: "amritdhari", label: "Amritdhari", section: "religion", type: "select", options: yesNoOptions },
    { key: "keshdhari", label: "Keshdhari", section: "religion", type: "select", options: yesNoOptions },
    { key: "gurdwaraAssociation", label: "Gurdwara Association", section: "religion", placeholder: "e.g. Gurdwara Bangla Sahib" }
  ],
  christian: [
    { key: "denomination", label: "Denomination", section: "religion", type: "select", options: ["Catholic", "Protestant", "Orthodox", "Pentecostal", "Baptist", "Methodist", "Syro-Malabar", "Jacobite", "Marthoma", "Other"] },
    { key: "churchName", label: "Parish / Church", section: "religion", placeholder: "e.g. St. Mary's Church" },
    { key: "baptismConfirmation", label: "Baptism / Confirmation", section: "religion", placeholder: "e.g. Baptised and confirmed" }
  ],
  general: [
    { key: "communityBackground", label: "Community Background", section: "religion", placeholder: "e.g. Punjabi family" },
    { key: "culturalValues", label: "Cultural Values", section: "religion", placeholder: "e.g. Modern with traditional roots" }
  ]
};

export function getFieldsForCategory(category: BiodataCategory): FieldDefinition[] {
  const result = commonFields.filter((field) => {
    if (category === "general" && ["religion", "gotraClan", "manglikStatus"].includes(field.key)) return false;
    if (category !== "hindu" && ["gotraClan", "manglikStatus"].includes(field.key)) return false;
    return true;
  });

  // Slot category-specific fields right after the shared religion fields.
  const lastReligionIndex = result.map((field) => field.section).lastIndexOf("religion");
  result.splice(lastReligionIndex + 1, 0, ...categoryFields[category]);
  return result;
}

export function getSectionTitle(key: SectionKey): string {
  return sectionDefinitions.find((section) => section.key === key)?.title ?? key;
}

export function getSectionHint(key: SectionKey): string {
  return sectionDefinitions.find((section) => section.key === key)?.hint ?? "";
}

/** Human-readable value for special field types (dates are stored as ISO strings). */
export function formatFieldValue(field: FieldDefinition | undefined, value: string): string {
  if (field?.type === "date" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    }
  }
  return value;
}
