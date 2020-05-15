import zhCN from './locale/zh-cn';
import zhTW from './locale/zh-tw';
import enUS from './locale/en-us';
import jaJP from './locale/ja-jp';

const MESSAGE_MAP = {
  ZH: zhCN,
  ZHCN: zhCN,
  ZHTW: zhTW,
  EN: enUS,
  ENUS: enUS,
  JA: jaJP,
  JAJP: jaJP
};
const REG_SUBSTITUTE = /\\?{([^{}]+)}/g;

/**
 * 一个超简单的 intl 方案
 * 
 * @param {string} [locale = 'zh-CN']
 * @param {object} [messagesToMerge]
 * @return {function}
 */
export default (locale = 'en-US', messagesToMerge) => {
  const messages = {
    ...(MESSAGE_MAP[locale.toUpperCase().replace(/[-_]/g, '')] || enUS), // 转成大写且无分隔符
    ...messagesToMerge
  };
  
  return (key, values) => {
    const str = messages[key] || key;
    
    if (!values) {
      return str;
    }
    
    return str.replace(REG_SUBSTITUTE, (match, name) => {
      if (match.charAt(0) === '\\') {
        return match.slice(1);
      }
      
      return values[name] === undefined ? '' : values[name];
    });
  };
};