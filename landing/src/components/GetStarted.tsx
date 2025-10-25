import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { LANDING_CONFIG, COLORS } from "../constants/info";
import styles from "./GetStarted.module.css";

export default function GetStarted() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(LANDING_CONFIG.qrCode.expoGoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.getStarted} id="get-started">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Get Started</h2>
        <p className={styles.sectionSubtitle}>
          Choose your preferred way to try InkSight
        </p>

        <div className={styles.content}>
          {/* QR Code Section */}
          <div className={styles.qrSection}>
            <div className={styles.qrCard}>
              <h3 className={styles.cardTitle}>📱 Scan with Expo Go</h3>
              <p className={styles.cardDescription}>
                The easiest way to try InkSight. Scan this QR code with your
                phone's camera or the Expo Go app.
              </p>
              <div className={styles.qrWrapper}>
                <QRCodeSVG
                  value={LANDING_CONFIG.qrCode.expoGoUrl}
                  size={240}
                  level="H"
                  includeMargin={true}
                  bgColor={COLORS.background}
                  fgColor={COLORS.primary}
                />
              </div>
              <div className={styles.urlBox}>
                <code className={styles.url}>
                  {LANDING_CONFIG.qrCode.expoGoUrl}
                </code>
                <button onClick={copyToClipboard} className={styles.copyButton}>
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
              </div>
            </div>
          </div>

          {/* Download Options */}
          <div className={styles.downloadSection}>
            <div className={styles.optionCard}>
              <h3 className={styles.cardTitle}>🤖 Android (APK)</h3>
              <p className={styles.cardDescription}>
                Download the APK file directly to your Android device. No app
                store required!
              </p>
              <a
                href={LANDING_CONFIG.links.apkDownload}
                className={styles.downloadButton}
                download
              >
                Download APK
              </a>
            </div>

            <div className={styles.optionCard}>
              <h3 className={styles.cardTitle}>📲 Get Expo Go</h3>
              <p className={styles.cardDescription}>
                Don't have Expo Go? Download it first, then scan the QR code
                above.
              </p>
              <div className={styles.storeButtons}>
                <a
                  href={LANDING_CONFIG.links.expoGoIOS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.storeButton}
                >
                  <span>🍎</span> App Store
                </a>
                <a
                  href={LANDING_CONFIG.links.expoGoAndroid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.storeButton}
                >
                  <span>🤖</span> Play Store
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.notice}>
          <p className={styles.noticeText}>
            💡 <strong>Note:</strong> This is a personal project and not
            available on official app stores. Use Expo Go for the best
            experience, or download the APK for Android devices.
          </p>
        </div>
      </div>
    </section>
  );
}
