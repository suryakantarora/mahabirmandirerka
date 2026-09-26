import eventsJson from "@/content/events.json";
import announcementsJson from "@/content/announcements.json";
import committeeJson from "@/content/committee.json";
import videosJson from "@/content/videos.json";

export type Lang = "hi" | "en";
export type Localized = Record<Lang, string>;
export const bi = (hi: string, en: string): Localized => ({ hi, en });

/**
 * Central temple configuration. Everything a committee member is likely to
 * change lives here or in the JSON files under `content/`.
 */
export const temple = {
  name: bi("महावीर मंदिर", "Mahavir Mandir"),
  tagline: bi("एरका · बिहार", "Erka · Bihar"),
  location: bi(
    "एरका, कुटुम्बा, औरंगाबाद, बिहार",
    "Erka, Kutumba, Aurangabad, Bihar",
  ),
  address: bi(
    "एरका, कुटुम्बा, औरंगाबाद, बिहार – 824111, भारत",
    "Erka, Kutumba, Aurangabad, Bihar – 824111, India",
  ),
  phone: "+91 7004974853",
  phoneLink: "+917004974853",
  whatsapp: "917004974853",
  email: "erka.temple@gmail.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  /** Replace with the exact embed URL once the location is verified. */
  mapEmbed:
    "https://maps.google.com/maps?q=Kutumba%2C%20Bihar%2C%20India&z=12&output=embed",
  directions:
    "https://www.google.com/maps/search/?api=1&query=Erka%2C+Kutumba%2C+Bihar",
  /** Fill in after verification; used in structured data only when locationVerified. */
  geo: { latitude: 0, longitude: 0 },
  locationVerified: false,
  timingsVerified: false,
  donation: {
    upi: "7004974853m@pnb",
    recipient: "MAHABIR MANDIR NIRMAN SAMITI",
  },
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "",
  /** Google Analytics measurement ID (G-XXXX). Loaded only after visitor consent. */
  analyticsId: process.env.NEXT_PUBLIC_GA_ID || "",
  /** Only configured networks are displayed. */
  socials: [] as { name: "Facebook" | "Instagram" | "YouTube"; url: string }[],
  images: {
    hero: "/images/hero.webp",
    heroMobile: "/images/hero-mobile.webp",
    temple: "/images/architecture.webp",
    puja: "/images/puja.webp",
    upiQr: "/images/upi-qr.png",
  },
  audio: {
    /** Full Hanuman Chalisa recording, streamed only when a visitor presses play. */
    chalisa: "/mp3/Shri_Hanuman_Chalisa.mp3",
  },
};

export const navigation = [
  ["home", bi("मुख्य पृष्ठ", "Home")],
  ["about", bi("मंदिर परिचय", "About")],
  ["timings", bi("दर्शन एवं समय", "Timings")],
  ["events", bi("कार्यक्रम", "Events")],
  ["gallery", bi("गैलरी", "Gallery")],
  ["videos", bi("वीडियो", "Videos")],
  ["committee", bi("समिति", "Committee")],
  ["contact", bi("संपर्क", "Contact")],
] as const;

export type Timing = {
  name: Localized;
  /** 24-hour "HH:MM" used for the open/closed indicator. */
  at: string;
  /** Display label. */
  time: string;
  icon: "sunrise" | "sun" | "flower" | "flame" | "moon";
  highlight?: boolean;
};

export const timings: Timing[] = [
  {
    name: bi("मंदिर खुलने का समय", "Temple opens"),
    at: "05:00",
    time: "05:00 AM",
    icon: "sunrise",
  },
  {
    name: bi("प्रातः आरती", "Morning aarti"),
    at: "06:00",
    time: "06:00 AM",
    icon: "sun",
  },
  {
    name: bi("मध्याह्न भोग", "Midday offering"),
    at: "12:00",
    time: "12:00 PM",
    icon: "flower",
  },
  {
    name: bi("संध्या आरती", "Evening aarti"),
    at: "19:00",
    time: "07:00 PM",
    icon: "flame",
    highlight: true,
  },
  {
    name: bi("मंदिर बंद होने का समय", "Temple closes"),
    at: "21:00",
    time: "09:00 PM",
    icon: "moon",
  },
];

export type TempleEvent = {
  id: string;
  name: Localized;
  tag: Localized;
  /** ISO date "YYYY-MM-DD" for one-off festivals; empty until announced. */
  date?: string;
  /** 0 = Sunday … 6 = Saturday for weekly events. */
  weekday?: number;
  time: Localized;
  image: string;
  description: Localized;
};

const imageKeys = temple.images as Record<string, string>;
export const events: TempleEvent[] = eventsJson.map((e) => ({
  ...e,
  image: imageKeys[e.image] ?? e.image,
}));

