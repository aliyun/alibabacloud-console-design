import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, routerRedux, withRouter } from 'dva/router'
import pathToRegexp from 'path-to-regexp'
import determineActiveId from './determineActiveId'
import connect from './connect'
import Provider from './Provider'

class RegionContextRoute extends Component {
  static propTypes = {
    path: PropTypes.string,
    pushLocation: PropTypes.func,
    ...Provider.propTypes,
  }

  replaceLocation(nextActiveId, routeProps) {
    const { replaceLocation } = this.props
    const toPath = pathToRegexp.compile(routeProps.match.path)
    const nextPath = toPath({ regionId: nextActiveId })
    if (replaceLocation) {
      return replaceLocation({
        ...routeProps,
        nextActiveId,
        nextPath,
      })
    }

    const { match, location } = routeProps
    const nextPathname = location.pathname.replace(match.url, nextPath)
    return {
      ...location,
      pathname: nextPathname,
    }
  }

  renderContext = this.renderContext.bind(this)

  renderContext(routeProps) {
    const { match } = routeProps

    if (!match) {
      return null
    }

    const { path: propPath, pushLocation, ...restProps } = this.props

    const { activeId, dataSource, dispatch } = restProps
    const { params } = match
    const { regionId } = params
    const expectedNextActiveId = determineActiveId(
      regionId,
      activeId,
      dataSource
    )

    if (regionId !== expectedNextActiveId) {
      return (
        <Redirect
          to={this.replaceLocation(expectedNextActiveId, routeProps)}
        />
      )
    }

    return (
      <Provider
        nextActiveId={regionId}
        onItemClick={
          (id) => {
            // May cause memory leaks?
            dispatch(routerRedux.push(this.replaceLocation(id, routeProps)))
            // Prevent default behavior will not trigger
            // the `change` event of `RegionContext`,
            // cause `RegionContextRoute` only trigger the event
            // when spec route param (which is passing to `nextActiveId`)
            // was changed
            return false
          }
        }
        {...restProps}
      />
    )
  }

  render() {
    const { path } = this.props
    return (
      <Route path={path} render={this.renderContext} />
    )
  }
}

export default withRouter(connect(RegionContextRoute))
