import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../icon';

import './index.less';

/**
 * Common wrapper of content for alternatives
 */
export default class extends React.Component {
  static displayName = 'Wrapper';
  
  static propTypes = {
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ])
  };
  
  static defaultProps = {
    icon: 'warning'
  };
  
  render() {
    const {
      props: {
        icon,
        children
      }
    } = this;
    const jsxIcon = React.isValidElement(icon) ? icon : <Icon type={icon} size="large" />;
    
    return <div className="nb-rc-dialog-hoc-wrapper">
      <div className="the-icon">{jsxIcon}</div>
      <div className="the-message">
        {children}
      </div>
    </div>;
  }
}
