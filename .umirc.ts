
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  hash: true,
  history: 'hash',
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/byBus',
          component: './byBus',
          title: '领卡乘公交'
        },
        {
          path: '/certCallback',
          component: './certBack'
        }
      ],
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: true,
      dynamicImport: false,
      title: 'new',
      dll: false,
      hd: true,
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
}