export type Announcement = {
  id: string;
  important: boolean;
  /** Optional ISO date shown beside the notice. */
  date: string;
  text: Localized;
};
export const announcements: Announcement[] = announcementsJson;

export type Member = {
  name: Localized;
  role: Localized;
  /** Optional 10-digit Indian mobile number, shown as a call link. */
  phone?: string;
  photo: string;
};
export const committee: Member[] = committeeJson;

export type Video = {
  /** YouTube video ID (the `v=` value in a watch URL). */
  id: string;
  title: Localized;
  description: Localized;
};
export const videos: Video[] = videosJson;

export const categories = [
  bi("सभी", "All"),
  bi("मंदिर", "Temple"),
  bi("पूजा", "Puja"),
  bi("त्योहार", "Festivals"),
  bi("कार्यक्रम", "Events"),
  bi("समुदाय", "Community"),
];

export const gallery = [
  {
    image: temple.images.temple,
    category: 1,
    title: bi("मंदिर की वास्तुकला", "Temple architecture"),
  },
  {
    image: temple.images.puja,
    category: 2,
    title: bi("पूजा का पवित्र कलश", "Sacred puja kalash"),
  },
  {
    image: temple.images.hero,
    category: 3,
    title: bi("संध्या का पावन दृश्य", "A sacred evening"),
  },
  {
    image: temple.images.temple,
    category: 4,
    title: bi("आस्था का आँगन", "A courtyard of devotion"),
  },
  {
    image: temple.images.puja,
    category: 5,
    title: bi("सामूहिक पूजा की तैयारी", "Preparing for community worship"),
  },
  {
    image: temple.images.hero,
    category: 1,
    title: bi("शिखर की छटा", "The temple shikhara"),
  },
];

export const services = [
  {
    icon: "eye",
    name: bi("सामान्य दर्शन", "Daily Darshan"),
    text: bi(
      "प्रतिदिन प्रातः से संध्या तक श्रद्धा के साथ प्रभु के दर्शन करें।",
      "Find a quiet moment in the presence of the divine, every day.",
    ),
  },
  {
    icon: "flame",
    name: bi("आरती", "Aarti"),
    text: bi(
      "प्रातः एवं संध्या आरती में दीप, घंटा-ध्वनि और भजन के साथ सम्मिलित हों।",
      "Join the morning and evening aarti with lamps, bells and devotional song.",
    ),
  },
  {
    icon: "flower",
    name: bi("विशेष पूजा", "Special Puja"),
    text: bi(
      "जन्मदिन, गृह प्रवेश या मनोकामना हेतु विशेष पूजा के लिए मंदिर से संपर्क करें।",
      "Contact the temple to arrange a special puja for a birthday, new home or a heartfelt wish.",
    ),
  },
  {
    icon: "book",
    name: bi("हनुमान चालीसा पाठ", "Hanuman Chalisa Recitation"),
    text: bi(
      "सामूहिक चालीसा पाठ में शक्ति और भक्ति का अनुभव करें।",
      "Experience strength and devotion in collective Chalisa recitation.",
    ),
  },
  {
    icon: "flag",
    name: bi("मंगलवार पूजा", "Tuesday Puja"),
    text: bi(
      "हनुमान जी के प्रिय दिवस पर विशेष पूजा एवं प्रसाद वितरण।",
      "Special worship and prasad on the day dear to Hanuman Ji.",
    ),
  },
  {
    icon: "flag",
    name: bi("शनिवार पूजा", "Saturday Puja"),
    text: bi(
      "शनिवार को सुंदरकांड पाठ एवं तेल-सिंदूर अर्पण।",
      "Sundarkand recitation and oil and sindoor offering every Saturday.",
    ),
  },
  {
    icon: "sparkle",
    name: bi("विशेष त्योहार पूजा", "Festival Worship"),
    text: bi(
      "हनुमान जयंती, राम नवमी और दीपावली पर परंपरा एवं समुदाय के साथ उत्सव।",
      "Celebrate Hanuman Jayanti, Ram Navami and Diwali with tradition and community.",
    ),
  },
] as const;

/** Weekday-based "today's special" strip. 0 = Sunday. */
export const specialDays: Record<number, Localized> = {
  2: bi(
    "आज मंगलवार है — हनुमान जी का विशेष दिन। संध्या 6 बजे विशेष पूजा में पधारें।",
    "Today is Tuesday, Hanuman Ji's special day. Join the special puja at 6 PM.",
  ),
  6: bi(
    "आज शनिवार है — सुंदरकांड पाठ एवं तेल-सिंदूर अर्पण संध्या 6 बजे।",
    "Today is Saturday. Sundarkand recitation and offerings at 6 PM.",
  ),
};
