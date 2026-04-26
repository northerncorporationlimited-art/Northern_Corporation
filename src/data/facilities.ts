/* ═══════════════════════════════════════════════
   FACILITIES DATA — Centralised content for
   both the homepage section and detail pages.
   ═══════════════════════════════════════════════ */

export interface Facility {
  slug: string;
  title: string;
  shortTitle: string;
  image: string;
  icon: string;
  tagline: string;
  description: string;
  longDescription: string;
  highlights: { label: string; value: string }[];
  details: string[];
  galleryImages: string[];
}

export const FACILITIES: Facility[] = [
  {
    slug: "prayer-rooms",
    title: "Prayer Rooms",
    shortTitle: "Prayer",
    image: "/images/facilities/prayer.jpg",
    icon: "🕌",
    tagline: "Spiritual Wellbeing",
    description:
      "Separate, thoughtfully equipped prayer rooms for male and female employees. An Imam is available to lead prayers, fostering a supportive community.",
    longDescription:
      "At Northern Corporation, we recognize that spiritual wellbeing is integral to overall employee satisfaction. Our dedicated prayer rooms are designed to provide a serene, comfortable space where employees can fulfill their religious obligations without disruption. Separate facilities for male and female employees ensure privacy and comfort, while a resident Imam is available to lead congregational prayers during work hours. The rooms are equipped with clean prayer mats, washing facilities for ablution, and Qibla direction markers. During Ramadan, special arrangements are made for Iftar and Sehri, reinforcing our commitment to honoring the cultural values of our workforce.",
    highlights: [
      { label: "Capacity", value: "200+" },
      { label: "Prayer Times", value: "5 Daily" },
      { label: "Facilities", value: "Full Ablution" },
      { label: "Special Events", value: "Ramadan & Eid" },
    ],
    details: [
      "Separate male and female prayer areas with privacy partitions",
      "Resident Imam available for all five daily prayers",
      "Clean, well-maintained ablution (wudu) facilities",
      "Air-conditioned rooms with comfortable prayer mats",
      "Qibla direction markers in every room",
      "Special Ramadan arrangements including Iftar meals",
    ],
    galleryImages: [
      "/images/facilities/prayer.jpg",
      "/images/northern/building-1.jpg",
    ],
  },
  {
    slug: "medical-service",
    title: "Medical Service",
    shortTitle: "Medical",
    image: "/images/facilities/medical.jpg",
    icon: "🏥",
    tagline: "Health & Wellness",
    description:
      "Comprehensive on-site medical services staffed by skilled doctors and nurses, offering free treatment and a dedicated psychology center for wellness.",
    longDescription:
      "Northern Corporation maintains a fully equipped on-site medical center staffed by qualified physicians and trained nurses. Every employee has access to free medical consultations, basic treatments, and emergency care during work hours. Our medical team conducts regular health screenings, vaccination drives, and wellness programs. We also operate a dedicated psychology and counseling center — a pioneering initiative in the Bangladeshi garment sector — providing confidential mental health support to all employees. Pregnant workers receive specialized prenatal care and flexible scheduling to ensure the health of both mother and child.",
    highlights: [
      { label: "Doctors", value: "4 On-site" },
      { label: "Nurses", value: "12 Full-time" },
      { label: "Cost", value: "100% Free" },
      { label: "Mental Health", value: "Psychology Center" },
    ],
    details: [
      "4 qualified doctors and 12 nurses on-site during all shifts",
      "Free medical consultations and basic treatments",
      "Dedicated psychology and counseling center",
      "Regular health screening and vaccination drives",
      "Emergency response team with first-aid stations on every floor",
      "Specialized prenatal care for pregnant workers",
    ],
    galleryImages: [
      "/images/facilities/medical.jpg",
      "/images/northern/building-2.jpg",
    ],
  },
  {
    slug: "dining",
    title: "Dining & Canteen",
    shortTitle: "Dining",
    image: "/images/facilities/dining.jpg",
    icon: "🍽️",
    tagline: "Nutritious Meals Daily",
    description:
      "Spacious dining areas with large TVs, offering free, healthy meals and snacks from separate kitchens, maintained to the highest standards.",
    longDescription:
      "Our modern canteen facilities serve over 8,000 nutritious meals daily, prepared in hygienic kitchens that meet international food safety standards. Every employee receives a free, balanced meal during their shift — a cornerstone of our belief that well-nourished workers are more productive and satisfied. The dining halls are spacious and well-ventilated, featuring large-screen TVs for relaxation during breaks. Separate kitchens ensure food quality and variety, with menus that rotate weekly to include traditional Bangladeshi cuisine alongside nutritious snacks. Special dietary needs are accommodated, and drinking water stations are available throughout the facility.",
    highlights: [
      { label: "Meals Served", value: "8,000+/day" },
      { label: "Cost", value: "100% Free" },
      { label: "Menu Rotation", value: "Weekly" },
      { label: "Standards", value: "HACCP Certified" },
    ],
    details: [
      "Over 8,000 free, nutritious meals served daily across all shifts",
      "HACCP-certified kitchen maintaining international food safety standards",
      "Weekly rotating menus featuring traditional Bangladeshi cuisine",
      "Spacious, air-cooled dining halls with entertainment screens",
      "Separate kitchens for quality control and dietary accommodation",
      "Clean drinking water stations on every floor",
    ],
    galleryImages: [
      "/images/facilities/dining.jpg",
      "/images/northern/factory-floor-3.jpg",
    ],
  },
  {
    slug: "daycare",
    title: "Daycare Center",
    shortTitle: "Daycare",
    image: "/images/facilities/daycare.jpg",
    icon: "👶",
    tagline: "Peace of Mind for Parents",
    description:
      "A fully equipped, safe, and engaging environment stocked with toys, ensuring complete peace of mind for working parents.",
    longDescription:
      "Northern Corporation's on-site daycare center is one of the most well-regarded facilities in the Bangladeshi garment industry. Designed with child safety and development in mind, the center provides a nurturing environment for children of our employees aged 6 months to 5 years. Trained caregivers supervise children throughout the day, engaging them in educational activities, creative play, and rest periods. The facility features colorful, child-friendly interiors, soft foam flooring, educational toys, and age-appropriate learning materials in both Bangla and English. Parents can visit their children during designated break times, and the center operates on all working days at no cost to employees.",
    highlights: [
      { label: "Age Range", value: "6 mo – 5 yr" },
      { label: "Caregivers", value: "8 Trained" },
      { label: "Hours", value: "All Shifts" },
      { label: "Cost", value: "100% Free" },
    ],
    details: [
      "Licensed daycare for children aged 6 months to 5 years",
      "8 trained caregivers with child development certifications",
      "Safe, colorful environment with foam flooring and educational toys",
      "Learning materials in both Bangla and English",
      "Operates during all working shifts at zero cost to employees",
      "Parents can visit children during designated break times",
    ],
    galleryImages: [
      "/images/facilities/daycare.jpg",
      "/images/northern/building-1.jpg",
    ],
  },
  {
    slug: "equality",
    title: "Diversity & Equality",
    shortTitle: "Equality",
    image: "/images/facilities/equality.jpg",
    icon: "🤝",
    tagline: "Inclusive Workplace",
    description:
      "Embracing diversity, equity, and inclusion for all genders. Proactive HR policies ensure fair treatment and opportunities for every individual.",
    longDescription:
      "Diversity and equality are not just policies at Northern Corporation — they are the foundation of our corporate culture. Over 65% of our workforce comprises women, many of whom hold supervisory and management positions. Our comprehensive anti-harassment framework, overseen by a dedicated committee, ensures that every employee feels safe and respected. We maintain equal pay standards, provide gender-sensitization training, and offer career advancement programs specifically designed to empower women in the garment industry. Our commitment to inclusivity extends beyond gender — we actively promote a workplace where differences in background, ability, and perspective are valued and celebrated.",
    highlights: [
      { label: "Women Workers", value: "65%+" },
      { label: "Women Leaders", value: "40%+" },
      { label: "Pay Gap", value: "Zero" },
      { label: "Policy", value: "Anti-Harassment" },
    ],
    details: [
      "Over 65% women workforce with 40% in supervisory roles",
      "Zero pay gap policy — equal pay for equal work",
      "Dedicated anti-harassment committee with confidential reporting",
      "Regular gender sensitization and diversity training programs",
      "Career advancement programs empowering women in leadership",
      "Inclusive hiring practices welcoming people of all backgrounds",
    ],
    galleryImages: [
      "/images/facilities/equality.jpg",
      "/images/northern/factory-floor-1.jpg",
    ],
  },
  {
    slug: "professional-development",
    title: "Professional Development",
    shortTitle: "Training",
    image: "/images/facilities/development.jpg",
    icon: "📚",
    tagline: "Grow With Us",
    description:
      "Fostering career growth through a robust framework of training programs, mentorship opportunities, and skill development initiatives.",
    longDescription:
      "At Northern Corporation, we invest in our people because we believe that skilled, motivated employees are the backbone of quality manufacturing. Our Professional Development Center runs ongoing training programs covering technical skills like advanced sewing techniques, quality control processes, and machine operation, as well as soft skills including communication, leadership, and financial literacy. New employees undergo a comprehensive 2-week onboarding program before joining the production floor. We maintain partnerships with local vocational institutes and offer scholarship programs for employees' children. Exceptional performers are identified through our merit-based promotion system and groomed for leadership roles within the organization.",
    highlights: [
      { label: "Programs", value: "25+ Active" },
      { label: "Onboarding", value: "2-Week" },
      { label: "Scholarships", value: "For Families" },
      { label: "Promotion", value: "Merit-Based" },
    ],
    details: [
      "25+ active training programs covering technical and soft skills",
      "Comprehensive 2-week onboarding for all new employees",
      "Advanced sewing, quality control, and machine operation courses",
      "Communication, leadership, and financial literacy workshops",
      "Scholarship programs for employees' children",
      "Merit-based promotion system with leadership grooming",
    ],
    galleryImages: [
      "/images/facilities/development.jpg",
      "/images/northern/workers-closeup.jpg",
    ],
  },
];
