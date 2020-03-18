import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  titleContainerClassName,
  titleClassName,
  titleExtraClassName,
  titleChildrenClassName,
} from './constants'
import './title.less'

const Title = ({
  value,
  extra,
  children,
  childrenAlign = 'left',
  className,
  style,
}) => (
  <div
    className={classNames(titleContainerClassName, className)}
    style={style}
  >
    <h3 className={classNames(titleClassName)}>{value}</h3>
    {
      extra && (
        <div className={classNames(titleExtraClassName)}>{extra}</div>
      )
    }
    {
      children && (
        <div className={classNames(titleChildrenClassName, childrenAlign)}>
          {children}
        </div>
      )
    }
  </div>
)

Title.propTypes = {
  value: PropTypes.node.isRequired,
  extra: PropTypes.node,
  children: PropTypes.node,
  childrenAlign: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
}

export default Title
