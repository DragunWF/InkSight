import { LANDING_CONFIG } from "../constants/info";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.branding}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>✨</span>
              <span className={styles.logoText}>{LANDING_CONFIG.app.name}</span>
            </div>
            <p className={styles.tagline}>{LANDING_CONFIG.app.tagline}</p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Product</h4>
              <a href="#features" className={styles.link}>
                Features
              </a>
              <a href="#how-it-works" className={styles.link}>
                How It Works
              </a>
              <a href="#get-started" className={styles.link}>
                Get Started
              </a>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Resources</h4>
              <a
                href={LANDING_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                GitHub
              </a>
              <a href="#about" className={styles.link}>
                About
              </a>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Connect</h4>
              <a
                href={`mailto:${LANDING_CONFIG.contact.email}`}
                className={styles.link}
              >
                Email
              </a>
              <a
                href={LANDING_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Contribute
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} {LANDING_CONFIG.contact.name}. Made with ❤️ for
            personal growth.
          </p>
          <p className={styles.disclaimer}>
            This is a personal project, not affiliated with any commercial
            entity.
          </p>
        </div>
      </div>
    </footer>
  );
}
