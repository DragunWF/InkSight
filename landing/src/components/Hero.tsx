import { QRCodeSVG } from "qrcode.react";
import { LANDING_CONFIG, COLORS } from "../constants/info";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              <span className={styles.icon}>📖</span>
              {LANDING_CONFIG.app.name}
            </h1>
            <h2 className={styles.tagline}>{LANDING_CONFIG.app.tagline}</h2>
            <p className={styles.description}>
              {LANDING_CONFIG.app.description}
            </p>
            <div className={styles.cta}>
              <a href="#get-started" className={styles.primaryButton}>
                Get Started
              </a>
              <a
                href={LANDING_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryButton}
              >
                <span>⭐</span> View on GitHub
              </a>
            </div>
          </div>

          <div className={styles.qrSection}>
            <div className={styles.qrCard}>
              <h3 className={styles.qrTitle}>Scan to Try Now</h3>
              <div className={styles.qrCode}>
                <QRCodeSVG
                  value={LANDING_CONFIG.qrCode.expoGoUrl}
                  size={200}
                  level="H"
                  includeMargin={true}
                  bgColor={COLORS.background}
                  fgColor={COLORS.primary}
                />
              </div>
              <p className={styles.qrInstructions}>Open with Expo Go app</p>
            </div>
          </div>
        </div>

        <div className={styles.mockup}>
          <div className={styles.phoneFrame}>
            <div className={styles.phoneScreen}>
              <div className={styles.placeholderContent}>
                <div className={styles.placeholderHeader} />
                <div className={styles.placeholderText} />
                <div className={styles.placeholderText} />
                <div className={styles.placeholderCard} />
                <div className={styles.placeholderCard} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
