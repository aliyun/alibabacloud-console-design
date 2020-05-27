/* eslint-disable react/prop-types */
import React, { isValidElement, Children } from 'react';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';

var renderProps = function renderProps(props, injectPropName) {
  return function () {
    var children = props.children,
        render = props.render,
        component = props.component;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (component) {
      var RenderComponent = component;
      var componentProps = {};

      if (injectPropName) {
        componentProps[injectPropName] = args;
      }

      return React.createElement(RenderComponent, componentProps);
    }

    var exactRender = children || render;

    if (isFunction(exactRender)) {
      return exactRender.apply(void 0, args);
    }

    if (isValidElement(exactRender)) {
      return React.createElement(exactRender.type, exactRender.props);
    }

    if (isArray(exactRender)) {
      return Children.map(exactRender, function (child) {
        return React.createElement(child.type, child.props);
      });
    }

    return null;
  };
};

export default renderProps;