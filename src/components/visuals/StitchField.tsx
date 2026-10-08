const osPath =
  "M 318 248 C 318 168 382 112 462 112 C 542 112 598 168 598 236 C 598 286 558 318 492 324 C 568 332 628 382 628 456 C 628 532 558 588 462 588 C 366 588 306 532 306 456 C 306 396 354 352 432 344 C 368 336 318 298 318 248 Z";

export function StitchField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice">
        <rect width="1440" height="720" fill="#141414" />
        <g className="digitizing-grid" stroke="#e38a45" strokeWidth="0.6">
          {Array.from({ length: 25 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="720" />
          ))}
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 60} x2="1440" y2={i * 60} />
          ))}
        </g>
      </svg>

      <svg
        className="stitch-stage absolute left-1/2 top-1/2 h-[min(32rem,78%)] w-auto max-w-[min(32rem,78%)] -translate-x-1/2 -translate-y-1/2"
        viewBox="100 -20 734 740"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="hoop-glow" cx="50%" cy="45%" r="48%">
            <stop offset="0%" stopColor="#e38a45" stopOpacity="0.32" />
            <stop offset="55%" stopColor="#a04a16" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#141414" stopOpacity="0" />
          </radialGradient>
          <filter id="needle-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="sew-out">
          <circle className="hoop-glow" cx="467" cy="350" r="340" fill="url(#hoop-glow)" />
          <circle cx="467" cy="350" r="318" fill="none" stroke="#2a221c" strokeWidth="22" />
          <circle className="hoop-ring" cx="467" cy="350" r="304" fill="none" stroke="#c56a2e" strokeWidth="2.4" strokeDasharray="5 12" />
          <circle cx="467" cy="350" r="288" fill="none" stroke="#1c1c1c" strokeWidth="8" />

          <path className="os-merrow" d={osPath} fill="none" stroke="#d06a2c" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
          <path className="os-satin" d={osPath} fill="none" stroke="#1a1410" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
          <path className="os-highlight" d={osPath} fill="none" stroke="#f0c7a4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />

          <g className="needle" filter="url(#needle-glow)">
            <circle r="5" fill="#f3d2b3" />
            <path d="M0 -16 L3.5 7 L0 20 L-3.5 7 Z" fill="#e38a45" />
            <path d="M0 -16 L0 -30" stroke="#f6f1ea" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
}
