import React from 'react';
import Title from '@/common/components/title';
import styles from './index.less';

export default function (props: any) {
  const { list, title = '自定义标题' } = props;
  interface problemData {
    question: string,
    answer: string
  }
  return (
    <div className="appBlock" >
      <div data-expo="常见问题板块曝光">
        <Title title={title} />
      </div>
      <div className={styles.appProblem}>
        {
          list.map((item: problemData, i: number) => {
            return (
              <div
                key={`problem-${i}`}
                className={styles.problemChild}
              >
                <div className={styles.problemTitle}>
                  <i className={styles.problemIcon} />
                  <span>{item.question}</span>
                </div>
                <div className={styles.problemText}>
                  <i className={styles.problemIcon} />
                  <span>{item.answer}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  ) 
}