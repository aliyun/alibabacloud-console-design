import React from 'react';
import Context from './Context';
import PropTypes from 'prop-types';
import { ConsoleBaseProvider } from '@alicloud/xconsole-console-base-context';
import { RegionProvider } from '@alicloud/xconsole-region-context';
import { ModelProvider } from '@alicloud/xconsole-model';
console.log('uis', 11111);
var Provider = function Provider(_ref) {
  var app = _ref.app,
      history = _ref.history,
      widgetLoader = _ref.widgetLoader,
      uis = _ref.uis,
      children = _ref.children;
  var value = {
    app: app,
    history: history,
    uis: uis
  };
  return /*#__PURE__*/React.createElement(Context.Provider, {
    value: value
  }, /*#__PURE__*/React.createElement(ConsoleBaseProvider, null, /*#__PURE__*/React.createElement(RegionProvider, {
    history: history
  }, /*#__PURE__*/React.createElement(ModelProvider, {
    app: app
  }, children)))));
};

Provider.displayName = 'WindProProvider';
Provider.propTypes = {
  app: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.node
};
export default Provider;