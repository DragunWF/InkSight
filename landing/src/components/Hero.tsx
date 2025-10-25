import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { LANDING_CONFIG, COLORS } from "../constants/info";
import styles from "./Hero.module.css";

export default function Hero() {
  // Typewriter effect for tagline
  const taglineText = LANDING_CONFIG.app.tagline;
  const words = taglineText.split(" ");

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span
                className={styles.icon}
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                📖
              </motion.span>
              {LANDING_CONFIG.app.name}
            </motion.h1>

            <h2 className={styles.tagline}>
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  style={{ display: "inline-block", marginRight: "0.3em" }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <motion.p
              className={styles.description}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {LANDING_CONFIG.app.description}
            </motion.p>
            <motion.div
              className={styles.cta}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.a
                href="#get-started"
                className={styles.primaryButton}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 30px rgba(90, 79, 207, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.a>
              <motion.a
                href={LANDING_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  ⭐
                </motion.span>{" "}
                View on GitHub
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className={styles.qrSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              className={styles.qrCard}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 50px rgba(90, 79, 207, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className={styles.qrTitle}>Scan to Try Now</h3>
              <motion.div
                className={styles.qrCode}
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <QRCodeSVG
                  value={LANDING_CONFIG.qrCode.expoGoUrl}
                  size={200}
                  level="H"
                  includeMargin={true}
                  bgColor={COLORS.background}
                  fgColor={COLORS.primary}
                />
              </motion.div>
              <p className={styles.qrInstructions}>Open with Expo Go app</p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className={styles.mockup}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <motion.div
            className={styles.phoneFrame}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className={styles.phoneScreen}>
              <div className={styles.placeholderContent}>
                <div className={styles.placeholderHeader} />
                <div className={styles.placeholderText} />
                <div className={styles.placeholderText} />
                <div className={styles.placeholderCard} />
                <div className={styles.placeholderCard} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
