import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { contentClassName } from './constants'
import './content.less'

const Content = ({
  children,
  className,
  style,
}) => (
  <div
    className={classNames(contentClassName, className)}
    style={style}
  >
    {children}
  </div>
)

Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
}

export default Content
