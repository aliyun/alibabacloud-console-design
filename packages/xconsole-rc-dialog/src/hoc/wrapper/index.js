import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from '../../rc/wrapper';

/**
 * Common wrapper of content for alternatives
 */
export default WrappedComponent => class extends React.Component {
  static displayName = `HocWrapper(${WrappedComponent.displayName})`;
  
  static propTypes = {
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ])
  };
  
  render() {
    const {
      props: {
        icon,
        ...props
      }
    } = this;
    
    return <Wrapper icon={icon}>
      <WrappedComponent {...props} />
    </Wrapper>;
  }
};