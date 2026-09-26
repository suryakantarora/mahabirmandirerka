"use client";
import { useState } from "react";
import {
  Copy,
  Check,
  Heart,
  ShieldCheck,
  Smartphone,
  Flower2,
  HandHeart,
} from "lucide-react";
import { temple } from "@/data/site";
import { TempleMark, useTranslation } from "./ui";

export default function Donation() {
  const { t, lang } = useTranslation();
  const [status, setStatus] = useState<"" | "copied" | "failed">("");
  const uri = `upi://pay?pa=${encodeURIComponent(temple.donation.upi)}&pn=${encodeURIComponent(temple.donation.recipient)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(temple.donation.upi);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  const statusText =
    status === "copied"
      ? t("copied")
      : status === "failed"
        ? t("copyFail")
        : "";

  return (
    <section id="donate" className="donation-section">
      <div className="container donation-grid">
        <div className="donation-copy">
          <span className="eyebrow">{t("support")}</span>
          <h2>{t("donationTitle")}</h2>
          <p>{t("donationBody")}</p>
          <ul className="donation-causes">
            <li>
              <TempleMark />
              {t("templeCare")}
            </li>
            <li>
              <Flower2 />
              {t("pujaFestivals")}
            </li>
            <li>
              <HandHeart />
              {t("communityService")}
            </li>
          </ul>
          <div className="trust-note">
            <ShieldCheck size={22} />
            <p>{t("verify")}</p>
          </div>
          <small>{t("receipt")}</small>
        </div>
        <div className="donation-card">
          <span className="donation-card-label">
            <Heart size={16} />
            {lang === "hi"
              ? "भक्ति से भरा एक छोटा योगदान"
              : "A small contribution, with a full heart"}
          </span>
          <div className="qr-frame">
            <i />
            <i />
            <i />
            <i />
            <img
              src={temple.images.upiQr}
              alt={t("scan")}
              width="200"
              height="200"
            />
          </div>
          <strong>{t("scan")}</strong>
          <p className="payment-brands">{t("upiApps")}</p>
          <div className="upi-line">
            <span>{temple.donation.upi}</span>
            <button
              onClick={copy}
              aria-label={t("copyUpi")}
              title={t("copyUpi")}
            >
              {status === "copied" ? <Check size={17} /> : <Copy size={17} />}
            </button>
          </div>
          <p className="form-status" role="status">
            {statusText}
          </p>
          <a className="button primary mobile-upi" href={uri}>
            <Smartphone size={18} />
            {t("pay")}
          </a>
        </div>
      </div>
    </section>
  );
}
