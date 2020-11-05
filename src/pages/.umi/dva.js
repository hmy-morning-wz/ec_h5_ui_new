import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'ebuscard', ...(require('D:/GitProgram/ec_h5_ui_new/src/models/ebuscard.js').default) });
app.model({ namespace: 'model', ...(require('D:/GitProgram/ec_h5_ui_new/src/pages/byBus/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/GitProgram/ec_h5_ui_new/src/pages/certBack/model.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
