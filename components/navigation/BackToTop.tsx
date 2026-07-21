"use client";

import { useEffect, useState } from "react";
import styles from "./back-to-top.module.css";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 480);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={styles.button}
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      data-visible={isVisible}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 18V6m0 0-5 5m5-5 5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
