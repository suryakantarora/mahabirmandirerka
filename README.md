# Mahavir Mandir — Erka

A bilingual, responsive temple website built with Next.js App Router, React and TypeScript. Hindi and light mode are the defaults; visitor preferences persist locally. Custom CSS provides the cream, saffron and maroon design. All fonts and photographs are served locally.

## Run

Use Node.js 22.13+ and npm.

```sh
npm install
npm run dev
```

Open http://localhost:3000.

```sh
npm run build
npm run typecheck
```

`npm run build` produces a complete static website in `out/`. No Node.js server is needed in production. To preview the export locally, run `python3 -m http.server 3001 --directory out` and open http://localhost:3001. Do not use `next start` with static export.

## Configuration

| File                           | What to edit                                                                                                                                                                                   |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content/events.json`          | Events and festivals. Give one-off festivals an ISO `date`; weekly pujas use `weekday` (0 = Sunday). The next occurrence is highlighted and a countdown appears for the nearest dated festival |
| `content/announcements.json`   | Temple notices. The first `important: true` notice becomes the banner at the top of the page                                                                                                   |
| `content/videos.json`          | YouTube videos shown in the Videos section: the video `id` (the `v=` value of a watch URL) with a bilingual title and description. Thumbnails load from YouTube; the player is embedded only after a visitor presses play        |
| `public/mp3/`                  | The Hanuman Chalisa recording played from the Chalisa section (`temple.audio.chalisa`). It is streamed only when a visitor presses play                                                     |
| `content/committee.json`       | Committee names, roles and optional `photo` paths                                                                                                                                              |
| `data/site.ts`                 | Temple address, contacts, image paths, timings, gallery, puja services, weekday specials, UPI, maps, geo and socials                                                                           |
| `translations/index.ts`        | Shared Hindi and English UI copy                                                                                                                                                               |
| `hanuman-chalisa-roman.txt`    | Roman transliteration shown in the English reader tab                                                                                                                                          |
| `components/TempleWebsite.tsx` | Page composition, bilingual opening prayer and provisional policy text                                                                                                                         |
| `components/Donation.tsx`      | Donation presentation and QR generation                                                                                                                                                        |
| `components/Contact.tsx`       | Form integration and contact/map presentation                                                                                                                                                  |
| `app/globals.css`              | Responsive styles and light/dark theme tokens                                                                                                                                                  |
| `app/layout.tsx`               | SEO metadata and structured data                                                                                                                                                               |
| `public/images/`               | Local WebP placeholder photography                                                                                                                                                             |

Localized values use `{ hi, en }` objects. The `bi()` helper creates them. A new language requires adding its code to `Lang`, supplying translations for the localized fields, and extending the language selector and persistence validation.

### Before publishing as the official site

1. Replace the illustrative photos with approved photographs of Mahavir Mandir. The current images are explicitly labeled as illustrative. Keep a `hero-mobile.webp` (about 960px wide) for phones.
2. Set `temple.siteUrl` to the final HTTPS domain. It drives the canonical URL, social metadata and sitemap.
3. Replace `mapEmbed` and `directions` with the exact temple location. Currently they show the general Kutumba area. Update the provisional map notice after verification.
4. Confirm the `timings` array and update the visible provisional timing notice. Set `timingsVerified: true` after official confirmation: the quick-info bar then shows a live open/closed indicator based on the first and last timing, and opening hours are added to structured data. Set `locationVerified: true` with real `geo` coordinates to add them too.
5. Replace committee names/roles, event schedules and announcements. Committee portraits currently use anonymous placeholders; personal phone numbers are not displayed.
6. Add approved history and policy text. No founding dates, miracles, registrations or tax benefits have been invented.
7. Configure donations and the contact form as described below.
8. Add social links to `temple.socials`; unconfigured social networks are not displayed.

### Donations

Donations use the temple committee's UPI ID (`temple.donation.upi`) and recipient name (`temple.donation.recipient`) from `data/site.ts`. The bank-issued QR image is served from `public/images/upi-qr.png` (`temple.images.upiQr`); replace the file to update the QR. The mobile payment link is the encoded `upi://pay?pa=…&pn=…` URI built from the same values. Check the receiving account name using a real UPI application after any change. No payment confirmation, receipts, refunds or tax claims are simulated.

