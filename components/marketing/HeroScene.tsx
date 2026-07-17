"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useState } from "react";
import { LogoMark } from "@/components/brand/Logo";
import styles from "./hero-scene.module.css";

const TechCanvas = dynamic(() => import("./TechCanvas"), {
  ssr: false,
  loading: () => null,
});

export function HeroScene() {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.windowBar}>
        <div><LogoMark className={styles.windowLogo} /><span>Geeks support desk</span></div>
        <p><i /> Taking requests</p>
      </div>

      <div className={styles.sceneViewport}>
        <div className={styles.halo} />
        <div className={styles.orbit} />
        <div className={styles.orbitSecondary} />

        <div className={`${styles.poster} ${ready ? styles.posterHidden : ""}`}>
          <div className={styles.posterScreen}>
            <LogoMark className={styles.posterLogo} />
            <span className={styles.scanLine} />
          </div>
          <span className={styles.posterStand} />
          <span className={styles.posterBase} />
        </div>

        <TechCanvas reducedMotion={Boolean(reduceMotion)} onReady={() => setReady(true)} />
      </div>

      <div className={styles.requestPanel}>
        <div className={styles.requestIcon}><span /><span /><span /></div>
        <p>Support request</p>
        <strong>Wi-Fi keeps dropping out</strong>
        <div className={styles.reviewStatus}><i /> Ready for review</div>
      </div>

      <div className={styles.dataTagTop}>
        <span /> Secure connection
      </div>

      <div className={styles.modePanel}>
        <p>Choose your support</p>
        <div><span>Remote</span><span>On-site</span></div>
        <small>Your time is confirmed after review.</small>
      </div>
    </div>
  );
}
