import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { titleContainerClassName, titleClassName, titleExtraClassName, titleChildrenClassName } from './constants';

var Title = function Title(_ref) {
  var value = _ref.value,
      extra = _ref.extra,
      children = _ref.children,
      _ref$childrenAlign = _ref.childrenAlign,
      childrenAlign = _ref$childrenAlign === void 0 ? 'left' : _ref$childrenAlign,
      className = _ref.className,
      style = _ref.style;
  return React.createElement("div", {
    className: classNames(titleContainerClassName, className),
    style: style
  }, React.createElement("h3", {
    className: classNames(titleClassName)
  }, value), extra && React.createElement("div", {
    className: classNames(titleExtraClassName)
  }, extra), children && React.createElement("div", {
    className: classNames(titleChildrenClassName, childrenAlign)
  }, children));
};

Title.propTypes = {
  value: PropTypes.node.isRequired,
  extra: PropTypes.node,
  children: PropTypes.node,
  childrenAlign: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any)
};
export default Title;