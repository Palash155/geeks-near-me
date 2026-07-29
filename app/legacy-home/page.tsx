import { Reveal } from "@/components/motion/Reveal";
import { BackToTop } from "@/components/navigation/BackToTop";
import { AppointmentProvider } from "@/components/appointment/AppointmentProvider";
import { HeroSlider } from "@/components/marketing/HeroSlider";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ArrowUpRight, ChatCircleText, Laptop, Printer, WifiHigh } from "@phosphor-icons/react/ssr";
import styles from "./page.module.css";

const trustItems = [
  ["On-Site Support", "Help at your Sydney home or workplace."],
  ["Remote Assistance", "Get help without waiting for an on-site visit."],
  ["Plain-English Guidance", "Clear explanations without unnecessary jargon."],
  ["Weekday & Weekend Requests", "Choose a preferred time between 9:00 am and 5:00 pm."],
];

const services = [
  ["01", "Computer and Laptop Support", "Slow performance, startup problems, crashes, updates and general troubleshooting.", "computer"],
  ["02", "Wi-Fi and Internet Help", "Weak Wi-Fi, connection dropouts, router setup and devices that will not connect.", "wifi"],
  ["03", "Printer Setup", "Connect, configure and troubleshoot home or office printers and wireless printing.", "printer"],
  ["04", "Email and Software", "Email setup, trusted software installation, application errors and essential settings.", "mail"],
  ["05", "Virus and Malware Help", "Investigate suspicious behaviour, unwanted programs, browser pop-ups and security concerns.", "shield"],
  ["06", "New Device Setup", "Set up a new computer, connect devices and configure the software you use every day.", "setup"],
  ["07", "Data Transfer Assistance", "Move important documents, photos and files between compatible devices with care.", "transfer"],
  ["08", "Small Business IT Support", "Practical help for the computers, connectivity and tools used by small Sydney teams.", "business"],
];

const supportModes = [
  {
    label: "Remote IT Support",
    title: "Get help from wherever you are.",
    copy: "Suitable for many software, email, settings and general troubleshooting issues that can be reviewed securely without an on-site visit.",
    items: ["Email and account setup", "Software installation", "Application errors", "General computer guidance"],
  },
  {
    label: "On-Site IT Support Sydney",
    title: "Hands-on help at your location.",
    copy: "A practical option for physical devices, networking equipment, printers, home setups and problems that cannot be handled remotely.",
    items: ["Wi-Fi and router setup", "Printer installation", "New computer setup", "Device connection problems"],
  },
];

const steps = [
  ["01", "Tell us what is happening", "Choose the service, describe the problem and select remote or on-site support."],
  ["02", "Select a preferred time", "Choose a preferred date and a time window between 9:00 am and 5:00 pm."],
  ["03", "We review your request", "Our team checks the issue, location and scheduling requirements before confirming."],
  ["04", "Receive confirmation", "We send the confirmed appointment details or suggest another suitable time."],
];

const faqs = [
  ["Do you provide IT support throughout Sydney?", "Geeks Near Me accepts appointment requests from customers in Sydney. On-site availability is reviewed using the submitted suburb, postcode, job type and schedule."],
  ["Can you help remotely?", "Yes. Some email, software, settings and troubleshooting problems may be suitable for remote support. Submit the issue and our team can review the appropriate support option."],
  ["Is my requested time immediately confirmed?", "No. The date and time you select are preferences. The appointment becomes confirmed only after our team reviews the request and sends confirmation."],
  ["What appointment times can I request?", "You can select a preferred appointment between 9:00 am and 5:00 pm. Weekday and weekend requests are accepted."],
  ["Do I need to know what is wrong with the computer?", "No. Describe what you can see, when the problem started and anything you have already tried."],
  ["Do you support small businesses?", "Yes. Small businesses can request help with computers, Wi-Fi, printers, email, software and other everyday IT issues."],
];

const quickServices = [
  { label: "Computer & laptop", copy: "Performance, setup and repairs", icon: Laptop },
  { label: "Wi-Fi & internet", copy: "Coverage, routers and dropouts", icon: WifiHigh },
  { label: "Printer setup", copy: "Installation and connection help", icon: Printer },
  { label: "Something else", copy: "Tell us what is happening", icon: ChatCircleText },
];

