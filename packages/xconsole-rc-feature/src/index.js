import React from 'react'
import PropTypes from 'prop-types'
import { ConsoleBaseContext } from '@alicloud/xconsole-console-base-context'
import get from 'lodash.get'
import './index.less'


/**
 * 检查是否在名单中（不论黑白），名单配置为字符串
 *
 * 1. 把需要配置的 region 以逗号「,」分隔（不用担心空格，也不用担心标准的和 OSS 形式的混用），如 `oss-cn-hangzhou,cn-shanghai`
 * 2. 如果想有例外则在前面加上叹号「!」，如 `!cn-hongkong`
 * 3. 如果需要匹配一组，可以在最末加一个星号「*」，如 `cn-*`
 *
 * @param {string} value
 * @param {array<string>} mixedList
 * @return {boolean}
 */
function checkBlackAndWhiteList(value, mixedList) {
  const whiteList = [];
  const blackList = [];

  // 将黑白混合名单转化成「黑」和「白」两个数组
  mixedList.filter(v => !!v).forEach(v => {
    const cleanV = v.trim();

    if (/^!/.test(cleanV)) {
      blackList.push(cleanV.substring(1).trim());
    } else {
      whiteList.push(cleanV);
    }
  });

  function checkAgainstConf(valueInConf) {
    // 允许 wildcard * 匹配
    if (/\*$/.test(valueInConf)) { // 仅支持末尾？TODO
      return value.indexOf(valueInConf.substring(0, valueInConf.length - 1)) === 0; // eslint-disable-line
    }

    return value === valueInConf;
  }

  // 黑名单的优先级大于白名单，如果有任何一个不通过，不通过
  if (blackList.some(v => checkAgainstConf(v))) {
    return false;
  }

  // 没有白名单、或匹配任何一个普通名单，通过
  return whiteList.length ? whiteList.some(v => checkAgainstConf(v)) : true;
}

const WindProRcFeature = ({
  id,
  region,
  children,
}) => {
  if (typeof id === 'undefined') {
    throw new Error(
      '[Feature] id is required'
    )
  }
  const { features } = React.useContext(ConsoleBaseContext)
  if (typeof features === 'undefined') {
    throw new Error(
      '[Feature] features context is undefined'
    )
  }
  const feature = features[id]
  if (typeof feature === 'undefined') {
    return children
  }
  const status = get(feature, 'status')

  if (status === false) {
    return null
  }

  const regions = get(feature, 'attribute.regions', []);
  // 没有传递要检查的 region ，则认为开关可用，返回内容
  if (!region || !regions || !regions.length) {
    return children;
  }

  // 进行 region 的检查，校验不通过则返回 null
  const regionEnableCheck = checkBlackAndWhiteList(region, regions);
  if (regionEnableCheck === false) {
    return null
  }


  return children
}

WindProRcFeature.displayName = 'WindProFeature'

WindProRcFeature.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
}

export default WindProRcFeature
