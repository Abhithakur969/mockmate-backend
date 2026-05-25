import { useState } from "react";

export default function QuestionCard({ question, role, questionNum }) {
  const [hintOpen, setHintOpen] = useState(false);

  return (
    <div className="animate-fade-up mb-6">
      <div className="flex items-center gap-4 mb-5">
        <span className="section-label">02 / Answer</span>
        <span className="display-rule" />
        <span className="font-mono text-[10px] text-muted border border-border px-3 py-1 shrink-0 tracking-wide">
          {role}
        </span>
      </div>

      <div className="relative border border-border bg-surface p-7">
        {/* amber corner */}
        <span className="absolute top-0 left-0 w-10 h-[2px] bg-amber" />
        <span className="absolute top-0 left-0 w-[2px] h-10 bg-amber" />

        <p className="section-label mb-4">
          Q{String(questionNum).padStart(2, "0")}
        </p>

        <p className="font-body text-snow text-[1.05rem] md:text-lg leading-relaxed font-light">
          {question.question}
        </p>

        <div className="mt-6 pt-5 border-t border-border">
          <button
            onClick={() => setHintOpen((v) => !v)}
            className="flex items-center gap-2 font-mono text-[10px] text-muted
                       hover:text-amber transition-colors tracking-widest"
          >
            <span
              className="transition-transform duration-200 inline-block"
              style={{ transform: hintOpen ? "rotate(90deg)" : "none" }}
            >
              ▶
            </span>
            {hintOpen ? "HIDE HINT" : "SHOW HINT"}
          </button>
          {hintOpen && (
            <p
              className="animate-fade-in mt-3 pl-4 border-l-2 border-amber
                          font-body text-sm text-light italic leading-relaxed"
            >
              {question.hint}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