### Contact form

Without an endpoint the form validates entries and explicitly reports that no message was sent. For live delivery, set `NEXT_PUBLIC_CONTACT_ENDPOINT` (or `temple.contactEndpoint`) to a public form endpoint accepting JSON fields `name`, `mobile`, `email`, `subject`, and `message`. A successful 2xx response displays success; other responses display failure. Configure CORS, server-side validation, spam protection and delivery at the service. Public endpoint URLs are visible to browsers; never put private API keys in this field. Update the privacy policy when connecting a service.

Copy `.env.example` to `.env.local` for optional public deployment settings. Rebuild after changing environment variables.

### Chalisa

The reader dialog has two tabs: the complete Hindi text and a Roman transliteration, plus a **Print / Save as PDF** button that prints only the reader. `hanuman-chalisha-hindi.txt` and `hanuman-chalisa-roman.txt` are the sources of truth: the server reads them during the static build. Edit and rebuild to update. The original Hindi wording is preserved; only whitespace and verse grouping are adjusted for display. No translation is provided, only transliteration.

### Analytics

Set `NEXT_PUBLIC_GA_ID` to a Google Analytics measurement ID to enable a consent banner. The tag loads only after the visitor accepts, and the choice is stored in the browser. Leave it empty to show no banner and load nothing.

### Offline support

A small service worker (`public/sw.js`) caches the page shell over HTTPS so the Chalisa reader keeps working offline. Bump the `CACHE` name when you need to force old caches out.

### Language flash

An inline script in `app/layout.tsx` applies the stored theme and language before paint. When English is stored, the page stays hidden for one frame until React has switched the copy, so visitors never see Hindi flash first.

## Deployment

- **cPanel / Apache:** Upload the **contents** of `out/` to the domain's `public_html`. Keep `_next/` and all assets. Node.js is not required. The default configuration targets a domain root; a subdirectory deployment requires a matching Next.js `basePath` and asset paths.
- **Netlify:** Build command `npm run build`; publish directory `out`. A `netlify.toml` is included.
- **Cloudflare Pages:** Build command `npm run build`; output directory `out`. Use the static export, without a server adapter.
- **Vercel:** Import the project, use the Next.js preset and `npm run build`. The configured output is static.

Set a supported Node.js version on the build platform. Configure your real domain before building. HTTPS is recommended for clipboard support. Images and fonts are local; Google Maps connects to Google only when the visitor loads the map. External directions and WhatsApp open only on user action.

## Checks

With the local server running:

```sh
npx playwright install chromium
npm test
```

The browser tests cover language/theme persistence, automatic next-event highlighting, the announcement banner, the Chalisa reader in both scripts, gallery filters with keyboard navigation, the mobile menu (focus trap and Escape), the donation QR and UPI link, Indian mobile validation and demo form status, in-page links, image loading, console errors, accessibility checks in both themes, and widths 320, 375, 430, 768, 1024, 1440 and 1920 pixels. `PW_CHANNEL=chrome npm test` can use an installed Chrome browser. Screenshots are written under ignored `test-results/`.

Lighthouse targets are goals, not measured guarantees. Check the deployed production build after final photos, content and hosting configuration are in place.

## Image and font sources

The supplied images are placeholders, not photographs of Mahavir Mandir, Erka:

- Hero: [Historic Sandstone Temple in Badami, India — Pexels](https://www.pexels.com/photo/historic-sandstone-temple-in-badami-india-32563589/)
- Courtyard: [Intricate Architecture of a Hindu Temple Courtyard — Pexels](https://www.pexels.com/photo/intricate-architecture-of-a-hindu-temple-courtyard-35858173/)
- Puja kalash: [Unsplash image](https://images.unsplash.com/photo-1606293926075-69a00dbfde81)

The original design brief is kept in `docs/instructions.md`.

Fonts: DM Sans, Cormorant, Noto Sans Devanagari and Noto Serif Devanagari, distributed locally through Fontsource. Font license files are included with their packages. Icons are provided by Lucide.
