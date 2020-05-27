/* RegionContext
 * 负责从 @ali/wind-rc-region 的 model 中获取 activeRegionId 并且以 Context 提供给子孙组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { connect } from 'dva';
import { getActiveId } from '@alicloud/xconsole-rc-region';

var Provider = function Provider(_ref) {
  var children = _ref.children,
      activeId = _ref.activeId;
  var providerValue = {
    activeRegionId: activeId
  };
  return React.createElement(Context.Provider, {
    value: providerValue
  }, children);
};

Provider.propTypes = {
  children: PropTypes.node,
  activeId: PropTypes.string
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    activeId: getActiveId(state)
  };
};

export default connect(mapStateToProps, null)(Provider);