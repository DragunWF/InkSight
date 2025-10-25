import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, useInView } from "framer-motion";
import { LANDING_CONFIG, COLORS } from "../constants/info";
import styles from "./GetStarted.module.css";

export default function GetStarted() {
  const [copied, setCopied] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(LANDING_CONFIG.qrCode.expoGoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 1000);
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
          Get Started
        </motion.h2>
        <motion.p
          className={styles.sectionSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Choose your preferred way to try InkSight
        </motion.p>

        <div className={styles.content}>
          {/* QR Code Section */}
          <motion.div
            className={styles.qrSection}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className={`${styles.qrCard} hoverable`}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 50px rgba(90, 79, 207, 0.3)",
              }}
            >
              <h3 className={styles.cardTitle}>📱 Scan with Expo Go</h3>
              <p className={styles.cardDescription}>
                The easiest way to try InkSight. Scan this QR code with your
                phone's camera or the Expo Go app.
              </p>
              <motion.div
                className={styles.qrWrapper}
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <QRCodeSVG
                  value={LANDING_CONFIG.qrCode.expoGoUrl}
                  size={240}
                  level="H"
                  includeMargin={true}
                  bgColor={COLORS.background}
                  fgColor={COLORS.primary}
                />
              </motion.div>
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
          </motion.div>

          {/* Download Options */}
          <motion.div
            className={styles.downloadSection}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div
              className={`${styles.optionCard} hoverable`}
              whileHover={{ y: -5 }}
            >
              <h3 className={styles.cardTitle}>🤖 Android (APK)</h3>
              <p className={styles.cardDescription}>
                Download the APK file directly to your Android device. No app
                store required!
              </p>
              <motion.a
                href={LANDING_CONFIG.links.apkDownload}
                className={styles.downloadButton}
                download
                onClick={handleDownload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download APK
                {confetti && <Confetti />}
              </motion.a>
            </motion.div>

            <motion.div
              className={`${styles.optionCard} hoverable`}
              whileHover={{ y: -5 }}
            >
              <h3 className={styles.cardTitle}>📲 Get Expo Go</h3>
              <p className={styles.cardDescription}>
                Don't have Expo Go? Download it first, then scan the QR code
                above.
              </p>
              <div className={styles.storeButtons}>
                <motion.a
                  href={LANDING_CONFIG.links.expoGoIOS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.storeButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>🍎</span> App Store
                </motion.a>
                <motion.a
                  href={LANDING_CONFIG.links.expoGoAndroid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.storeButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>🤖</span> Play Store
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className={styles.notice}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className={styles.noticeText}>
            💡 <strong>Note:</strong> This is a personal project and not
            available on official app stores. Use Expo Go for the best
            experience, or download the APK for Android devices.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Confetti Component
function Confetti() {
  return (
    <div className={styles.confettiContainer}>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={styles.confetti}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: -100,
            x: Math.random() * 100 - 50,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: [
              "#5A4FCF",
              "#8B5CF6",
              "#FFD700",
              "#FF6B6B",
              "#4ECDC4",
            ][Math.floor(Math.random() * 5)],
          }}
        />
      ))}
    </div>
  );
}
