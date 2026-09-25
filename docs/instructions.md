# PROJECT: Mahavir Mandir — Official Temple Website

Act as a **senior UI/UX designer, frontend architect, and web developer**.

Design and develop a complete, beautiful, responsive, production-quality website for an Indian Hindu temple located in Bihar.

The website must feel **spiritual, peaceful, traditional, trustworthy, premium, and modern**, without looking overly flashy or like a generic website template.

---

# 1. TEMPLE INFORMATION

Use the following information throughout the website:

**Temple Name:**  
महावीर मंदिर  
Mahavir Mandir

**Location:**  
Erka, Kutumba, Aurangabad, Bihar – 824111, India

**Google Maps:**  
Use a dummy Google Maps location/embed for now. Structure the implementation so the actual Google Maps location can easily be replaced later.

**Contact Number:**  
+91 8083705398

**Email:**  
erka.temple@gmail.com

Use placeholders where final information is not currently available.

---

# 2. LANGUAGE SUPPORT

The website must support:

- हिंदी — Default
- English

Hindi MUST be the default language when someone visits the website for the first time.

Add a clearly visible language selector in the header:

हिंदी | English

All important website content must be translatable, including:

- Navigation
- Hero section
- About
- Temple timings
- Events
- Committee information
- Donation section
- Contact information
- Buttons
- Footer
- Form labels
- Messages

Do NOT create separate duplicated HTML pages for Hindi and English.

Use a translation/i18n structure so new languages can easily be added later.

Store the user's selected language locally so it remains selected on subsequent visits.

---

# 3. DESIGN DIRECTION

Create a visually impressive Indian temple website.

The visual identity should be inspired by:

- Indian temple architecture
- Hanuman/Mahavir devotion
- Saffron
- Maroon
- Warm gold
- Cream/off-white
- Subtle traditional Indian patterns
- Diya/lamp motifs
- Temple bells
- Mandala patterns
- Decorative Indian borders

Avoid excessive gradients, animations, or visual clutter.

The website should feel devotional and elegant.

Suggested color palette:

Primary Saffron:
#F57C00

Deep Saffron:
#E65100

Temple Maroon:
#7B1E1E

Sacred Gold:
#D4A017

Warm Cream:
#FFF8E7

Light Background:
#FFFDF7

Dark Background:
#15110D

Dark Surface:
#211A14

Text:
#30251D

Muted Text:
#6F6258

Use these as guidance and refine them if necessary for accessibility and visual balance.

---

# 4. LIGHT + DARK THEME

Default theme:

LIGHT

Provide a theme switcher in the header:

☀️ / 🌙

Light mode should use warm cream/off-white backgrounds rather than harsh pure white everywhere.

Dark mode should feel premium and devotional, using:

- Deep brown/charcoal backgrounds
- Warm gold accents
- Saffron highlights
- High-contrast readable text

Persist the user's selected theme using localStorage.

Make sure every component looks correct in both themes.

---

# 5. TYPOGRAPHY

Use fonts that properly support Hindi/Devanagari and English.

Recommended:

Hindi:
Noto Sans Devanagari

English:
Poppins / Inter

For special temple headings, a slightly more traditional Indian-style font can be used if readability remains excellent.

Typography should feel elegant and devotional.

---

# 6. WEBSITE STRUCTURE

Create the following sections/pages.

## HOME

Navigation:

महावीर मंदिर logo/name

Home  
About Temple  
Darshan & Timings  
Events  
Gallery  
Temple Committee  
Donate  
Contact

Also show:

Language selector  
Dark/light mode  
Donate button

On mobile, use a clean hamburger menu.

The header should become sticky when scrolling.

---

# 7. HERO SECTION

Create a large, impressive hero section.

Use a high-quality dummy image of an Indian Hindu temple / Hanuman temple.

Add a subtle dark overlay for text readability.

Hindi default hero:

महावीर मंदिर

"श्री हनुमान जी की कृपा सदैव आप पर बनी रहे"

एरका, कुटुम्बा, औरंगाबाद, बिहार

Buttons:

🙏 दर्शन एवं समय

❤️ दान करें

English:

MAHAVIR MANDIR

