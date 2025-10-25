import { LANDING_CONFIG } from "../constants/info";
import styles from "./Features.module.css";

export default function Features() {
  return (
    <section className={styles.features} id="features">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Powerful Features</h2>
        <p className={styles.sectionSubtitle}>
          Everything you need to transform your journaling experience
        </p>

        <div className={styles.grid}>
          {LANDING_CONFIG.features.map((feature, index) => (
            <div
              key={index}
              className={styles.card}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{feature.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
