"use client";

import {
  ArrowsLeftRight,
  Briefcase,
  Check,
  Desktop,
  EnvelopeSimple,
  Laptop,
  Printer,
  ShieldCheck,
  WifiHigh,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { AnimatedArrow } from "@/components/site/AnimatedArrow";
import styles from "@/app/services/page.module.css";

const services = [
  {
    name: "Computer & Laptop Support",
    appointmentName: "Computer & laptop",
    short: "Computer & Laptop",
    copy: "Get help with slow performance, startup problems, crashes, updates and everyday computer errors.",
    points: ["Performance and startup issues", "Repeated software or system errors", "Updates and driver problems", "Home and small-business devices"],
    icon: Laptop,
  },
  {
    name: "Wi-Fi & Internet Help",
    appointmentName: "Wi-Fi & internet",
    short: "Wi-Fi & Internet",
    copy: "Improve weak coverage, connection dropouts, router setup and devices that will not stay online.",
    points: ["Weak or inconsistent coverage", "Router and network setup", "Devices refusing to connect", "Home and small-office Wi-Fi"],
    icon: WifiHigh,
  },
  {
    name: "Printer Setup",
    appointmentName: "Printer setup",
    short: "Printer Setup",
    copy: "Connect, configure and troubleshoot home or office printers, scanners and wireless printing.",
    points: ["New printer installation", "Wireless printing problems", "Scanner setup", "Device connection errors"],
    icon: Printer,
  },
  {
    name: "Email & Software Support",
    appointmentName: "Email & software",
    short: "Email & Software",
    copy: "Get practical help with email accounts, trusted software, application settings and common errors.",
    points: ["Email sending or syncing", "Trusted software installation", "Application settings", "Common update errors"],
    icon: EnvelopeSimple,
  },
  {
    name: "Virus & Malware Help",
    appointmentName: "Virus & malware",
    short: "Virus & Malware",
    copy: "Request help with suspicious behaviour, pop-ups, unwanted programs and unusual browser activity.",
    points: ["Unexpected pop-ups", "Browser redirects", "Unfamiliar programs", "Security concerns"],
    icon: ShieldCheck,
  },
  {
    name: "New Device Setup",
    appointmentName: "New device setup",
    short: "New Device Setup",
    copy: "Start using a new computer with essential settings, accounts, updates and compatible devices configured.",
    points: ["Initial computer setup", "Email and account connection", "Trusted everyday software", "Printer and accessory setup"],
    icon: Desktop,
  },
  {
    name: "Data Transfer Assistance",
    appointmentName: "Data transfer",
    short: "Data Transfer",
    copy: "Move important documents, photos and compatible settings to a new device with a clear plan.",
    points: ["Documents and photos", "Old-to-new computer moves", "Storage review", "Important-file checks"],
    icon: ArrowsLeftRight,
  },
  {
    name: "Small Business IT Support",
    appointmentName: "Small business IT",
    short: "Small Business IT",
    copy: "Reduce everyday technology disruption across computers, connectivity, printers, email and software.",
    points: ["Recurring computer issues", "Connectivity and printers", "Email and essential software", "Small-team setup improvements"],
    icon: Briefcase,
  },
];

export function ServicesExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = services[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section className={styles.finderSection} aria-labelledby="service-finder-title">
      <div className={styles.finder}>
        <div className={styles.featuredService}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              className={styles.featuredMotion}
              key={active.name}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: reduceMotion ? 0.08 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.featuredLabel}><span /> Featured service</div>
              <div className={styles.featuredHeading}>
                <span className={styles.featuredIcon}><ActiveIcon size={31} weight="regular" /></span>
                <div>
                  <h2 id="service-finder-title">{active.name}</h2>
                  <p>{active.copy}</p>
                </div>
              </div>
              <ul>
                {active.points.map((point) => <li key={point}><span><Check size={14} weight="bold" /></span>{point}</li>)}
              </ul>
              <button type="button" className={styles.featuredCta} data-appointment-trigger data-appointment-service={active.appointmentName}>
                Request this service <AnimatedArrow />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.selectorGrid} aria-label="Choose an IT support service">
          {services.map((service, index) => {
            const Icon = service.icon;
            const selected = activeIndex === index;
            return (
              <button
                type="button"
                className={styles.selectorButton}
                data-selected={selected}
                aria-pressed={selected}
                onClick={() => setActiveIndex(index)}
                key={service.name}
              >
                <span className={styles.selectorIcon}><Icon size={24} weight="regular" /></span>
                <span className={styles.selectorNumber}>{String(index + 1).padStart(2, "0")}</span>
                <strong>{service.short}</strong>
              </button>
            );
          })}
        </div>
      </div>
      <p className={styles.finderHint}>Choose the closest service to preview what is included. Not sure? Select <button type="button" data-appointment-trigger data-appointment-service="Something else">Something else</button> and describe the issue.</p>
    </section>
  );
}
