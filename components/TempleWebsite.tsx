"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Flag,
  Flame,
  Flower2,
  Heart,
  Info,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Printer,
  Sparkles,
  Sun,
  Sunrise,
  Users,
  X,
  HandHeart,
  Landmark,
} from "lucide-react";
import {
  announcements,
  bi,
  categories,
  committee,
  events,
  gallery,
  Lang,
  navigation,
  services,
  specialDays,
  temple,
  timings,
  TempleEvent,
} from "@/data/site";
import {
  Diya,
  LanguageContext,
  Modal,
  Ornament,
  SectionTitle,
  TempleMark,
  useTranslation,
} from "./ui";
import Donation from "./Donation";
import Contact, { WhatsAppFloat } from "./Contact";
import CompleteChalisa from "./CompleteChalisa";

const timingIcons = {
  sunrise: Sunrise,
  sun: Sun,
  flower: Flower2,
  flame: Flame,
  moon: Moon,
};
const serviceIcons = {
  eye: Eye,
  flame: Flame,
  flower: Flower2,
  book: BookOpen,
  flag: Flag,
  sparkle: Sparkles,
};
const weekdays = {
  hi: [
    "रविवार",
    "सोमवार",
    "मंगलवार",
    "बुधवार",
    "गुरुवार",
    "शुक्रवार",
    "शनिवार",
  ],
  en: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

export default function TempleWebsite({
  chalisa,
  buildYear,
}: {
  chalisa: Record<Lang, string>;
  buildYear: number;
}) {
  const [lang, setLang] = useState<Lang>("hi");
  const [dark, setDark] = useState(false);
  useEffect(() => {
    try {
      setLang(localStorage.getItem("temple-lang") === "en" ? "en" : "hi");
      setDark(localStorage.getItem("temple-theme") === "dark");
    } catch {}
    // The inline script in layout hid the page when English was stored; reveal once state matches.
    delete document.documentElement.dataset.pending;
    if ("serviceWorker" in navigator && location.protocol === "https:")
      navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);
  function language(value: Lang) {
    setLang(value);
    document.documentElement.lang = value;
    try {
      localStorage.setItem("temple-lang", value);
    } catch {}
  }
  function theme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("temple-theme", next ? "dark" : "light");
    } catch {}
  }
  return (
    <LanguageContext.Provider value={lang}>
      <Website
        setLang={language}
        dark={dark}
        toggleTheme={theme}
        chalisa={chalisa}
        buildYear={buildYear}
      />
    </LanguageContext.Provider>
  );
}

/* ---------- date helpers (run on the client only, after mount) ---------- */

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Next occurrence of an event: ISO date or next weekday. Returns null when unknown. */
function nextOccurrence(event: TempleEvent, now: Date): Date | null {
  if (event.date) {
    const d = new Date(`${event.date}T00:00:00`);
    return isNaN(d.getTime()) || d < startOfDay(now) ? null : d;
  }
  if (event.weekday !== undefined) {
    const d = startOfDay(now);
    d.setDate(d.getDate() + ((event.weekday - d.getDay() + 7) % 7));
    return d;
  }
  return null;
}