"May the blessings of Shri Hanuman Ji always be with you."

Erka, Kutumba, Aurangabad, Bihar

Buttons:

Temple Timings

Donate Now

Add a subtle decorative temple/mandala element.

Do not over-animate the hero.

---

# 8. QUICK INFORMATION BAR

Immediately below the hero show quick information cards:

🕉️ Temple Status  
Open Today

🕐 Today's Darshan  
5:00 AM – 9:00 PM

🙏 Morning Aarti  
6:00 AM

🪔 Evening Aarti  
7:00 PM

📍 Erka, Bihar

These timings are placeholders and should be easy to modify.

---

# 9. ABOUT MAHAVIR MANDIR

Create an elegant About section.

Hindi heading:

महावीर मंदिर के बारे में

Include placeholder text explaining that Mahavir Mandir is a sacred place of worship dedicated to Lord Hanuman and serves the spiritual and cultural life of Erka and nearby villages.

Mention:

- Devotion to Shri Hanuman
- Community worship
- Religious celebrations
- Festivals
- Social/community activities
- Village traditions

Since actual temple history has not yet been provided, DO NOT invent historical dates, founders, miracles, or factual historical claims.

Use clearly editable placeholder content.

Include:

"मंदिर का इतिहास जल्द उपलब्ध होगा।"

Use a temple image next to the content.

---

# 10. DARSHAN & AARTI TIMINGS

Create an attractive timings section.

Example:

Temple Opening:
05:00 AM

Morning Aarti:
06:00 AM

Afternoon:
12:00 PM

Evening Aarti:
07:00 PM

Temple Closing:
09:00 PM

Add:

"Festival timings may vary."

Hindi:

"त्योहारों एवं विशेष अवसरों पर समय में परिवर्तन हो सकता है।"

Make timings configurable from one data/config file.

---

# 11. FESTIVALS & EVENTS

Create a section:

आगामी कार्यक्रम एवं त्योहार  
Upcoming Events & Festivals

Cards can contain:

Hanuman Jayanti

Ram Navami

Navratri

Diwali

Holi

Tuesday Special Puja

Saturday Special Puja

For each event show:

- Image
- Event name
- Date
- Time
- Short description
- View Details button

Use dummy dates/data for now and clearly structure them so they can easily be replaced.

Highlight the next upcoming event.

---

# 12. DAILY / SPECIAL PUJA

Create a section describing available temple worship activities.

Examples:

🙏 सामान्य दर्शन  
🪔 आरती  
🌺 विशेष पूजा  
📿 हनुमान चालीसा पाठ  
🚩 मंगलवार पूजा  
🚩 शनिवार पूजा  
🎉 विशेष त्योहार पूजा

Provide short descriptions.

Do NOT implement online puja booking unless it is clearly marked as a future/placeholder feature.

---

# 13. HANUMAN CHALISA

Add a beautiful devotional section:

श्री हनुमान चालीसा

Provide options:

Read Hanuman Chalisa

Hindi / English

Design it like a devotional reading page/card with excellent typography.

If the full text is added, ensure the text is from a reliable/public-domain source and is accurate.

Optionally provide a print-friendly view.

---

# 14. TEMPLE GALLERY

Create:

मंदिर की झलकियाँ  
Temple Gallery

Use dummy temple images for now.

Categories:

Temple

Puja

Festivals

Events

Community

Use a responsive masonry/grid gallery.

Clicking an image should open a lightbox.

Support:

Previous  
Next  
Close

Make the gallery mobile friendly.

---

# 15. TEMPLE COMMITTEE

Create:

मंदिर प्रबंधन समिति  
Temple Management Committee

Use placeholder committee members such as:

Suryakant  
Sanjeev  
Satish  
Ramakant Singh  
Sunil Singh

Assign placeholder roles such as:

President  
Vice President  
Secretary  
Treasurer  
Committee Member

IMPORTANT:

Clearly keep this data in one configurable file/array because the actual committee member names, photos and positions will be supplied later.

Display each member in an elegant profile card with:

- Photo placeholder
- Name
- Position
- Optional phone/contact

Do not expose personal phone numbers unless explicitly configured.

---

# 16. DONATION SECTION

This is an important section.

Heading:

