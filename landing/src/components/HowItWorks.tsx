import { LANDING_CONFIG } from "../constants/info";
import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  return (
    <section className={styles.howItWorks} id="how-it-works">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <p className={styles.sectionSubtitle}>
          Get started in three simple steps
        </p>

        <div className={styles.steps}>
          {LANDING_CONFIG.steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
              {index < LANDING_CONFIG.steps.length - 1 && (
                <div className={styles.connector} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
