import { useEffect, useState } from "react";

const MSGS = [
  "Reading your answer…",
  "Checking key concepts…",
  "Comparing with ideal response…",
  "Calculating your score…",
  "Writing your feedback…",
];

export default function LoadingGrader() {
  const [i, setI] = useState(0);
  const [dots, setDot] = useState("");

  useEffect(() => {
    const a = setInterval(() => setI((x) => (x + 1) % MSGS.length), 1800);
    const b = setInterval(
      () => setDot((x) => (x.length >= 3 ? "" : x + ".")),
      450,
    );
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, []);

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center gap-8 py-20">
      {/* Rings */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-amber/10 animate-ping" />
        <div className="absolute inset-3 rounded-full border border-amber/20 animate-pulse" />
        <span className="font-display text-4xl text-amber tracking-widest z-10">
          AI
        </span>
      </div>

      <div className="text-center space-y-2">
        <p className="font-mono text-sm text-amber tracking-wide">
          {MSGS[i]}
          {dots}
        </p>
        <p className="font-mono text-[10px] text-muted tracking-widest">
          GEMINI IS GRADING YOUR ANSWER
        </p>
      </div>

      {/* Scanner bar */}
      <div className="w-48 h-px bg-surface-3 overflow-hidden relative">
        <div
          className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-amber to-transparent"
          style={{ animation: "scanline 1.6s ease-in-out infinite" }}
        />
      </div>
    </div>
  );
}
