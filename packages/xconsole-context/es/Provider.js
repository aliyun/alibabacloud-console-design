import React from 'react';
import Context from './Context';
import PropTypes from 'prop-types';
import { ConsoleBaseProvider } from '@alicloud/xconsole-console-base-context';
import { RegionProvider } from '@alicloud/xconsole-region-context';
import { ModelProvider } from '@alicloud/xconsole-model';
import { WidgetLoadManagementProvider } from '@alicloud/xconsole-widget-load-management';

var Provider = function Provider(_ref) {
  var app = _ref.app,
      history = _ref.history,
      children = _ref.children;
  var value = {
    app: app,
    history: history
  };
  return React.createElement(Context.Provider, {
    value: value
  }, React.createElement(ConsoleBaseProvider, null, React.createElement(RegionProvider, {
    history: history
  }, React.createElement(ModelProvider, {
    app: app
  }, React.createElement(WidgetLoadManagementProvider, null, children)))));
};

Provider.displayName = 'WindProProvider';
Provider.propTypes = {
  app: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.node
};
export default Provider;