import React, { useState } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import { discount, interestIcon, menuIcon01, menuIcon02, menuIcon03, method01, method02, method03, interestImage, interestMenu, tips, imgTextHot } from '@/common/constants';
import MyButton from '@/common/components/button';
import Title from '@/common/components/title';
import LevelMenu from '../levelMenu';
import Problem from '../problem';
import ImageTextList from '../imageTextList';
import styles from './index.less';
import Header from '../header';

const NoCard = (props) => {
  const { dispatch, putOnJson = {}, strategy, faq, byBus: { showBottom } } = props;
  // console.log(putOnJson, 'stragety')
  const [buttonLoad, setButtonLoad] = useState(false);
  const [animation, setAnimation] = useState(false);

  let topHeight = 0

  const showBot = async (name) => {
    if (name) {
      window.Tracker && window.Tracker.click('腰封点击');
    }
    await dispatch({
      type: 'byBus/showBot',
      payload: {
        showBottom: true
      },
    })
    scrollToAnchor('strategy')
  }

  const scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        window.AlipayJSBridge && window.AlipayJSBridge.call('getTitleAndStatusbarHeight', function (result) {
          let statusBarHeight = result.statusBarHeight
          let titleBarHeight = result.titleBarHeight
          const userAgent = navigator.userAgent;
          /* Android 终端 */
          let isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1
          /* ios终端 */
          let isIos = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
          if (isIos) {
            if (statusBarHeight == 44 && window.screen.width == 414) {//iphone11
              topHeight = Number(anchorElement.offsetTop) - 2 * Number(statusBarHeight) - 2 * Number(titleBarHeight)
            } else {
              topHeight = Number(anchorElement.offsetTop) - 3 * Number(statusBarHeight) - 3 * Number(titleBarHeight)
            }
          } else if (isAndroid) {
            topHeight = Number(anchorElement.offsetTop) - 3 * Number(statusBarHeight) - 3 * Number(titleBarHeight)
            // alert('android'+topHeight)
          } else {
            topHeight = Number(anchorElement.offsetTop)
          }
          window.scrollTo({
            left: 0,
            top: topHeight,
            behavior: 'smooth'
          })
        });
      }
    }
  }

  const readProtocol = (url, name) => {
    window.Tracker && window.Tracker.click(`点击${name}`, {}, function () {
      if (global.ap) {
        global.ap.pushWindow(url);
      } else {
        global.open(url);
      }
    });
  }

  const getCard = async () => {
    window.Tracker && window.Tracker.click('领卡按钮点击')
    setButtonLoad(true);
    await dispatch({
      type: 'byBus/fetchCertUrl'
    })
    setButtonLoad(false);
  }
  return (
    <div>
      <Header cardImage={putOnJson.cardImg} energyImage={putOnJson.energyImg} onStartAnimation={(s) => setAnimation(s)} />
      <div className={styles.content}>
        <div className={classnames('appBlock', styles.getCardContent, animation ? styles.cardWithAnimation : '')}>
          <Title title={putOnJson.getCardTitle} />
          <div className={styles.discountBor}>
            <div className={styles.discount}>
              <img src={putOnJson.discountImg} alt='' />
              {/* <div className={styles.discountLine} />
              <div className={styles.discountText}>1分钱刷码乘车</div> */}
            </div>
          </div>
          {
            putOnJson.benefitPointList && putOnJson.benefitPointList.length > 0 && !showBottom && (
              <div onClick={() => showBot()}>
                <LevelMenu list={putOnJson.benefitPointList} num={3} />
              </div>
            )
          }
          {
            putOnJson.tips && !showBottom && (
              <div className={styles.tips} onClick={() => showBot('腰封点击')}>
                <img className={styles.topsIcon} src={putOnJson.tips.image} alt='' />
                <div className={styles.tipsText}>
                  {putOnJson.tips.text}
                </div>
                <div className={styles.tipsMore} />
              </div>
            )
          }
          <div className={styles.agreeButton} data-aspm='c46839' data-aspm-expo>
            {
              buttonLoad ? (
                <MyButton loading title="领卡中" />
              ) : (
                  <div onClick={getCard} data-aspm-click='c46839.d95925'>
                    <MyButton title="同意协议并领卡" />
                  </div>
                )
            }
          </div>
          {
            putOnJson.agreements && putOnJson.agreements.length > 0 && (
              <div className={styles.agreement}>
                <span>开通并同意</span><a onClick={() => readProtocol(putOnJson.agreements[0].protocolUrl, `${putOnJson.cardName}服务协议`)}>《{putOnJson.cardName}服务协议》</a><a onClick={() => readProtocol(putOnJson.agreements[1].protocolUrl, '公交先享后付服务和芝麻服务等相关协议')}>《公交先享后付服务和芝麻服务等相关协议》</a>
              </div>
            )
          }
        </div>
        <div id="strategy">
          {
            strategy && strategy.json && strategy.json.length > 0 && showBottom && (
              <ImageTextList title={strategy.title} list={strategy.json} />
            )
          }
          {
            faq && faq.json && faq.json.length > 0 && showBottom && (
              <Problem title={faq.title} list={faq.json} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default connect(({ byBus }) => ({
  byBus
}))(NoCard);