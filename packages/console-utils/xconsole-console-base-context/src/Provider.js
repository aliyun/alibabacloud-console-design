import React from 'react'
import PropTypes from 'prop-types'
import Context from './Context'
import get from 'lodash.get'
import reduce from 'lodash.reduce'

const mapping = {
  links: 'CHANNEL_LINKS', // 渠道链接
  features: 'CHANNEL_FEATURE_STATUS', // 渠道开关
  gray: 'FEATURE_STATUS', // 功能灰度
  mainAccountPK: 'MAIN_ACCOUNT_PK', // 当前登录用户的主账号PK
  currentPK: 'CURRENT_PK', // 当前登录用户的PK
  accountType: 'ACCOUNT_TYPE', // 当前登录用户的类型，包括main，sub, sts
  accountName: 'ACCOUNT_NAME', // 子账号名称
  openStatus: 'OPEN_STATUS', // 服务开通状态
  locale: 'LOCALE', // 多语言
  regions: 'REGIONS', // 多语言
}

const Provider = ({
  children,
  key,
}) => {
  const configs = get(window, key || 'ALIYUN_CONSOLE_CONFIG')
  const value = reduce(mapping, (result, v, k) => ({
    ...result,
    [k]: get(configs, v),
  }), {})

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

Provider.displayName = 'ConsoleBaseProvider'

Provider.propTypes = {
  key: PropTypes.string,
  children: PropTypes.node,
}

export default Provider
