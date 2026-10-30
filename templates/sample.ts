import type { BiodataCategory, BiodataFormData } from "@/types/biodata";
import { DEFAULT_TAGLINE, defaultInvocation, defaultSectionOrder } from "@/utils/fields";

const names: Record<BiodataCategory, { name: string; father: string; mother: string; contact: string; city: string; native: string }> = {
  hindu: { name: "Aarav Sharma", father: "Mr. Rajesh Sharma", mother: "Mrs. Sunita Sharma", contact: "Mr. Rajesh Sharma (Father)", city: "Jaipur, Rajasthan", native: "Jaipur" },
  muslim: { name: "Ayaan Khan", father: "Mr. Imran Khan", mother: "Mrs. Shabana Khan", contact: "Mr. Imran Khan (Father)", city: "Lucknow, Uttar Pradesh", native: "Lucknow" },
  sikh: { name: "Arjun Singh Gill", father: "S. Harpreet Singh Gill", mother: "Mrs. Manjeet Kaur Gill", contact: "S. Harpreet Singh Gill (Father)", city: "Ludhiana, Punjab", native: "Ludhiana" },
  christian: { name: "Daniel Thomas", father: "Mr. George Thomas", mother: "Mrs. Mary Thomas", contact: "Mr. George Thomas (Father)", city: "Kochi, Kerala", native: "Kottayam" },
  general: { name: "Aditya Verma", father: "Mr. Anil Verma", mother: "Mrs. Rekha Verma", contact: "Mr. Anil Verma (Father)", city: "Pune, Maharashtra", native: "Nagpur" }
};

const categorySpecific: Record<BiodataCategory, Record<string, string>> = {
  hindu: {
    religion: "Hindu",
    casteCommunity: "Brahmin",
    subCaste: "Gaur",
    gotraClan: "Kashyap",
    manglikStatus: "Non Manglik",
    rashi: "Vrishabh (Taurus)",
    nakshatra: "Rohini",
    kuldeviKuldevta: "Shri Ganesh Ji",
    preferredReligion: "Hindu",
    preferredCaste: "Brahmin preferred"
  },
  muslim: {
    religion: "Muslim",
    casteCommunity: "Pathan",
    sect: "Sunni",
    maslak: "Hanafi",
    namaz: "Regular",
    islamicEducation: "Quran and basic Islamic studies",
    preferredReligion: "Muslim",
    preferredCaste: "Sunni Muslim"
  },
  sikh: {
    religion: "Sikh",
    casteCommunity: "Jat Sikh",
    amritdhari: "No",
    keshdhari: "Yes",
    gurdwaraAssociation: "Gurdwara Dukh Niwaran Sahib",
    preferredReligion: "Sikh",
    preferredCaste: "Jat Sikh preferred"
  },
  christian: {
    religion: "Christian",
    casteCommunity: "Syrian Christian",
    denomination: "Catholic",
    churchName: "St. Mary's Cathedral Basilica",
    baptismConfirmation: "Baptised and confirmed",
    preferredReligion: "Christian",
    preferredCaste: "Catholic preferred"
  },
  general: {
    communityBackground: "Educated, well-travelled urban family",
    culturalValues: "Modern with traditional roots",
    preferredCaste: "No community preference"
  }
};

export function createSampleData(category: BiodataCategory, templateId: string, withPhoto = true): BiodataFormData {
  const who = names[category];
  return {
    category,
    templateId,
    sectionOrder: [...defaultSectionOrder],
    invocation: defaultInvocation[category],
    tagline: DEFAULT_TAGLINE,
    photo: withPhoto ? SAMPLE_PHOTO : undefined,
    customFields: [],
    fields: {
      fullName: who.name,
      dateOfBirth: "1996-08-18",
      timeOfBirth: "07:35 AM",
      placeOfBirth: who.city,
      age: "29",
      height: "5 ft 10 in (178 cm)",
      weight: "70-75 kg",
      complexion: "Fair",
      bloodGroup: "B+",
      maritalStatus: "Never Married",
      motherTongue: category === "sikh" ? "Punjabi" : category === "christian" ? "Malayalam" : "Hindi",
      diet: category === "hindu" ? "Vegetarian" : "Non-Vegetarian",
      hobbies: "Reading, cricket, travel and photography",
      education: "MBA (Finance), IIM Ahmedabad · B.Tech, NIT Trichy",
      occupation: "Senior Product Manager",
      companyBusiness: "Infosys Ltd.",
      annualIncome: "20-30 LPA",
      workLocation: "Bengaluru",
      currentCity: "Bengaluru, Karnataka",
      nativePlace: who.native,
      aboutMe:
        "Calm, family-oriented and career-focused. I value honesty, humour and meaningful conversation, and enjoy weekend treks and home-cooked food.",
      fatherName: who.father,
      fatherOccupation: "Retired Bank Manager",
      motherName: who.mother,
      motherOccupation: "Homemaker",
      brothers: "1",
      sisters: "1",
      siblingsDetails: "Elder brother (married, settled in Dubai), younger sister (studying)",
      familyType: "Nuclear Family",
      familyValues: "Traditional with modern outlook",
      familyStatus: "Upper Middle Class",
      familyLocation: who.city,
      aboutFamily: "A close-knit, educated family with strong cultural values and a warm, supportive outlook.",
      preferredAgeRange: "25-28 years",
      preferredHeight: "5 ft 2 in and above",
      preferredMaritalStatus: "Never Married",
      preferredEducation: "Post Graduate",
      preferredProfession: "Working Professional",
      preferredLocation: "Anywhere in India",
      otherExpectations: "Looking for a kind, educated and family-oriented partner who values both career and home.",
      contactPerson: who.contact,
      mobileNumber: "+91 98765 43210",
      email: "sharma.family@example.com",
      address: `12, Shanti Niketan, ${who.city}, India`,
      ...categorySpecific[category]
    }
  };
}

/** A soft, neutral placeholder portrait (inline SVG) used in sample previews. */
export const SAMPLE_PHOTO =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 240'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#f3e2c8'/><stop offset='1' stop-color='#d9b98f'/></linearGradient></defs>
      <rect width='200' height='240' fill='url(#g)'/>
      <circle cx='100' cy='92' r='44' fill='#8a5a3b'/>
      <path d='M28 240c6-52 36-78 72-78s66 26 72 78z' fill='#7a1f2b'/>
      <path d='M64 238c4-30 16-48 36-56 20 8 32 26 36 56z' fill='#c9a227' opacity='.9'/>
      <circle cx='100' cy='92' r='44' fill='#b07a55'/>
      <path d='M56 84c4-30 22-46 44-46s40 16 44 46c-10-14-24-20-44-20s-34 6-44 20z' fill='#2b1a14'/>
    </svg>`
  );
