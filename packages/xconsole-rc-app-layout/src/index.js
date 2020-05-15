import React, { useState, useRef, useEffect, Component } from 'react'
import PropTypes from 'prop-types'
import { wrapDisplayName } from 'recompose'
import { matchPath, withRouter } from 'dva/router'
import AppLayout from '@alicloud/console-components-app-layout'
import each from 'lodash.foreach'
import isArray from 'lodash/isArray';
import Nav from './Nav'
import Context from './Context'
import Aside from './Aside'

let noticeFlag = false;

const XConsoleAppLayout = ({
  sidebar = {},
  appConfig = {},
  location: {
    pathname,
  },
  children,
}) => {
  const [ title, setTitle] = useState(sidebar.title || 'XConsole')
  const [ navs, setNavs] = useState(sidebar.navs || [])

  if (
    noticeFlag === false && (
      typeof sidebar.defaultOpenKeys !== 'undefined'
      || typeof sidebar.collapsedKeys !== 'undefined'
      || typeof sidebar.invisiblePaths !== 'undefined'
    )
  ) {
    noticeFlag = true;
    console.warn('[xconsole rc-app-layout] sidebar.js 中关于 defaultOpenKeys collapsedKeys invisiblePaths 的配置不再推荐使用，请在 appConfig.js 中配置 consoleMenu， 具体配置信息及字段说明请前往官网查看 【开发指南】 文档。')
  }

  return (
    <Context.Provider value={{
      sidebar: {
        title,
        navs,
        collapsedKeys: [],
      },
      setTitle,
      setNavs
    }}>
      <Aside
        appConfig={appConfig}
        location={location}
      >
        {children}
      </Aside>
    </Context.Provider>
  )
}

XConsoleAppLayout.displayName = 'XConsoleAppLayout'

XConsoleAppLayout.propTypes = {
  children: PropTypes.node,
  sidebar: PropTypes.objectOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
}

export default withRouter(XConsoleAppLayout)

export const AppLayoutContext = Context

export const withNavCollapsed = WrappedComponent => (
  class H extends Component {
    static displayName = wrapDisplayName(
      WrappedComponent,
      'withAppLayoutCollapsed'
    )

    render() {
      return (
        <Context.Consumer>
          {({ navCollapsed }) => (
            <WrappedComponent
              {...this.props}
              navCollapsed={navCollapsed}
            />
          )}
        </Context.Consumer>
      )
    }
  }
)
