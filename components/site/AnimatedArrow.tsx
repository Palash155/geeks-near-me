import { ArrowRight } from "@phosphor-icons/react/ssr";
import styles from "./animated-arrow.module.css";

export function AnimatedArrow({ size = 18 }: { size?: number }) {
  return (
    <span className={styles.clip} aria-hidden="true">
      <ArrowRight className={styles.icon} size={size} weight="bold" />
    </span>
  );
}
