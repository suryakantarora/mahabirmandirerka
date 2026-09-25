"use client";
import { useEffect, useRef } from "react";

const HEADINGS = ["दोहा", "चौपाई", "आरती", "Doha", "Chaupai", "Aarti"];

/** Preserve the supplied text; only group lines for comfortable reading. */
export default function CompleteChalisa({
  text,
  lang,
}: {
  text: string;
  lang: "hi" | "en";
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const title = lines.shift();
  const sections: { title: string; lines: string[] }[] = [];
  for (const line of lines) {
    if (HEADINGS.includes(line)) sections.push({ title: line, lines: [] });
    else if (sections.length) sections[sections.length - 1].lines.push(line);
  }
  useEffect(() => {
    // Runs after the dialog's showModal() has moved focus, so the heading wins.
    const id = requestAnimationFrame(() => {
      heading.current?.focus({ preventScroll: true });
      const body = heading.current?.closest(".modal-body");
      if (body) body.scrollTop = 0;
    });
    return () => cancelAnimationFrame(id);
  }, [text]);
  return (
    <article className="reader complete-chalisa" lang={lang}>
      <h3 ref={heading} tabIndex={-1}>
        {title}
      </h3>
      {sections.map((section, index) => (
        <section key={index}>
          <h4>{section.title}</h4>
          {["चौपाई", "Chaupai", "आरती", "Aarti", "Doha", "दोहा"].includes(
            section.title,
          )
            ? groupVerses(section).map((verse, i) => (
                <p key={i}>{verse.join("\n")}</p>
              ))
            : section.lines.map((line, i) => <p key={i}>{line}</p>)}
        </section>
      ))}
    </article>
  );
}

function groupVerses(section: { title: string; lines: string[] }) {
  const size = ["दोहा", "Doha"].includes(section.title) ? 4 : 2;
  const verses: string[][] = [];
  for (let i = 0; i < section.lines.length; i += size)
    verses.push(section.lines.slice(i, i + size));
  return verses;
}
