"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle, Pause, Phone, Play } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styles from "./hero-slider.module.css";

const slides = [
  {
    eyebrow: "On-site & remote IT support",
    title: ["Sydney IT support,", "without the tech stress."],
    copy: "Practical computer and laptop support for Sydney homes, home offices and small businesses. Choose on-site or remote assistance and request a preferred appointment time online.",
    image: "/images/hero/onsite-it-support-sydney-v2.jpg",
    alt: "A technician helping a customer with a laptop in a Sydney home office",
    label: "IT support",
    service: "Computer & laptop",
  },
  {
    eyebrow: "Wi-Fi & home network help",
    title: ["Stronger Wi-Fi.", "Fewer frustrating dropouts."],
    copy: "Get help with weak Wi-Fi, router setup, connection dropouts and devices that will not connect. We review the problem and recommend practical Sydney internet support.",
    image: "/images/hero/wifi-internet-support-sydney.jpg",
    alt: "A modern Sydney home connected through a reliable Wi-Fi network",
    label: "Wi-Fi help",
    service: "Wi-Fi & internet",
  },
  {
    eyebrow: "New devices, printers & software",
    title: ["Set up your technology", "properly from day one."],
    copy: "From new computers and printers to email, software and careful data transfer, get clear setup support so your everyday devices work together smoothly.",
    image: "/images/hero/device-setup-support-sydney.jpg",
    alt: "A coordinated desk setup with a computer, laptop, tablet, phone and printer",
    label: "Device setup",
    service: "New device setup",
  },
  {
    eyebrow: "Small business IT support Sydney",
    title: ["Reliable technology help", "for growing Sydney teams."],
    copy: "Keep computers, connectivity, printers, email and essential software working across your small business. Request responsive support without adding a full-time IT department.",
    image: "/images/hero/small-business-it-support-sydney-v3.jpg",
    alt: "A small Sydney team working with connected computers, a router and printer",
    label: "Business IT",
    service: "Small business IT",
  },
] as const;

const AUTO_PLAY_DELAY = 7000;

export function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const [interactionPause, setInteractionPause] = useState(false);
  const touchStart = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const paused = manualPause || interactionPause || Boolean(reduceMotion);

  const showSlide = (index: number) => {
    setActiveSlide((index + slides.length) % slides.length);
  };

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, AUTO_PLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [activeSlide, paused]);

  return (
    <section
      className={styles.hero}
      id="top"
      aria-roledescription="carousel"
      aria-label="Geeks Near Me IT support services"
      onMouseEnter={() => setInteractionPause(true)}
      onMouseLeave={() => setInteractionPause(false)}
      onFocusCapture={() => setInteractionPause(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteractionPause(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") showSlide(activeSlide - 1);
        if (event.key === "ArrowRight") showSlide(activeSlide + 1);
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
        if (Math.abs(distance) > 44) showSlide(activeSlide + (distance < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      <div className={styles.media} aria-hidden="true">
        {slides.map((slide, index) => (
          <motion.div
            className={styles.mediaSlide}
            key={slide.image}
            initial={false}
            animate={{ opacity: activeSlide === index ? 1 : 0, scale: activeSlide === index ? 1 : 1.045 }}
            transition={{ duration: reduceMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              loading="eager"
              unoptimized
              sizes="100vw"
              className={styles.image}
            />
          </motion.div>
        ))}
        <div className={styles.imageShade} />
      </div>

      <div className={styles.heroShell}>
        <div className={styles.contentStage} aria-live="polite" aria-atomic="true">
          {slides.map((slide, index) => {
            const active = activeSlide === index;
            const Heading = index === 0 ? "h1" : "h2";
            return (
              <motion.article
                className={styles.slideContent}
                key={slide.label}
                aria-hidden={!active}
                initial={false}
                animate={{ opacity: active ? 1 : 0, x: active ? 0 : -30, visibility: active ? "visible" : "hidden" }}
                transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className={styles.eyebrow}><CheckCircle weight="fill" /> {slide.eyebrow}</p>
                <Heading id={index === 0 ? "hero-title" : undefined}>
                  <span>{slide.title[0]}</span>
                  <span>{slide.title[1]}</span>
                </Heading>
                <p className={styles.copy}>{slide.copy}</p>
                <div className={styles.actions}>
                  <a className={styles.primaryAction} href="#request" data-appointment-service={slide.service}>
                    Request an Appointment <ArrowRight weight="bold" />
                  </a>
                  <a className={styles.secondaryAction} href="tel:0403171348">
                    <Phone weight="fill" /> Call 0403 171 348
                  </a>
                </div>
                <p className={styles.confirmation}>
                  Preferred times are reviewed and confirmed by our Sydney support team.
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className={styles.controls} aria-label="Slider controls">
          <button type="button" onClick={() => showSlide(activeSlide - 1)} aria-label="Show previous service">
            <ArrowLeft weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => setManualPause((current) => !current)}
            aria-label={manualPause ? "Play service slider" : "Pause service slider"}
          >
            {manualPause ? <Play weight="fill" /> : <Pause weight="fill" />}
          </button>
          <button type="button" onClick={() => showSlide(activeSlide + 1)} aria-label="Show next service">
            <ArrowRight weight="bold" />
          </button>
        </div>
      </div>

      <div className={styles.railShell}>
        <div className={styles.rail} aria-label="Choose a support story">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.label}
              aria-current={activeSlide === index ? "true" : undefined}
              onClick={() => showSlide(index)}
            >
              <span className={styles.railNumber}>0{index + 1}</span>
              <span className={styles.railLabel}>{slide.label}</span>
              {activeSlide === index && <span className={styles.progress} style={{ animationPlayState: paused ? "paused" : "running" }} />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
