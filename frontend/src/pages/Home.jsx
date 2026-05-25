import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen pt-14">
      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-20">
        <div className="animate-fade-up">
          <div className="flex items-center gap-4 mb-10">
            <span className="section-label">FREE · NO LOGIN · AI POWERED</span>
          </div>

          <h1
            className="font-display leading-[0.9] tracking-wider text-snow mb-8 select-none"
            style={{ fontSize: "clamp(4.5rem,14vw,10rem)" }}
          >
            MOCK
            <br />
            <span className="text-amber">MATE.</span>
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-14">
            <p className="font-body font-light text-lg sm:text-xl text-muted max-w-sm leading-relaxed">
              Real interview questions.
              <br />
              Instant AI scoring.
              <br />
              Land your first tech job.
            </p>
            <Link
              to="/practice"
              className="btn-primary text-[11px] px-10 py-4 self-start sm:self-auto"
            >
              START PRACTICING →
            </Link>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-4 border border-border divide-x divide-border">
            {[
              { v: "5", l: "ROLES" },
              { v: "25", l: "QUESTIONS" },
              { v: "AI", l: "GRADED" },
              { v: "₹0", l: "COST" },
            ].map(({ v, l }) => (
              <div
                key={l}
                className="py-5 px-3 text-center bg-surface hover:bg-surface-2 transition-colors"
              >
                <p className="font-display text-3xl sm:text-4xl text-amber tracking-wider mb-1">
                  {v}
                </p>
                <p className="font-mono text-[9px] sm:text-[10px] text-muted tracking-widest">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* amber divider */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-amber/30 to-transparent" />
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <div className="flex items-center gap-4 mb-12">
          <span className="section-label">HOW IT WORKS</span>
          <span className="display-rule" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-border divide-y md:divide-y-0 md:divide-x divide-border">
          {[
            {
              n: "01",
              t: "PICK A ROLE",
              d: "Choose Frontend, Backend, Full Stack, Data/ML, or QA. Each role has 5 real questions.",
            },
            {
              n: "02",
              t: "ANSWER HONESTLY",
              d: "Write like you're in the interview room. No Googling. Think it through in your own words.",
            },
            {
              n: "03",
              t: "GET AI FEEDBACK",
              d: "Score out of 10, specific strengths, improvements, and a model answer to learn from.",
            },
          ].map(({ n, t, d }, i) => (
            <div
              key={n}
              className="group bg-surface hover:bg-surface-2 transition-colors p-8 relative overflow-hidden"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <p
                className="font-display text-[5rem] leading-none text-surface-3
                            group-hover:text-subtle transition-colors mb-5 select-none"
              >
                {n}
              </p>
              <h3 className="font-display text-xl tracking-widest text-snow mb-3">
                {t}
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                {d}
              </p>
              <div
                className="absolute bottom-0 left-0 right-0 h-px bg-transparent
                              group-hover:bg-amber transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── SAMPLE RESULT ── */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-20">
        <div className="flex items-center gap-4 mb-12">
          <span className="section-label">SAMPLE FEEDBACK</span>
          <span className="display-rule" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
          <div className="bg-surface p-8 border-b md:border-b-0 md:border-r border-border">
            <p className="section-label mb-4">QUESTION</p>
            <p className="font-body text-snow text-lg leading-relaxed font-light">
              What is the difference between{" "}
              <code className="font-mono text-amber text-sm bg-surface-3 px-1.5 py-0.5">
                `let`
              </code>
              ,{" "}
              <code className="font-mono text-amber text-sm bg-surface-3 px-1.5 py-0.5">
                `const`
              </code>
              , and{" "}
              <code className="font-mono text-amber text-sm bg-surface-3 px-1.5 py-0.5">
                `var`
              </code>{" "}
              in JavaScript?
            </p>
          </div>

          <div className="bg-surface p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-[10px] text-green tracking-widest">
                SCORE: 7/10
              </span>
              <span
                className="font-mono text-[10px] px-3 py-1 border"
                style={{
                  color: "#22C55E",
                  background: "#020D06",
                  borderColor: "#14532D",
                }}
              >
                ✓ PASS
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-mono text-[10px] text-green tracking-widest mb-2">
                  ▲ STRENGTHS
                </p>
                <p className="font-body text-sm text-light border-l-2 border-green-dim pl-3 leading-relaxed">
                  Correctly identified block vs function scoping and hoisting
                  behaviour.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-yellow tracking-widest mb-2">
                  ▽ TO IMPROVE
                </p>
                <p className="font-body text-sm text-light border-l-2 border-yellow-dim pl-3 leading-relaxed">
                  Mention the temporal dead zone for let/const — that detail
                  impresses interviewers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
        <div className="relative border border-amber/20 bg-surface p-12 sm:p-20 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber/[0.04] to-transparent pointer-events-none" />
          <h2 className="font-display text-[clamp(4rem,14vw,9rem)] leading-none tracking-wider text-snow mb-4">
            READY?
          </h2>
          <p className="font-body text-muted font-light text-lg mb-10">
            2 minutes. No signup. No excuses.
          </p>
          <Link to="/practice" className="btn-primary text-[11px] px-14 py-4">
            START YOUR MOCK INTERVIEW →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div
          className="max-w-6xl mx-auto px-5 sm:px-8 py-8
                        flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-amber flex items-center justify-center">
              <span className="font-display text-coal text-xs">M</span>
            </div>
            <span className="font-display text-lg tracking-[0.22em] text-snow">
              MOCKMATE
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted tracking-widest text-center">
            BUILT FOR FRESHERS BREAKING INTO TECH
          </span>
        </div>
      </footer>
    </div>
  );
}
