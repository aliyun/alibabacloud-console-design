import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Icon } from '@alicloud/console-components'

class Trigger extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.any),
    label: PropTypes.node,
    active: PropTypes.bool,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  }

  render() {
    const {
      className,
      style,
      label,
      active,
      onMouseEnter,
      onMouseLeave,
    } = this.props

    return (
      <div
        className={
          classNames(
            'wind-rc-region',
            'dropdown',
            'dropdown-trigger',
            { active: active === true },
            className
          )
        }
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span>{label}</span>
        <Icon
          type="arrow-down"
          size="xs"
        />
      </div>
    )
  }
}

export default Trigger
