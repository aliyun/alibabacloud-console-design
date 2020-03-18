/**
 * 整个应用构建, 编译配置
 */
const path = require('path');

module.exports = {
  // 产品名称, 如果是控制台项目一定要配置此选项
  product: 'xconsole',
  appId: 'console-workbench',
  // 路由配置
  routes: {
    mode: 'browser',
    prefix: '/console-workbench',
    index: 'projects',
  },
  // 加入监控脚本
  armsId: 'mock_amrs_id',
  // 开启 topbar, sidebar
  consoleBase: true,
  // 开启 oneConsole 的 meta 标签
  oneConsole: true,
  // 国际化配置
  intl: {
    locale: 'zh',
    products: [
      {
        group: 'aliyun',
        name: 'wind',
        identifier: 'ALIYUN_WIND_MESSAGE',
      },
    ],
    messages: 'locales/messages.js',
  },
  // mocks 配置
  mocks: {
    host: 'http://mocks.alibaba-inc.com',
    product: '6rKg926hw',
    projectUrl: 'http://mocks.alibaba-inc.com/project/6rKg926hw',
    proxy: {
      '/data/call.json': 'http://mocks.alibaba-inc.com/mock/oneconsole/data/api.json',
    },
    oneConsoleProductAlias: {
    },
  },
  // 开启低版本浏览器提示
  browserCompatibility: true,

  disableErrorOverlay: true,

  disablePolyfill: true,

  useTerserPlugin: true,

  noOpen: true,
  // 自定义 webpack 配置
  webpack: (config) => {
    const { devServer } = config;
    // 本地调试
    if (config.mode === 'development' && devServer) {
      // config.devServer.https = true;
      config.output.publicPath = `http://${devServer.host || '0.0.0.0'}:${devServer.port}/`;
      config.devServer.disableHostCheck = true
      config.devServer.headers = {
        'Access-Control-Allow-Origin': '*',
      }
    }
    return config;
  },

  plugins: [
    path.resolve(__dirname, './plugin.js'),
    [
      '@ali/breezr-plugin-os', {
        id: 'console-workbench',
      },
    ],
  ],
}
