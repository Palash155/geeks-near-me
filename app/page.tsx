import { Logo } from "@/components/brand/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { ServicesMenu } from "@/components/navigation/ServicesMenu";
import styles from "./page.module.css";

const trustItems = [
  ["On-Site Support", "Help at your Sydney home or workplace."],
  ["Remote Assistance", "Get help without waiting for an on-site visit."],
  ["Plain-English Guidance", "Clear explanations without unnecessary jargon."],
  ["Weekday & Weekend Requests", "Choose a preferred time between 9:00 am and 5:00 pm."],
];

const services = [
  ["01", "Computer and Laptop Support", "Slow performance, startup problems, crashes, updates and general troubleshooting."],
  ["02", "Wi-Fi and Internet Help", "Weak Wi-Fi, connection dropouts, router setup and devices that will not connect."],
  ["03", "Printer Setup", "Connect, configure and troubleshoot home or office printers and wireless printing."],
  ["04", "Email and Software", "Email setup, trusted software installation, application errors and essential settings."],
  ["05", "Virus and Malware Help", "Investigate suspicious behaviour, unwanted programs, browser pop-ups and security concerns."],
  ["06", "New Device Setup", "Set up a new computer, connect devices and configure the software you use every day."],
  ["07", "Data Transfer Assistance", "Move important documents, photos and files between compatible devices with care."],
  ["08", "Small Business IT Support", "Practical help for the computers, connectivity and tools used by small Sydney teams."],
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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
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

export default function Home() {
  return (
    <div className={styles.page}>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <div className={styles.announcement}>
        <p>On-site and remote technology support across Sydney <span>•</span> Available weekdays and weekends</p>
        <a href="#request">Request an Appointment <ArrowIcon /></a>
      </div>

      <header className={styles.header}>
        <div className={styles.navShell}>
          <a href="#top" aria-label="Geeks Near Me home"><Logo inverse={false} /></a>
          <nav className={styles.nav} aria-label="Primary navigation">
            <ServicesMenu />
            <a href="#support-options">Support options</a>
            <a href="#how-it-works">How it works</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className={styles.navCta} href="#request">Request an Appointment <ArrowIcon /></a>
        </div>
      </header>

      <main id="main-content">
        <section id="top" className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <h1 id="hero-title">
                <span>Sydney IT support.</span>
                <span>Clear answers.</span>
                <span>Less tech stress.</span>
              </h1>
              <p className={styles.heroLead}>Practical help for Sydney homes, home offices and small businesses—without the confusing tech talk. Get support for computers, Wi-Fi, printers, email and software through an on-site visit or remote assistance.</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="#request">Request an Appointment <ArrowIcon /></a>
                <a className={styles.secondaryButton} href="tel:0403171348">Call 0403 171 348</a>
              </div>
              <p className={styles.confirmationNote}><CheckIcon /> Choose your preferred date and time. Our team will review your request and confirm the appointment.</p>
            </div>
          </div>
        </section>

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
              <p className={styles.kicker}>How we can help</p>
              <div><h2 id="services-title">Practical help for everyday technology problems.</h2><p>Whether one device has stopped working or your whole setup is becoming difficult to manage, we help identify the problem and recommend a practical next step.</p></div>
            </Reveal>
            <div className={styles.serviceGrid}>
              {services.map(([number, title, copy], index) => (
                <Reveal className={styles.serviceCard} delay={(index % 4) * 0.05} key={number}>
                  <div className={styles.serviceTop}><span>{number}</span><i /></div>
                  <h3>{title}</h3><p>{copy}</p>
                  <a href="#request" aria-label={`Request help with ${title}`}>Request help <ArrowIcon /></a>
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
              {faqs.map(([question, answer]) => (
                <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
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
              <div className={styles.requestCardHeader}><span>Appointment request</span><span>01 / 04</span></div>
              <div className={styles.progressTrack}><span /></div>
              <div className={styles.requestCardBody}>
                <p>First, what can we help with?</p>
                <div className={styles.choiceGrid}><span>Computer or laptop</span><span>Wi-Fi or internet</span><span>Printer or email</span><span>Something else</span></div>
                <button type="button" className={styles.demoButton} aria-label="Appointment form coming in the next implementation stage">Continue <ArrowIcon /></button>
                <small>Your preferred time is confirmed after our team reviews the request.</small>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerMain}>
          <div><Logo inverse={false} /><p>Your Local On-Site IT Expert</p></div>
          <div><span>Serving Sydney</span><a href="tel:0403171348">0403 171 348</a></div>
          <div><span>Operating hours</span><p>9:00 am–7:00 pm</p></div>
        </div>
        <div className={styles.footerBottom}><span>© {new Date().getFullYear()} Geeks Near Me</span><span>Privacy-conscious appointment requests.</span></div>
      </footer>
    </div>
  );
}
