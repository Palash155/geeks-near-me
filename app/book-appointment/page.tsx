import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Buildings, CalendarBlank, House, Lightning, MapPin, Phone, ShieldWarning } from "@phosphor-icons/react/ssr";
import { ReferenceFooter, ReferenceHeader } from "@/components/reference/ReferenceShell";
import { AppointmentRequestForm } from "./AppointmentRequestForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Book an Appointment | Geeks Near Me",
  description: "Tell Geeks Near Me a few details about the technology help you need in Sydney.",
};

export default async function BookAppointmentPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service: slug } = await searchParams;

  return (
    <>
      <a className="skip-link" href="#booking-form">Skip to booking form</a>
      <ReferenceHeader booking />
      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="booking-title">
          <Image src="/images/redesign/booking-hero.png" alt="Laptop and mug on a calm home desk" fill priority sizes="100vw" />
          <div className={styles.heroFade} />
          <div className={styles.heroInner}>
            <p className={styles.breadcrumb}><Link href="/">Home</Link><span>›</span>Book an Appointment</p>
            <p className={styles.eyebrow}>BOOK AN APPOINTMENT</p>
            <h1 id="booking-title">Let&apos;s Get It Sorted</h1>
            <p className={styles.heroDescription}>Tell us a few details and we&apos;ll take care of the rest.</p>
            <span className={styles.handwriting}>Simple Professional Personal</span>
          </div>
        </section>

        <section className={styles.bookingArea} id="booking-form" aria-label="Appointment details">
          <div className={styles.bookingLayout}>
            <AppointmentRequestForm initialSlug={slug} />
            <aside className={styles.side} aria-label="Booking support">
              <div className={styles.reassurance}>
                <div><span className={styles.sideIcon}><Lightning size={27} weight="fill" aria-hidden="true" /></span><p><strong>Fast Response</strong><small>We&apos;ll confirm your booking shortly.</small></p></div>
                <div><span className={styles.sideIcon}><House size={24} weight="fill" aria-hidden="true" /></span><p><strong>Local On-Site Support</strong><small>We come to you.</small></p></div>
                <div><span className={styles.sideIcon}><ShieldWarning size={24} weight="fill" aria-hidden="true" /></span><p><strong>Simple &amp; Stress-Free</strong><small>Just tell us the issue. We&apos;ll handle the rest.</small></p></div>
              </div>
              <div className={styles.callout}>
                <h2>Not sure what to book?</h2>
                <p>No worries. Just call us or request a call back. We&apos;ll take it from there.</p>
                <strong>0403 171 348</strong>
                <div className={styles.calloutButtons}><a href="tel:0403171348"><Phone size={19} weight="fill" aria-hidden="true" /> Call Now</a><a href="#booking-form"><CalendarBlank size={19} aria-hidden="true" /> Request a Call Back</a></div>
                <span>We&apos;re here to help!</span>
              </div>
            </aside>
          </div>
          <div className={styles.bottomStatement}>
            <div><h2>Technology should be simple.</h2><p>Real people. Local help.</p></div>
            <div className={styles.locations}><span><House size={25} aria-hidden="true" /> At Your Home</span><span><Buildings size={25} aria-hidden="true" /> At Your Office</span><span><MapPin size={25} aria-hidden="true" /> Across Sydney</span></div>
          </div>
        </section>
      </main>
      <ReferenceFooter />
    </>
  );
}
