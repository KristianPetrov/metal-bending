export default function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 104 92"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="brand-mark-depth"
        d="M8 84V40a16 16 0 0 1 32 0v44M40 84V40a16 16 0 0 1 32 0v44"
        strokeWidth="11"
        transform="translate(7 5)"
      />
      <path
        className="brand-mark-face"
        d="M8 84V40a16 16 0 0 1 32 0v44M40 84V40a16 16 0 0 1 32 0v44"
        strokeWidth="11"
      />
    </svg>
  );
}
