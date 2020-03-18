import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

var Container = function Container(_ref) {
  var className = _ref.className,
      style = _ref.style,
      shape = _ref.shape,
      children = _ref.children;
  return React.createElement("div", {
    className: classNames('xconsole-rc-region', className, shape),
    style: style
  }, children);
};

Container.propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  shape: PropTypes.string,
  children: PropTypes.node
};
export default Container;