import React from 'react';
import { getCard } from '@/common/constants';
// import MyButton from '@/common/components/button';
import MenuList from '../menuList';
import styles from './index.less';
import { connect } from 'dva';

const GetCard = (props) => {
  const { dispatch, putOnJson, commonJson } = props;
  const goByBus = () => {
    window.Tracker && window.Tracker.click('领卡成功页-去乘车按钮', {}, function () {
      dispatch({
        type: 'byBus/goByBus'
      })
    });
  }
  return (
    <>
      <div className={styles.getCardHeight} />
      <div className={styles.cardPad}>
        <div className={styles.getCard}>
          <div className={styles.getCardText}>
            <img src={getCard} alt='' />
            <span>领卡成功</span>
          </div>
          <img className={styles.energy} src={putOnJson && putOnJson.energyImg} alt="" />
        </div>
        <div className="appBlock appWidAll">
          <div className={styles.userCard}>
            <div className={styles.useCardImg}>
              <img src={commonJson && commonJson.succPageImg} alt='' />
            </div>
            <div className={styles.useCardText}>{commonJson && commonJson.succPageInfo}</div>
          </div>
          <div className={styles.useButton} onClick={goByBus}>
            <div className={styles.subButton}>
              去乘车
            </div>
          </div>
          {/* <div className={styles.useButton}>
            <MyButton title="去乘车" />
          </div> */}
        </div>
        {
          putOnJson && putOnJson.succPageLists.length > 0 && (
            <MenuList title="如何使用刷码乘车" list={putOnJson.succPageLists} />
          )
        }
      </div>
    </>
  )
}

export default connect(({ byBus }) => ({
  byBus
}))(GetCard);