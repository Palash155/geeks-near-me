"use client";

import {
  ArrowsLeftRight,
  CheckCircle,
  Desktop,
  Laptop,
  Phone,
  Printer,
  ShieldCheck,
  SpinnerGap,
  User,
  UsersThree,
  WifiHigh,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { FormEvent, MouseEvent, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import styles from "./callback.module.css";

type FormValues = {
  service: string;
  bookingFor: "Myself" | "Someone else";
  name: string;
  phone: string;
  suburb: string;
  callbackTime: "Morning" | "Afternoon" | "Any time";
  description: string;
  website: string;
};

type DeliveryMode = "configured" | "preview";

const serviceOptions = [
  { value: "Computer help", label: "Computer Help", icon: Laptop },
  { value: "Internet & Wi-Fi", label: "Internet & Wi-Fi", icon: WifiHigh },
  { value: "Printer & email help", label: "Printer & Email Help", icon: Printer },
  { value: "Data recovery & transfer", label: "Data Recovery & Transfer", icon: ArrowsLeftRight },
  { value: "New device setup", label: "New Device Setup", icon: Desktop },
] as const;

const initialValues: FormValues = {
  service: "",
  bookingFor: "Myself",
  name: "",
  phone: "",
  suburb: "",
  callbackTime: "Any time",
  description: "",
  website: "",
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

  const selectedService = useMemo(
    () => serviceOptions.find((service) => service.value === values.service),
    [values.service],
  );

  const openModal = (service?: string) => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    if (service) {
      setValues((current) => ({ ...current, service }));
    }
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
    const target = event.target as HTMLElement;
    const trigger = target.closest<HTMLElement>("[data-callback-trigger]");
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

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!values.service) nextErrors.service = "Please choose the closest service.";
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (values.phone.replace(/\D/g, "").length < 8) {
      nextErrors.phone = "Please enter a valid phone number.";
    }
    if (!values.suburb.trim()) nextErrors.suburb = "Please enter your suburb.";
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
      if (!response.ok || !result.ok) {
        throw new Error(result.message || "We could not send the request.");
      }
      setReference(result.reference ?? "");
      setDeliveryMode(result.delivery ?? "preview");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrors((current) => ({
        ...current,
        form:
          error instanceof Error
            ? error.message
            : "We could not send the request. Please call us instead.",
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
          <motion.div
            className={styles.overlay}
            data-callback-modal="open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <motion.div
              className={styles.dialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby="callback-title"
              tabIndex={-1}
              ref={dialogRef}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.975 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.985 }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className={styles.closeButton}
                type="button"
                onClick={closeModal}
                aria-label="Close call-back form"
              >
                <X size={24} weight="bold" />
              </button>

              {status === "success" ? (
                <div className={styles.successState}>
                  <span className={styles.successIcon}>
                    <CheckCircle size={74} weight="fill" />
                  </span>
                  <p>Call-back request received</p>
                  <h2 id="callback-title">Thanks, {values.name}.</h2>
                  <p>
                    We have your request for <strong>{selectedService?.label}</strong> and
                    will call the phone number you provided.
                  </p>
                  {reference ? (
                    <div className={styles.reference}>
                      <small>Request reference</small>
                      <strong>{reference}</strong>
                    </div>
                  ) : null}
                  {deliveryMode === "preview" ? (
                    <p className={styles.previewNotice}>
                      This preview is not connected to the business inbox yet. Add the
                      callback delivery webhook before launch.
                    </p>
                  ) : null}
                  <a href="tel:0403171348">
                    <Phone size={21} weight="fill" /> Call 0403 171 348
                  </a>
                  <button type="button" onClick={resetAndClose}>
                    Return to the website
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.modalHeader}>
                    <Logo inverse={false} />
                    <p>Simple call-back request</p>
                    <h2 id="callback-title">How can we help?</h2>
                    <span>
                      Complete this short form and we will call you. You do not need to
                      know the technical cause.
                    </span>
                  </div>

                  <form className={styles.form} onSubmit={submitRequest} noValidate>
                    <fieldset className={styles.serviceChooser}>
                      <legend>Choose the closest service</legend>
                      <div className={styles.serviceChoices}>
                        {serviceOptions.map(({ value, label, icon: Icon }, index) => (
                          <label data-selected={values.service === value} key={value}>
                            <input
                              type="radio"
                              name="service"
                              value={value}
                              checked={values.service === value}
                              onChange={() => update("service", value)}
                            />
                            <span className={styles.serviceChoiceIcon}>
                              <Icon size={28} weight="regular" />
                            </span>
                            <span className={styles.serviceChoiceNumber}>
                              0{index + 1}
                            </span>
                            <strong>{label}</strong>
                          </label>
                        ))}
                      </div>
                      {errors.service ? (
                        <small className={styles.error}>{errors.service}</small>
                      ) : null}
                    </fieldset>

                    <div className={styles.formColumns}>
                      <div className={styles.formColumn}>
                        <fieldset className={styles.bookingFor}>
                          <legend>Who are you booking for?</legend>
                          <div>
                            <label data-selected={values.bookingFor === "Myself"}>
                              <input
                                type="radio"
                                name="bookingFor"
                                value="Myself"
                                checked={values.bookingFor === "Myself"}
                                onChange={() => update("bookingFor", "Myself")}
                              />
                              <User size={24} />
                              <span>Myself</span>
                            </label>
                            <label data-selected={values.bookingFor === "Someone else"}>
                              <input
                                type="radio"
                                name="bookingFor"
                                value="Someone else"
                                checked={values.bookingFor === "Someone else"}
                                onChange={() => update("bookingFor", "Someone else")}
                              />
                              <UsersThree size={24} />
                              <span>Someone else</span>
                            </label>
                          </div>
                        </fieldset>

                        <div className={styles.fieldGrid}>
                          <label>
                            <span>Your name</span>
                            <input
                              value={values.name}
                              onChange={(event) => update("name", event.target.value)}
                              autoComplete="name"
                              placeholder="Full name"
                              aria-invalid={Boolean(errors.name)}
                            />
                            {errors.name ? (
                              <small className={styles.error}>{errors.name}</small>
                            ) : null}
                          </label>
                          <label>
                            <span>Phone number</span>
                            <input
                              type="tel"
                              value={values.phone}
                              onChange={(event) => update("phone", event.target.value)}
                              autoComplete="tel"
                              inputMode="tel"
                              placeholder="0400 000 000"
                              aria-invalid={Boolean(errors.phone)}
                            />
                            {errors.phone ? (
                              <small className={styles.error}>{errors.phone}</small>
                            ) : null}
                          </label>
                          <label className={styles.fullField}>
                            <span>Suburb</span>
                            <input
                              value={values.suburb}
                              onChange={(event) => update("suburb", event.target.value)}
                              autoComplete="address-level2"
                              placeholder="e.g. Parramatta"
                              aria-invalid={Boolean(errors.suburb)}
                            />
                            {errors.suburb ? (
                              <small className={styles.error}>{errors.suburb}</small>
                            ) : null}
                          </label>
                        </div>
                      </div>

                      <div className={styles.formColumn}>
                        <fieldset className={styles.callbackTime}>
                          <legend>Preferred call-back time</legend>
                          <div>
                            {(["Morning", "Afternoon", "Any time"] as const).map((time) => (
                              <label data-selected={values.callbackTime === time} key={time}>
                                <input
                                  type="radio"
                                  name="callbackTime"
                                  value={time}
                                  checked={values.callbackTime === time}
                                  onChange={() => update("callbackTime", time)}
                                />
                                <span>{time}</span>
                              </label>
                            ))}
                          </div>
                        </fieldset>

                        <label className={styles.descriptionField}>
                          <span>
                            What can you see? <em>Optional</em>
                          </span>
                          <textarea
                            value={values.description}
                            onChange={(event) => update("description", event.target.value)}
                            placeholder="For example: The screen is frozen, the printer will not print, or the internet keeps dropping out."
                            rows={4}
                          />
                        </label>

                        <label className={styles.honeypot} aria-hidden="true">
                          Website
                          <input
                            tabIndex={-1}
                            autoComplete="off"
                            value={values.website}
                            onChange={(event) => update("website", event.target.value)}
                          />
                        </label>

                        <p className={styles.formNote}>
                          <ShieldCheck size={20} weight="fill" />
                          Sending this form requests a call back. It does not confirm an
                          appointment or authorise any work.
                        </p>

                        {status === "error" && errors.form ? (
                          <p className={styles.formError} role="alert">
                            {errors.form} <a href="tel:0403171348">Call 0403 171 348</a>
                          </p>
                        ) : null}

                        <div className={styles.formActions}>
                          <button
                            className={styles.submitButton}
                            type="submit"
                            disabled={status === "submitting"}
                          >
                            {status === "submitting" ? (
                              <>
                                <SpinnerGap className={styles.spinner} size={22} />
                                Sending your request
                              </>
                            ) : (
                              "Request a Call Back"
                            )}
                          </button>
                          <a href="tel:0403171348">
                            <Phone size={21} weight="fill" />
                            Call Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
