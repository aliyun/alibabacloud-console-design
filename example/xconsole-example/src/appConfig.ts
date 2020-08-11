import { AppConfig } from '@alicloud/xconsole';

const config: AppConfig = {};

// ConsoleBase 相关配置
config.region = {
  // regionbar 展示的产品可用地域
  regionList: [
    { id: 'cn-hangzhou', name: '华东 1' },
    { id: 'cn-qingdao', name: '华北 2' },
  ],
  // regionbar 显示的路径
  reginbarVisiblePaths: [
    '/:regionId/basic-list',
    '/overview'
  ]
};

config.consoleMenu = {
  defaultOpen: [
    '/ui',
    '/tech',
  ],
  collapsedPath: [
    '/success-result',
    '/fail-result',
  ]
};

export default config;
