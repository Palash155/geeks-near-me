"use client";

import { useEffect, useRef, useState } from "react";
import {
  Desktop,
  DeviceMobile,
  HardDrives,
  Headset,
  Printer,
  ShieldWarning,
  WifiHigh,
} from "@phosphor-icons/react";
import { referenceServices, type ReferenceService } from "@/components/reference/services";
import styles from "./selected-service-picker.module.css";

function ServiceIcon({ slug }: { slug: ReferenceService["slug"] }) {
  const props = { size: 23, weight: "regular" as const, "aria-hidden": true as const };

  switch (slug) {
    case "scary-pop-ups": return <ShieldWarning {...props} />;
    case "printer-issues": return <Printer {...props} />;
    case "new-device-setup": return <DeviceMobile {...props} />;
    case "internet-wifi": return <WifiHigh {...props} />;
    case "computer-problems": return <Desktop {...props} />;
    case "data-recovery-transfer": return <HardDrives {...props} />;
  }
}

export function SelectedServicePicker({ initialSlug }: { initialSlug?: string }) {
  const [selectedSlug, setSelectedSlug] = useState(initialSlug);
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const changeButtonRef = useRef<HTMLButtonElement>(null);
  const firstOptionRef = useRef<HTMLButtonElement>(null);
  const selected = referenceServices.find((service) => service.slug === selectedSlug);

  useEffect(() => {
    if (!open) return;

    firstOptionRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        changeButtonRef.current?.focus();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (!pickerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  function chooseService(service: ReferenceService) {
    setSelectedSlug(service.slug);
    setOpen(false);

    const url = new URL(window.location.href);
    url.searchParams.set("service", service.slug);
    window.history.replaceState(window.history.state, "", url);

    changeButtonRef.current?.focus();
  }

  return (
    <div className={styles.picker} ref={pickerRef}>
      <div className={styles.selectedService}>
        <span className={styles.selectedIcon}>
          {selected ? <ServiceIcon slug={selected.slug} /> : <Headset size={23} aria-hidden="true" />}
        </span>
        <strong>{selected?.title ?? "Not sure yet"}</strong>
        <button
          ref={changeButtonRef}
          type="button"
          aria-expanded={open}
          aria-controls="service-options"
          onClick={() => setOpen((current) => !current)}
        >
          Change
        </button>
      </div>

      <div className={styles.optionsPanel} data-open={open} id="service-options" aria-hidden={!open} inert={!open}>
        <div className={styles.optionsInner}>
          <p>Choose a service</p>
          <div className={styles.optionsGrid} role="group" aria-label="Choose a service">
            {referenceServices.map((service, index) => (
              <button
                key={service.slug}
                ref={index === 0 ? firstOptionRef : undefined}
                type="button"
                className={styles.option}
                aria-pressed={selectedSlug === service.slug}
                onClick={() => chooseService(service)}
              >
                <span className={styles.optionIcon}><ServiceIcon slug={service.slug} /></span>
                <span>{service.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
