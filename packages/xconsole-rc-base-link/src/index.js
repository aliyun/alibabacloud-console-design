import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link as RouteLink } from 'dva/router'
import isFunction from 'lodash/isFunction'
import isBoolean from 'lodash/isBoolean'
import classNames from 'classnames'
import { baseClassName, btnClassName, nextClassName } from './constants'
import relative from './relative'
import './index.less'

const evalProp = (prop, path) => {
  if (isBoolean(prop)) {
    return prop
  }

  if (isFunction(prop)) {
    return prop(path)
  }
}

const getExactClassName = (shape, type, size, disabled) => {
  const result = { disabled }
  if (shape === 'button') {
    const btnTypeClassName = `${btnClassName}-${type}`
    const btnSizeClassName = `${nextClassName}-${size}`
    return {
      ...result,
      [btnClassName]: true,
      [btnTypeClassName]: true,
      [btnSizeClassName]: true,
    }
  }
  return result
}

class Link extends Component {
  static propTypes = {
    shape: PropTypes.oneOf([
      'text',
      'button',
    ]),
    type: PropTypes.oneOf([
      'normal',
      'primary',
      'secondary',
    ]),
    size: PropTypes.oneOf([
      'medium',
      'small',
      'large',
    ]),
    disabled: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
    ]),
    visible: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
    ]),
  }

  state = {
    useReactRouterLink: true,
  }

  componentDidCatch(err) {
    const { message } = err
    if (
      message &&
      message.indexOf('You should not use <Link> outside a <Router>') > -1
    ) {
      this.setState({ useReactRouterLink: false })
    }
  }

  render() {
    const {
      disabled = false,
      visible = true,
      shape = 'text',
      type = 'normal',
      size = 'medium',
      ...restProps
    } = this.props

    const { to, href } = restProps

    const exactLinkTargetPath = href || to
    const exactDisabled = evalProp(disabled, exactLinkTargetPath)
    const exactVisible = evalProp(visible, exactLinkTargetPath)

    if (!exactVisible) {
      return null
    }

    const exactClassName = classNames(
      baseClassName,
      getExactClassName(shape, type, size, exactDisabled)
    )

    if (exactDisabled || !exactLinkTargetPath) {
      return (
        <span className={exactClassName} {...restProps} />
      )
    }

    const { useReactRouterLink } = this.state

    if (href || !useReactRouterLink) {
      return (
        <a
          className={exactClassName}
          {...restProps}
          href={exactLinkTargetPath}
        />
      )
    }

    return (
      <RouteLink className={exactClassName} {...restProps} />
    )
  }
}

export default relative(Link)