मंदिर में सहयोग करें  
Support Mahavir Mandir

Description:

"आपका सहयोग मंदिर के रखरखाव, पूजा-पाठ, धार्मिक आयोजनों एवं सामाजिक कार्यों में उपयोग किया जाता है।"

English:

"Your contribution helps support temple maintenance, worship activities, religious events and community initiatives."

Show donation options.

## UPI Donation

Display:

UPI ID:
mahavirmandir@upi

This is a DUMMY placeholder.

Show a large QR code.

Under QR:

"Scan with any UPI app"

Show recognizable text labels for:

Google Pay  
PhonePe  
Paytm  
BHIM UPI

Do not imply affiliation with these payment providers.

Provide:

COPY UPI ID

button.

On supported mobile devices also provide:

PAY USING UPI

using a standard UPI deep link.

Example structure:

upi://pay?pa=UPI_ID&pn=Mahavir%20Mandir

Do not hardcode a real UPI number until supplied.

---

# 17. DONATION SAFETY / TRUST

Because this involves money, make the donation section very clear.

Display:

"Please verify that the recipient name shown in your UPI application is 'Mahavir Mandir' before completing the payment."

Hindi:

"भुगतान करने से पहले अपने UPI ऐप में प्राप्तकर्ता का नाम 'Mahavir Mandir' अवश्य सत्यापित करें।"

Also state:

"Donation receipts / tax exemption details will be added after official information is available."

Do NOT make claims about 80G, tax deductions, charitable registration, trust registration, or government recognition unless that information is later supplied.

---

# 18. CONTACT SECTION

Create:

संपर्क करें  
Contact Us

Display:

Mahavir Mandir

Erka, Kutumba  
Aurangabad, Bihar – 824111  
India

Phone:
+91 8083705398

Email:
erka.temple@gmail.com

Buttons:

Call Now

WhatsApp

Get Directions

Add a contact form:

Name  
Mobile  
Email  
Subject  
Message

Send Message

Add frontend validation.

If no backend/email service is configured, clearly implement the form in demo mode and don't pretend messages are actually being delivered.

Structure it so Formspree, EmailJS or a custom API can later be connected easily.

---

# 19. WHATSAPP

Add a floating WhatsApp contact button.

Clicking it should open WhatsApp with a predefined message:

Hindi:

"नमस्कार, मैं महावीर मंदिर के संबंध में जानकारी प्राप्त करना चाहता/चाहती हूँ।"

English:

"Namaste, I would like to get some information about Mahavir Mandir."

Use:

+91 8083705398

Make sure the floating button does not obstruct important mobile UI.

---

# 20. GOOGLE MAP

Create:

मंदिर का स्थान  
Temple Location

Embed a dummy Google Map for now.

Show:

Mahavir Mandir  
Erka, Kutumba, Aurangabad, Bihar – 824111

Provide:

GET DIRECTIONS

The map URL/location should be maintained as configuration so the real Google Maps location can later replace it easily.

---

# 21. TEMPLE ANNOUNCEMENTS

Create an announcements section.

Example:

महत्वपूर्ण सूचना

Display temple notices such as:

Special Puja

Festival arrangements

Temple cleaning

Community meeting

Changed Aarti timings

Donation notices

Use dummy announcements for now.

Allow an important announcement to appear as a highlighted banner near the top of the homepage.

---

# 22. FOOTER

Create a detailed footer.

Column 1:

महावीर मंदिर  
Erka, Kutumba, Aurangabad, Bihar

Column 2:

Quick Links

Home  
About  
Timings  
Events  
Gallery  
Committee

Column 3:

Devotee Services

Darshan  
Aarti Timings  
Hanuman Chalisa  
Donate  
Contact

Column 4:

Contact

+91 8083705398  
erka.temple@gmail.com

Add social placeholders:

Facebook  
Instagram  
YouTube  
WhatsApp

Only show social links if configured.

Bottom:

© [Current Year] Mahavir Mandir, Erka. All Rights Reserved.

Also add:

Privacy Policy  
Terms  
Donation Policy

---

# 23. MOBILE EXPERIENCE

The website MUST be designed mobile-first.

Most visitors may access the website from mobile devices.

