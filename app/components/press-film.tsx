"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function PressFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !manuallyPaused.current) {
          void video.play().catch(() => setIsPlaying(false));
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      manuallyPaused.current = false;
      await video.play().catch(() => setIsPlaying(false));
    } else {
      manuallyPaused.current = true;
      video.pause();
    }
  }

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }

  return (
    <div className="press-film-frame">
      <video
        ref={videoRef}
        aria-label="Animation of a stretch press tensioning a metal section, then wrapping it around a die"
        loop
        muted={isMuted}
        playsInline
        poster="/stretch-press-poster.jpg"
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
      >
        <source src="/stretch-press-promo.mp4" type="video/mp4" />
        <a href="/stretch-press-promo.mp4">Watch the stretch press animation.</a>
      </video>

      <button
        type="button"
        className="press-film-play"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pause animation" : "Play animation"}
        aria-pressed={isPlaying}
      >
        {isPlaying ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
      </button>
      <button
        type="button"
        className="press-film-mute"
        onClick={toggleSound}
        aria-label={isMuted ? "Turn animation sound on" : "Mute animation"}
        aria-pressed={!isMuted}
      >
        {isMuted ? <VolumeX size={13} aria-hidden="true" /> : <Volume2 size={13} aria-hidden="true" />}
      </button>
    </div>
  );
}
