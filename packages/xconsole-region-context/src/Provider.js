/* RegionContext
 * 负责从 @alicloud/xconsole-rc-region 的 model 中获取 activeRegionId 并且以 Context 提供给子孙组件
 */

import React from 'react'
import PropTypes from 'prop-types'
import Context from './Context'
import { connect } from 'dva'
import { getActiveId } from '@alicloud/xconsole-rc-region'

const Provider = ({
  children,
  activeId,
}) => {
  const providerValue = {
    activeRegionId: activeId,
  }
  return (
    <Context.Provider value={providerValue}>
      {children}
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.node,
  activeId: PropTypes.string,
}

const mapStateToProps = state => ({
  activeId: getActiveId(state),
})

export default connect(mapStateToProps, null)(Provider);
