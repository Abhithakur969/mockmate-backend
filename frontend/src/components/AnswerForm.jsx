import { useState } from "react";

const MIN = 30;

export default function AnswerForm({
  onSubmit,
  onSkip,
  onChangeRole,
  isLoading,
  error,
}) {
  const [answer, setAnswer] = useState("");
  const chars = answer.trim().length;
  const ready = chars >= MIN;
  const barPct = Math.min((chars / 400) * 100, 100);
  const barCol = chars < MIN ? "#F5A623" : chars > 350 ? "#EAB308" : "#22C55E";

  const go = () => {
    if (ready && !isLoading) onSubmit(answer);
  };
  const onKey = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") go();
  };

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] text-muted tracking-widest">
          YOUR ANSWER
        </span>
        <span
          className="font-mono text-[10px] tracking-wide transition-colors"
          style={{
            color:
              chars < MIN ? "#505050" : chars > 350 ? "#EAB308" : "#22C55E",
          }}
        >
          {chars}
          {chars < MIN ? ` / need ${MIN - chars} more` : ""}
        </span>
      </div>

      <div className="relative">
        <textarea
          rows={8}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={onKey}
          disabled={isLoading}
          placeholder={
            "Write as if you're in the real interview.\nNo Googling — think it through in your own words.\nGive examples where you can."
          }
          className="w-full bg-surface border border-border text-snow font-body text-sm
                     p-5 resize-none outline-none leading-relaxed transition-colors
                     placeholder:text-subtle focus:border-amber
                     disabled:opacity-40 disabled:cursor-not-allowed"
        />
        {/* char progress */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-surface-3">
          <div
            className="h-full transition-all duration-300 ease-out"
            style={{ width: `${barPct}%`, background: barCol }}
          />
        </div>
      </div>

      {error && (
        <div className="animate-fade-in mt-3 px-4 py-3 border border-red-dim bg-red-bg">
          <p className="font-mono text-[10px] text-red tracking-widest">
            ⚠ {error}
          </p>
        </div>
      )}

      {!error && (
        <p className="mt-2 font-mono text-[10px] text-subtle tracking-widest">
          CTRL + ENTER TO SUBMIT
        </p>
      )}

      <div className="flex gap-2 mt-5">
        <button
          onClick={go}
          disabled={!ready || isLoading}
          className="btn-primary flex-1 py-4 text-[10px]"
        >
          {isLoading ? (
            <>
              <span
                className="w-3 h-3 border-2 border-coal border-t-transparent
                                 rounded-full animate-spin"
              />{" "}
              GRADING...
            </>
          ) : (
            "SUBMIT ANSWER →"
          )}
        </button>
        <button
          onClick={onSkip}
          disabled={isLoading}
          className="btn-ghost px-5 text-[10px]"
        >
          SKIP
        </button>
        <button
          onClick={onChangeRole}
          disabled={isLoading}
          className="btn-ghost px-5 text-[10px]"
        >
          ROLE
        </button>
      </div>
    </div>
  );
}
