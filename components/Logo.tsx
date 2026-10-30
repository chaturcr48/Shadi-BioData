import Link from "next/link";

export function LogoMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#7a1f2b" />
      <g fill="none" stroke="#e9d48a" strokeWidth="2.4" strokeLinejoin="round">
        <path d="M32 44c-3-9-2-18 0-26 2 8 3 17 0 26z" fill="#e9d48a" />
        <path d="M32 44c-8-4-13-11-14-20 7 3 12 9 14 20z" fill="#d9b95a" />
        <path d="M32 44c8-4 13-11 14-20-7 3-12 9-14 20z" fill="#d9b95a" />
        <path d="M32 44c-11 0-19-5-24-13 9 0 18 4 24 13z" />
        <path d="M32 44c11 0 19-5 24-13-9 0-18 4-24 13z" />
      </g>
      <path d="M18 50c9 4 19 4 28 0" fill="none" stroke="#e9d48a" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-3" aria-label="Shadi BioData home">
      <LogoMark size={compact ? 34 : 40} />
      <span className="leading-none">
        <span className={`font-display block text-[1.45rem] font-bold tracking-tight ${light ? "text-ivory-50" : "text-maroon-700"}`}>
          Shadi <span className={light ? "text-gold-300" : "text-gold-600"}>BioData</span>
        </span>
        {!compact ? (
          <span className={`mt-1 block text-[10px] font-bold uppercase tracking-[0.28em] ${light ? "text-ivory-300/70" : "text-mute"}`}>
            Marriage biodata maker
          </span>
        ) : null}
      </span>
    </Link>
  );
}
