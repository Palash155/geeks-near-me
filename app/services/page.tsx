import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowsLeftRight,
  Briefcase,
  CalendarCheck,
  CheckCircle,
  ClipboardText,
  Desktop,
  DeviceMobile,
  EnvelopeSimple,
  HouseLine,
  Laptop,
  Minus,
  Plus,
  Printer,
  ShieldCheck,
  UserCircleCheck,
  WifiHigh,
} from "@phosphor-icons/react/ssr";
import { AppointmentProvider } from "@/components/appointment/AppointmentProvider";
import { Reveal } from "@/components/motion/Reveal";
import { BackToTop } from "@/components/navigation/BackToTop";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { AnimatedArrow } from "@/components/site/AnimatedArrow";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "IT Support Services Sydney | Geeks Near Me",
  description: "Explore practical IT support services for Sydney homes, home offices and small businesses, including computers, Wi-Fi, printers and software. Request help.",
  openGraph: {
    title: "Practical IT Support Services Across Sydney | Geeks Near Me",
    description: "Find clear, practical help for computers, Wi-Fi, printers, email, software, new devices, data transfer and everyday small-business technology.",
    type: "website",
    locale: "en_AU",
  },
};

const serviceDirectory = [
  { name: "Computer & Laptop Support", appointment: "Computer & laptop", icon: Laptop, copy: "Get help with slow performance, startup problems, crashes, updates and everyday computer errors." },
  { name: "Wi-Fi & Internet Help", appointment: "Wi-Fi & internet", icon: WifiHigh, copy: "Improve weak coverage, connection dropouts, router setup and devices that will not stay online." },
  { name: "Printer Setup", appointment: "Printer setup", icon: Printer, copy: "Connect, configure and troubleshoot home or office printers, scanners and wireless printing." },
  { name: "Email & Software Support", appointment: "Email & software", icon: EnvelopeSimple, copy: "Get practical help with email accounts, trusted software, application settings and common errors." },
  { name: "Virus & Malware Help", appointment: "Virus & malware", icon: ShieldCheck, copy: "Request help with suspicious behaviour, pop-ups, unwanted programs and unusual browser activity." },
  { name: "New Device Setup", appointment: "New device setup", icon: Desktop, copy: "Start using a new computer with essential settings, accounts, updates and compatible devices configured." },
  { name: "Data Transfer Assistance", appointment: "Data transfer", icon: ArrowsLeftRight, copy: "Move important documents, photos and compatible settings to a new device with a clear plan." },
  { name: "Small Business IT Support", appointment: "Small business IT", icon: Briefcase, copy: "Reduce everyday technology disruption across computers, connectivity, printers, email and software." },
];

const processSteps = [
  { title: "Choose a service", copy: "Select the closest service or choose Something else if you are unsure.", icon: ClipboardText },
  { title: "Add your details", copy: "Describe the issue and tell us whether you prefer remote or on-site help.", icon: UserCircleCheck },
  { title: "Select a preferred time", copy: "Choose a date and time window that suits you. This is still a request.", icon: CalendarCheck },
  { title: "We review & confirm", copy: "Our team reviews the request and contacts you with confirmation or another option.", icon: CheckCircle },
];

