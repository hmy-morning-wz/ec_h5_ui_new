import React from 'react';
import { connect } from 'dva';
import { errorIcon } from '@/common/constants';
import MyButton from '@/common/components/button';
import MenuList from '../menuList';
import styles from './index.less';

const ErrorPage = (props) => {
  const { dispatch, commonJson, msg } = props;

  const backHome = async () => {
    window.Tracker && window.Tracker.click('领卡失败页-返回重试按钮', {}, function () {
      dispatch({
        type: 'byBus/backHome'
      })
    });
  }

  return (
    <>
      <div className={styles.getCardHeight} />
      <div className={styles.cardPad}>
        <div className={styles.getCard}>
          <div className={styles.getCardText}>
            <img src={errorIcon} alt='' />
            <span>{msg}</span>
          </div>
        </div>
        <div className="appBlock appWidAll">
          <div className={styles.userCard}>
            <div className={styles.useCardImg}>
              <img src={commonJson && commonJson.errorPageImg} alt='' />
            </div>
            <div className={styles.useCardText}>{commonJson && commonJson.errorPageInfo}</div>
          </div>
          <div className={styles.useButton} onClick={backHome}>
            <MyButton title="返回重试" />
          </div>
        </div>
        {
          commonJson && commonJson.errorPageLists.length > 0 && (
            <MenuList title="如何使用刷码乘车" list={commonJson.errorPageLists} num={0} />
          )
        }
      </div>
    </>
  )
}

export default connect(({ byBus }) => ({
  byBus
}))(ErrorPage);