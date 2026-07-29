import { Logo } from "@/components/brand/Logo";
import { Clock, FacebookLogo, MapPin, Phone, ShieldCheck } from "@phosphor-icons/react/ssr";
import { AnimatedArrow } from "./AnimatedArrow";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerCta}>
        <div>
          <p>Local IT support across Sydney</p>
          <h2>Need practical help with your technology?</h2>
        </div>
        <a href="#request" data-appointment-trigger>
          Request an Appointment <AnimatedArrow />
        </a>
      </div>

      <div className={styles.footerMain}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}><Logo inverse={false} /></span>
          <p>Friendly on-site and remote support for Sydney homes, home offices and small businesses—explained in plain English.</p>
          <a className={styles.socialLink} href="https://www.facebook.com/geeksnearme" target="_blank" rel="noreferrer">
            <FacebookLogo size={20} weight="fill" /> Follow Geeks Near Me on Facebook
          </a>
        </div>

        <div className={styles.footerColumn}>
          <h3>Explore</h3>
          <a href="/services">IT support services</a>
          <a href="/services#support-options">Support options</a>
          <a href="/services#how-it-works">How it works</a>
          <a href="/services#faq">Common questions</a>
        </div>

        <div className={styles.footerColumn}>
          <h3>Popular support</h3>
          <a href="#request" data-appointment-service="Computer & laptop">Computer & laptop</a>
          <a href="#request" data-appointment-service="Wi-Fi & internet">Wi-Fi & internet</a>
          <a href="#request" data-appointment-service="Printer setup">Printer setup</a>
          <a href="#request" data-appointment-service="Small business IT">Small business IT</a>
        </div>

        <div className={`${styles.footerColumn} ${styles.footerContact}`}>
          <h3>Contact & availability</h3>
          <a href="tel:0403171348"><Phone size={18} weight="fill" /><span><small>Call us</small>0403 171 348</span></a>
          <p><MapPin size={18} weight="fill" /><span><small>Service area</small>Sydney, NSW</span></p>
          <p><Clock size={18} weight="fill" /><span><small>Request times</small>Weekdays & weekends</span></p>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} Geeks Near Me. All rights reserved.</span>
        <span className={styles.footerAssurance}><ShieldCheck size={16} weight="fill" /> Appointment requests are reviewed before confirmation.</span>
        <a href="https://www.facebook.com/geeksnearme" target="_blank" rel="noreferrer">Facebook</a>
      </div>
    </footer>
  );
}
