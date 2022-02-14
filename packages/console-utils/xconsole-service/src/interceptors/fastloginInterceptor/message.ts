import { getLocale } from '../../utils/index';

const locale = getLocale() || 'en-US';
/* eslint-disable max-len */
const messages = {
  'en-US': {
    
  },

  // 中文文案
  'zh-CN': {

  },

};

export default (messages as any)[locale] || messages['en-US'];