Optimize:

- Header
- Navigation
- Donation QR
- UPI payment
- Gallery
- Forms
- Committee cards
- Temple timings
- Events
- WhatsApp
- Google Maps
- Hindi typography

No horizontal scrolling.

Buttons must have comfortable touch targets.

---

# 24. ACCESSIBILITY

Follow WCAG-oriented best practices.

Include:

- Semantic HTML
- Proper heading hierarchy
- ARIA labels where necessary
- Keyboard navigation
- Visible focus states
- Alt text
- Sufficient color contrast
- Accessible forms
- Reduced-motion support

Decorative images should use empty alt attributes where appropriate.

---

# 25. SEO

Implement strong local SEO.

Title example:

महावीर मंदिर एरका | Mahavir Mandir Erka, Aurangabad Bihar

Meta description:

"महावीर मंदिर, एरका, कुटुम्बा, औरंगाबाद बिहार — दर्शन समय, आरती, धार्मिक कार्यक्रम, मंदिर समिति, संपर्क एवं दान की जानकारी।"

Add:

- Open Graph metadata
- Twitter/X metadata
- Canonical URL placeholder
- robots.txt
- sitemap.xml
- favicon
- manifest
- structured data

Use Schema.org `HinduTemple` / appropriate `Place` or `Organization` structured data where valid.

Include:

Temple name  
Address  
Phone  
Location  
Opening hours

Do not add unsupported factual information.

---

# 26. PERFORMANCE

Target excellent Lighthouse performance.

Optimize:

- Images
- Lazy loading
- Font loading
- JavaScript bundles
- CSS
- Responsive images
- Caching

Use WebP/AVIF where appropriate.

Avoid unnecessary large libraries.

Target:

Performance: 90+  
Accessibility: 95+  
Best Practices: 95+  
SEO: 95+

where reasonably achievable.

---

# 27. IMAGE STRATEGY

Use high-quality dummy/placeholding images for:

- Hanuman/Mahavir
- Indian temple
- Temple entrance
- Puja
- Diya
- Flowers
- Festivals
- Devotees
- Temple bells

Do NOT use random images that conflict with the temple's identity.

Keep image URLs/data centralized so actual Mahavir Mandir photographs can later replace all dummy images easily.

---

# 28. OPTIONAL DEVOTIONAL TOUCHES

Add tasteful decorative elements such as:

ॐ

🚩

Temple bells

Diya

Lotus

Mandala patterns

Traditional borders

These should enhance the experience without making the interface cluttered.

Optionally show:

॥ श्री राम ॥

or

॥ जय श्री राम ॥

or

॥ जय बजरंगबली ॥

as small devotional decorative text in suitable areas.

---

# 29. HOMEPAGE SECTION ORDER

Recommended homepage order:

1. Announcement Bar
2. Header / Navigation
3. Hero
4. Quick Temple Information
5. About Mahavir Mandir
6. Darshan & Aarti Timings
7. Upcoming Festivals / Events
8. Puja / Devotional Services
9. Hanuman Chalisa
10. Temple Gallery
11. Temple Committee
12. Donation
13. Temple Location / Google Maps
14. Contact
15. Footer

Use alternating layouts and subtle section backgrounds so the page does not look monotonous.

---

# 30. TECHNICAL ARCHITECTURE

Build this as a maintainable modern website.

Preferred stack:

Next.js  
React  
TypeScript  
Tailwind CSS

Use the latest stable compatible versions.

Architecture should use reusable components.

Example:

components/
  Header
  Footer
  Hero
  AnnouncementBar
  AboutTemple
  TempleTimings
  EventCard
  Events
  PujaServices
  HanumanChalisa
  Gallery
  Committee
  CommitteeCard
  Donation
  QRCode
  Contact
  GoogleMap
  WhatsAppButton
  LanguageSwitcher
  ThemeToggle

Maintain configurable data separately.

Example:

data/
  temple.ts
  committee.ts
  events.ts
  timings.ts
  gallery.ts
  announcements.ts

translations/
  hi.ts
  en.ts

Centralize configuration for:

Temple name  
Address  
Phone  
Email  
Google Maps URL  
WhatsApp number  
UPI ID  
QR information  
Committee  
Timings  
Social links