function Website({
  chalisa,
  buildYear,
  setLang,
  dark,
  toggleTheme,
}: {
  chalisa: Record<Lang, string>;
  buildYear: number;
  setLang: (l: Lang) => void;
  dark: boolean;
  toggleTheme: () => void;
}) {
  const { t, l, lang } = useTranslation();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [event, setEvent] = useState<number | null>(null);
  const [category, setCategory] = useState(0);
  const [photo, setPhoto] = useState<number | null>(null);
  const [reader, setReader] = useState<Lang | null>(null);
  const [policy, setPolicy] = useState<
    "privacy" | "terms" | "donationPolicy" | null
  >(null);
  const [now, setNow] = useState<Date | null>(null);
  const [consent, setConsent] = useState<"unknown" | "yes" | "no">("unknown");
  const navRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  /* Time-based UI is computed after mount so the static HTML never mismatches. */
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Mobile menu: lock scroll, close on Escape/outside click, trap focus. */
  useEffect(() => {
    if (!menu) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    navRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab" && navRef.current) {
        const items = [
          ...navRef.current.querySelectorAll<HTMLElement>("a, button"),
          menuButton.current!,
        ];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onClick = (e: MouseEvent) => {
      if (
        !navRef.current?.contains(e.target as Node) &&
        !menuButton.current?.contains(e.target as Node)
      )
        setMenu(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [menu]);

  /* Analytics consent (only when an ID is configured). */
  useEffect(() => {
    if (!temple.analyticsId) return;
    try {
      const stored = localStorage.getItem("temple-analytics");
      if (stored === "yes" || stored === "no") setConsent(stored);
    } catch {}
  }, []);
  useEffect(() => {
    if (consent !== "yes" || !temple.analyticsId) return;
    if (document.getElementById("ga-script")) return;
    const s = document.createElement("script");
    s.id = "ga-script";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${temple.analyticsId}`;
    document.head.appendChild(s);
    const w = window as unknown as { dataLayer: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push(["js", new Date()]);
    w.dataLayer.push(["config", temple.analyticsId, { anonymize_ip: true }]);
  }, [consent]);
  function decide(value: "yes" | "no") {
    setConsent(value);
    try {
      localStorage.setItem("temple-analytics", value);
    } catch {}
  }

  /* ---------- derived content ---------- */
  const selectedGallery = gallery.filter(
    (item) => category === 0 || item.category === category,
  );
  const movePhoto = useCallback(
    (step: number) =>
      setPhoto((v) =>
        v === null
          ? null
          : (v + step + selectedGallery.length) % selectedGallery.length,
      ),
    [selectedGallery.length],
  );
  useEffect(() => {
    if (photo === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") movePhoto(1);
      if (e.key === "ArrowLeft") movePhoto(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [photo, movePhoto]);
  const touchX = useRef<number | null>(null);

  const upcoming = now
    ? events
        .map((e) => ({ e, when: nextOccurrence(e, now) }))
        .filter((x): x is { e: TempleEvent; when: Date } => x.when !== null)
        .sort((a, b) => a.when.getTime() - b.when.getTime())
    : [];
  const nextUp = upcoming[0];
  const countdown = upcoming.find((x) => x.e.date);
  const daysUntil = (d: Date) =>
    now
      ? Math.round((d.getTime() - startOfDay(now).getTime()) / 86_400_000)
      : 0;
  const eventDate = (e: TempleEvent) => {
    if (e.date) {
      const d = new Date(`${e.date}T00:00:00`);
      return isNaN(d.getTime())
        ? t("dateTba")
        : d.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
    }
    if (e.weekday !== undefined)
      return `${t("weekly")} ${weekdays[lang][e.weekday]}`;
    return t("dateTba");
  };
  const relative = (d: Date) => {
    const n = daysUntil(d);
    return n === 0
      ? t("today")
      : n === 1
        ? t("tomorrow")
        : `${n} ${t("daysLeft")}`;
  };

  const banner = announcements.find((a) => a.important) ?? announcements[0];
  const special = now ? specialDays[now.getDay()] : undefined;
  const openNow = (() => {
    if (!now || !temple.timingsVerified) return null;
    const mins = now.getHours() * 60 + now.getMinutes();
    const toMin = (s: string) => {
      const [h, m] = s.split(":").map(Number);
      return h * 60 + m;
    };
    return (
      mins >= toMin(timings[0].at) &&
      mins < toMin(timings[timings.length - 1].at)
    );
  })();

  return (
    <>
      <a href="#main" className="skip-link">
        {t("skip")}
      </a>

      {banner && (
        <div className="announcement">
          <div className="container">
            <span>
              <Bell size={14} />
              <span>{l(banner.text)}</span>
              {!banner.date && <small>{t("noticeDemo")}</small>}
            </span>
            <a href="#announcements">
              {t("more")}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}

      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-inner">
          <a href="#home" className="brand" aria-label={l(temple.name)}>
            <TempleMark />
            <span>
              <strong>{l(temple.name)}</strong>
              <small>{l(temple.tagline)}</small>
            </span>
          </a>
          <nav
            ref={navRef}
            id="site-nav"
            className={menu ? "nav open" : "nav"}
            aria-label={lang === "hi" ? "मुख्य नेविगेशन" : "Main navigation"}
          >
            {navigation.map(([id, label]) => (
              <a href={`#${id}`} key={id} onClick={() => setMenu(false)}>
                {l(label)}
              </a>
            ))}
            <a
              href="#donate"
              className="button saffron mobile-donate"
              onClick={() => setMenu(false)}
            >
              <Heart size={16} />
              {t("donate")}
            </a>
          </nav>
          <div className="header-actions">
            <div className="languages" role="group" aria-label="Language">
              <button
                lang="hi"
                aria-pressed={lang === "hi"}
                onClick={() => setLang("hi")}
              >
                हिंदी
              </button>
              <span aria-hidden="true">|</span>
              <button
                lang="en"
                aria-pressed={lang === "en"}
                onClick={() => setLang("en")}
              >
                English
              </button>
            </div>
            <button
              className="icon-button theme-toggle"
              onClick={toggleTheme}
              aria-label={t("theme")}
              title={t("theme")}
            >
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <a href="#donate" className="button saffron header-donate">
              <Heart size={16} />
              {t("donate")}
            </a>
            <button
              ref={menuButton}
              className="icon-button menu-toggle"
              onClick={() => setMenu(!menu)}
              aria-expanded={menu}
              aria-controls="site-nav"
              aria-label={menu ? t("closeMenu") : t("menu")}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        {/* ---------- HERO ---------- */}
        <section id="home" className="hero">
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet={temple.images.heroMobile}
            />
            <img
              className="hero-image"
              src={temple.images.hero}
              alt={
                lang === "hi"
                  ? "हिंदू मंदिर का प्रतीकात्मक चित्र"
                  : "Illustrative photograph of a Hindu temple"
              }
              fetchPriority="high"
            />
          </picture>
          <div className="hero-shade" />
          <svg
            className="hero-mandala"
            viewBox="0 0 600 600"
            fill="none"
            aria-hidden="true"
          >
            <g stroke="currentColor" strokeWidth="1">
              <circle cx="300" cy="300" r="290" strokeDasharray="4 8" />
              <circle cx="300" cy="300" r="250" />
              <circle cx="300" cy="300" r="238" />
              {Array.from({ length: 24 }, (_, i) => (
                <path
                  key={i}
                  d="M300 60 C330 130 330 190 300 230 C270 190 270 130 300 60Z"
                  transform={`rotate(${i * 15} 300 300)`}
                />
              ))}
              {Array.from({ length: 12 }, (_, i) => (
                <path
                  key={`b${i}`}
                  d="M300 150 C320 200 320 240 300 270 C280 240 280 200 300 150Z"
                  transform={`rotate(${i * 30 + 15} 300 300)`}
                  opacity="0.7"
                />
              ))}
              <circle cx="300" cy="300" r="70" />
              <circle cx="300" cy="300" r="40" />
            </g>
          </svg>
          <div className="container hero-content">
            <div className="sacred-label">
              <span />
              {t("blessing")}
              <span />
            </div>
            <p className="hero-eyebrow">{t("heroTag")}</p>
            <h1>
              {t("heroTitle")}
              <span>{lang === "hi" ? "एरका · बिहार" : "ERKA · BIHAR"}</span>
            </h1>
            <p className="hero-quote">{t("heroQuote")}</p>
            <p className="hero-location">
              <MapPin size={16} />
              {l(temple.location)}
            </p>
            <div className="hero-buttons">
              <a className="button saffron" href="#timings">
                <Sunrise size={19} />
                {t("darshan")}
                <ArrowRight size={18} />
              </a>
              <a className="button glass" href="#donate">
                <Heart size={18} />
                {t("support")}
              </a>
            </div>
            <div className="hero-bottom">
              <span>
                <Diya className="diya" />
                {t("heroMotto")}
              </span>
              <a href="#about" className="scroll-cue" aria-label={t("scroll")}>
                <ChevronDown size={18} />
              </a>
              <small>{t("illustrative")}</small>
            </div>
          </div>
          <svg
            className="hero-skyline"
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 90V60h80l20-24 20 24h60l30-38 30 38h90l25-30 25 30h120l40-52 40 52h140l30-36 30 36h100l22-26 22 26h110l45-58 45 58h110l28-32 28 32h80V90z"
              fill="currentColor"
            />
          </svg>
        </section>

        {/* ---------- QUICK INFO ---------- */}
        <div className="quick-info container">
          <div className="quick-item">
            <span className="quick-icon">
              <TempleMark />
            </span>
            <div>
              <small>{t("statusLabel")}</small>
              <strong>
                <i
                  className={`status-dot ${openNow === false ? "closed" : ""}`}
                />
                {openNow === null
                  ? t("dailyWorship")
                  : openNow
                    ? t("openNow")
                    : t("closedNow")}
              </strong>
              <em>{t("confirmVisit")}</em>
            </div>
          </div>
          <div className="quick-item">
            <span className="quick-icon">
              <Clock />
            </span>
            <div>
              <small>{t("darshanHours")}</small>
              <strong>
                {timings[0].time} – {timings[timings.length - 1].time}
              </strong>
            </div>
          </div>
          <div className="quick-item">
            <span className="quick-icon">
              <Sunrise />
            </span>
            <div>
              <small>{t("morningAarti")}</small>
              <strong>{timings[1].time}</strong>
            </div>
          </div>
          <div className="quick-item">
            <span className="quick-icon">
              <Flame />
            </span>
            <div>
              <small>{t("eveningAarti")}</small>
              <strong>{timings[3].time}</strong>
            </div>
          </div>
          <a href="#location" className="quick-item quick-location">
            <MapPin />
            <span>
              {lang === "hi" ? "एरका, बिहार" : "Erka, Bihar"}
              <ArrowUpRight size={15} />
            </span>
          </a>
        </div>

        {special && (
          <div className="container">
            <p className="special-day">
              <Diya className="diya" />
              <span>{l(special)}</span>
            </p>
          </div>
        )}

        {/* ---------- ABOUT ---------- */}
        <section className="section about-section" id="about">
          <div className="container about-grid">
            <div className="about-photo">
              <img
                src={temple.images.temple}
                alt={
                  lang === "hi"
                    ? "नक्काशीदार हिंदू मंदिर का प्रतीकात्मक चित्र"
                    : "Illustrative carved Hindu temple courtyard"
                }
                loading="lazy"
                width="1000"
                height="1333"
              />
              <div className="photo-outline" aria-hidden="true" />
              <div className="photo-caption">
                <TempleMark />
                <span>
                  {lang === "hi" ? "॥ जय बजरंगबली ॥" : "॥ Jai Bajrangbali ॥"}
                  <small>
                    {lang === "hi"
                      ? "भक्ति · शक्ति · सेवा"
                      : "Devotion · Strength · Service"}
                  </small>
                </span>
              </div>
              <span className="photo-note">{t("illustrative")}</span>
            </div>
            <div className="about-content">
              <SectionTitle eyebrow={t("welcome")} title={t("about")} />
              <p>{t("aboutBody")}</p>
              <p>{t("aboutBody2")}</p>
              <ul className="values">
                <li>
                  <Flower2 />
                  {t("faith")}
                </li>
                <li>
                  <Users />
                  {t("community")}
                </li>
                <li>
                  <HandHeart />
                  {t("service")}
                </li>
                <li>
                  <Landmark />
                  {t("tradition")}
                </li>
              </ul>
              <p className="history-note">
                <Info size={15} />
                {t("history")}
              </p>
              <a href="#contact" className="text-link">
                {t("aboutLink")}
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* ---------- TIMINGS ---------- */}
        <section id="timings" className="section timings-section">
          <div className="pattern" aria-hidden="true" />
          <div className="container">
            <SectionTitle eyebrow={t("daily")} title={t("timings")} center />
            <div className="timings-grid">
              {timings.map((item) => {
                const Icon = timingIcons[item.icon];
                return (
                  <div
                    className={`timing ${item.highlight ? "highlight" : ""}`}
                    key={item.at}
                  >
                    <Icon size={30} strokeWidth={1.4} />
                    <span>{l(item.name)}</span>
                    <strong>{item.time}</strong>
                    <small>{t("everyDay")}</small>
                  </div>
                );
              })}
            </div>
            <p className="timings-note">
              <Info size={15} />
              {t("timingNote")}
            </p>
          </div>
        </section>

        {/* ---------- EVENTS ---------- */}
        <section id="events" className="section events-section">
          <div className="container">
            <div className="section-top">
              <SectionTitle eyebrow={t("eventKicker")} title={t("events")} />
              <span className="small muted">{t("eventNote")}</span>
            </div>
            {countdown && (
              <div className="countdown">
                <div>
                  <span className="eyebrow">{t("nextEvent")}</span>
                  <strong>{l(countdown.e.name)}</strong>
                  <span>{eventDate(countdown.e)}</span>
                </div>
                <div className="countdown-number">
                  <strong>{daysUntil(countdown.when)}</strong>
                  <span>{t("daysLeft")}</span>
                </div>
              </div>
            )}
            <div className="events-grid">
              {events.map((item, i) => {
                const featured = nextUp?.e.id === item.id;
                return (
                  <article
                    className={`event-card ${featured ? "featured" : ""}`}
                    key={item.id}
                  >
                    <div className="event-photo">
                      <img src={item.image} alt={l(item.name)} loading="lazy" />
                      {featured && (
                        <span className="event-badge">
                          <Flag size={12} />
                          {t("featured")} · {relative(nextUp.when)}
                        </span>
                      )}
                    </div>
                    <div className="event-body">
                      <span className="eyebrow">{l(item.tag)}</span>
                      <h3>{l(item.name)}</h3>
                      <div className="event-meta">
                        <span>
                          <CalendarDays size={15} />
                          {eventDate(item)}
                        </span>
                        <span>
                          <Clock size={15} />
                          {l(item.time)}
                        </span>
                      </div>
                      <p>{l(item.description)}</p>
                      <button className="text-link" onClick={() => setEvent(i)}>
                        {t("details")}
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- PUJA ---------- */}
        <section id="puja" className="section puja-section">
          <div className="container">
            <SectionTitle eyebrow={t("pujaKicker")} title={t("puja")} center />
            <div className="services-grid">
              {services.map((item) => {
                const Icon = serviceIcons[item.icon];
                return (
                  <article className="service-card" key={item.name.en}>
                    <span className="round-icon">
                      <Icon size={26} strokeWidth={1.4} />
                    </span>
                    <h3>{l(item.name)}</h3>
                    <p>{l(item.text)}</p>
                  </article>
                );
              })}
            </div>
            <p className="small muted center image-note">{t("pujaNote")}</p>
          </div>
        </section>

        {/* ---------- CHALISA ---------- */}
        <section id="chalisa" className="chalisa-section">
          <div className="pattern" aria-hidden="true" />
          <div className="container chalisa-inner">
            <div className="chalisa-symbol" aria-hidden="true">
              ॐ
            </div>
            <div>
              <span className="eyebrow">
                {lang === "hi"
                  ? "॥ जय हनुमान ज्ञान गुन सागर ॥"
                  : "॥ Jai Hanuman gyan gun sagar ॥"}
              </span>
              <h2>{t("chalisa")}</h2>
              <p>{t("chalisaDesc")}</p>
            </div>
            <div className="chalisa-actions">
              <button
                className="button saffron"
                onClick={() => setReader("hi")}
              >
                <BookOpen size={19} />
                {t("readHindi")}
              </button>
              <button className="button glass" onClick={() => setReader("en")}>
                <BookOpen size={19} />
                {t("readRoman")}
              </button>
            </div>
          </div>
        </section>

        {/* ---------- GALLERY ---------- */}
        <section className="section gallery-section" id="gallery">
          <div className="container">
            <SectionTitle
              eyebrow={t("galleryKicker")}
              title={t("gallery")}
              center
            />
            <div
              className="gallery-filters"
              role="group"
              aria-label={t("gallery")}
            >
              {categories.map((item, i) => (
                <button
                  key={item.en}
                  className={category === i ? "active" : ""}
                  aria-pressed={category === i}
                  onClick={() => setCategory(i)}
                >
                  {l(item)}
                </button>
              ))}
            </div>
            {selectedGallery.length ? (
              <div className="gallery-grid">
                {selectedGallery.map((item, i) => (
                  <button
                    key={item.title.en}
                    className="gallery-photo"
                    onClick={() => setPhoto(i)}
                    aria-label={l(item.title)}
                  >
                    <img src={item.image} alt={l(item.title)} loading="lazy" />
                    <span>
                      {l(item.title)}
                      <ArrowUpRight size={22} />
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="center muted">{t("noPhotos")}</p>
            )}
            <p className="small muted center image-note">{t("imageNote")}</p>
          </div>
        </section>

        {/* ---------- COMMITTEE ---------- */}
        <section id="committee" className="section committee-section">
          <div className="container">
            <SectionTitle
              eyebrow={t("committeeKicker")}
              title={t("committee")}
              center
            />
            <div className="committee-grid">
              {committee.map((member) => (
                <article className="member" key={member.name.en}>
                  <div className="member-avatar">
                    {member.photo ? (
                      <img src={member.photo} alt="" loading="lazy" />
                    ) : (
                      <>
                        <Users size={36} strokeWidth={1.1} />
                        <span>{t("photoSoon")}</span>
                      </>
                    )}
                  </div>
                  <h3>{l(member.name)}</h3>
                  <p>{l(member.role)}</p>
                </article>
              ))}
            </div>
            <p className="small muted center image-note">
              {t("committeeNote")}
            </p>
          </div>
        </section>

        <Donation />
        <Contact />

        {/* ---------- ANNOUNCEMENTS ---------- */}
        <section id="announcements" className="section notice-section">
          <div className="container">
            <SectionTitle
              eyebrow={t("noticesKicker")}
              title={t("notices")}
              center
              light
            />
            <div className="notice-grid">
              {announcements.map((item) => (
                <article
                  className={`notice ${item.important ? "important" : ""}`}
                  key={item.id}
                >
                  <Bell size={18} />
                  <div>
                    {item.important && (
                      <span className="notice-tag">{t("important")}</span>
                    )}
                    <p>{l(item.text)}</p>
                    <small>{item.date || t("noticeDemo")}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer>
        <div className="footer-ornament" aria-hidden="true">
          <Ornament />
        </div>
        <div className="container footer-grid">
          <div>
            <a href="#home" className="brand footer-brand">
              <TempleMark />
              <span>
                <strong>{l(temple.name)}</strong>
                <small>{l(temple.tagline)}</small>
              </span>
            </a>
            <p>{t("footerText")}</p>
            <span className="footer-blessing">॥ जय श्री राम ॥</span>
          </div>
          <div>
            <h3>{t("quickLinks")}</h3>
            {navigation.slice(0, 6).map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {l(label)}
              </a>
            ))}
          </div>
          <div>
            <h3>{t("services")}</h3>
            <a href="#timings">{t("darshan")}</a>
            <a href="#puja">{t("puja")}</a>
            <a href="#chalisa">{t("chalisa")}</a>
            <a href="#donate">{t("donate")}</a>
            <a href="#contact">{t("contact")}</a>
          </div>
          <div>
            <h3>{lang === "hi" ? "संपर्क" : "Contact"}</h3>
            <p>
              <MapPin size={16} />
              {l(temple.address)}
            </p>
            <a href={`tel:${temple.phoneLink}`}>
              <Phone size={15} />
              {temple.phone}
            </a>
            <a href={`mailto:${temple.email}`}>
              <Mail size={15} />
              {temple.email}
            </a>
            {temple.socials.length > 0 && (
              <div className="socials">
                {temple.socials.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noreferrer">
                    {s.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="container footer-bottom">
          <small>
            © {buildYear} {l(temple.name)}, {lang === "hi" ? "एरका" : "Erka"}.{" "}
            {t("rights")}
          </small>
          <div>
            {(["privacy", "terms", "donationPolicy"] as const).map((p) => (
              <button key={p} onClick={() => setPolicy(p)}>
                {t(p)}
              </button>
            ))}
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
      <a
        href="#home"
        className={`back-to-top ${scrolled ? "show" : ""}`}
        aria-label={t("backToTop")}
        title={t("backToTop")}
      >
        <ArrowUp size={20} />
      </a>

      {temple.analyticsId && consent === "unknown" && (
        <div className="consent" role="region" aria-label="Analytics consent">
          <p>{t("consentText")}</p>
          <div>
            <button className="button outline" onClick={() => decide("no")}>
              {t("decline")}
            </button>
            <button className="button primary" onClick={() => decide("yes")}>
              {t("accept")}
            </button>
          </div>
        </div>
      )}

      {/* ---------- DIALOGS ---------- */}
      {event !== null && (
        <Modal title={l(events[event].name)} onClose={() => setEvent(null)}>
          <img
            className="modal-event-image"
            src={events[event].image}
            alt={l(events[event].name)}
          />
          <p className="eyebrow">
            {eventDate(events[event])} · {l(events[event].time)}
          </p>
          <p>{l(events[event].description)}</p>
          <p className="demo-warning">{t("eventNote")}</p>
          <a className="button primary" href={`tel:${temple.phoneLink}`}>
            <Phone size={16} />
            {t("call")}
          </a>
        </Modal>
      )}

      {photo !== null && (
        <Modal
          title={l(selectedGallery[photo].title)}
          wide
          onClose={() => setPhoto(null)}
        >
          <div
            className="lightbox"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) movePhoto(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <img
              className="lightbox-image"
              src={selectedGallery[photo].image}
              alt={l(selectedGallery[photo].title)}
            />
          </div>
          <div className="lightbox-controls">
            <button
              className="icon-button"
              aria-label={t("previous")}
              onClick={() => movePhoto(-1)}
            >
              <ChevronLeft />
            </button>
            <span>
              {photo + 1} / {selectedGallery.length}
            </span>
            <button
              className="icon-button"
              aria-label={t("next")}
              onClick={() => movePhoto(1)}
            >
              <ChevronRight />
            </button>
          </div>
          <p className="small center muted">{t("imageNote")}</p>
        </Modal>
      )}

      {reader && (
        <Modal
          title={t("chalisa")}
          className="reader-modal"
          onClose={() => setReader(null)}
        >
          <div className="reader-tabs" role="group">
            <button
              onClick={() => setReader("hi")}
              aria-pressed={reader === "hi"}
            >
              {t("readHindi")}
            </button>
            <button
              onClick={() => setReader("en")}
              aria-pressed={reader === "en"}
            >
              {t("readRoman")}
            </button>
            <button className="print-button" onClick={() => window.print()}>
              <Printer size={16} />
              {t("print")}
            </button>
          </div>
          {reader === "en" && <p className="small muted">{t("romanNote")}</p>}
          <CompleteChalisa text={chalisa[reader]} lang={reader} />
        </Modal>
      )}

      {policy && (
        <Modal title={t(policy)} onClose={() => setPolicy(null)}>
          <p>{l(policyText[policy])}</p>
          <a className="text-link" href={`mailto:${temple.email}`}>
            {temple.email}
            <ArrowUpRight size={16} />
          </a>
        </Modal>
      )}
    </>
  );
}

const policyText = {
  privacy: bi(
    "यह प्रारंभिक वेबसाइट भाषा, रंग रूप और आँकड़ा-सहमति की पसंद आपके ब्राउज़र में सहेजती है। डेमो संपर्क फ़ॉर्म कोई संदेश नहीं भेजता और फ़ॉर्म के विवरण सहेजता नहीं है। नक्शा लोड करने पर Google Maps से कनेक्शन होता है। गुमनाम उपयोग आँकड़े केवल आपकी सहमति के बाद ही एकत्र किए जाते हैं। WhatsApp एवं अन्य बाहरी लिंक अपनी गोपनीयता नीतियों के अधीन हैं। आधिकारिक नीति का अंतिम विवरण जल्द जोड़ा जाएगा।",
    "This initial website stores language, theme and analytics-consent preferences in your browser. The demo contact form does not send or store form entries. Loading the map connects to Google Maps. Anonymous usage statistics are collected only after you consent. WhatsApp and other external links are subject to their own privacy policies. The final official policy will be added when available.",
  ),
  terms: bi(
    "यह वेबसाइट मंदिर की जानकारी का प्रारंभिक संस्करण है। चित्र, समिति पद, कार्यक्रम एवं समय में नमूना सामग्री शामिल है। यात्रा या आयोजन से पहले मंदिर से जानकारी की पुष्टि करें। आधिकारिक नियम जल्द उपलब्ध होंगे।",
    "This is an initial informational website. Photographs, committee roles, events and timings include placeholder content. Confirm details with the temple before a visit or event. Official terms will be added when available.",
  ),
  donationPolicy: bi(
    "वर्तमान UPI ID और QR केवल नमूना हैं। अभी भुगतान न करें। आधिकारिक भुगतान विवरण सत्यापित होने के बाद ही दान सक्षम किया जाएगा। रसीद, धन-वापसी एवं कर संबंधी आधिकारिक जानकारी अभी उपलब्ध नहीं है। प्रश्नों के लिए मंदिर से संपर्क करें।",
    "The current UPI ID and QR code are demonstrations only. Do not pay. Donations will be enabled only after official payment details are verified. Official receipt, refund and tax information is not yet available. Contact the temple with any questions.",
  ),
};
