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

const ageOptions = Array.from({ length: 43 }, (_, index) => `${18 + index}`);
const heightOptions = [
  "4 feet 6 inches",
  "4 feet 7 inches",
  "4 feet 8 inches",
  "4 feet 9 inches",
  "4 feet 10 inches",
  "4 feet 11 inches",
  "5 feet",
  "5 feet 1 inch",
  "5 feet 2 inches",
  "5 feet 3 inches",
  "5 feet 4 inches",
  "5 feet 5 inches",
  "5 feet 6 inches",
  "5 feet 7 inches",
  "5 feet 8 inches",
  "5 feet 9 inches",
  "5 feet 10 inches",
  "5 feet 11 inches",
  "6 feet",
  "6 feet 1 inch",
  "6 feet 2 inches",
  "6 feet 3 inches",
  "6 feet 4 inches"
];
const weightOptions = [
  "40-45 kg",
  "45-50 kg",
  "50-55 kg",
  "55-60 kg",
  "60-65 kg",
  "65-70 kg",
  "70-75 kg",
  "75-80 kg",
  "80-85 kg",
  "85-90 kg",
  "90-95 kg",
  "95-100 kg",
  "100 kg+"
];
const complexionOptions = ["Very Fair", "Fair", "Wheatish", "Wheatish Fair", "Dusky", "Dark"];
const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Not Sure"];
const maritalStatusOptions = ["Never Married", "Divorced", "Widowed", "Separated"];
const motherTongueOptions = [
  "Hindi",
  "English",
  "Bengali",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Marathi",
  "Punjabi",
  "Tamil",
  "Telugu",
  "Urdu",
  "Other"
];
const religionOptions = ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Buddhist", "Parsi", "Other"];
const manglikOptions = ["Manglik", "Non Manglik", "Anshik Manglik", "Don't Know"];
const incomeOptions = [
  "Below 3 LPA",
  "3-5 LPA",
  "5-7 LPA",
  "7-10 LPA",
  "10-15 LPA",
  "15-20 LPA",
  "20-30 LPA",
  "30-50 LPA",
  "50 LPA+",
  "Prefer not to mention"
];
const countOptions = ["0", "1", "2", "3", "4", "5+"];
const familyTypeOptions = ["Nuclear Family", "Joint Family", "Extended Family"];
const familyValuesOptions = ["Traditional", "Moderate", "Liberal", "Traditional with modern outlook"];
const familyStatusOptions = ["Middle Class", "Upper Middle Class", "Rich / Affluent"];
const preferredAgeOptions = ["18-23 years", "23-26 years", "26-30 years", "30-35 years", "35-40 years", "40+ years", "Flexible"];
const preferredHeightOptions = [
  "Below 5 feet",
  "5 feet and above",
  "5 feet 2 inches and above",
  "5 feet 4 inches and above",
  "5 feet 6 inches and above",
  "5 feet 8 inches and above",
  "Flexible"
];
const preferredEducationOptions = ["Graduate", "Post Graduate", "Professional Degree", "Doctorate", "Well educated", "Flexible"];
const preferredProfessionOptions = ["Working Professional", "Business", "Government Job", "Private Sector", "Self Employed", "Flexible"];
const preferredLocationOptions = ["Same City", "Same State", "Metro City", "India", "Abroad", "Flexible"];
const yesNoOptions = ["Yes", "No"];

const commonFields: FieldDefinition[] = [
  { key: "fullName", label: "Full Name", section: "basic" },
  { key: "dateOfBirth", label: "Date of Birth", section: "basic", type: "date" },
  { key: "timeOfBirth", label: "Time of Birth", section: "basic" },
  { key: "placeOfBirth", label: "Place of Birth", section: "basic" },
  { key: "age", label: "Age", section: "basic", type: "select", options: ageOptions },
  { key: "height", label: "Height", section: "basic", type: "select", options: heightOptions },
  { key: "weight", label: "Weight", section: "basic", type: "select", options: weightOptions },
  { key: "complexion", label: "Complexion", section: "basic", type: "select", options: complexionOptions },
  { key: "bloodGroup", label: "Blood Group", section: "basic", type: "select", options: bloodGroupOptions },
  { key: "maritalStatus", label: "Marital Status", section: "basic", type: "select", options: maritalStatusOptions },
  { key: "motherTongue", label: "Mother Tongue", section: "basic", type: "select", options: motherTongueOptions },
  { key: "religion", label: "Religion", section: "religion", type: "select", options: religionOptions },
  { key: "casteCommunity", label: "Caste / Community", section: "religion" },
  { key: "subCaste", label: "Sub-caste", section: "religion" },
  { key: "gotraClan", label: "Gotra / Clan", section: "religion" },
  { key: "manglikStatus", label: "Manglik Status", section: "religion", type: "select", options: manglikOptions },
  { key: "education", label: "Education", section: "career" },
  { key: "occupation", label: "Occupation", section: "career" },
  { key: "companyBusiness", label: "Company / Business Name", section: "career" },
  { key: "annualIncome", label: "Annual Income", section: "career", type: "select", options: incomeOptions },
  { key: "workLocation", label: "Work Location", section: "career" },
  { key: "currentCity", label: "Current City", section: "career" },
  { key: "nativePlace", label: "Native Place", section: "career" },
  { key: "aboutMe", label: "About Me", section: "career", type: "textarea" },
  { key: "fatherName", label: "Father's Name", section: "family" },
  { key: "fatherOccupation", label: "Father's Occupation", section: "family" },
  { key: "motherName", label: "Mother's Name", section: "family" },
  { key: "motherOccupation", label: "Mother's Occupation", section: "family" },
  { key: "brothers", label: "Number of Brothers", section: "family", type: "select", options: countOptions },
  { key: "sisters", label: "Number of Sisters", section: "family", type: "select", options: countOptions },
  { key: "familyType", label: "Family Type", section: "family", type: "select", options: familyTypeOptions },
  { key: "familyValues", label: "Family Values", section: "family", type: "select", options: familyValuesOptions },
  { key: "familyStatus", label: "Family Status", section: "family", type: "select", options: familyStatusOptions },
  { key: "familyLocation", label: "Family Location", section: "family" },
  { key: "aboutFamily", label: "About Family", section: "family", type: "textarea" },
  { key: "preferredAgeRange", label: "Preferred Age Range", section: "partner", type: "select", options: preferredAgeOptions },
  { key: "preferredHeight", label: "Preferred Height", section: "partner", type: "select", options: preferredHeightOptions },
  { key: "preferredReligion", label: "Preferred Religion", section: "partner", type: "select", options: religionOptions },
  { key: "preferredCaste", label: "Preferred Caste / Community", section: "partner" },
  { key: "preferredEducation", label: "Preferred Education", section: "partner", type: "select", options: preferredEducationOptions },
  { key: "preferredProfession", label: "Preferred Profession", section: "partner", type: "select", options: preferredProfessionOptions },
  { key: "preferredLocation", label: "Preferred Location", section: "partner", type: "select", options: preferredLocationOptions },
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
    { key: "namaz", label: "Namaz", section: "religion", type: "select", options: ["Regular", "Sometimes", "Learning", "Prefer not to mention"] },
    { key: "hijabPreference", label: "Hijab Preference, if applicable", section: "religion", type: "select", options: ["Yes", "No", "Optional", "Prefer not to mention"] },
    { key: "islamicEducation", label: "Islamic Education", section: "religion" }
  ],
  sikh: [
    { key: "amritdhari", label: "Amritdhari", section: "religion", type: "select", options: yesNoOptions },
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
