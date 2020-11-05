import React from 'react';
import Title from '@/common/components/title';
import styles from './index.less';

export default function(props) {
  const { list, title = '自定义标题' } = props;
  return (
    <div className="appBlock">
      <div data-expo="使用攻略板块曝光">
        <Title title={title} />
      </div>
      <div className={styles.appImageText}>
        {
          list.map((item, i) => {
            return (
              <div
                key={`imgText-${i}`}
                className={styles.imgTextChild}
                style={{
                  flexDirection: i%2 !== 0 ? 'row' : 'row-reverse'
                }}
              >
                <img src={item.icon} alt='' />
                <div className={styles.imgTextCt}>
                  <div className={styles.imgTextTitle}>{item.subject}</div>
                  <div className={styles.imgTextSub}>{item.desc}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}