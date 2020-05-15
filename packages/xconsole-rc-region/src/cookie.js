import Cookie from 'js-cookie'

// 默认标识
const DEFAULT_COOKIE_KEY = 'activeRegionId'
const CURRENT_DEFAULT_COOKIE_KEY = 'currentRegionId'

// 区分国内站和国际站
const REG_HOST = /\.?(aliyun|alibabacloud)(\.[\w.-]+)/

/**
 * 获取兜底的 host
 * @returns {String}
 */
const getFallbackHost = () => {
  if (process.env.NODE_ENV === 'production') {
    // 如果在生产环境, 使用更可靠的 `.aliyun.com` 作为兜底
    return '.aliyun.com'
  } else {
    // 在开发环境下随机而变
    return window.location.hostname
  }
}

/**
 * 获取用于存储 cookie 的 host
 * @returns {String}
 */
const getHost = () => {
  const { hostname } = window.location
  const matches = hostname.match(REG_HOST)
  if (!matches || matches.length < 3) {
    return getFallbackHost()
  }

  const [, hostSpecifier, suffix] = matches
  return `.${hostSpecifier}${suffix}`
}

/**
 * 从 cookie 中获取当前的 region id
 * @param {String=} key
 */
const getActiveId = (key = '') => {
  if (key === '') {
    return Cookie.get(CURRENT_DEFAULT_COOKIE_KEY) || Cookie.get(DEFAULT_COOKIE_KEY) || 'cn-hangzhou';
  }
  return Cookie.get(key);
}

/**
 * 将 region id 存放到 cookie 中
 * @param {String} value
 * @param {Object=} options
 */
const setActiveId = (value, options = {}) => {
  const opts = {
    key: DEFAULT_COOKIE_KEY,
    domain: getHost(),
    ...options,
  }
  const { key, ...restOptions } = opts
  Cookie.set(key, value, restOptions)
}

export {
  getActiveId,
  setActiveId,
}
