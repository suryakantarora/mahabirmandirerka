"use client";
import { useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import { videos } from "@/data/site";
import { SectionTitle, useTranslation } from "./ui";

export default function Videos() {
  const { t, l } = useTranslation();
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <section id="videos" className="section videos-section">
      <div className="container">
        <SectionTitle eyebrow={t("videosKicker")} title={t("videos")} center />
        {videos.length ? (
          <div className="video-grid">
            {videos.map((video) => {
              const title = l(video.title);
              const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;
              return (
                <article className="video-card" key={video.id}>
                  <div className="video-frame">
                    {playing === video.id ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    ) : (
                      <button
                        className="video-poster"
                        onClick={() => setPlaying(video.id)}
                        aria-label={`${t("playVideo")}: ${title}`}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                          alt=""
                          loading="lazy"
                          width="480"
                          height="360"
                        />
                        <span className="video-play" aria-hidden="true">
                          <Play size={26} fill="currentColor" />
                        </span>
                      </button>
                    )}
                  </div>
                  <div className="video-body">
                    <h3>{title}</h3>
                    <p>{l(video.description)}</p>
                    <a
                      href={watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      {t("watchOnYouTube")}
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="center muted">{t("noVideos")}</p>
        )}
        <p className="small center muted video-hint">{t("videoHint")}</p>
      </div>
    </section>
  );
}
