
import request from '../utils/request';

const cardService = {
  cityCode: global.ebusConfig.city.cityCode
}
const apiVersion_1 = {
  ver: "1.0"
}
const apiVersion_2 = {
  ver: "2.0"
}
const deviceIs = (name) => {
  const u = navigator.userAgent;
  if ('Android' === name) {
    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  }
  if ('iOS' === name) {
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  }
  return false;
}

const parseUA = () => {
  const ua = navigator.userAgent;
  const regx = new RegExp(/(\([^\(\)]*\))/);
  const group = regx.exec(ua);
  let info = group[0];
  info = info.substr(1, info.length - 1);
  const pi = info.split(';');
  if (deviceIs('iOS')) {
    return {
      app: 'alipay',
      model: pi[0],
      platform: pi[1]
    };
  }
  if (deviceIs('Android')) {
    return {
      app: 'alipay',
      model: pi[4].split('Build/')[0],
      platform: pi[2]
    };
  }
  return {
    app: 'alipay', model: 'unknown', platform: 'unknown'
  };
}

export async function getUsers() {
  return request('users', { method: 'GET' });
}
export async function getCertUrl(param) {
  return request('ioc.ebuscard.certification.url', { method: 'GET', body: { ...param, ...cardService }, ...apiVersion_1 });
}
export async function getPutOnJson(param) {
  return request('ioc.ebuscard.card.open', { method: 'GET', body: { ...param, ...cardService }, ...apiVersion_2 });
}
export async function getCommonJson(param) {
  return request('ioc.ebuscard.card.common', { method: 'GET', body: { ...param, ...cardService }, ...apiVersion_2 });
}
export async function getFaq(param) {
  return request('ioc.ebuscard.card.faq', { method: 'GET', body: { ...param, ...cardService }, ...apiVersion_2 });
}
export async function getStrategy(param) {
  return request('ioc.ebuscard.card.guide', { method: 'GET', body: { ...param, ...cardService }, ...apiVersion_2 });
}
export async function register(param) {
  return request('ioc.ebuscard.card.register', { method: 'GET', body: { ...param, ...cardService }, ...apiVersion_1 }, 'alert');
}
export async function getCard() {
  let ua = { app: 'alipay', model: 'unknown', platform: 'unknown' };
  try {
    ua = parseUA();
  } catch (ignored) { }
  return request('ioc.ebuscard.card.my', { method: 'GET', body: { ...ua, ...cardService }, ...apiVersion_1 });
}