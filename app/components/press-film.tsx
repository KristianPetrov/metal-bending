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
        aria-label="Animation of a Hufford stretch press bending a straight metal section into a smooth radius"
        loop
        muted={isMuted}
        playsInline
        poster="/mbc-animation-poster.jpg"
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
      >
        <source src="/mbc-animation.mp4" type="video/mp4" />
        <a href="/mbc-animation.mp4">Watch the Hufford stretch press animation.</a>
      </video>

      <div className="press-film-index" aria-hidden="true">
        <span>MBC / FORMING STUDY</span>
        <span>10.05 SEC / LOOP</span>
      </div>

      <div className="press-film-caption">
        <span>Hufford stretch press</span>
        <small>Controlled tension. Smooth radius.</small>
      </div>

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
