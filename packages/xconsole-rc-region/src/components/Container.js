import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Container = ({
  className,
  style,
  shape,
  children,
}) => (
  <div
    className={classNames('xconsole-rc-region', className, shape)}
    style={style}
  >
    {children}
  </div>
)

Container.propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  shape: PropTypes.string,
  children: PropTypes.node,
}

export default Container
