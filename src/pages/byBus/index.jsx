
import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import GetCard from './components/getCard';
import ErrorPage from './components/error';
import NoCard from './components/noCard';
import styles from './index.less';

import config from '../../utils/config';

config.cdnHost = (global.ebusConfig && global.ebusConfig.cdnHost) || '';

const ByBusPage = (props) => {
  const { dispatch, byBus: { card, msg, certUrl, putOnJson, commonJson, strategy, faq } } = props;
  const [iphoneNum, setIphoneNum] = useState(0);
  const initApp = () => {
    window.AlipayJSBridge && window.AlipayJSBridge.call('getTitleAndStatusbarHeight', function (result) {
      const appStatusHeight = Number(result.statusBarHeight || '44');
      const marginNum = appStatusHeight === 0 ? 0 : appStatusHeight - 44;
      // console.log(marginNum)
      setIphoneNum(marginNum);
    });
  }
  const bindHandleScroll = () => {
    // console.log(window.scrollY, 'scrolly')
    if (window.scrollY === 0) {
      dispatch({
        type: 'byBus/showBot',
        payload: {
          showBottom: false
        },
      })
    }
  }
  useEffect(() => {
    initApp();
    window.addEventListener('scroll', bindHandleScroll)
    // console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
    async function fetchData() {
      dispatch({
        type: 'byBus/fetchTotalJson'
      })
      // console.log(card,'card herehereherehereherehere')
      if (card === 'getCard' || card === 'error') {
        dispatch({
          type: 'byBus/fetchCommonJson'
        })
      } else {
        dispatch({
          type: 'byBus/fetchStrategy',
        })
        dispatch({
          type: 'byBus/fetchFaq',
        })
      }

    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card]);
  const fotLogo = <div className={styles.fotLogo}><div className={styles.qrCodeImg}></div><div>本服务由{putOnJson && putOnJson.ownerName}、支付宝、通卡联城联合提供</div></div>
  const showDom = () => {
    if (card) {
      if (card === 'getCard') {
        return <GetCard putOnJson={putOnJson} commonJson={commonJson} />
      } else if (card === 'error') {
        return <ErrorPage commonJson={commonJson} msg={msg} />
      } else {
        return <NoCard certUrl={certUrl} putOnJson={putOnJson} faq={faq} strategy={strategy} />
      }
    }
  }
  // alert(iphoneNum)
  return (
    <div className={styles.app}>
      <div style={{
        marginTop: `${iphoneNum}px`
      }} className={styles.appBack}>
        {showDom()}
        {fotLogo}
      </div>
    </div>
  );
}

export default connect(({ byBus }) => ({
  byBus
}))(ByBusPage);