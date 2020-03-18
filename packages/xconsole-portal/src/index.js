import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@alicloud/console-components'
import './index.less'

const XconsolePortal = ({
  productIcon,
  title,
  description,
  extra,
  actions,
  children,
}) => (
  <div className="portal">
    <div className="header">
      <div className="product-icon">
        <Icon type={productIcon} size="xxxl" />
      </div>
      <div className="product-explain">
        { title && <div className="title">{title}</div> }
        { description && <div className="description">{description}</div> }
        { extra && <div className="extra">{extra}</div> }
        { actions && <div className="actions">{actions}</div> }
      </div>
    </div>
    <div className="content-container">
      <div className="content">
        {children}
      </div>
    </div>
  </div>
)

XconsolePortal.propTypes = {
  productIcon: PropTypes.node,
  title: PropTypes.node,
  description: PropTypes.node,
  extra: PropTypes.node,
  actions: PropTypes.arrayOf(PropTypes.any),
  children: PropTypes.node,
  footer: PropTypes.node,
}

export default XconsolePortal
