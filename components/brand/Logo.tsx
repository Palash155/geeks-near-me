import styles from "./logo.module.css";

type LogoProps = {
  compact?: boolean;
  inverse?: boolean;
};

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Geeks Near Me"
    >
      <defs>
        <linearGradient id="gnm-logo-gradient" x1="8" y1="8" x2="55" y2="56">
          <stop offset="0" stopColor="#087bc2" />
          <stop offset="1" stopColor="#35d07f" />
        </linearGradient>
      </defs>
      <rect
        x="7"
        y="9"
        width="50"
        height="37"
        rx="7"
        fill="none"
        stroke="url(#gnm-logo-gradient)"
        strokeWidth="5"
      />
      <path d="M24 55h16M32 46v9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M32 38V20m0 8-9-8m9 12 9-9"
        fill="none"
        stroke="url(#gnm-logo-gradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="18" r="4" fill="#35d07f" />
      <circle cx="21" cy="18" r="4" fill="#35d07f" />
      <circle cx="43" cy="21" r="4" fill="#35d07f" />
    </svg>
  );
}

export function Logo({ compact = false, inverse = true }: LogoProps) {
  return (
    <span className={`${styles.logo} ${inverse ? styles.inverse : ""}`}>
      <LogoMark className={styles.mark} />
      {!compact && (
        <span className={styles.wordmark} aria-hidden="true">
          <span>Geeks</span>
          <span>Near Me</span>
        </span>
      )}
    </span>
  );
}