const faqs = [
  ["Which IT service should I choose?", "Choose the service that seems closest to the problem. If the cause is unclear or several devices are affected, choose Something else and describe what is happening."],
  ["Can I request both remote and on-site IT support?", "The form asks you to choose a preferred support type for the current request. Our team reviews the issue and may recommend a different approach when it is more practical."],
  ["Do you support both homes and small businesses?", "Yes. Appointment requests are accepted from Sydney households, home offices and small businesses for the services listed on this page."],
  ["Can you help if several technology problems are connected?", "Yes. Describe the devices and issues involved in one request. We can review whether they are likely to be handled together or should be discussed separately."],
  ["Do I need to know the make and model of my device?", "Not always. Device type and visible model information can be useful, but you do not need to delay your request if those details are difficult to find."],
  ["Is the preferred appointment time guaranteed?", "No. The selected date and time are preferences. The appointment is confirmed only after Geeks Near Me reviews the request and contacts you."],
  ["Can I upload a screenshot or photo?", "Yes. A relevant photo, screenshot or supported document can help explain the problem. Never upload passwords, banking details or security codes."],
  ["How do I know whether an on-site visit is available?", "Add your Sydney suburb and postcode to the appointment request. Availability is reviewed using the location, service type and scheduling requirements."],
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "IT support services in Sydney",
  numberOfItems: serviceDirectory.length,
  itemListElement: serviceDirectory.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.name,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function ServicesPage() {
  return (
    <AppointmentProvider>
      <div className={styles.page}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader currentPage="services" />

        <main id="main-content">
          <section className={styles.hero} aria-labelledby="services-hero-title">
            <Image className={styles.heroImage} src="/images/services/services-hero-sydney.png" alt="Geeks Near Me technician helping a Sydney customer with a laptop, Wi-Fi router and printer" fill priority sizes="100vw" />
            <div className={styles.heroShade} />
            <div className={styles.heroInner}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>IT Support Services</span></nav>
              <p className={styles.eyebrow}><CheckCircle size={16} weight="fill" /> IT support services Sydney</p>
              <h1 id="services-hero-title">Practical IT support services for Sydney homes and small businesses.</h1>
              <p className={styles.heroLead}>From slow computers and unreliable Wi-Fi to printer setup, software and new devices, get clear support through one practical Sydney service.</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="#request" data-appointment-trigger>Request an Appointment <AnimatedArrow /></a>
                <a className={styles.secondaryButton} href="tel:0403171348">Call 0403 171 348</a>
              </div>
              <div className={styles.heroNotes}><span><CheckCircle size={16} weight="fill" /> On-site or remote support</span><span><CheckCircle size={16} weight="fill" /> Reviewed and confirmed by our team</span></div>
            </div>
          </section>

          <ServicesExplorer />

          <section id="services" className={styles.directory} aria-labelledby="directory-title">
            <div className={styles.shell}>
              <Reveal className={styles.directoryIntro}>
                <p className={styles.kicker}>Our IT support services</p>
                <h2 id="directory-title">Support for every part of your tech.</h2>
                <p>Explore practical IT support services for Sydney homes, home offices and small businesses.</p>
                <a href="#request" data-appointment-trigger>Request an Appointment <AnimatedArrow /></a>
              </Reveal>
              <div className={styles.directoryList}>
                {serviceDirectory.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <Reveal className={styles.directoryItem} delay={(index % 2) * 0.05} key={service.name}>
                      <span className={styles.directoryNumber}>{String(index + 1).padStart(2, "0")}</span>
                      <span className={styles.directoryIcon}><Icon size={25} weight="regular" /></span>
                      <div><h3>{service.name}</h3><p>{service.copy}</p></div>
                      <a href="#request" data-appointment-service={service.appointment} aria-label={`Request ${service.name}`}><AnimatedArrow /></a>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="support-options" className={styles.support} aria-labelledby="support-title">
            <div className={styles.supportShell}>
              <Reveal className={styles.supportImageWrap}>
                <Image className={styles.supportImage} src="/images/services/sydney-harbour-support.png" alt="Sydney Harbour Bridge and city skyline in daylight" fill sizes="(max-width: 900px) 100vw, 48vw" />
              </Reveal>
              <Reveal className={styles.supportCopy} delay={0.06}>
                <p className={styles.kicker}>Support that fits your day</p>
                <h2 id="support-title">On-site or remote support. You choose.</h2>
                <p>Choose your preferred support type when submitting the request. We will review the issue, location and practical requirements before confirming the appointment.</p>
                <div className={styles.supportModes}>
                  <div>
                    <span><HouseLine size={24} weight="regular" /></span>
                    <h3>On-site support</h3>
                    <p>Hands-on help at your Sydney home or workplace for devices, Wi-Fi, printers and connected setups.</p>
                    <a href="#request" data-appointment-trigger>Request on-site help <AnimatedArrow /></a>
                  </div>
                  <div>
                    <span><DeviceMobile size={24} weight="regular" /></span>
                    <h3>Remote support</h3>
                    <p>Secure assistance for suitable email, software, settings and general troubleshooting issues.</p>
                    <a href="#request" data-appointment-trigger>Request remote help <AnimatedArrow /></a>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section id="how-it-works" className={styles.process} aria-labelledby="process-title">
            <div className={styles.shell}>
              <Reveal className={styles.centerIntro}>
                <p className={styles.kicker}>How it works</p>
                <h2 id="process-title">A clear path to a confirmed appointment.</h2>
                <p>Your preferred date and time are reviewed by our team before anything is confirmed.</p>
              </Reveal>
              <div className={styles.processGrid}>
                {processSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <Reveal className={styles.processStep} delay={index * 0.06} key={step.title}>
                      <span className={styles.stepNumber}>{index + 1}</span>
                      <span className={styles.stepIcon}><Icon size={26} weight="regular" /></span>
                      <h3>{step.title}</h3>
                      <p>{step.copy}</p>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="faq" className={styles.faq} aria-labelledby="faq-title">
            <div className={styles.faqShell}>
              <Reveal className={styles.faqIntro}>
                <p className={styles.kicker}>Common questions</p>
                <h2 id="faq-title">Quick answers before you request support.</h2>
                <p>You do not need to diagnose the issue yourself. Start with the closest service and tell us what you can see.</p>
              </Reveal>
              <div className={styles.faqList}>
                {faqs.map(([question, answer]) => (
                  <details key={question}>
                    <summary><span>{question}</span><span className={styles.faqIcons}><Plus className={styles.faqPlus} size={19} /><Minus className={styles.faqMinus} size={19} /></span></summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <span id="request" className={styles.requestAnchor} aria-hidden="true" />
        </main>

        <SiteFooter />
        <BackToTop />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </div>
    </AppointmentProvider>
  );
}
