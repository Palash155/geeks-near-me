import { Logo } from "@/components/brand/Logo";
import Link from "next/link";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { ServicesMenu } from "@/components/navigation/ServicesMenu";
import { AnimatedArrow } from "./AnimatedArrow";
import styles from "./site-header.module.css";

export function SiteHeader({ currentPage = "home" }: { currentPage?: "home" | "services" }) {
  const mobileItems = [
    ["Services", currentPage === "services" ? "#services" : "/services"],
    ["Support options", "#support-options"],
    ["How it works", "#how-it-works"],
    ["FAQ", "#faq"],
  ];
  return (
    <>
      <div className={styles.announcement}>
        <p>
          On-site and remote technology support across Sydney
          <span aria-hidden="true">•</span>
          Available weekdays and weekends
        </p>
      </div>

      <header className={styles.header}>
        <div className={styles.navShell}>
          <Link href="/" aria-label="Geeks Near Me home">
            <Logo inverse={false} />
          </Link>
          <nav className={styles.nav} aria-label="Primary navigation">
            <ServicesMenu />
            <a href="#support-options">Support options</a>
            <a href="#how-it-works">How it works</a>
            <a href="#faq">FAQ</a>
          </nav>
          <MobileNavigation items={mobileItems} />
          <a
            className={styles.navCta}
            href="#request"
            aria-label="Request an Appointment"
            data-appointment-trigger
          >
            <span className={styles.navCtaLabel}>Request an Appointment</span>
            <AnimatedArrow />
          </a>
        </div>
      </header>
    </>
  );
}
