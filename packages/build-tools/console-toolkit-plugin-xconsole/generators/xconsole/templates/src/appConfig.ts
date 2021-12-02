import { AppConfig } from '@alicloud/xconsole';

const config: AppConfig = {}

// ConsoleBase 相关配置
config.region = {
  // regionbar 展示的产品可用地域
  regionList: [
    { id: 'cn-hangzhou', name: '华东1（杭州）' },
    { id: 'cn-beijing', name: '华北2（北京）' },
    { id: 'cn-qingdao', name: '华北1（青岛）' },
    { id: 'cn-shanghai', name: '华东2（上海）' },
  ]
}

config.consoleMenu = {
  defaultOpen: [
    '/ui',
    '/tech',
  ],
  collapsedPath: [
    '/success-result',
    '/fail-result',
  ]
}

export default config
