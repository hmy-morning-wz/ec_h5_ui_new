import React from 'react';
import styles from './index.less';

export default function (props) {
  const { list, num = 1 } = props;
  const openUrl = (url,seed) => {
    window.Tracker && window.Tracker.click(seed, {}, function () {
      if (global.ap) {
        global.ap.pushWindow(url);
      } else {
        global.open(url);
      }
    });
  }
  return (
    <div className="appBlock" style={{ padding: 0 }}>
      <div className={styles.appMenu}>
        {
          list.map((item, i) => {
            if (i <= num) {
              return (
                <div key={`menuItem-${i}`} className={styles.menuItem}>
                  <div className={styles.appMenuLogo}>
                    <img src={item.iconImg} alt='' />
                  </div>
                  <div className={styles.appMenuCt}>
                    <div className={styles.appMenuTitle}
                      style={{ color: item.color || '#1677FF' }}>{item.title}</div>
                    <div className={styles.appMenuSub}>{item.subTitle}</div>
                  </div>
                  <div
                    className={styles.appMenuButton}
                    style={{ backgroundColor: item.color || '#fff', borderColor: item.color || '#1677FF', color: item.color ? '#fff' : '#1677FF' }}
                    onClick={() => openUrl(item.link,`结果页引导项-${item.title}-点击`)}
                  >
                    {item.buttonName}
                  </div>
                </div>
              )
            }
          })
        }
      </div>
    </div>
  )
}