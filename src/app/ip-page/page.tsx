'use client';

import { useEffect, useState } from 'react';
import AnimatedSmoke from '../../components/layout/animated-smoke';
import { getUserInfo, UserInfo } from '../../library/utils/getUserInfo';
import styles from './page.module.css';

export default function IPPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const info = await getUserInfo();
        setUserInfo(info);
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className={styles.container}>
      <AnimatedSmoke height="100%" />
      
      <div className={styles.content}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>
            Your Digital Footprint
          </h1>
          <p className={styles.subtitle}>
            Here's what we collected about you instantly
          </p>
          <div className={styles.badge}>
            ⚠️ This is a cybersecurity demonstration
          </div>
        </div>

        <div className={styles.mainCard}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p className={styles.loadingText}>Gathering your information...</p>
            </div>
          ) : userInfo ? (
            <div className={styles.grid}>
              <div className={styles.infoCard}>
                <h3 className={styles.cardTitle}>
                  Location Information
                </h3>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>IP Address:</span>
                    <span className={styles.infoValue}>
                      <code style={{backgroundColor: 'rgba(10, 10, 10, 0.1)', color: '#0a0a0a', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontSize: '0.75rem'}}>
                        {userInfo.ip}
                      </code>
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Country:</span>
                    <span className={styles.infoValue}>{userInfo.location.country}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Region:</span>
                    <span className={styles.infoValue}>{userInfo.location.region}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>City:</span>
                    <span className={styles.infoValue}>{userInfo.location.city}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Timezone:</span>
                    <span className={styles.infoValue}>{userInfo.location.timezone}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>ISP:</span>
                    <span className={styles.infoValue}>{userInfo.isp}</span>
                  </div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <h3 className={styles.cardTitle}>
                  Device Information
                </h3>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Platform:</span>
                    <span className={styles.infoValue}>{userInfo.platform}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Language:</span>
                    <span className={styles.infoValue}>{userInfo.language}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Screen:</span>
                    <span className={styles.infoValue}>{userInfo.screenResolution}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Timestamp:</span>
                    <span className={styles.infoValue}>{new Date(userInfo.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.errorContainer}>
              <p className={styles.errorText}>Failed to load user information</p>
            </div>
          )}

          <div style={{marginTop: '1.5rem', textAlign: 'center'}}>
            <a
              href="/"
              className={styles.backButton}
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
