"use client";

import { List, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import styles from "./mobile-navigation.module.css";

const navigationItems = [
  ["Services", "#services"],
  ["Support options", "#support-options"],
  ["How it works", "#how-it-works"],
  ["FAQ", "#faq"],
];

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, []);

  return (
    <div className={styles.root} data-open={open} ref={rootRef}>
      <button
        className={styles.trigger}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-primary-navigation"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={21} weight="bold" /> : <List size={23} weight="bold" />}
      </button>
      <nav className={styles.panel} id="mobile-primary-navigation" aria-label="Mobile primary navigation">
        {navigationItems.map(([label, href], index) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>
            <span>0{index + 1}</span>{label}
          </a>
        ))}
      </nav>
    </div>
  );
}
