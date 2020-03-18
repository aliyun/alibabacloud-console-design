import React, { useState, useRef, useEffect, Component } from 'react'
import PropTypes from 'prop-types'
import { wrapDisplayName } from 'recompose'
import { matchPath, withRouter } from 'dva/router'
import AppLayout from '@alicloud/console-components-app-layout'
import each from 'lodash.foreach'
import Nav from './Nav'
import Context from './Context'

const XConsoleAppLayout = ({
  sidebar = {},
  location: {
    pathname,
  },
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false)

  // save prev collapsed
  const prevState = useRef()
  useEffect(() => {
    prevState.current = collapsed
  })

  useEffect(() => {
    let collapse = false
    each(sidebar.collapsedKeys, (key) => {
      if (matchPath(pathname, { path: key, exact: true, strict: true })) {
        collapse = true
        return true
      }
    })
    setCollapsed(collapse)
  }, [pathname])

  const toggleNavCollapsed = (prevCollapsed) => {
    setCollapsed(
      typeof prevCollapsed === 'boolean' ?
        !prevCollapsed : !prevState.current
    )
  }

  const providerValue = { navCollapsed: collapsed }

  return (
    <AppLayout
      adjustHeight={50}
      nav={<Nav {...sidebar} />}
      navCollapsed={collapsed}
      onNavCollapseTriggerClick={toggleNavCollapsed}
    >
      <Context.Provider value={providerValue}>
        {children}
      </Context.Provider>
    </AppLayout>
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
