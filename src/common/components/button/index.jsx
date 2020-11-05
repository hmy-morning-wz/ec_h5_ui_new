import React from 'react';
import styles from './index.less';

export default function(props) {
  const { loading, title = '' } = props;
  return (
    <>
      {
        loading ? (
          <div className={`${styles.subButton} ${styles.loadingButton}`}>
            <div>
              <div className={styles.loading}>
                <div />
                <div />
                <div />
              </div>
            </div>
            <div className={styles.loadingText}>{title}...</div>
          </div>
        ) : (
          <div className={styles.subButton}>{title}</div>
        )
      }
    </>
  )
}