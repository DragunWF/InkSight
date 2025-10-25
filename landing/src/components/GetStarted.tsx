import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, useInView } from "framer-motion";
import { LANDING_CONFIG, COLORS } from "../constants/info";
import styles from "./GetStarted.module.css";

export default function GetStarted() {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(LANDING_CONFIG.qrCode.expoGoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.getStarted} id="get-started" ref={ref}>
      <div className={styles.container}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Try InkSight Now
        </motion.h2>
        <motion.p
          className={styles.sectionSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Scan the QR code with Expo Go to start your journaling journey
        </motion.p>

        {/* Main QR Code Card */}
        <motion.div
          className={styles.mainCard}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            className={styles.qrWrapper}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <QRCodeSVG
              value={LANDING_CONFIG.qrCode.expoGoUrl}
              size={280}
              level="H"
              includeMargin={true}
              bgColor={COLORS.background}
              fgColor={COLORS.primary}
            />
          </motion.div>

          <h3 className={styles.scanTitle}>📱 Scan to Try InkSight</h3>
          <p className={styles.scanDescription}>
            Use your phone's camera or the Expo Go app to scan this QR code and
            start using InkSight instantly.
          </p>

          <div className={styles.urlBox}>
            <code className={styles.url}>
              {LANDING_CONFIG.qrCode.expoGoUrl}
            </code>
            <motion.button
              onClick={copyToClipboard}
              className={styles.copyButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={copied ? { scale: [1, 1.2, 1] } : {}}
            >
              {copied ? "✓ Copied!" : "📋 Copy"}
            </motion.button>
          </div>
        </motion.div>

        {/* How to Use Steps */}
        <motion.div
          className={styles.stepsContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className={styles.stepsTitle}>How to Get Started</h3>
          <div className={styles.steps}>
            <motion.div
              className={styles.step}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.stepNumber}>1</div>
              <h4 className={styles.stepTitle}>Download Expo Go</h4>
              <p className={styles.stepDescription}>
                Get the free Expo Go app from your device's app store
              </p>
            </motion.div>

            <motion.div
              className={styles.step}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.stepNumber}>2</div>
              <h4 className={styles.stepTitle}>Scan QR Code</h4>
              <p className={styles.stepDescription}>
                Open Expo Go and scan the QR code above
              </p>
            </motion.div>

            <motion.div
              className={styles.step}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.stepNumber}>3</div>
              <h4 className={styles.stepTitle}>Start Journaling</h4>
              <p className={styles.stepDescription}>
                Begin capturing your thoughts and get AI insights!
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Download Expo Go Buttons */}
        <motion.div
          className={styles.downloadExpo}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h4 className={styles.downloadTitle}>Don't have Expo Go?</h4>
          <div className={styles.storeButtons}>
            <motion.a
              href={LANDING_CONFIG.links.expoGoIOS}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.storeButton}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.storeIcon}>🍎</span>
              <div className={styles.storeText}>
                <div className={styles.storeLabel}>Download on the</div>
                <div className={styles.storeName}>App Store</div>
              </div>
            </motion.a>
            <motion.a
              href={LANDING_CONFIG.links.expoGoAndroid}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.storeButton}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.storeIcon}>🤖</span>
              <div className={styles.storeText}>
                <div className={styles.storeLabel}>Get it on</div>
                <div className={styles.storeName}>Google Play</div>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Notice */}
        <motion.div
          className={styles.notice}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <p className={styles.noticeText}>
            💡 <strong>Note:</strong> InkSight is a personal project and runs
            through Expo Go. It's completely free and available to anyone with
            the app!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
