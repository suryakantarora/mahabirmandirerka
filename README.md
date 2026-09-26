# Mahavir Mandir, Erka

The official website of Mahavir Mandir (Hanuman temple) in Erka, Kutumba, Aurangabad district, Bihar.

The site is bilingual (Hindi by default, English on request), works on phones and desktops, and has a light and a dark theme. It is built with Next.js, React and TypeScript and exported as a plain static website, so it can be hosted anywhere without a server.

## What the site offers

- **Temple information** with address, phone, WhatsApp, email and a Google Map that loads only when a visitor asks for it.
- **Darshan and aarti timings** with a live open/closed indicator once timings are verified.
- **Events and festivals** driven by a JSON file, with the next occurrence highlighted and a countdown for the nearest festival.
- **Puja services** offered by the temple.
- **Shri Hanuman Chalisa** with an audio recording, a reader dialog in Devanagari and Roman script, and a print / save-as-PDF option.
- **Bhajans and videos** from YouTube, shown as thumbnails and played only on demand.
- **Photo gallery** with category filters and a keyboard-accessible lightbox.
- **Committee** members and roles.
- **Donations** by UPI, with the temple committee's bank-issued QR code, a copyable UPI ID and a one-tap payment link on phones.
- **Announcements** with an optional banner at the top of the page.
- **Contact form**, floating WhatsApp button, privacy and donation policy dialogs, and a small offline cache so the Chalisa keeps working without a connection.

## Getting started

Requires Node.js 22.13 or newer and npm.

```sh
npm install
npm run dev
```

Open http://localhost:3000.

| Command             | Purpose                                                     |
| ------------------- | ----------------------------------------------------------- |
| `npm run dev`       | Development server with live reload                         |
| `npm run build`     | Production build; writes the complete static site to `out/` |
| `npm run typecheck` | TypeScript check                                            |
| `npm test`          | Browser tests with Playwright (needs a server on port 3000) |
| `npm run format`    | Format source files with Prettier                           |

To preview the production export locally, serve the `out/` folder with any static server, for example:

```sh
npx serve out -l 3000
```

Do not use `next start`; the project is configured for static export.

## Updating content

Most day-to-day changes are edits to a JSON file or to `data/site.ts`. No code knowledge is needed beyond keeping the file structure intact.

| File                         | What to edit                                                                                                                                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `content/announcements.json` | Temple notices. The first notice marked `important: true` becomes the banner at the top of the page                                             |
| `content/events.json`        | Events and festivals. One-off festivals take an ISO `date` (`YYYY-MM-DD`); weekly pujas take a `weekday` (0 = Sunday)                           |
| `content/videos.json`        | YouTube videos. Each entry needs the video `id` (the `v=` value of a watch URL) plus a Hindi and English title and description                  |
| `content/committee.json`     | Committee names, roles, optional `phone` (10-digit mobile, shown as a call link) and optional photo paths                                        |
| `data/site.ts`               | Address, phone, WhatsApp, email, timings, gallery, puja services, weekday specials, UPI details, map links, image and audio paths, social links |
| `translations/index.ts`      | All shared Hindi and English interface text                                                                                                     |
| `public/images/`             | Photographs (WebP recommended) and the UPI QR image `upi-qr.png`                                                                                |
| `public/mp3/`                | The Hanuman Chalisa recording                                                                                                                   |
| `hanuman-chalisha-hindi.txt` | Chalisa text in Devanagari, read at build time                                                                                                  |
| `hanuman-chalisa-roman.txt`  | Chalisa transliteration in Roman script, read at build time                                                                                     |

Localized values are objects with `hi` and `en` keys. In TypeScript files the `bi("हिंदी", "English")` helper creates them.

After editing, run `npm run build` and deploy the new `out/` folder.

### Photos

Put images in `public/images/` and reference them from `data/site.ts` (`temple.images`) or from the gallery list in the same file. Keep a smaller `hero-mobile.webp` (about 960 px wide) for phones. WebP or compressed JPEG keeps the site fast on mobile data.

The current hero, courtyard and puja photographs are stock images, not photographs of Mahavir Mandir. Sources are listed at the end of this file. Replace them with the temple's own photographs when available.

### Donations

Donations use the UPI ID and recipient name in `temple.donation` and the bank-issued QR image at `public/images/upi-qr.png`. To change either:

