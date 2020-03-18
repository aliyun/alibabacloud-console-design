const config = {}

// ConsoleBase 相关配置
config.consoleBase = {
  // regionbar 展示的产品可用地域
  regionList: [
    { id: 'cn-hangzhou', name: '华东 1' },
    { id: 'cn-beijing', name: '华北 1' },
    { id: 'cn-qingdao', name: '华北 2' },
    { id: 'cn-shanghai', name: '华北 2' },
  ],
}

config.errorCenter = {
  enable: true, // 配置为 false 的话不会出现报错弹窗
  errorCode: {
    ConsoleNeedLogin: {
      title: 'Error Title', // 弹窗标题
      message: '登录失效，请重新登录', // 弹窗信息，默认值为 error.message
      confirmLabel: '重新登录', // 确定按钮文案
      confirmHref: 'https://aliyun.com', // 点击确定跳转的链接
      cancelLabel: '留在页面', // 取消按钮文案
      cancelHref: 'https://aliyun.com', // 点击取消跳转的链接
    },
    ApiMocksError: {
      title: 'Error Title', // 弹窗标题
      message: '登录失效，请重新登录', // 弹窗信息，默认值为 error.message
      confirmLabel: '重新登录', // 确定按钮文案
      confirmHref: 'https://aliyun.com', // 点击确定跳转的链接
      cancelLabel: '留在页面', // 取消按钮文案
      cancelHref: 'https://aliyun.com', // 点击取消跳转的链接
    },
  },
};

export default config
