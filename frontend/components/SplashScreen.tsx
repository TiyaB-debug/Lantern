"use client";

import { useEffect, useRef, useState } from "react";

// The animated logo, saved in the /public folder. Change the name here if yours differs.
const SPLASH_VIDEO = "/Lantern-Animation-V1.webm";
// The splash never disappears sooner than this, so a fast page doesn't make it flash.
const MIN_VISIBLE_MS = 1200;
// Safety net: the splash always leaves after this long, even if the video stalls.
const MAX_VISIBLE_MS = 6000;
const FADE_MS = 500;
// The splash shows once per browser tab session. Remove the SEEN_KEY lines to show it on every load.
const SEEN_KEY = "lantern-splash-seen";

type Phase = "show" | "fade" | "gone";

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("show");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}

    // Skip the splash for repeat visits in the same tab and for people who prefer reduced motion.
    if (seen || reduceMotion) {
      setPhase("gone");
      return;
    }

    const startedAt = Date.now();
    const timers: ReturnType<typeof setTimeout>[] = [];
    let pageReady = document.readyState === "complete";
    let videoDone = false;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      // Only mark the splash as seen once it has actually run.
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      setPhase("fade");
      timers.push(setTimeout(() => setPhase("gone"), FADE_MS));
    };

    const maybeFinish = () => {
      if (!pageReady || !videoDone) return;
      const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - startedAt));
      timers.push(setTimeout(finish, wait));
    };

    const onLoad = () => {
      pageReady = true;
      maybeFinish();
    };
    const onVideoDone = () => {
      if (videoDone) return;
      videoDone = true;
      maybeFinish();
    };

    if (!pageReady) window.addEventListener("load", onLoad);

    const video = videoRef.current;
    if (video) {
      video.addEventListener("ended", onVideoDone);
      video.addEventListener("error", onVideoDone);

      // The video may have already finished or failed before React attached these listeners.
      if (video.ended || video.error) onVideoDone();

      // React doesn't put the "muted" attribute in the server HTML, which can make browsers
      // block autoplay. Mute it and start it by hand. If playback is blocked, don't wait for it.
      video.muted = true;
      video.play().catch(onVideoDone);
    } else {
      onVideoDone();
    }

    maybeFinish();
    timers.push(setTimeout(finish, MAX_VISIBLE_MS));

    return () => {
      window.removeEventListener("load", onLoad);
      video?.removeEventListener("ended", onVideoDone);
      video?.removeEventListener("error", onVideoDone);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`splash${phase === "fade" ? " is-fading" : ""}`}
      role="status"
      aria-label="Loading Lantern"
    >
      <video
        ref={videoRef}
        className="splash-video"
        src={SPLASH_VIDEO}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    </div>
  );
}