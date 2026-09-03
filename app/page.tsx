import type { Metadata } from "next";
import Link from "next/link";
import { FacebookLogo, HandPalm, Phone, ShieldCheck } from "@phosphor-icons/react/ssr";
import { Logo } from "@/components/brand/Logo";
import { CallbackProvider } from "@/components/callback/CallbackProvider";
import { AnimatedArrow } from "@/components/site/AnimatedArrow";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Premium On-Site Technology Support in Sydney | Geeks Near Me",
  description:
    "Professional, personal technology support at your site in Sydney. Get help with scary pop-ups, computers, printers, internet, new devices and data recovery.",
  openGraph: {
    title: "Premium Technology Support at Your Site | Geeks Near Me",
    description:
      "Choose the service that looks closest and request a call back from your local on-site IT partner in Sydney.",
    type: "website",
    locale: "en_AU",
  },
};

const services = [
  {
    name: "Scary Pop-Ups",
    value: "Scary Pop-Ups",
    question: "Got a scary pop-up or suspicious email?",
    advice: "Don’t click. Call a professional.",
    tone: "alert",
  },
  {
    name: "Computer Problems",
    value: "Computer Problems",
    question: "Computer frozen, slow or acting weird?",
    advice: "Restart. Still not working? Call a professional.",
    tone: "blue",
  },
  {
    name: "Printer Problems",
    value: "Printer Problems",
    question: "Printer not printing, scanning or connecting?",
    advice: "Check the power, paper and ink. Still not working? Call a professional.",
    tone: "green",
  },
  {
    name: "Internet Problems",
    value: "Internet Problems",
    question: "No internet, weak Wi-Fi or devices not connecting?",
    advice:
      "Check the Wi-Fi and NBN box lights, then restart your devices. Still not working? Call a professional.",
    tone: "blue",
  },
  {
    name: "New Device",
    value: "New Device",
    question: "Setting up a new computer, phone, tablet, printer, modem or Wi-Fi system?",
    advice: "Need help? Call a professional.",
    tone: "green",
  },
  {
    name: "Data Recovery & Transfer",
    value: "Data Recovery & Transfer",
    question: "Need to move or recover important photos, files or documents?",
    advice: "Don’t risk losing your data. Call a professional.",
    tone: "blue",
  },
] as const;

export default function Home() {
  return (
    <CallbackProvider>
      <div className={styles.page}>
        <a className="skip-link" href="#main-content">Skip to content</a>

        <header className={styles.header}>
          <div className={styles.headerShell}>
            <Link className={styles.logoLink} href="/" aria-label="Geeks Near Me home">
              <Logo inverse={false} />
            </Link>
            <div className={styles.headerActions}>
              <a className={styles.secondaryButton} href="tel:0403171348">
                <Phone size={20} weight="fill" /><span>Call Now</span>
              </a>
              <button className={styles.primaryButton} type="button" data-callback-trigger>
                <span className={styles.callbackLong}>Request a Call Back</span>
                <span className={styles.callbackShort} aria-hidden="true">Call Back</span>
                <AnimatedArrow />
              </button>
            </div>
          </div>
        </header>

        <main id="main-content" className={styles.main}>
          <section className={styles.safetyBanner} aria-label="Stop, look and ask safety reminder">
            <span className={styles.stopIcon} aria-hidden="true">
              <HandPalm size={38} weight="fill" />
            </span>
            <div className={styles.safetyCopy}>
              <strong>STOP — LOOK — ASK.</strong>
              <span>STILL UNSURE? CALL US.</span>
            </div>
            <a href="tel:0403171348"><Phone size={26} weight="fill" /> CALL US</a>
          </section>

          <section className={styles.heroIntro} aria-labelledby="hero-title">
            <p>YOUR LOCAL ON-SITE IT PARTNER.</p>
            <h1 id="hero-title">Premium Technology Support at Your Site.</h1>
            <h2>Professional <span aria-hidden="true">•</span> Personal</h2>
            <span>Delivered with patience, discretion and attention to detail.</span>
          </section>

          <section className={styles.servicesSection} aria-labelledby="services-title">
            <div className={styles.sectionIntro}>
              <p>HOW CAN WE HELP?</p>
              <h2 id="services-title">Choose the service that looks closest</h2>
              <span>You don’t need to diagnose the problem.</span>
            </div>

            <div className={styles.serviceGrid}>
              {services.map((service) => (
                <button
                  className={styles.serviceCard}
                  data-tone={service.tone}
                  type="button"
                  data-callback-trigger
                  data-callback-service={service.value}
                  aria-label={`Request a call back for ${service.name}`}
                  key={service.value}
                >
                  <span className={styles.serviceCardHeader}>{service.name}</span>
                  <span className={styles.serviceCardBody}>
                    <span className={styles.serviceQuestion}>{service.question}</span>
                    <strong>{service.advice}</strong>
                    <span className={styles.serviceAction}>
                      Call us or request a call back. <AnimatedArrow />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.callPanel} aria-labelledby="call-panel-title">
            <p>WE’RE HERE TO HELP.</p>
            <h2 id="call-panel-title">Not sure what’s going on?</h2>
            <h3>No stress. Call us.</h3>
            <a className={styles.phoneNumber} href="tel:0403171348">0403 171 348</a>
            <div className={styles.callActions}>
              <a className={styles.secondaryButton} href="tel:0403171348">
                <Phone size={20} weight="fill" /> Call Now
              </a>
              <button className={styles.primaryButton} type="button" data-callback-trigger>
                Request a Call Back <AnimatedArrow />
              </button>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerMain}>
            <div className={styles.footerBrand}>
              <span className={styles.footerLogo}><Logo inverse={false} /></span>
              <p>Friendly computer and technology help for Sydney homes, explained in plain English.</p>
              <a href="https://www.facebook.com/geeksnearme" target="_blank" rel="noreferrer">
                <FacebookLogo size={20} weight="fill" /> Follow Geeks Near Me on Facebook
              </a>
            </div>
            <div className={styles.footerContact}>
              <h3>Contact</h3>
              <a href="tel:0403171348"><Phone size={19} weight="fill" /> 0403 171 348</a>
              <p>Sydney, NSW</p>
              <p>Weekday and weekend requests</p>
            </div>
            <div className={styles.footerLegal}>
              <h3>Information</h3>
              <a href="#privacy-policy">Privacy Policy</a>
              <a href="#terms-and-conditions">Terms and Conditions</a>
              <a href="#cancellation-policy">Cancellation Policy</a>
            </div>
          </div>

          <div className={styles.policySummaries} aria-label="Policy summaries">
            <details id="privacy-policy">
              <summary>Privacy Policy</summary>
              <p>We use callback details to respond to your support request. Client-approved policy wording will replace this summary before launch.</p>
            </details>
            <details id="terms-and-conditions">
              <summary>Terms and Conditions</summary>
              <p>Sending the form requests a callback. It does not confirm an appointment or authorise work.</p>
            </details>
            <details id="cancellation-policy">
              <summary>Cancellation Policy</summary>
              <p>Please call us as soon as possible if you need to change or cancel an agreed visit.</p>
            </details>
          </div>

          <div className={styles.footerBottom}>
            <span>© {new Date().getFullYear()} Geeks Near Me. All rights reserved.</span>
            <span className={styles.footerAssurance}>
              <ShieldCheck size={17} weight="fill" /> Your Local On-Site IT Partner.
            </span>
          </div>
        </footer>

        <a className={styles.mobileCallBar} href="tel:0403171348">
          <Phone size={22} weight="fill" /> Call Now: 0403 171 348
        </a>
      </div>
    </CallbackProvider>
  );
}
