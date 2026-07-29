import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowsLeftRight,
  CaretDown,
  ChatCircleText,
  CheckCircle,
  Clock,
  Desktop,
  HouseLine,
  Laptop,
  Phone,
  Printer,
  ShieldCheck,
  UserCircleCheck,
  WifiHigh,
} from "@phosphor-icons/react/ssr";
import { Logo } from "@/components/brand/Logo";
import { CallbackProvider } from "@/components/callback/CallbackProvider";
import { AnimatedArrow } from "@/components/site/AnimatedArrow";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Friendly Computer Help at Home in Sydney | Geeks Near Me",
  description:
    "Friendly computer and technology help for Sydney homes. Choose the closest service or request a call back—no technical knowledge needed.",
  openGraph: {
    title: "Friendly Computer and Technology Help at Home | Geeks Near Me",
    description:
      "Choose the closest service and request a call back from Geeks Near Me. Clear, respectful technology help for Sydney homes.",
    type: "website",
    locale: "en_AU",
  },
};

const services = [
  {
    name: "Computer Help",
    value: "Computer help",
    copy: "Slow computer, error messages or something that simply is not working.",
    icon: Laptop,
  },
  {
    name: "Internet & Wi-Fi",
    value: "Internet & Wi-Fi",
    copy: "Weak signal, dropouts or devices that will not connect.",
    icon: WifiHigh,
  },
  {
    name: "Printer & Email Help",
    value: "Printer & email help",
    copy: "Printing, scanning, email access or everyday account problems.",
    icon: Printer,
  },
  {
    name: "Data Recovery & Transfer",
    value: "Data recovery & transfer",
    copy: "Move or recover important photos, documents and personal files.",
    icon: ArrowsLeftRight,
  },
  {
    name: "New Device Setup",
    value: "New device setup",
    copy: "Set up a new computer, printer, email and the tools you use.",
    icon: Desktop,
  },
] as const;

const safetyPromises = [
  {
    title: "We explain the work first",
    copy: "You will know what we recommend before any work begins.",
  },
  {
    title: "We ask for permission",
    copy: "We do not proceed until you are comfortable with the next step.",
  },
  {
    title: "We never ask for banking passwords",
    copy: "Your private banking passwords should always stay with you.",
  },
  {
    title: "Family members are welcome",
    copy: "A trusted family member or friend can be present at any time.",
  },
] as const;

const simpleSteps = [
  {
    title: "Choose the closest service",
    copy: "You do not need to diagnose the problem.",
    icon: ChatCircleText,
  },
  {
    title: "Request a call back",
    copy: "Give us your name, phone number and a suitable time.",
    icon: UserCircleCheck,
  },
  {
    title: "We call and guide you",
    copy: "We discuss what you can see and explain the next step.",
    icon: Phone,
  },
] as const;

const faqs = [
  [
    "Do I need to know what the problem is?",
    "No. Choose the service that seems closest and tell us what you can see. We will help work out the next step.",
  ],
  [
    "Can I book for a family member?",
    "Yes. The callback form lets you tell us whether you are booking for yourself or for someone else.",
  ],
  [
    "Can you help at my home?",
    "Geeks Near Me provides practical technology support for Sydney homes. We will discuss the location and the best type of help during the callback.",
  ],
  [
    "When will you call me back?",
    "Choose morning, afternoon or any time in the form. We will review the request and call as soon as practical during our available hours.",
  ],
] as const;

