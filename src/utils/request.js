import { fetch } from 'dva';
import config from './config';
import Utils from './Utils';
// import { Toast } from 'antd-mobile';
import router from 'umi/router';
// import hash from 'hash.js';


const CTOKEN_HEADER_NAME = 'COM_IOC_CTOKEN';

const checkStatus = (response) => {

  if (response.status >= 200 && response.status <= 200) {

    return response;
  }
  router.replace({ pathname: '/byBus', query: { card: 'error' } });

  // Toast.fail('请求出错');

  const error = new Error(response.statusText);
  error.response = response;
  // throw error;
};

function getQueryString(params) {
  return Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
}

const JSON_HEADER = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const URLENCODE_HEADER = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/json',
};

function apiToUrl(api) {
  return api.replace(/\./g, '/');
}

function getTimestamp() {
  return Math.floor(new Date().getTime() / 1000);
}

function getFinalParam(url, options) {
  const noAutoJson = options.noAutoJson;

  const opts = Object.assign(options, {
    headers: (URLENCODE_HEADER),
    credentials: 'include',
  });

  let finalUrl = url;

  const method = options.method;
  const body = options.body;

  if (method === 'GET' || method === 'DELETE') {
    if (body) {
      finalUrl = `${finalUrl}?${getQueryString(body)}`;
      delete opts.body;
    }
  } else {
    opts.body = getQueryString(body)
  }

  return {
    furl: finalUrl,
    fopt: opts
  }
}

export default async function request(url, options = {}, alt) {
  options.headers = URLENCODE_HEADER;
  if (global.ebusConfig) {
    options.headers[CTOKEN_HEADER_NAME] = global.ebusConfig.jsession;
  }
  let res
  if (config.mock) {
    const finUrl = `api/${apiToUrl(url)}`;
    res = await fetch(getFinalParam(finUrl, options).furl, getFinalParam(finUrl, options).fopt);
  } else {
    const bizContent = JSON.stringify(options.body || {});
    const newBody = {
      service: url,
      biz_content: bizContent,
      v: (options.ver || '2.0'),
      timestamp: getTimestamp(),
    };
    const { furl, fopt } = getFinalParam(config.gateWay, { ...options, body: newBody })
    res = await fetch(`${config.host}${furl}`, fopt);
  }
  // console.log(res,'resresresresres')

  checkStatus(res);
  try {
    const responseData = await res.json();
    if (!responseData) {
      return {}
    }
    if (alt) {
      // alert('code' + responseData.code + 'data:' + responseData.data)
    }
    if (responseData && responseData.code == 200) {
      // console.log(responseData)
      return responseData.data || {};
    } else if (responseData.code == 302) {
      // Utils.setTransparentTitle(false);
      window.location.href = responseData.redirectUrl
    } else {
      router.replace({ pathname: '/byBus', query: { card: 'error', msg: alt ? '领卡失败' : '出错啦' } });
    }
  } catch {
    // Toast.fail('请求出错');
    router.replace({ pathname: '/byBus', query: { card: 'error' } });
  }

}
