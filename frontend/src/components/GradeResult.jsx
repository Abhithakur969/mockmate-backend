import { useEffect, useState } from "react";

const CFG = {
  PASS: { c: "#22C55E", bg: "#020D06", bd: "#14532D", icon: "✓" },
  "NEEDS WORK": { c: "#EAB308", bg: "#0C0800", bd: "#713F12", icon: "△" },
  FAIL: { c: "#EF4444", bg: "#120202", bd: "#7F1D1D", icon: "✕" },
};

function ScoreRing({ score }) {
  const r = 46;
  const circ = +(2 * Math.PI * r).toFixed(2);
  const v = score >= 6 ? "PASS" : score >= 4 ? "NEEDS WORK" : "FAIL";
  const cfg = CFG[v];
  const [dash, setDash] = useState(circ);

  useEffect(() => {
    const t = setTimeout(() => setDash(circ - (score / 10) * circ), 180);
    return () => clearTimeout(t);
  }, [score, circ]);

  return (
    <div className="flex flex-col items-center gap-3 shrink-0">
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={cfg.c}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={dash}
            style={{
              transition:
                "stroke-dashoffset 1.4s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-display text-4xl leading-none tracking-wider"
            style={{ color: cfg.c }}
          >
            {score}
          </span>
          <span className="font-mono text-[10px] text-muted mt-0.5">/10</span>
        </div>
      </div>
      <div
        className="font-mono text-[10px] tracking-widest px-4 py-1.5 border"
        style={{ color: cfg.c, background: cfg.bg, borderColor: cfg.bd }}
      >
        {cfg.icon} {v}
      </div>
    </div>
  );
}

export default function GradeResult({
  grade,
  answer,
  onNext,
  onRetry,
  onChangeRole,
}) {
  const [showModel, setShowModel] = useState(false);
  const [showYours, setShowYours] = useState(false);

  return (
    <div className="animate-fade-up">
      <div className="flex items-center gap-4 mb-6">
        <span className="section-label">03 / Result</span>
        <span className="display-rule" />
        <span className="font-mono text-[10px] text-muted tracking-widest">
          GRADE REPORT
        </span>
      </div>

      {/* Score + feedback */}
      <div className="relative border border-border bg-surface p-7 mb-3">
        <span className="absolute top-0 left-0 w-12 h-[2px] bg-amber" />
        <span className="absolute top-0 left-0 w-[2px] h-12 bg-amber" />

        <div className="flex flex-col sm:flex-row gap-7">
          <ScoreRing score={grade.score} />

          <div className="flex-1 space-y-5 min-w-0">
            <div>
              <p className="font-mono text-[10px] text-green tracking-[0.25em] mb-2">
                ▲ STRENGTHS
              </p>
              <p className="font-body text-sm text-light leading-relaxed border-l-2 border-green-dim pl-3">
                {grade.strengths}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-yellow tracking-[0.25em] mb-2">
                ▽ TO IMPROVE
              </p>
              <p className="font-body text-sm text-light leading-relaxed border-l-2 border-yellow-dim pl-3">
                {grade.improvements}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Model answer */}
      <div className="border border-border bg-surface mb-3">
        <button
          onClick={() => setShowModel((v) => !v)}
          className="w-full flex items-center justify-between px-6 py-4 group"
        >
          <span className="font-mono text-[10px] text-amber tracking-[0.25em]">
            ★ MODEL ANSWER
          </span>
          <span
            className="font-mono text-[10px] text-muted group-hover:text-amber transition-all duration-200 inline-block"
            style={{ transform: showModel ? "rotate(180deg)" : "none" }}
          >
            ▼
          </span>
        </button>
        {showModel && (
          <div className="animate-fade-in px-6 pb-6 border-t border-border pt-5">
            <p className="font-body text-sm text-light leading-relaxed italic">
              "{grade.betterAnswer}"
            </p>
          </div>
        )}
      </div>

      {/* Your answer */}
      <div className="border border-border bg-surface mb-7">
        <button
          onClick={() => setShowYours((v) => !v)}
          className="w-full flex items-center justify-between px-6 py-4 group"
        >
          <span className="font-mono text-[10px] text-muted tracking-[0.25em]">
            YOUR ANSWER
          </span>
          <span
            className="font-mono text-[10px] text-muted group-hover:text-amber transition-all duration-200 inline-block"
            style={{ transform: showYours ? "rotate(180deg)" : "none" }}
          >
            ▼
          </span>
        </button>
        {showYours && (
          <div className="animate-fade-in px-6 pb-6 border-t border-border pt-5">
            <p className="font-body text-sm text-subtle leading-relaxed">
              {answer}
            </p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <button
          onClick={onNext}
          className="btn-primary  py-4 text-[10px] col-span-2 sm:col-span-1"
        >
          NEXT QUESTION →
        </button>
        <button onClick={onRetry} className="btn-ghost py-4 text-[10px]">
          RETRY THIS
        </button>
      </div>
      <button
        onClick={onChangeRole}
        className="w-full font-mono text-[10px] text-muted hover:text-amber
                         transition-colors tracking-widest py-3"
      >
        ← CHANGE ROLE
      </button>
    </div>
  );
}
