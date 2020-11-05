
const DECIMAL_PRECISE = 1e-7;

const formatRMBYuan = (fen) => {
  const yuan = fen / 100;
  const decimal = Math.abs(yuan - Math.floor(yuan));
  const equal = decimal < DECIMAL_PRECISE;

  if (equal) {
    return yuan;
  } else {
    return yuan.toFixed(2);
  }
};

const formatRMBYuanDecimal = (fen) => {
  return (fen / 100).toFixed(2);
};

const setTransparentTitle = (transparent) => {
  if (global.AlipayJSBridge) {
    const transparentTitle = transparent ? 'auto' : 'none';
    // global.AlipayJSBridge.call('setTitle', {
    //   title: ' ',
    // });
    global.AlipayJSBridge.call('setTransparentTitle', { transparentTitle }, () => { });
    global.AlipayJSBridge.call('hideOptionMenu')
  }
};

export default {
  formatRMBYuan,
  formatRMBYuanDecimal,
  setTransparentTitle
};
