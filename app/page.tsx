import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Desktop, DeviceMobile, HardDrives, Headset, Phone, Printer, ShieldWarning, WifiHigh } from "@phosphor-icons/react/ssr";
import { ReferenceFooter, ReferenceHeader } from "@/components/reference/ReferenceShell";
import { referenceServices, type ReferenceService } from "@/components/reference/services";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Premium On-Site Technology Support in Sydney | Geeks Near Me",
  description: "Professional, personal on-site technology support in Sydney. Find help for pop-ups, printers, new devices, Wi-Fi, computers and data transfer.",
};

function ServiceIcon({ slug }: { slug: ReferenceService["slug"] }) {
  const props = { size: 27, weight: "regular" as const, "aria-hidden": true as const };
  switch (slug) {
    case "scary-pop-ups": return <ShieldWarning {...props} />;
    case "printer-issues": return <Printer {...props} />;
    case "new-device-setup": return <DeviceMobile {...props} />;
    case "internet-wifi": return <WifiHigh {...props} />;
    case "computer-problems": return <Desktop {...props} />;
    case "data-recovery-transfer": return <HardDrives {...props} />;
  }
}

function ServiceCard({ service }: { service: ReferenceService }) {
  return (
    <Link className={styles.serviceCard} data-tone={service.tone} href={`/book-appointment?service=${service.slug}`} aria-label={`Get help with ${service.title}`}>
      <div className={styles.serviceCopy}>
        <span className={styles.serviceIcon}><ServiceIcon slug={service.slug} /></span>
        <h3>{service.title}</h3>
        <div className={styles.serviceDescription}>
          {service.description.map((line) => <p key={line}>{line}</p>)}
          {service.detail.map((line) => <p key={line}>{line}</p>)}
        </div>
        <span className={styles.cardArrow} aria-hidden="true"><ArrowRight size={22} weight="bold" /></span>
      </div>
      <div className={styles.serviceImage}><Image src={service.image} alt="" fill sizes="(max-width: 600px) 38vw, (max-width: 1100px) 23vw, 250px" /></div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#services">Skip to services</a>
      <ReferenceHeader />
      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <Image className={styles.heroImage} src="/images/redesign/hero-support.png" alt="Friendly technician helping an older customer use a laptop at home" fill priority sizes="100vw" />
          <div className={styles.heroShade} />
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Premium Technology Support at Your Site</p>
            <h1 id="hero-title">Your Local<br /><span>On-Site</span> IT Partner</h1>
            <p className={styles.heroPromise}>Professional <span>–</span> Personal</p>
            <p className={styles.heroDescription}>Delivered with patience, discretion and attention to detail.</p>
            <Link className={styles.primaryButton} href="#services">Get Help Today <ArrowRight size={20} weight="bold" aria-hidden="true" /></Link>
          </div>
        </section>

        <section className={styles.services} id="services" aria-labelledby="services-title">
          <div className={styles.sectionIntro}>
            <p>HOW CAN WE HELP</p>
            <h2 id="services-title"><em>Choose the service</em> that look closest.</h2>
            <span>You don’t need to diagnose the problem.</span>
          </div>
          <div className={styles.servicesGrid}>{referenceServices.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
        </section>

        <section className={styles.unsure} id="about" aria-labelledby="unsure-title">
          <div className={styles.unsureCopy}>
            <h2 id="unsure-title">Not sure what <em>service you need?</em></h2>
            <p>Just tell us what&apos;s happening.</p>
            <p>We&apos;ll take it from there.</p>
          </div>
          <div className={styles.unsureAction}>
            <span>Call us now</span><strong>0403 171 348</strong>
            <div className={styles.unsureButtons}>
              <a className={styles.outlineButton} href="tel:0403171348"><Phone size={18} aria-hidden="true" /> Call Now</a>
              <Link className={styles.greenButton} href="/book-appointment">Request a Call Back</Link>
            </div>
          </div>
          <span className={styles.handwriting}>Simple Friendly Local Help</span>
        </section>

        <section className={styles.helpBanner} aria-labelledby="help-title">
          <Image src="/images/redesign/help-banner.png" alt="" fill sizes="100vw" />
          <div className={styles.helpShade} />
          <div className={styles.helpContent}>
            <p>NOT SURE WHAT TO DO?</p>
            <h2 id="help-title">We&apos;re here to help.</h2>
            <h3>Simple. Professional. Personal.</h3>
            <span>Talk to a local IT expert and get clear advice.</span>
            <Link className={styles.primaryButton} href="#services">Get Help Today <ArrowRight size={20} weight="bold" aria-hidden="true" /></Link>
          </div>
          <span className={styles.bannerHandwriting}>Local Help Real People</span>
        </section>

        <section className={styles.benefits} aria-label="Why choose Geeks Near Me">
          <div><Headset size={31} weight="light" aria-hidden="true" /><h3>On-Site Support</h3><p>We come to you</p></div>
          <div><Phone size={31} weight="light" aria-hidden="true" /><h3>Elderly Friendly</h3><p>Patient &amp; caring</p></div>
          <div><WifiHigh size={31} weight="light" aria-hidden="true" /><h3>Clear Explanations</h3><p>In plain English</p></div>
          <div><ShieldWarning size={31} weight="light" aria-hidden="true" /><h3>Reliable Service</h3><p>When you need it</p></div>
        </section>
      </main>
      <ReferenceFooter />
    </>
  );
}