1. Update `upi` and `recipient` in `data/site.ts`. The recipient name must match the name shown by the bank, because the site asks visitors to verify it before paying.
2. Replace `public/images/upi-qr.png` with the new QR image.
3. Update the donation policy text in `components/TempleWebsite.tsx` if the account changes.

The site displays the QR and a payment link only. It does not process payments, issue receipts or make tax claims.

### Chalisa audio

The recording at `public/mp3/Shri_Hanuman_Chalisa.mp3` is streamed only when a visitor presses play, so it does not slow down page loading. To replace it, drop in a new MP3 (128 kbps or lower, ideally under 10 MB) and update `temple.audio.chalisa` in `data/site.ts` if the file name changes.

### Videos

Add entries to `content/videos.json`. Thumbnails come from YouTube; the player is embedded through the privacy-enhanced `youtube-nocookie.com` domain only after a visitor presses play.

## Configuration

Copy `.env.example` to `.env.local` and fill in what you need. Rebuild after any change; these values are baked in at build time.

| Variable                       | Purpose                                                                                                                                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | Final HTTPS domain. Drives canonical URLs, social sharing metadata and the sitemap                                                                                                                                          |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Public form endpoint (for example Formspree or Web3Forms) that accepts JSON with `name`, `mobile`, `email`, `subject` and `message`. Without it the form runs in demo mode and clearly tells visitors that nothing was sent |
| `NEXT_PUBLIC_GA_ID`            | Google Analytics measurement ID. Enables a consent banner; the tag loads only after the visitor accepts. Leave empty to load nothing                                                                                        |

Never put private API keys in these variables. They are visible to every visitor.

### Verification flags in `data/site.ts`

- `timingsVerified: true` turns on the live open/closed indicator and adds opening hours to search-engine structured data. Set it once the committee confirms the timings.
- `locationVerified: true` together with real `geo` coordinates adds the location to structured data. Also replace `mapEmbed` and `directions` with the exact temple location; they currently point to the general Kutumba area.

## Deployment

`npm run build` produces the whole site in `out/`. Deploy that folder to any static host.

- **Cloudflare Pages, Netlify, Vercel.** Connect the GitHub repository. Build command `npm run build`, output directory `out`. A `netlify.toml` is included. Set the environment variables above in the host's dashboard. Free tiers are sufficient.
- **cPanel or other Apache hosting.** Upload the contents of `out/` to `public_html`, including the `_next/` folder and the `.htaccess` file, which handles HTTPS redirection and caching. Node.js is not required on the server.

The site expects to live at the domain root. A subdirectory deployment needs a matching Next.js `basePath`.

## Tests

With a server running on port 3000:

```sh
npx playwright install chromium
npm test
```

The browser tests cover language and theme persistence, event highlighting, the announcement banner, the Chalisa reader and audio player, video previews, gallery filters and lightbox, the mobile menu, the donation QR and UPI link, contact form validation, in-page links, image loading, console errors, accessibility in both themes, and viewport widths from 320 to 1920 pixels.

## Project structure

```
app/            Layout, global styles, SEO metadata, robots and sitemap
components/     React components (page composition, donation, contact, videos, Chalisa player and reader)
content/        Editable JSON content
data/site.ts    Central temple configuration
translations/   Hindi and English interface text
public/         Static assets: images, MP3, icons, service worker, .htaccess
tests/          Playwright browser tests
docs/           Original design brief
```

## Privacy

Fonts, photographs and the Chalisa audio are served from the site itself. Google Maps, YouTube and WhatsApp connect to their services only when a visitor chooses to load the map, play a video or open WhatsApp. Language, theme and analytics-consent choices are stored in the visitor's browser only.

## Credits

Stock photographs used as placeholders:

- Hero: [Historic Sandstone Temple in Badami, India, Pexels](https://www.pexels.com/photo/historic-sandstone-temple-in-badami-india-32563589/)
- Courtyard: [Intricate Architecture of a Hindu Temple Courtyard, Pexels](https://www.pexels.com/photo/intricate-architecture-of-a-hindu-temple-courtyard-35858173/)
- Puja kalash: [Unsplash](https://images.unsplash.com/photo-1606293926075-69a00dbfde81)

Fonts: DM Sans, Cormorant, Noto Sans Devanagari and Noto Serif Devanagari via Fontsource. Icons: Lucide.
