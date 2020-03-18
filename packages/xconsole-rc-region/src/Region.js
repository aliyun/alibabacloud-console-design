import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import ExpandedRegion from './components/expanded'
import DropdownRegion from './components/dropdown'

class Region extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.objectOf(
      PropTypes.any
    ),
    defaultActiveId: PropTypes.string,
    activeId: PropTypes.string,
    dataSource: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
    portal: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    shape: PropTypes.string,
    onChange: PropTypes.func,
    onItemClick: PropTypes.func,
  }

  static defaultProps = {
    shape: 'expanded',
  }

  static getPortalDomNode(portal) {
    if (portal) {
      if (portal === true) {
        return document.getElementById('aliyun-console-topbar-region')
      }

      if (typeof portal === 'string') {
        return document.getElementById(portal)
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { activeId, onChange } = nextProps
    const { activeId: prevActiveId } = prevState

    if (activeId !== prevActiveId) {
      onChange && onChange(activeId, prevActiveId)
    }

    return { activeId }
  }

  state = {
    activeId: this.props.defaultActiveId,
  }

  onItemClick = this.onItemClick.bind(this)

  onItemClick(id) {
    const { activeId, onItemClick: propsOnItemClick } = this.props

    if (typeof activeId === 'undefined') {
      this.UNCONTROLLED_onItemClick(id)
    }

    propsOnItemClick && propsOnItemClick(id)
  }

  // eslint-disable-next-line camelcase
  UNCONTROLLED_onItemClick(id) {
    const { onChange } = this.props
    const { activeId: prevActiveId } = this.state
    if (id !== prevActiveId) {
      this.setState({ activeId: id }, () => {
        onChange && onChange(id, prevActiveId)
      })
    }
  }

  render() {
    const {
      className,
      style,
      dataSource,
      portal,
      shape,
    } = this.props
    const { activeId } = this.state
    const props = {
      className,
      style,
      activeId,
      dataSource,
      onItemClick: this.onItemClick,
    }
    const domNode = Region.getPortalDomNode(portal)
    let Element

    switch (shape) {
      case 'dropdown': {
        Element = DropdownRegion
        break
      }
      case 'expanded':
      default: {
        Element = ExpandedRegion
      }
    }

    const element = <Element {...props} />

    return domNode ? createPortal(element, domNode) : element
  }
}

export default Region
