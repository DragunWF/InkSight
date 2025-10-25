import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";
import styles from "./FloatingScrollButton.module.css";

export default function FloatingScrollButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsVisible(latest > 0.2);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className={styles.progressBar}
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Scroll to Top Button */}
      <motion.button
        className={styles.scrollButton}
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
        whileHover={{ scale: 1.1, rotate: -10 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
      >
        <FiArrowUp className={styles.icon} />
      </motion.button>
    </>
  );
}
