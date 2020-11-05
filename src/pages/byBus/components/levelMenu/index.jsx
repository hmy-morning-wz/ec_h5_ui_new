import React from 'react';
import styles from './index.less';

export default function (props) {
  const { list, num = 3 } = props;
  const doTrack = (seed) => {
    window.Tracker && window.Tracker.click(seed)
  }
  return (
    <div className={styles.menu}>
      {
        list.map((item, i) => {
          if (i <= 2) {
            return (
              <div
                key={`interestImg-${i}`}
                className={styles.menuChild}
                style={{
                  width: `${100 / num}%`
                }}
                onClick={() => {doTrack(`利益点-${i + 1}-${item.text}`)}}
              >
                <div className={styles.menuChildIcon}>
                  <img src={item.image} alt='' />
                </div>
                <div className={styles.menuChildText}>{item.text}</div>
              </div>
            )
          }
        })
      }
    </div >
  )
}