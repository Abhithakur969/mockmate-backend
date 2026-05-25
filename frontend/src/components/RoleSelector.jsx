import { ROLES } from "../data/questions";

export default function RoleSelector({ onSelect }) {
  return (
    <div className="animate-fade-up w-full">
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <span className="section-label">01 / Select Role</span>
          <span className="display-rule" />
        </div>
        <h2 className="font-display text-[clamp(3.2rem,10vw,6rem)] leading-none tracking-wider text-snow mb-3">
          WHO ARE YOU
          <br />
          <span className="text-amber">PREPARING FOR?</span>
        </h2>
        <p className="font-body text-sm text-muted font-light max-w-sm">
          Pick the role you're interviewing for. Each has 5 real questions,
          randomly served.
        </p>
      </div>

      <div className="space-y-2">
        {ROLES.map((role, i) => (
          <button
            key={role.id}
            onClick={() => onSelect(role.label)}
            className="group w-full flex items-center justify-between
                       border border-border bg-surface
                       hover:border-amber hover:bg-surface-2
                       px-6 py-5 transition-all duration-200 text-left
                       active:scale-[0.995]"
            style={{ animationDelay: `${i * 55}ms` }}
          >
            <div className="flex items-center gap-5">
              <span className="font-mono text-xl text-muted group-hover:text-amber transition-colors w-6 text-center select-none">
                {role.icon}
              </span>
              <div>
                <p className="font-body font-medium text-snow text-[0.95rem] group-hover:text-amber transition-colors">
                  {role.label}
                </p>
                <p className="font-mono text-[10px] text-muted tracking-wide mt-0.5">
                  {role.tech}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="hidden sm:block font-mono text-[10px] text-subtle tracking-widest">
                5 QS
              </span>
              <span
                className="text-border group-hover:text-amber font-mono
                               group-hover:translate-x-1 transition-all duration-200"
              >
                →
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
