import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { contentClassName } from './constants';

var Content = function Content(_ref) {
  var children = _ref.children,
      className = _ref.className,
      style = _ref.style;
  return React.createElement("div", {
    className: classNames(contentClassName, className),
    style: style
  }, children);
};

Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any)
};
export default Content;