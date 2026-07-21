"use client";

import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  CheckCircle,
  ClipboardText,
  Clock,
  CloudArrowUp,
  Desktop,
  DeviceMobile,
  EnvelopeSimple,
  House,
  Laptop,
  MapPin,
  Printer,
  Question,
  ShieldCheck,
  SpinnerGap,
  UserCircle,
  WifiHigh,
  X,
  ArrowsLeftRight,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { MouseEvent, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import styles from "./appointment.module.css";

type FormValues = {
  service: string;
  supportType: "" | "Remote support" | "On-site visit";
  address: string;
  suburb: string;
  postcode: string;
  date: string;
  time: string;
  issue: string;
  fileName: string;
  name: string;
  phone: string;
  email: string;
  terms: boolean;
};

const initialValues: FormValues = {
  service: "",
  supportType: "",
  address: "",
  suburb: "",
  postcode: "",
  date: "",
  time: "",
  issue: "",
  fileName: "",
  name: "",
  phone: "",
  email: "",
  terms: false,
};

const services = [
  { id: "computer", name: "Computer & laptop", description: "Slow performance, crashes, setup or general troubleshooting.", icon: Laptop },
  { id: "wifi", name: "Wi-Fi & internet", description: "Dropouts, weak coverage, routers and connection problems.", icon: WifiHigh },
  { id: "printer", name: "Printer setup", description: "Installation, wireless printing and troubleshooting.", icon: Printer },
  { id: "email", name: "Email & software", description: "Accounts, apps, updates and everyday software errors.", icon: EnvelopeSimple },
  { id: "security", name: "Virus & malware", description: "Suspicious behaviour, pop-ups and security concerns.", icon: ShieldCheck },
  { id: "device", name: "New device setup", description: "Set up a new computer and the tools you use every day.", icon: Desktop },
  { id: "transfer", name: "Data transfer", description: "Move important files and settings between devices safely.", icon: ArrowsLeftRight },
  { id: "business", name: "Small business IT", description: "Practical technology help for small Sydney teams.", icon: Briefcase },
  { id: "other", name: "Something else", description: "Describe the issue and we will guide the next step.", icon: Question },
];

const steps = [
  { label: "Help needed", hint: "Choose what you need help with", icon: ClipboardText },
  { label: "Visit details", hint: "Where we will provide support", icon: MapPin },
  { label: "Preferred time", hint: "Choose a time that suits you", icon: Clock },
  { label: "Contact & review", hint: "Check everything before sending", icon: UserCircle },
];

const timeWindows = ["9:00–11:00 am", "11:00 am–1:00 pm", "1:00–3:00 pm", "3:00–5:00 pm", "I’m flexible"];

const serviceAliases: Record<string, string> = {
  "computer and laptop support": "Computer & laptop",
  "wi-fi and internet help": "Wi-Fi & internet",
  "printer setup": "Printer setup",
  "email and software": "Email & software",
  "virus and malware help": "Virus & malware",
  "new device setup": "New device setup",
  "data transfer assistance": "Data transfer",
  "small business it support": "Small business IT",
};

function fieldError(message?: string) {
  return message ? <span className={styles.error}>{message}</span> : null;
}

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [compactMotion, setCompactMotion] = useState(false);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const selectedService = useMemo(
    () => services.find((service) => service.name === values.service),
    [values.service],
  );

  const minDate = useMemo(
    () => new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Sydney" }).format(new Date()),
    [],
  );

  const openModal = (service?: string) => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setCompactMotion(window.matchMedia("(max-width: 880px)").matches);
    if (service) {
      const normalizedService = serviceAliases[service.toLowerCase()] ?? service;
      const match = services.find((item) => item.name.toLowerCase() === normalizedService.toLowerCase());
      setValues((current) => ({ ...current, service: match?.name ?? normalizedService }));
    }
    setReference("");
    setErrors({});
    setStep(0);
    setDirection(1);
    setIsOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => previousFocusRef.current?.focus(), reduceMotion ? 0 : 220);
  }, [reduceMotion]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal, isOpen]);

  const handleLaunch = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const trigger = target.closest<HTMLElement>('[data-appointment-trigger], a[href="#request"]');
    if (!trigger) return;
    event.preventDefault();
    openModal(trigger.dataset.appointmentService);
  };

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const validateStep = (activeStep: number) => {
    const nextErrors: Record<string, string> = {};
    if (activeStep === 0 && !values.service) nextErrors.service = "Choose a service to continue.";
    if (activeStep === 1) {
      if (!values.supportType) nextErrors.supportType = "Choose remote or on-site support.";
      if (values.supportType === "On-site visit" && !values.address.trim()) nextErrors.address = "Enter the address for the visit.";
      if (!values.suburb.trim()) nextErrors.suburb = "Enter your suburb.";
      if (!/^\d{4}$/.test(values.postcode)) nextErrors.postcode = "Enter a valid 4-digit postcode.";
    }
    if (activeStep === 2) {
      if (!values.date) nextErrors.date = "Choose a preferred date.";
      if (!values.time) nextErrors.time = "Choose a preferred time window.";
      if (values.issue.trim().length < 12) nextErrors.issue = "Please add a little more detail about the problem.";
    }
    if (activeStep === 3) {
      if (!values.name.trim()) nextErrors.name = "Enter your name.";
      if (values.phone.replace(/\D/g, "").length < 8) nextErrors.phone = "Enter a valid phone number.";
      if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = "Enter a valid email or leave it blank.";
      if (!values.terms) nextErrors.terms = "Please accept the acknowledgement.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep(step)) return;
    if (step < steps.length - 1) {
      setDirection(1);
      setStep((current) => current + 1);
      return;
    }
    setIsSubmitting(true);
    window.setTimeout(() => {
      setReference(`GNM-${Date.now().toString().slice(-6)}`);
      setIsSubmitting(false);
    }, reduceMotion ? 150 : 850);
  };

  const previousStep = () => {
    if (step === 0) return;
    setDirection(-1);
    setStep((current) => current - 1);
  };

  const resetAndClose = () => {
    setValues(initialValues);
    setReference("");
    setStep(0);
    closeModal();
  };

  const renderStep = () => {
    if (step === 0) {
      return (
        <div className={styles.stepBody}>
          <div className={styles.stepHeading}>
            <span className={styles.stepEyebrow}>Choose a service</span>
            <h2 id="appointment-title">What can we help with?</h2>
            <p>Choose the option that best describes the issue. You can add more detail before sending.</p>
          </div>
          <div className={styles.serviceList} role="radiogroup" aria-describedby={errors.service ? "service-error" : undefined}>
            {services.map((service) => {
              const Icon = service.icon;
              const selected = values.service === service.name;
              return (
                <button
                  className={styles.serviceOption}
                  data-selected={selected}
                  key={service.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => update("service", service.name)}
                >
                  <span className={styles.serviceOptionIcon}><Icon size={23} weight="regular" /></span>
                  <span className={styles.serviceOptionCopy}><strong>{service.name}</strong><small>{service.description}</small></span>
                  <span className={styles.serviceOptionStatus}>{selected ? <Check size={17} weight="bold" /> : <ArrowRight size={17} />}</span>
                </button>
              );
            })}
          </div>
          {errors.service ? <span className={styles.error} id="service-error">{errors.service}</span> : null}
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className={styles.stepBody}>
          <div className={styles.stepHeading}>
            <span className={styles.stepEyebrow}>Support & location</span>
            <h2 id="appointment-title">How should we help?</h2>
            <p>Choose remote or on-site support, then tell us where you are in Sydney.</p>
          </div>
          <div className={styles.supportChoices}>
            <button type="button" data-selected={values.supportType === "Remote support"} onClick={() => update("supportType", "Remote support")}>
              <DeviceMobile size={26} /><span><strong>Remote support</strong><small>Get help securely from wherever you are.</small></span><CheckCircle size={21} weight={values.supportType === "Remote support" ? "fill" : "regular"} />
            </button>
            <button type="button" data-selected={values.supportType === "On-site visit"} onClick={() => update("supportType", "On-site visit")}>
              <House size={26} /><span><strong>On-site visit</strong><small>Hands-on support at your location.</small></span><CheckCircle size={21} weight={values.supportType === "On-site visit" ? "fill" : "regular"} />
            </button>
          </div>
          {fieldError(errors.supportType)}
          <div className={styles.fieldGrid}>
            <AnimatePresence initial={false}>
              {values.supportType === "On-site visit" ? (
                <motion.label className={styles.fullField} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <span>Street address</span>
                  <input value={values.address} onChange={(event) => update("address", event.target.value)} autoComplete="street-address" placeholder="12 Example Street" />
                  {fieldError(errors.address)}
                </motion.label>
              ) : null}
            </AnimatePresence>
            <label><span>Suburb</span><input value={values.suburb} onChange={(event) => update("suburb", event.target.value)} autoComplete="address-level2" placeholder="e.g. Parramatta" />{fieldError(errors.suburb)}</label>
            <label><span>Postcode</span><input value={values.postcode} onChange={(event) => update("postcode", event.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" autoComplete="postal-code" placeholder="2000" />{fieldError(errors.postcode)}</label>
          </div>
          <p className={styles.fieldNote}><MapPin size={16} /> Service availability is reviewed using your suburb and postcode.</p>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className={styles.stepBody}>
          <div className={styles.stepHeading}>
            <span className={styles.stepEyebrow}>Preferred time & issue</span>
            <h2 id="appointment-title">When would suit you?</h2>
            <p>Choose a preferred window and briefly describe what is happening.</p>
          </div>
          <div className={styles.fieldGrid}>
            <label className={styles.fullField}><span>Preferred date</span><input type="date" min={minDate} value={values.date} onInput={(event) => update("date", event.currentTarget.value)} />{fieldError(errors.date)}</label>
          </div>
          <fieldset className={styles.timeFieldset}>
            <legend>Preferred time</legend>
            <div className={styles.timeChoices}>{timeWindows.map((time) => <button type="button" data-selected={values.time === time} onClick={() => update("time", time)} key={time}>{time}</button>)}</div>
            {fieldError(errors.time)}
          </fieldset>
          <label className={styles.textareaField}><span>Briefly describe the problem</span><textarea value={values.issue} onChange={(event) => update("issue", event.target.value)} placeholder="Tell us what you can see, when it started and anything you have tried." rows={4} />{fieldError(errors.issue)}</label>
          <label className={styles.uploadField}>
            <CloudArrowUp size={25} />
            <span><strong>{values.fileName || "Add a photo, screenshot or PDF"}</strong><small>Optional · JPG, PNG, WebP or PDF · up to 10 MB</small></span>
            <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              if (file.size > 10 * 1024 * 1024) {
                setErrors((current) => ({ ...current, fileName: "Choose a file smaller than 10 MB." }));
                return;
              }
              update("fileName", file.name);
            }} />
          </label>
          {fieldError(errors.fileName)}
        </div>
      );
    }

    return (
      <div className={styles.stepBody}>
        <div className={styles.stepHeading}>
          <span className={styles.stepEyebrow}>Contact & review</span>
          <h2 id="appointment-title">Where can we reach you?</h2>
          <p>We will use these details to review and confirm your appointment request.</p>
        </div>
        <div className={styles.fieldGrid}>
          <label className={styles.fullField}><span>Your name</span><input value={values.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" placeholder="Full name" />{fieldError(errors.name)}</label>
          <label><span>Phone number</span><input type="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" placeholder="0400 000 000" />{fieldError(errors.phone)}</label>
          <label><span>Email <em>Optional</em></span><input type="email" value={values.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" placeholder="you@example.com" />{fieldError(errors.email)}</label>
        </div>
        <div className={styles.reviewGrid}>
          <div><small>Service</small><strong>{values.service}</strong></div>
          <div><small>Support</small><strong>{values.supportType}</strong></div>
          <div><small>Location</small><strong>{values.suburb} {values.postcode}</strong></div>
          <div><small>Preferred time</small><strong>{values.date} · {values.time}</strong></div>
        </div>
        <label className={styles.termsField} data-invalid={Boolean(errors.terms)}>
          <input type="checkbox" checked={values.terms} onChange={(event) => update("terms", event.target.checked)} />
          <span>I understand this is an appointment request. The final date and time are confirmed by the Geeks Near Me team.</span>
        </label>
        {fieldError(errors.terms)}
      </div>
    );
  };

  return (
    <div onClickCapture={handleLaunch}>
      {children}
      <AnimatePresence>
        {isOpen ? (
          <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.24 }}>
            <motion.div
              className={styles.dialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby="appointment-title"
              tabIndex={-1}
              ref={dialogRef}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: compactMotion ? 14 : 24, scale: compactMotion ? 1 : 0.965 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: compactMotion ? 10 : 16, scale: compactMotion ? 1 : 0.975 }}
              transition={{ duration: reduceMotion ? 0 : compactMotion ? 0.24 : 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              {reference ? (
                <div className={styles.successState}>
                  <motion.span initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}><CheckCircle size={74} weight="fill" /></motion.span>
                  <p>Request preview complete</p>
                  <h2 id="appointment-title">Your appointment request is ready.</h2>
                  <p>This frontend prototype has not sent any data yet. When the backend is connected, our team will review each request before confirming the final time.</p>
                  <div><small>Preview reference</small><strong>{reference}</strong></div>
                  <button type="button" onClick={resetAndClose}>Return to the website <ArrowRight size={18} /></button>
                </div>
              ) : (
                <>
                  <aside className={styles.concierge}>
                    <Logo inverse />
                    <div className={styles.conciergeIntro}>
                      <h2>Let’s get your tech sorted.</h2>
                      <p>Tell us what you need and our Sydney team will review the best solution and time for you.</p>
                    </div>
                    <ol className={styles.progressList}>
                      {steps.map((item, index) => {
                        const Icon = item.icon;
                        const state = index < step ? "complete" : index === step ? "active" : "upcoming";
                        return (
                          <li data-state={state} key={item.label}>
                            <span>{state === "complete" ? <Check size={17} weight="bold" /> : <Icon size={20} />}</span>
                            <div><strong>{index + 1}. {item.label}</strong><small>{item.hint}</small></div>
                          </li>
                        );
                      })}
                    </ol>
                    <div className={styles.liveSummary}>
                      <div><strong>Request summary</strong><span><i /> Live</span></div>
                      <dl>
                        <div><dt>Service</dt><dd>{selectedService?.name ?? "Not selected"}</dd></div>
                        <div><dt>Visit type</dt><dd>{values.supportType || "Not selected"}</dd></div>
                        <div><dt>Preferred time</dt><dd>{values.time || "Not selected"}</dd></div>
                        <div><dt>Location</dt><dd>{values.suburb || "Not set"}</dd></div>
                      </dl>
                    </div>
                  </aside>

                  <main className={styles.workspace}>
                    <button className={styles.closeButton} type="button" onClick={closeModal} aria-label="Close appointment request"><X size={21} /></button>
                    <AnimatePresence mode="wait" initial={false} custom={direction}>
                      <motion.div
                        className={styles.stepMotion}
                        key={step}
                        custom={direction}
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 34 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -26 }}
                        transition={{ duration: reduceMotion ? 0.08 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {renderStep()}
                      </motion.div>
                    </AnimatePresence>
                  </main>

                  <footer className={styles.modalFooter}>
                    <p><ShieldCheck size={17} /> Your preferred time is confirmed by our team after review.</p>
                    <div>
                      <button className={styles.backButton} type="button" onClick={previousStep} disabled={step === 0}><ArrowLeft size={17} /> Back</button>
                      <button className={styles.continueButton} type="button" onClick={nextStep} disabled={isSubmitting}>
                        {isSubmitting ? <><SpinnerGap className={styles.spinner} size={19} /> Preparing preview</> : <>{step === steps.length - 1 ? "Preview request" : "Continue"}<ArrowRight size={18} /></>}
                      </button>
                    </div>
                  </footer>
                </>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
