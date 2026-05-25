import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-14 border-b border-border bg-coal/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto h-full px-5 sm:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-7 h-7 bg-amber flex items-center justify-center shrink-0">
            <span className="font-display text-coal text-sm leading-none">
              M
            </span>
          </div>
          <span
            className="font-display text-[1.1rem] tracking-[0.22em] text-snow
                           group-hover:text-amber transition-colors duration-200"
          >
            MOCKMATE
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <span className="hidden sm:block font-mono text-[10px] text-muted tracking-widest">
            AI INTERVIEW COACH
          </span>
          {pathname === "/practice" ? (
            <Link
              to="/"
              className="font-mono text-[10px] text-muted hover:text-amber transition-colors tracking-widest"
            >
              ← HOME
            </Link>
          ) : (
            <Link
              to="/practice"
              className="btn-primary py-2.5 px-5 text-[10px]"
            >
              START →
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