export default function Home() {
  return (
    <CallbackProvider>
      <div className={styles.page}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>

        <div className={styles.helpBar}>
          <a href="tel:0403171348">
            <Phone size={19} weight="fill" />
            <span>Need help? Call</span>
            <strong>0403 171 348</strong>
          </a>
          <span className={styles.helpBarNote}>Friendly support across Sydney</span>
        </div>

        <header className={styles.header}>
          <div className={styles.headerShell}>
            <Link className={styles.logoLink} href="/" aria-label="Geeks Near Me home">
              <Logo inverse={false} />
            </Link>
            <div className={styles.headerActions}>
              <a className={styles.headerCall} href="tel:0403171348">
                <Phone size={20} weight="fill" />
                <span>Call Now</span>
              </a>
              <button
                className={styles.headerCallback}
                type="button"
                data-callback-trigger
                aria-label="Request a Call Back"
              >
                <span className={styles.callbackLong}>Request a Call Back</span>
                <span className={styles.callbackShort} aria-hidden="true">
                  Call Back
                </span>
                <AnimatedArrow />
              </button>
            </div>
          </div>
        </header>

        <main id="main-content">
          <section className={styles.hero} aria-labelledby="hero-title">
            <Image
              className={styles.heroImage}
              src="/images/services/services-hero-sydney.png"
              alt=""
              fill
              priority
              sizes="100vw"
            />
            <div className={styles.heroShade} />
            <div className={styles.heroShell}>
              <div className={styles.heroIntro}>
                <p className={styles.eyebrow}>
                  <HouseLine size={20} weight="fill" />
                  Friendly help at your home
                </p>
                <h1 id="hero-title">Friendly computer and technology help at your home.</h1>
                <p>
                  You do not need to know what the problem is. Choose what looks closest,
                  tell us what you can see, and we will help.
                </p>
              </div>

              <div className={styles.servicePanel}>
                <div className={styles.servicePanelHeading}>
                  <div>
                    <span>Choose a service</span>
                    <h2>What would you like help with?</h2>
                  </div>
                  <p>Tap one service to open the short call-back form.</p>
                </div>
                <div className={styles.serviceGrid}>
                  {services.map(({ name, value, copy, icon: Icon }) => (
                    <button
                      className={styles.serviceCard}
                      type="button"
                      data-callback-trigger
                      data-callback-service={value}
                      aria-label={`Request a call back for ${name}`}
                      key={value}
                    >
                      <span className={styles.serviceIcon}>
                        <Icon size={34} weight="regular" />
                      </span>
                      <strong>{name}</strong>
                      <small>{copy}</small>
                      <span className={styles.serviceAction}>
                        Request a call back <AnimatedArrow />
                      </span>
                    </button>
                  ))}
                </div>
                <div className={styles.unsureRow}>
                  <Phone size={22} weight="fill" />
                  <p>
                    <strong>Not sure which service to choose?</strong>
                    Call us and we will help you work it out.
                  </p>
                  <a href="tel:0403171348">Call 0403 171 348</a>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.safety} aria-labelledby="safety-title">
            <div className={styles.sectionShell}>
              <div className={styles.safetyIntro}>
                <p className={styles.kicker}>
                  <ShieldCheck size={22} weight="fill" />
                  Safe and respectful support
                </p>
                <h2 id="safety-title">Clear help, with you in control.</h2>
                <p>
                  We take time to explain things in plain English. You can ask questions,
                  pause or involve someone you trust.
                </p>
                <a href="tel:0403171348">
                  <Phone size={20} weight="fill" />
                  Speak with us: 0403 171 348
                </a>
              </div>
              <div className={styles.promiseGrid}>
                {safetyPromises.map((item) => (
                  <article className={styles.promiseCard} key={item.title}>
                    <CheckCircle size={30} weight="fill" />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.nextSteps} aria-labelledby="steps-title">
            <div className={styles.sectionShell}>
              <div className={styles.centerIntro}>
                <p className={styles.kicker}>
                  <Clock size={22} weight="fill" />
                  What happens next
                </p>
                <h2 id="steps-title">Getting help is simple.</h2>
              </div>
              <div className={styles.stepGrid}>
                {simpleSteps.map(({ title, copy, icon: Icon }, index) => (
                  <article className={styles.stepCard} key={title}>
                    <span className={styles.stepIcon}>
                      <Icon size={30} weight="regular" />
                    </span>
                    <span className={styles.stepNumber}>0{index + 1}</span>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.faq} aria-labelledby="faq-title">
            <div className={styles.faqShell}>
              <div className={styles.faqIntro}>
                <p className={styles.kicker}>Common questions</p>
                <h2 id="faq-title">Helpful answers, without technical language.</h2>
                <p>If you still feel unsure, please call us. We are happy to talk it through.</p>
              </div>
              <div className={styles.faqList}>
                {faqs.map(([question, answer]) => (
                  <details key={question}>
                    <summary>
                      <span>{question}</span>
                      <CaretDown size={24} weight="bold" />
                    </summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.finalCta} aria-labelledby="final-cta-title">
            <div>
              <p>Need friendly technology help?</p>
              <h2 id="final-cta-title">Call us now or ask us to call you.</h2>
            </div>
            <div className={styles.finalActions}>
              <a href="tel:0403171348">
                <Phone size={22} weight="fill" />
                Call 0403 171 348
              </a>
              <button type="button" data-callback-trigger>
                Request a Call Back <AnimatedArrow />
              </button>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerMain}>
            <div className={styles.footerBrand}>
              <span className={styles.footerLogo}>
                <Logo inverse={false} />
              </span>
              <p>
                Friendly computer and technology help for Sydney homes, explained in
                plain English.
              </p>
              <a href="https://www.facebook.com/geeksnearme" target="_blank" rel="noreferrer">
                Follow Geeks Near Me on Facebook
              </a>
            </div>
            <div className={styles.footerContact}>
              <h3>Contact</h3>
              <a href="tel:0403171348">
                <Phone size={19} weight="fill" /> 0403 171 348
              </a>
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
              <p>
                We use callback details to respond to your support request. Client-approved
                policy wording will replace this summary before launch.
              </p>
            </details>
            <details id="terms-and-conditions">
              <summary>Terms and Conditions</summary>
              <p>
                Sending the form requests a callback. It does not confirm an appointment
                or authorise work.
              </p>
            </details>
            <details id="cancellation-policy">
              <summary>Cancellation Policy</summary>
              <p>
                Please call us as soon as possible if you need to change or cancel an
                agreed visit.
              </p>
            </details>
          </div>

          <div className={styles.footerBottom}>
            <span>© {new Date().getFullYear()} Geeks Near Me. All rights reserved.</span>
            <span>Business name and ABN to be confirmed before launch.</span>
          </div>
        </footer>

        <a className={styles.mobileCallBar} href="tel:0403171348">
          <Phone size={22} weight="fill" />
          Call Now: 0403 171 348
        </a>
      </div>
    </CallbackProvider>
  );
}
