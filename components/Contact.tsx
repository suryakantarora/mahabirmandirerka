"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Send,
  Navigation,
} from "lucide-react";
import { temple } from "@/data/site";
import { SectionTitle, useTranslation } from "./ui";

/** Indian mobile: optional +91 / 0 prefix, then 10 digits starting 6-9. */
const MOBILE_PATTERN = "(\\+91[\\s\\-]?|0)?[6-9][0-9]{9}";

export default function Contact() {
  const { t, l } = useTranslation();
  const [status, setStatus] = useState<"" | "demo" | "sent" | "error" | "busy">(
    "",
  );
  const [showMap, setShowMap] = useState(false);
  const wa = `https://wa.me/${temple.whatsapp}?text=${encodeURIComponent(t("wa"))}`;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    // Honeypot: bots fill the hidden field; humans never see it.
    if (data.website) {
      setStatus("sent");
      form.reset();
      return;
    }
    delete data.website;
    if (!temple.contactEndpoint) {
      setStatus("demo");
      return;
    }
    setStatus("busy");
    try {
      const response = await fetch(temple.contactEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const statusText = {
    "": "",
    busy: "",
    demo: t("formSuccess"),
    sent: t("formSent"),
    error: t("formError"),
  }[status];

  return (
    <>
      <section className="section location-section" id="location">
        <div className="container location-grid">
          <div className="location-copy">
            <SectionTitle eyebrow={t("locationKicker")} title={t("location")} />
            <h3>{l(temple.name)}</h3>
            <p className="address">
              <MapPin size={18} />
              <span>{l(temple.address)}</span>
            </p>
            <p className="muted small">{t("mapNote")}</p>
            <a
              className="button primary"
              href={temple.directions}
              target="_blank"
              rel="noreferrer"
            >
              <Navigation size={17} />
              {t("directions")}
              <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="map-box">
            {showMap ? (
              <iframe
                src={temple.mapEmbed}
                title={t("location")}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="map-preview">
                <div className="map-lines" aria-hidden="true" />
                <span className="map-place">{l(temple.tagline)}</span>
                <div className="map-pin">
                  <MapPin size={30} />
                </div>
                <button
                  className="button primary"
                  onClick={() => setShowMap(true)}
                >
                  {t("loadMap")}
                  <ArrowUpRight size={16} />
                </button>
                <small>{t("mapHint")}</small>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container contact-grid">
          <div className="contact-copy">
            <SectionTitle eyebrow={t("contactKicker")} title={t("contact")} />
            <p>{t("contactBody")}</p>
            <a className="contact-line" href={`tel:${temple.phoneLink}`}>
              <span className="round-icon">
                <Phone />
              </span>
              <span>
                <small>{t("call")}</small>
                <strong>{temple.phone}</strong>
              </span>
            </a>
            <a className="contact-line" href={`mailto:${temple.email}`}>
              <span className="round-icon">
                <Mail />
              </span>
              <span>
                <small>{t("email")}</small>
                <strong>{temple.email}</strong>
              </span>
            </a>
            <a
              className="button whatsapp"
              href={wa}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={19} />
              WhatsApp
              <ArrowUpRight size={16} />
            </a>
          </div>
          <form onSubmit={submit} className="contact-form" noValidate={false}>
            <div className="form-row">
              <label>
                <span>{t("name")} *</span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                />
              </label>
              <label>
                <span>{t("mobile")} *</span>
                <input
                  required
                  name="mobile"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  pattern={MOBILE_PATTERN}
                  title={t("mobileHint")}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                <span>{t("email")}</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  maxLength={254}
                />
              </label>
              <label>
                <span>{t("subject")} *</span>
                <input name="subject" required minLength={2} maxLength={150} />
              </label>
            </div>
            <label>
              <span>{t("message")} *</span>
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={3000}
                rows={5}
              />
            </label>
            <label className="honeypot" aria-hidden="true">
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
            {!temple.contactEndpoint && (
              <p className="small muted">{t("formDemo")}</p>
            )}
            <button
              className="button primary"
              type="submit"
              disabled={status === "busy"}
            >
              {status === "busy" ? t("sending") : t("send")}
              <Send size={17} />
            </button>
            <p role="status" className="form-status">
              {statusText}
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export function WhatsAppFloat() {
  const { t } = useTranslation();
  const wa = `https://wa.me/${temple.whatsapp}?text=${encodeURIComponent(t("wa"))}`;
  return (
    <a
      className="whatsapp-float"
      href={wa}
      target="_blank"
      rel="noreferrer"
      aria-label={t("waLabel")}
      title={t("waLabel")}
    >
      <MessageCircle size={26} />
    </a>
  );
}
