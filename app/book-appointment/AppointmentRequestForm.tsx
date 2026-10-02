"use client";

import { ArrowRight, CalendarBlank, LockKey } from "@phosphor-icons/react";
import { useState, type FormEvent } from "react";
import { referenceServices } from "@/components/reference/services";
import { SelectedServicePicker } from "./SelectedServicePicker";
import styles from "./page.module.css";

export function AppointmentRequestForm({ initialSlug }: { initialSlug?: string }) {
  const [selectedSlug, setSelectedSlug] = useState(initialSlug);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const fields = new FormData(form);
    const phoneDigits = String(fields.get("phone") ?? "").replace(/\D/g, "");
    if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      setError("Please enter a valid phone number.");
      setStatus("error");
      form.querySelector<HTMLInputElement>('[name="phone"]')?.focus();
      return;
    }

    const service = referenceServices.find((item) => item.slug === selectedSlug);
    fields.set("form-name", "appointment-request");
    fields.set("service", service?.title ?? "Not sure yet");
    const encodedFields = new URLSearchParams();
    fields.forEach((value, key) => encodedFields.append(key, String(value)));
    setError("");
    setStatus("submitting");

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedFields.toString(),
      });
      if (!response.ok) throw new Error("Your request could not be sent right now. Please call us instead.");
      setStatus("success");
      form.reset();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Your request could not be sent right now. Please call us instead.");
      setStatus("error");
    }
  }

  return (
    <form className={styles.formCard} onSubmit={handleSubmit} name="appointment-request" method="POST">
      {status === "success" ? (
        <div className={styles.submitSuccess} role="status">
          <h2>Request received</h2>
          <p>Thank you. We have your details and will call you to confirm a suitable appointment time.</p>
          <p>Need help sooner? Call <a href="tel:0403171348">0403 171 348</a>.</p>
        </div>
      ) : (
        <>
          <h2>Selected Service</h2>
          <SelectedServicePicker initialSlug={initialSlug} onChange={setSelectedSlug} />
          <div className={styles.fieldGrid}>
            <label><span>Your Name <b>*</b></span><input name="name" type="text" autoComplete="name" required minLength={2} maxLength={100} placeholder="Enter your full name" /></label>
            <label><span>Phone Number <b>*</b></span><input name="phone" type="tel" autoComplete="tel" required maxLength={40} placeholder="e.g. 0403 171 348" /></label>
            <label><span>Address <b>*</b></span><input name="address" type="text" autoComplete="street-address" required minLength={3} maxLength={200} placeholder="e.g. Roselands, Sydney" /></label>
            <label><span>Preferred Time <b>*</b></span><span className={styles.inputWrap}><input name="preferredTime" type="text" required maxLength={100} placeholder="e.g. weekday morning" /><CalendarBlank size={20} aria-hidden="true" /></span></label>
          </div>
          <label className={styles.fullField}><span>Tell us about the issue <b>*</b></span><textarea name="issue" required minLength={4} maxLength={1500} placeholder="e.g. printer not printing, error message, etc." rows={5} /></label>
          <label className={styles.honeypot} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          {status === "error" ? <p className={styles.submitError} role="alert">{error} <a href="tel:0403171348">Call 0403 171 348</a></p> : null}
          <button className={styles.bookButton} type="submit" disabled={status === "submitting"}><CalendarBlank size={19} aria-hidden="true" /> {status === "submitting" ? "Sending request…" : "Request Appointment"} <ArrowRight size={19} aria-hidden="true" /></button>
          <p className={styles.privacy}><LockKey size={15} aria-hidden="true" /> Your information is kept private and used only for this request. Appointment times are confirmed after we call you.</p>
        </>
      )}
    </form>
  );
}
