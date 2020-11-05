
import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import styles from './index.less';

import config from '../../utils/config';
import { async } from 'q';

config.cdnHost = (global.ebusConfig && global.ebusConfig.cdnHost) || '';

const CertBackPage = (props) => {
  const { dispatch } = props;
  const getQuery = () => {
    let params = {}
    let query = global.location.search.substring(1)
    let arr = query.split('&')
    for (var i = 0, l = arr.length; i < l; i++) {
      var a = arr[i].split("=");
      params[a[0]] = a[1];
    }
    return params;
  }
  const q = getQuery()
  let mode = 1;
  let requestId;
  let authCode;
  let isCreditOpened;

  if ('request_id' in q) {
    requestId = q.request_id;
    authCode = q.auth_code;
    mode = 1;
  } else if ('isCreditOpened' in q) {
    mode = 2;
    isCreditOpened = q.isCreditOpened;
  }

  // console.log(requestId, mode, authCode, isCreditOpened, '11111111')


  const doRegister = async () => {
    let param = {};
    switch (mode) {
      case 1:
        param = { requestId, authCode };
        break;
      case 2:
        param = { isCreditOpened };
        break;
      default:
        break;
    }
    await dispatch({
      type: 'certBack/register',
      payload: param
    })
  }


  useEffect(() => {
    doRegister()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div title="LOADING" className={styles.loading}>
      <div className={styles.circle_loading_wrap} style={{ backgroundImage: `url(${config.cdnHost}/image/loading_bg.png)` }}>
        <img id="moving" className={styles.bus} src={`${config.cdnHost}/image/bus.png`} alt="IMG" />
      </div>
    </div>
  );
}

export default connect(({ certBack }) => ({
  certBack
}))(CertBackPage);