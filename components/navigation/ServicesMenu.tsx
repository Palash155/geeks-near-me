"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./services-menu.module.css";

const primaryServices = [
  ["Computer & laptop", "Performance, startup and repair help", "device"],
  ["Wi-Fi & internet", "Coverage, dropouts and router setup", "wifi"],
  ["Printer support", "Setup, connection and troubleshooting", "printer"],
];

const setupServices = [
  ["Email & software", "Accounts, apps and everyday errors", "mail"],
  ["New device setup", "Configure a computer the right way", "setup"],
  ["Data transfer", "Move important files with care", "transfer"],
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m6 8 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ServiceIcon({ type }: { type: string }) {
  const paths: Record<string, string> = {
    device: "M5 5.5h10v7H5zM8 15h4M10 12.5V15",
    wifi: "M4.5 8.2a8 8 0 0 1 11 0M6.8 10.8a4.8 4.8 0 0 1 6.4 0M9.4 13.5a1 1 0 0 1 1.2 0",
    printer: "M6 8V4.8h8V8M6 13H4.8V8.5h10.4V13H14M7 11.5h6v3.7H7z",
    mail: "M4.5 6h11v8h-11zM5 6.8l5 4 5-4",
    setup: "M10 4.5v11M4.5 10h11M6.2 6.2l7.6 7.6M13.8 6.2l-7.6 7.6",
    transfer: "M4.5 7h10M11.5 4l3 3-3 3M15.5 13h-10M8.5 10l-3 3 3 3",
  };

  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d={paths[type]} fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = () => {
    cancelClose();
    setOpen(true);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 220);
  };

  useEffect(() => () => cancelClose(), []);

  return (
    <div
      className={styles.root}
      data-open={open}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          event.currentTarget.querySelector("button")?.focus();
        }
      }}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls="services-mega-menu"
        onClick={() => {
          cancelClose();
          setOpen((value) => !value);
        }}
      >
        Services <ChevronIcon />
      </button>

      <div id="services-mega-menu" className={styles.menu} data-open={open}>
        <div className={styles.menuHeading}>
          <div>
            <span>IT support services</span>
            <p>Choose a common problem or tell us what is happening.</p>
          </div>
          <a href="/services" onClick={() => setOpen(false)}>View all services <ArrowIcon /></a>
        </div>

        <div className={styles.menuBody}>
          <div className={styles.serviceColumn}>
            <p className={styles.columnLabel}>Fix & connect</p>
            {primaryServices.map(([title, copy, type]) => (
              <a href="#request" className={styles.serviceLink} data-appointment-service={title} key={title} onClick={() => setOpen(false)}>
                <span className={styles.icon}><ServiceIcon type={type} /></span>
                <span><strong>{title}</strong><small>{copy}</small></span>
              </a>
            ))}
          </div>

          <div className={styles.serviceColumn}>
            <p className={styles.columnLabel}>Set up & simplify</p>
            {setupServices.map(([title, copy, type]) => (
              <a href="#request" className={styles.serviceLink} data-appointment-service={title} key={title} onClick={() => setOpen(false)}>
                <span className={styles.icon}><ServiceIcon type={type} /></span>
                <span><strong>{title}</strong><small>{copy}</small></span>
              </a>
            ))}
          </div>

          <div className={styles.featured}>
            <div className={styles.featuredTop}><span>Recommended</span><i /></div>
            <div>
              <p>Not sure what service you need?</p>
              <h2>Describe the problem. We&apos;ll guide the next step.</h2>
              <small>Remote and on-site support requests across Sydney.</small>
            </div>
            <a href="#request" onClick={() => setOpen(false)}>Request an Appointment <ArrowIcon /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
