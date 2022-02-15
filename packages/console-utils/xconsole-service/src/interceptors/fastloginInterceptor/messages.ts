import { getLocale } from '../../utils/index';

const locale = getLocale() || 'en-US';
/* eslint-disable max-len */
const messages = {
  'en-US': {
    'login_prefix': 'Having trouble with fast login? Go directly to ',
    'login_action': 'the login page',
    'login_suffix': ' to log in',
  },

  // 中文文案
  'zh-CN': {
    'login_prefix': '快速登录有问题？直接去',
    'login_action': '登录页',
    'login_suffix': '登录',
  },

};

export default (messages as any)[locale] || messages['en-US'];
