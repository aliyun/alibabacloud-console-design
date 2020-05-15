import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/*
 * fusion 对于 size 真的是死性不改
 * 1. 可取值为 xxs, xs, small, medium, large, xl, xxl, xxxl，多么的不统一
 * 2. 默认它给了一个 medium，但用户最多的是期望跟父亲节点的大小走，而且不提供 none 的 size（虽然设置了 none 可以，但不会被 PropTypes 接受）
 * 3. 非得用 next-xx 的 className 就不怕冲突吗
 */

const DEFAULT_SIZE = 'inherit';

/**
 * NEXT 的组件会强制在节点上加上大小样式，实在恶心，所以这里直接接管了 @alife/next Icon 的渲染。
 * 而且如果放到 Button 下，更会把 size 也给接管了.. 简直惨无人道..
 */
export default class extends React.Component {
  static displayName = 'Icon';
  
  static propTypes = {
    type: PropTypes.string.isRequired,
    size: PropTypes.string,
    className: PropTypes.string
  };
  
  static defaultProps = {
    size: DEFAULT_SIZE
  };
  
  render() {
    const {
      props: {
        type,
        size,
        className,
        ...props
      }
    } = this;
    
    props.className = classNames(`next-icon next-icon-${type}`, className, {
      [`next-${size}`]: size && size !== DEFAULT_SIZE
    });
    
    return <i {...props} />;
  }
}
