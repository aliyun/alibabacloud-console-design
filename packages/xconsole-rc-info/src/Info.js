import React, { Children } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Title from './Title'
import Content from './Content'
import { baseClassName } from './constants'
import './info.less'

/**
 * 渲染 info 区域的子节点
 * @param {ReactElement|Array<ReactElement>} children
 */
const renderChildren = (children) => {
  const ContentComponentType = (<Content />).type

  // 如果是独立的节点, 递归使用数组形式进行统一的处理
  if (!Array.isArray(children)) {
    return renderChildren([children])
  }

  return Children.map(children, (child) => {
    // 如果当前节点已经是 Content 则直接返回, 否则使用 `<Content>` 组件进行包装
    if (child.type === ContentComponentType) {
      return child
    } else {
      return (
        <Content>{child}</Content>
      )
    }
  })
}

const Info = ({
  // 标题
  title,
  // 标题附加内容
  extra,
  children,
  className,
  style,
}) => (
  <div
    className={classNames(baseClassName, className)}
    style={style}
  >
    {
      title && (
        <Title
          value={title}
          extra={extra}
        />
      )
    }
    {
      children && renderChildren(children)
    }
  </div>
)

Info.propTypes = {
  title: PropTypes.node,
  extra: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
}

export default Info
