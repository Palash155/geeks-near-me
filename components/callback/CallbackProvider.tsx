"use client";

import { CheckCircle, Phone, ShieldCheck, SpinnerGap, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { FormEvent, MouseEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import styles from "./callback.module.css";

type CallbackTime = "" | "Morning" | "Afternoon" | "Any time";

type FormValues = {
  service: string;
  bookingFor: "Myself" | "Someone else";
  name: string;
  phone: string;
  suburb: string;
  callbackTime: CallbackTime;
  description: string;
  website: string;
};

type DeliveryMode = "configured" | "preview";

const serviceOptions = [
  "Scary Pop-Ups",
  "Computer Problems",
  "Printer Problems",
  "Internet Problems",
  "New Device",
  "Data Recovery & Transfer",
  "Not sure yet",
] as const;

const initialValues: FormValues = {
  service: "Not sure yet",
  bookingFor: "Myself",
  name: "",
  phone: "",
  suburb: "",
  callbackTime: "",
  description: "",
  website: "",
};

const valuesForService = (service?: string): FormValues => {
  const chosenService = serviceOptions.includes(service as (typeof serviceOptions)[number])
    ? (service as (typeof serviceOptions)[number])
    : "Not sure yet";

  return {
    ...initialValues,
    service: chosenService,
    description: chosenService === "Not sure yet" ? "" : `${chosenService}: `,
  };
};

export function CallbackProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [reference, setReference] = useState("");
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("preview");

  const openModal = (service?: string) => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setValues(valuesForService(service));
    setErrors({});
    setStatus("idle");
    setReference("");
    setIsOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => previousFocusRef.current?.focus(), reduceMotion ? 0 : 180);
  }, [reduceMotion]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], select:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, isOpen]);

  const handleLaunch = (event: MouseEvent<HTMLDivElement>) => {
    const trigger = (event.target as HTMLElement).closest<HTMLElement>("[data-callback-trigger]");
    if (!trigger) return;
    event.preventDefault();
    openModal(trigger.dataset.callbackService);
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

  const updateService = (service: string) => {
    setValues((current) => ({
      ...current,
      service,
      description: service === "Not sure yet" ? "" : `${service}: `,
    }));
    setErrors((current) => {
      const next = { ...current };
      delete next.service;
      return next;
    });
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (values.phone.replace(/\D/g, "").length < 8) nextErrors.phone = "Please enter a valid phone number.";
    if (!values.suburb.trim()) nextErrors.suburb = "Please enter your suburb.";
    if (!values.callbackTime) nextErrors.callbackTime = "Please choose a preferred call time.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    try {
      const response = await fetch("/api/callback-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        reference?: string;
        delivery?: DeliveryMode;
        message?: string;
      };
      if (!response.ok || !result.ok) throw new Error(result.message || "We could not send the request.");
      setReference(result.reference ?? "");
      setDeliveryMode(result.delivery ?? "preview");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrors((current) => ({
        ...current,
        form: error instanceof Error ? error.message : "We could not send the request. Please call us instead.",
      }));
    }
  };

  const resetAndClose = () => {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
    setReference("");
    closeModal();
  };

  return (
    <div onClickCapture={handleLaunch}>
      {children}
      <AnimatePresence>
        {isOpen ? (
          <motion.div className={styles.overlay} data-callback-modal="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}>
            <motion.div
              className={styles.dialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby="callback-title"
              tabIndex={-1}
              ref={dialogRef}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.985 }}
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.modalTopbar}>
                <Logo inverse={false} />
                <div className={styles.modalTopbarActions}>
                  <a href="tel:0403171348"><Phone size={20} weight="fill" /> <span>Call 0403 171 348</span></a>
                  <button type="button" onClick={closeModal} aria-label="Close call-back form"><X size={24} weight="bold" /></button>
                </div>
              </div>

              <div className={styles.modalBody}>
                {status === "success" ? (
                  <div className={styles.successState}>
                    <span className={styles.successIcon}><CheckCircle size={74} weight="fill" /></span>
                    <p>Call-back request received</p>
                    <h2 id="callback-title">Thanks, {values.name}.</h2>
                    <p>We have your request for <strong>{values.service}</strong> and will call the phone number you provided.</p>
                    {reference ? <div className={styles.reference}><small>Request reference</small><strong>{reference}</strong></div> : null}
                    {deliveryMode === "preview" ? <p className={styles.previewNotice}>This preview is not connected to the business inbox yet. Add the callback delivery webhook before launch.</p> : null}
                    <a href="tel:0403171348"><Phone size={21} weight="fill" /> Call 0403 171 348</a>
                    <button type="button" onClick={resetAndClose}>Return to the website</button>
                  </div>
                ) : (
                  <form className={styles.formCard} onSubmit={submitRequest} noValidate>
                    <div className={styles.formIntro}>
                      <p>PERSONAL SUPPORT, AT YOUR SITE</p>
                      <h2 id="callback-title">Request a Call Back</h2>
                      <span>Tell us the best way to reach you. We’ll call to discuss the problem and arrange the right help.</span>
                    </div>

                    <label className={styles.selectedService}>
                      <span>Selected service</span>
                      <select value={values.service} onChange={(event) => updateService(event.target.value)}>
                        {serviceOptions.map((service) => <option value={service} key={service}>{service}</option>)}
                      </select>
                    </label>

                    <div className={styles.fieldGrid}>
                      <label>
                        <span>Your name</span>
                        <input value={values.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} />
                        {errors.name ? <small className={styles.error}>{errors.name}</small> : null}
                      </label>
                      <label>
                        <span>Phone number</span>
                        <input type="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" inputMode="tel" aria-invalid={Boolean(errors.phone)} />
                        {errors.phone ? <small className={styles.error}>{errors.phone}</small> : null}
                      </label>
                      <label>
                        <span>Suburb</span>
                        <input value={values.suburb} onChange={(event) => update("suburb", event.target.value)} autoComplete="address-level2" aria-invalid={Boolean(errors.suburb)} />
                        {errors.suburb ? <small className={styles.error}>{errors.suburb}</small> : null}
                      </label>
                      <label>
                        <span>Preferred call time</span>
                        <select value={values.callbackTime} onChange={(event) => update("callbackTime", event.target.value as CallbackTime)} aria-invalid={Boolean(errors.callbackTime)}>
                          <option value="" disabled>Choose a time</option>
                          <option value="Morning">Morning</option>
                          <option value="Afternoon">Afternoon</option>
                          <option value="Any time">Any time</option>
                        </select>
                        {errors.callbackTime ? <small className={styles.error}>{errors.callbackTime}</small> : null}
                      </label>
                    </div>

                    <label className={styles.descriptionField}>
                      <span>How can we help?</span>
                      <textarea value={values.description} onChange={(event) => update("description", event.target.value)} rows={4} />
                    </label>

                    <label className={styles.honeypot} aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update("website", event.target.value)} /></label>

                    <p className={styles.formNote}><ShieldCheck size={20} weight="fill" /> Sending this form requests a call back. It does not confirm an appointment or authorise any work.</p>
                    {status === "error" && errors.form ? <p className={styles.formError} role="alert">{errors.form} <a href="tel:0403171348">Call 0403 171 348</a></p> : null}

                    <div className={styles.formActions}>
                      <button className={styles.submitButton} type="submit" disabled={status === "submitting"}>
                        {status === "submitting" ? <><SpinnerGap className={styles.spinner} size={22} /> Sending your request</> : "Submit Call-Back Request"}
                      </button>
                      <a href="tel:0403171348"><Phone size={21} weight="fill" /> Call Now</a>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