function ArrowIcon() {
  return (
    <svg className={styles.arrowIcon} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4.5 10.5 3.3 3.2 7.7-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ServiceCardIcon({ type }: { type: string }) {
  const paths: Record<string, string> = {
    computer: "M4 5.5h12v8H4zM7.5 16h5M10 13.5V16",
    wifi: "M3.5 8.2a9.4 9.4 0 0 1 13 0M6 11a5.8 5.8 0 0 1 8 0M8.6 13.7a2 2 0 0 1 2.8 0M10 16h.01",
    printer: "M6 7V4h8v3M6 14H4V8h12v6h-2M6 11h8v5H6zM13.5 9.5h.01",
    mail: "M3.5 5.5h13v9h-13zM4.5 6.5 10 11l5.5-4.5",
    shield: "M10 3.5 16 6v4.2c0 3.5-2.3 5.7-6 6.8-3.7-1.1-6-3.3-6-6.8V6zM7.5 10.2l1.7 1.7 3.5-3.7",
    setup: "M5 5.5h10v7H5zM8 15.5h4M10 12.5v3M15.5 3.5v3M14 5h3",
    transfer: "M4 7h11M12 4l3 3-3 3M16 13H5M8 10l-3 3 3 3",
    business: "M4 7h12v9H4zM7 7V4h6v3M4 11h12M9 11v2h2v-2",
  };

  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d={paths[type]} fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <AppointmentProvider>
    <div className={styles.page}>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <SiteHeader />

      <main id="main-content">
        <HeroSlider />

        <section className={styles.trustStrip} aria-label="Why customers choose our support">
          <div className={styles.trustGrid}>
            {trustItems.map(([title, copy], index) => (
              <div className={styles.trustItem} key={title}>
                <span className={styles.trustNumber}>0{index + 1}</span>
                <div><h2>{title}</h2><p>{copy}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className={styles.services} aria-labelledby="services-title">
          <div className={styles.sectionShell}>
            <Reveal className={styles.sectionIntro}>
              <p className={styles.kicker}>Our services</p>
              <h2 id="services-title">Practical IT support for Sydney homes and businesses.</h2>
              <p>From computers and Wi-Fi to printers, software and new device setup, get clear and reliable support through one practical local service.</p>
            </Reveal>
            <div className={styles.serviceGrid}>
              {services.map(([number, title, copy, icon], index) => (
                <Reveal delay={(index % 4) * 0.05} key={number}>
                  <a className={styles.serviceCard} href="#request" data-appointment-service={title} aria-label={`Request help with ${title}`}>
                  <div className={styles.serviceTop}>
                    <span className={styles.serviceIcon}><ServiceCardIcon type={icon} /></span>
                    <span className={styles.serviceNumber}>{number}</span>
                  </div>
                  <h3>{title}</h3><p>{copy}</p>
                  <span className={styles.serviceCardLink}>Request help <ArrowIcon /></span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="support-options" className={styles.supportOptions} aria-labelledby="support-title">
          <div className={styles.sectionShell}>
            <Reveal className={styles.centerIntro}>
              <p className={styles.kicker}>Flexible support</p>
              <h2 id="support-title">Choose the type of support that suits the problem.</h2>
              <p>Not sure which option you need? Describe the problem and our team can review the most suitable support type.</p>
            </Reveal>
            <div className={styles.modeGrid}>
              {supportModes.map((mode, index) => (
                <Reveal className={styles.modeCard} delay={index * 0.08} key={mode.label}>
                  <div className={styles.modeBadge}>{index === 0 ? "Remote" : "On-site"}</div>
                  <p className={styles.modeLabel}>{mode.label}</p>
                  <h3>{mode.title}</h3><p>{mode.copy}</p>
                  <ul>{mode.items.map((item) => <li key={item}><CheckIcon /> {item}</li>)}</ul>
                  <a href="#request">Request this support <ArrowIcon /></a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className={styles.process} aria-labelledby="process-title">
          <div className={styles.sectionShell}>
            <Reveal className={styles.processIntro}>
              <p className={styles.kicker}>How it works</p>
              <h2 id="process-title">A simpler way to request IT help.</h2>
              <p>Submitting the form does not instantly confirm an appointment. Your request is confirmed only after you hear from Geeks Near Me.</p>
            </Reveal>
            <div className={styles.steps}>
              {steps.map(([number, title, copy], index) => (
                <Reveal className={styles.step} delay={index * 0.07} key={number}>
                  <span>{number}</span><h3>{title}</h3><p>{copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className={styles.faq} aria-labelledby="faq-title">
          <div className={styles.faqShell}>
            <Reveal className={styles.faqIntro}>
              <p className={styles.kicker}>Common questions</p>
              <h2 id="faq-title">Helpful answers before you request support.</h2>
              <p>Clear information about availability, appointment confirmation and the support we provide.</p>
            </Reveal>
            <div className={styles.faqList}>
              {faqs.map(([question, answer], index) => (
                <details key={question}>
                  <summary>
                    <span className={styles.faqQuestion}><span className={styles.faqNumber}>0{index + 1}</span>{question}</span>
                    <span className={styles.faqToggle} aria-hidden="true">
                      <svg viewBox="0 0 20 20">
                        <path d="M5 10h10" />
                        <path className={styles.faqVertical} d="M10 5v10" />
                      </svg>
                    </span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="request" className={styles.request} aria-labelledby="request-title">
          <div className={styles.requestShell}>
            <Reveal className={styles.requestCopy}>
              <p className={styles.kicker}>Ready to get started?</p>
              <h2 id="request-title">Ready to get your technology working again?</h2>
              <p>Tell us what is going wrong, choose your preferred support type and request a suitable appointment time. Our team will review the details and contact you with confirmation.</p>
              <a className={styles.phoneCta} href="tel:0403171348">Prefer to speak with us? <strong>0403 171 348</strong></a>
            </Reveal>
            <Reveal className={styles.requestCard} delay={0.08}>
              <div className={styles.requestCardHeader}><span>Appointment request</span><span>Guided in 4 steps</span></div>
              <div className={styles.progressTrack}><span /></div>
              <div className={styles.requestCardBody}>
                <span className={styles.requestCardEyebrow}>Start with your service</span>
                <h3>What can we help with today?</h3>
                <p className={styles.requestCardLead}>Choose a service to begin the full appointment request. You can review every detail before sending.</p>
                <div className={styles.choiceGrid} aria-label="Choose a service to start your request">
                  {quickServices.map(({ label, copy, icon: Icon }) => (
                    <button type="button" className={styles.choiceButton} key={label} data-appointment-trigger data-appointment-service={label}>
                      <span className={styles.choiceIcon}><Icon size={20} weight="regular" /></span>
                      <span><strong>{label}</strong><small>{copy}</small></span>
                      <ArrowUpRight className={styles.choiceArrow} size={18} weight="bold" />
                    </button>
                  ))}
                </div>
                <button type="button" className={styles.demoButton} data-appointment-trigger>Open full appointment request <ArrowIcon /></button>
                <small>Your request is reviewed by our team before any appointment is confirmed.</small>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
      <BackToTop />
    </div>
    </AppointmentProvider>
  );
}
