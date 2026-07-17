// Nested curved profiles with square-tube cross-sections, drawn after the
// client's reference photo of stretch-formed extrusions.
export default function ArcMotif({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 420 420"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M61.3 269A150 150 0 0 1 157.7 384" strokeWidth="18" opacity="0.55" />
      <path d="M35.3 229.8A182 182 0 0 1 189.2 378.4" strokeWidth="2" opacity="0.3" />
      <path d="M112.5 232.5A205 205 0 0 1 211.9 374.4" strokeWidth="7" opacity="0.45" />
      <path d="M26.7 170.6A240 240 0 0 1 246.4 368.3" strokeWidth="2" opacity="0.3" />
      <path d="M80.4 147.3A272 272 0 0 1 276.1 353.4" strokeWidth="12" opacity="0.5" />
      <path d="M20.8 100.2A310 310 0 0 1 313.2 345.6" strokeWidth="2" opacity="0.25" />
      <path d="M138.1 92.9A342 342 0 0 1 341.9 327.3" strokeWidth="5" opacity="0.4" />
      <path d="M49.9 30.1A382 382 0 0 1 377.2 304.7" strokeWidth="2" opacity="0.25" />
      <rect x="39.1" y="255.2" width="18" height="18" strokeWidth="2" opacity="0.55" transform="rotate(20 48.1 264.2)" />
      <rect x="61.8" y="137.9" width="12" height="12" strokeWidth="2" opacity="0.5" transform="rotate(15 67.8 143.9)" />
      <rect x="124.8" y="85.2" width="8" height="8" strokeWidth="1.5" opacity="0.45" transform="rotate(22 128.8 89.2)" />
    </svg>
  );
}
