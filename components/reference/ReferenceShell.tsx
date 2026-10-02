import Link from "next/link";
import { Phone } from "@phosphor-icons/react/ssr";
import { Logo } from "@/components/brand/Logo";
import styles from "./reference-shell.module.css";

export function ReferenceHeader({ booking = false }: { booking?: boolean }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link className={styles.brand} href="/" aria-label="Geeks Near Me home">
          <Logo className={styles.brandLogo} inverse={false} />
          {booking && <span className={styles.brandTag}>Your Local On-Site IT Partner</span>}
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <div className={styles.actions}>
          {booking && (
            <div className={styles.phoneNote}>
              <Phone size={21} weight="fill" aria-hidden="true" />
              <span><strong>0403 171 348</strong><small>Call us today</small></span>
            </div>
          )}
          {booking ? (
            <button className={styles.helpButton} type="button">Get Help</button>
          ) : (
            <Link className={styles.helpButton} href="#services">Get Help</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export function ReferenceFooter() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <Logo className={styles.footerLogo} inverse={false} />
          <span>Your Local On-Site IT Partner</span>
        </div>
        <nav className={styles.footerNav} aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/#services">Services</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <span className={styles.community}>SUPPORTING A MORE CONNECTED COMMUNITY</span>
      </div>
      <div className={styles.footerBottom}>
        <span>© 2026 Geeks Near Me. All rights reserved.</span>
        <span>Simple <b>•</b> Professional <b>•</b> Personal</span>
      </div>
    </footer>
  );
}
