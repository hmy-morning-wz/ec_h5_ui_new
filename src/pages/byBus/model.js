import { getCertUrl, getPutOnJson, getCommonJson, getStrategy, getFaq, getCard } from '../../services/busService'
import { routerRedux } from 'dva/router';
import config from '../../utils/config'
import Utils from '../../utils/Utils';

const ByBus = {
  namespace: 'byBus',

  state: {
    card: ''
  },

  effects: {
    * query({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: payload
      });
      console.log('card', payload)
    },
    * backHome({ payload }, { call, put }) {
      yield put(routerRedux.replace('/byBus'))
    },
    * goByBus({ payload }, { call, put }) {
      // const response = yield call(getCard, payload);
      const params = {
        action: 'use',
        scene: 'TRANSIT',
        subScene: global.ebusConfig.city && global.ebusConfig.city.cityCode,
        source: global.ebusConfig.city && global.ebusConfig.city.alipaySource,
        cardType: global.ebusConfig.city && global.ebusConfig.city.alipayCardType,
      };
      const queryStr = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
      const finalUrl = `${config.alipayBusQRUrl}?${queryStr}`
      // Utils.setTransparentTitle(false);
      global.open(finalUrl)
    },
    * fetchCertUrl({ payload, callback }, { call, put }) {
      const response = yield call(getCertUrl, payload);
      if (response) {
        // Utils.setTransparentTitle(false);
        if (global.ap) {
          global.ap.pushWindow(response.url);
        } else {
          global.open(response.url);
        }
      }
    },
    * fetchTotalJson({ payload, callback }, { call, put }) {
      const response = yield call(getPutOnJson, payload);
      let result = (response && response.json) || {}
      yield put({
        type: 'saveJson',
        payload: {
          putOnJson: result
        }
      });
    },
    * fetchCommonJson({ payload, callback }, { call, put }) {
      const response = yield call(getCommonJson, payload);
      let result = (response && response.json) || {}
      yield put({
        type: 'saveCommonJson',
        payload: {
          commonJson: result
        }
      });
    },
    * fetchFaq({ payload, callback }, { call, put }) {
      const response = yield call(getFaq, payload);
      yield put({
        type: 'saveFaq',
        payload: {
          faq: response
        }
      });
    },
    * fetchStrategy({ payload, callback }, { call, put }) {
      const response = yield call(getStrategy, payload);
      yield put({
        type: 'saveStrategy',
        payload: {
          strategy: response
        }
      });
    },
    * showBot({ payload, callback }, { call, put }) {
      yield put({
        type: 'saveBot',
        payload: {
          showBottom: payload.showBottom
        }
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveJson(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveCommonJson(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveFaq(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveStrategy(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveBot(state, action) {
      // console.log('save',action)
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        // console.log('location is: %o', location);
        // console.log('重定向接收参数：%o', location.query)
        Utils.setTransparentTitle(true);
        // alert(JSON.stringify(location))
        // if (location.query && (location.query.card == 'getCard' || location.query.card == 'error')) {
        //   window.AlipayJSBridge && window.AlipayJSBridge.call('hideOptionMenu');
        //   document.removeEventListener('optionMenu', function (e) { });
        // } else {
          // window.AlipayJSBridge && window.AlipayJSBridge.call('showOptionMenu', () => {
            window.AlipayJSBridge && window.AlipayJSBridge.call('setOptionMenu', {
              title: '全部城市',
              redDot: '-1', // -1表示不显示，0表示显示红点，1-99表示在红点上显示的数字
              color: '#FFFFFF', // 必须以＃开始ARGB颜色值
            });
            window.AlipayJSBridge && window.AlipayJSBridge.call('showOptionMenu')
            document.addEventListener('optionMenu', function (e) {
              window.Tracker && window.Tracker.click('点击全部城市',{},function(){
                global.open("alipays://platformapi/startapp?appId=60000098&url=%2Fwww%2Favl_card_list.html")
              });              
            }, false);
          // });
        // }

        dispatch({
          type: 'query',
          payload: {
            card: (location.query && location.query.card) || 'noCard',
            msg: (location.query && location.query.msg) || '出错啦',
          }
        });

      })
    },
  },
};

export default ByBus;