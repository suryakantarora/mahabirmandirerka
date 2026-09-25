"use client";
import { createContext, useContext, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Lang, Localized } from "@/data/site";
import { copy, CopyKey } from "@/translations";

export const LanguageContext = createContext<Lang>("hi");

export function useTranslation() {
  const lang = useContext(LanguageContext);
  return {
    lang,
    t: (key: CopyKey) => copy[key][lang],
    l: (value: Localized | string) =>
      typeof value === "string" ? value : value[lang],
  };
}

/** Temple silhouette used as the brand mark. */
export function TempleMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 72"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M32 5v13m0-13 17 5-17 5M12 58h40M17 52h30l-7-20H24zm7-20 8-15 8 15M9 64h46M27 52V41h10v11M13 58V42H7v16m44 0V42h6v16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 36h8m32 0h8M22 38h20M20 44h8m8 0h8"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Small diya (lamp) used as an ornament. */
export function Diya({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <path
        d="M20 6c-3 5-5 7-5 11a5 5 0 0 0 10 0c0-4-2-6-5-11z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M6 24h28c0 5-6 9-14 9S6 29 6 24z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M10 30c4 3 16 3 20 0" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`ornament ${className}`} aria-hidden="true">
      <span />
      <svg viewBox="0 0 24 24" width="14" height="14">
        <path
          d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"
          fill="currentColor"
        />
      </svg>
      <span />
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  center = false,
  light = false,
}: {
  eyebrow: string;
  title: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div
      className={`section-title ${center ? "center" : ""} ${light ? "light" : ""}`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <Ornament />
    </div>
  );
}

export function Modal({
  title,
  onClose,
  children,
  wide = false,
  className = "",
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { t } = useTranslation();
  useEffect(() => {
    const el = dialog.current;
    const before = document.activeElement as HTMLElement | null;
    el?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el?.close();
      document.body.style.overflow = old;
      before?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className={`modal ${wide ? "wide" : ""} ${className}`}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-label={title}
    >
      <div className="modal-heading">
        <h2>{title}</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label={t("close")}
        >
          <X size={22} />
        </button>
      </div>
      <div className="modal-body">{children}</div>
    </dialog>
  );
}
