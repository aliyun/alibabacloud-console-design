import React from 'react';
import PropTypes from 'prop-types';
import Page from '@ali/wind-rc-page';
import { Tab } from '@ali/wind';
import map from 'lodash.map';

var NavContext = function NavContext(_ref) {
  var _ref$nav = _ref.nav,
      _ref$nav$shape = _ref$nav.shape,
      shape = _ref$nav$shape === void 0 ? 'tab' : _ref$nav$shape,
      defaultActiveKey = _ref$nav.defaultActiveKey,
      activeKey = _ref$nav.activeKey,
      onChange = _ref$nav.onChange,
      items = _ref$nav.items,
      children = _ref.children;

  if (shape === 'menu') {
    var Menu = React.createElement(Page.Menu, {
      onItemClick: onChange,
      defaultSelectedKeys: defaultActiveKey,
      selectedKeys: activeKey
    }, map(items, function (item) {
      return React.createElement(Page.Menu.Item, {
        key: item.key
      }, item.title);
    }));
    return React.createElement(Page.Content, {
      menu: Menu
    }, children);
  } else if (shape === 'tab') {
    return React.createElement(Page.Content, null, React.createElement(Tab, {
      shape: "wrapped",
      defaultActiveKey: defaultActiveKey,
      activeKey: activeKey,
      onChange: onChange
    }, map(items, function (item) {
      return React.createElement(Tab.Item, {
        key: item.key,
        title: item.title
      });
    })), children);
  } else {
    throw new Error('[PageHeader] the shape of nav is unexpected');
  }
};

NavContext.propTypes = {
  nav: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.node
};
export default NavContext;