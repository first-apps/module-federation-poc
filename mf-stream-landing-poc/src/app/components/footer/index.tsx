import React from "react";
import styles from "./footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <h6 className={styles.footerText}>Footer</h6>
    </footer>
  );
};
