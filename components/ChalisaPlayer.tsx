"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Music } from "lucide-react";
import { temple } from "@/data/site";
import { useTranslation } from "./ui";

function format(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function ChalisaPlayer() {
  const { t } = useTranslation();
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    const onTime = () => setTime(el.currentTime);
    const onMeta = () => setDuration(el.duration);
    const onPlay = () => {
      setPlaying(true);
      setLoading(false);
    };
    const onPause = () => setPlaying(false);
    const onWaiting = () => setLoading(true);
    const onEnded = () => {
      setPlaying(false);
      setTime(0);
    };
    const onError = () => {
      setFailed(true);
      setLoading(false);
      setPlaying(false);
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("durationchange", onMeta);
    el.addEventListener("playing", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("waiting", onWaiting);
    el.addEventListener("ended", onEnded);
    el.addEventListener("error", onError);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("durationchange", onMeta);
      el.removeEventListener("playing", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("waiting", onWaiting);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("error", onError);
    };
  }, []);

  async function toggle() {
    const el = audio.current;
    if (!el) return;
    if (playing) {
      el.pause();
      return;
    }
    try {
      setLoading(true);
      await el.play();
    } catch {
      setFailed(true);
      setLoading(false);
    }
  }

  function seek(value: number) {
    const el = audio.current;
    if (!el) return;
    el.currentTime = value;
    setTime(value);
  }

  const progress = duration ? (time / duration) * 100 : 0;

  return (
    <div className="chalisa-player" role="group" aria-label={t("listen")}>
      <audio ref={audio} src={temple.audio.chalisa} preload="none" />
      <button
        className="player-toggle"
        onClick={toggle}
        aria-label={playing ? t("pause") : t("listen")}
        aria-pressed={playing}
        disabled={failed}
      >
        {playing ? (
          <Pause size={24} fill="currentColor" />
        ) : (
          <Play size={24} fill="currentColor" />
        )}
      </button>
      <div className="player-body">
        <div className="player-label">
          <Music size={16} />
          <strong>{t("listen")}</strong>
          <span className="player-time">
            {format(time)}
            {duration ? ` / ${format(duration)}` : ""}
          </span>
        </div>
        <input
          type="range"
          className="player-seek"
          min={0}
          max={duration || 0}
          step={1}
          value={Math.min(time, duration || 0)}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label={t("seek")}
          aria-valuetext={format(time)}
          disabled={!duration}
          style={{ "--progress": `${progress}%` } as React.CSSProperties}
        />
        <small className="player-status" role="status">
          {failed ? t("audioFailed") : loading ? t("loadingAudio") : t("audioHint")}
        </small>
      </div>
    </div>
  );
}
