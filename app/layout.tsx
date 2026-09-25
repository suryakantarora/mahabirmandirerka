import type { Metadata, Viewport } from "next";
import { temple } from "@/data/site";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/cormorant";
import "@fontsource-variable/noto-sans-devanagari";
import "@fontsource-variable/noto-serif-devanagari";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(temple.siteUrl),
  title: "महावीर मंदिर एरका | Mahavir Mandir Erka, Aurangabad Bihar",
  description:
    "महावीर मंदिर, एरका, कुटुम्बा, औरंगाबाद बिहार — दर्शन समय, आरती, धार्मिक कार्यक्रम, मंदिर समिति, संपर्क एवं दान की जानकारी।",
  keywords: [
    "Mahavir Mandir",
    "Hanuman Mandir Erka",
    "Erka Kutumba",
    "Aurangabad Bihar temple",
    "महावीर मंदिर एरका",
  ],
  alternates: { canonical: "/", languages: { "hi-IN": "/", "en-IN": "/" } },
  openGraph: {
    type: "website",
    locale: "hi_IN",
    alternateLocale: "en_IN",
    siteName: "Mahavir Mandir Erka",
    title: "महावीर मंदिर — एरका | Mahavir Mandir Erka",
    description:
      "आस्था, सेवा और समर्पण का पावन धाम। Darshan timings, events, committee, contact and donation information.",
    images: [{ url: temple.images.hero, width: 1920, height: 1276 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahavir Mandir — Erka",
    images: [temple.images.hero],
  },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#6d1f1e" },
    { media: "(prefers-color-scheme: dark)", color: "#14100c" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HinduTemple",
    "@id": `${temple.siteUrl}/#temple`,
    name: "Mahavir Mandir",
    alternateName: "महावीर मंदिर",
    url: temple.siteUrl,
    image: `${temple.siteUrl}${temple.images.hero}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Erka, Kutumba",
      addressLocality: "Aurangabad",
      addressRegion: "Bihar",
      postalCode: "824111",
      addressCountry: "IN",
    },
    telephone: temple.phone,
    email: temple.email,
    ...(temple.locationVerified
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: temple.geo.latitude,
            longitude: temple.geo.longitude,
          },
          hasMap: temple.directions,
        }
      : {}),
    ...(temple.timingsVerified ? { openingHours: "Mo-Su 05:00-21:00" } : {}),
    ...(temple.socials.length
      ? { sameAs: temple.socials.map((s) => s.url) }
      : {}),
  };
  return (
    <html lang="hi" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement,t=localStorage.getItem('temple-theme'),l=localStorage.getItem('temple-lang');d.dataset.theme=t==='dark'?'dark':'light';d.lang=l==='en'?'en':'hi';if(l==='en')d.dataset.pending='1'}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
