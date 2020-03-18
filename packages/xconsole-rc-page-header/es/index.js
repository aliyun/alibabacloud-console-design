import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import Page from '@ali/wind-rc-page';
import NavContent from './NavContent';
import { Select } from '@alicloud/console-components';

var PageHeader = function PageHeader(_ref) {
  var title = _ref.title,
      subTitle = _ref.subTitle,
      subSwitcher = _ref.subSwitcher,
      breadcrumbs = _ref.breadcrumbs,
      extra = _ref.extra,
      historyBack = _ref.historyBack,
      nav = _ref.nav,
      children = _ref.children,
      restProps = _objectWithoutProperties(_ref, ["title", "subTitle", "subSwitcher", "breadcrumbs", "extra", "historyBack", "nav", "children"]);

  return React.createElement(Page, restProps, React.createElement(Page.Nav, {
    breadcrumbs: breadcrumbs,
    extra: extra
  }), React.createElement(Page.Title, {
    text: title,
    subText: subSwitcher ? React.createElement(Select, _extends({
      size: "small"
    }, subSwitcher)) : subTitle,
    historyBack: historyBack
  }), nav ? React.createElement(NavContent, {
    nav: nav
  }, children) : React.createElement(Page.Content, null, children));
};

PageHeader.displayName = 'WindProPageHeader';
PageHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  subSwitcher: PropTypes.objectOf(PropTypes.any),
  breadcrumbs: PropTypes.arrayOf(PropTypes.any),
  historyBack: PropTypes.string,
  extra: PropTypes.node,
  nav: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.node
};
export default PageHeader;