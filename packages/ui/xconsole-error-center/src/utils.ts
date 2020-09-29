import _get from 'lodash.get';
import _intl from '@alicloud/console-components-intl';

export const intl = (message?: string, fallback = '') => message ? _intl(message) : fallback;
export const LOCALE = _get(window, 'ALIYUN_CONSOLE_CONFIG.LOCALE') || 'zh-CN';