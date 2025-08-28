'use client';

import { useEffect, useState } from 'react';
import AnimatedSmoke from '../components/layout/animated-smoke';
import QRCodeComponent from '../components/QRCodeComponent';
import styles from './page.module.css';

export default function Home() {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // Get the current URL and create the IP page URL
    const baseUrl = window.location.origin;
    const ipPageUrl = `${baseUrl}/ip-page`;
    setCurrentUrl(ipPageUrl);
  }, []);

  return (
    <div className={styles.container}>
      <AnimatedSmoke height="100vh" />
      
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <div className={styles.mainCard}>
            <h2 className={styles.cardTitle}>
              Scan QR Code to See Your Digital Footprint
            </h2>
            
            <div className={styles.qrSection}>
              <div className={styles.qrWrapper}>
                {currentUrl && (
                  <QRCodeComponent 
                    value={currentUrl} 
                    size={200} 
                  />
                )}
              </div>
              
              <div className={styles.infoSection}>
                <h3 className={styles.infoTitle}>
                  What happens when you scan?
                </h3>
                <ul className={styles.infoList}>
                  <li className={styles.infoItem}>
                    <span className={styles.infoBullet}>•</span>
                    Your IP address is logged
                  </li>
                  <li className={styles.infoItem}>
                    <span className={styles.infoBullet}>•</span>
                    Location data is collected
                  </li>
                  <li className={styles.infoItem}>
                    <span className={styles.infoBullet}>•</span>
                    Device information is gathered
                  </li>
                  <li className={styles.infoItem}>
                    <span className={styles.infoBullet}>•</span>
                    Browser fingerprint is recorded
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.ctaSection}>
              <a
                href="/ip-page"
                className={styles.ctaButton}
              >
                View Your Information Directly →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
