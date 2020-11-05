import { register } from '../../services/busService'
import { routerRedux } from 'dva/router';

const CertBack = {
  namespace: 'certBack',

  state: {
    card: ''
  },

  effects: {
    * register({ payload, callback }, { call, put }) {
      const  data  = yield call(register, payload);
      if (data) {
        if (data.alipayMiniappUrl) {
          // 跳转小程序
          window.AlipayJSBridge&&window.AlipayJSBridge.call('pushWindow', {
            url: data.alipayMiniappUrl
          })
          window.AlipayJSBridge&&window.AlipayJSBridge.call('popWindow')
        } else {
          yield put(routerRedux.replace({ pathname: '/byBus', query: { card: 'getCard' } }))
        }
      }
    },
  },
  reducers: {
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },
};

export default CertBack;