This is extremely important because the real information will be supplied later.

---

# 31. NO ADMIN PANEL FOR INITIAL VERSION

Do NOT build a complex backend/admin panel in the initial version.

The initial version should be easy to deploy and maintain as a mostly static website.

However, design the architecture so a future backend/admin CMS can manage:

- Events
- Gallery
- Committee
- Temple timings
- Announcements
- Donation information

without requiring a complete frontend redesign.

---

# 32. DEPLOYMENT

The final project should be deployable to:

- cPanel hosting where technically supported
- Vercel
- Cloudflare Pages
- Netlify

Prefer static generation wherever possible.

If targeting standard shared cPanel hosting without Node.js runtime support, ensure the website can be exported as static HTML/CSS/JS where compatible with the implemented features.

Provide clear build and deployment instructions in README.md.

---

# 33. RESPONSIVE BREAKPOINTS

Properly design for:

320px mobile  
375px mobile  
430px mobile  
768px tablet  
1024px laptop  
1440px desktop  
1920px large desktop

Do not simply shrink desktop layouts.

Components should adapt intelligently.

---

# 34. UI DETAILS

Use:

- Rounded but not excessively rounded cards
- Soft shadows
- Warm backgrounds
- Gold/saffron separators
- Subtle hover states
- Smooth scrolling
- Sticky navigation
- Elegant section headings
- Indian decorative dividers
- Proper whitespace

Animations should be subtle.

Examples:

Fade-in  
Small translate animation  
Card hover elevation  
Image zoom on gallery hover

Respect `prefers-reduced-motion`.

---

# 35. IMPORTANT DEVELOPMENT RULES

1. Do not use lorem ipsum.
2. Use meaningful Hindi/English placeholder content.
3. Hindi is the default language.
4. Do not invent temple history.
5. Do not invent legal/trust/tax registrations.
6. Do not use a real UPI account until provided.
7. Do not falsely claim that contact forms work without an actual backend/service.
8. Keep all placeholder information clearly replaceable.
9. Make every screen fully responsive.
10. Make dark mode work throughout the entire site.
11. Avoid unnecessary dependencies.
12. Follow clean component architecture.
13. Avoid duplicated code.
14. Optimize images.
15. Follow SEO and accessibility best practices.
16. Do not expose secrets/API keys in frontend code.
17. Use environment variables for any future external API/service configuration.

---

# 36. VISUAL QUALITY EXPECTATION

Do NOT make this look like a basic HTML temple website.

The finished website should feel like the polished official digital presence of a respected village temple.

It should combine:

Traditional Indian spirituality  
+  
Modern web design  
+  
Excellent Hindi typography  
+  
Easy navigation  
+  
Mobile-first usability  
+  
Trustworthy donation presentation

The first screen should immediately communicate:

"महावीर मंदिर — एरका"

and create a peaceful, devotional impression.

---

# 37. FINAL DELIVERABLE

Generate the COMPLETE project.

Include:

- Full source code
- All pages
- All components
- Hindi translations
- English translations
- Light theme
- Dark theme
- Responsive layouts
- Dummy images
- Dummy Google Maps configuration
- Donation QR placeholder
- UPI integration structure
- WhatsApp contact
- Committee section
- Events
- Gallery
- Hanuman Chalisa section
- Contact form
- SEO metadata
- Sitemap
- robots.txt
- Favicon placeholder
- README
- Configuration instructions
- Build instructions
- Deployment instructions

The project should run with:

npm install

npm run dev

And production build with:

npm run build

Before completing, inspect the entire implementation for:

- Broken routes
- Missing translations
- Mobile responsiveness
- Hindi rendering
- Dark-mode issues
- Accessibility problems
- Broken image links
- TypeScript errors
- Console errors
- Invalid links

The final result should be clean enough that later I primarily need to replace:

1. Real temple photographs
2. Google Maps location
3. Committee member details
4. Actual temple timings
5. Events
6. Actual UPI ID / QR code
7. Social media links
8. Official temple history

without redesigning the website.



Special Notess: You can also deepl think and apply any addition/modification to make it more elegant and beautiful

And it must be mobile compatible