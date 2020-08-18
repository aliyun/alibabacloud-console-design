import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import { ConsoleBaseContext } from '@alicloud/xconsole-console-base-context';
import get from 'lodash.get';
import template from 'lodash.template';
import Link from '@ali/wind-rc-link';

var XConsoleRcLink = function XConsoleRcLink(_ref) {
  var linkId = _ref.linkId,
      linkParams = _ref.linkParams,
      pure = _ref.pure,
      restProps = _objectWithoutProperties(_ref, ["linkId", "linkParams", "pure"]);

  if (linkId) {
    var _React$useContext = React.useContext(ConsoleBaseContext),
        links = _React$useContext.links;

    var channelLink = get(links, linkId);

    if (linkParams) {
      channelLink = template(channelLink)(linkParams);
    }

    if (pure) return channelLink;
    return React.createElement(Link, _extends({
      href: channelLink,
      target: "_blank"
    }, restProps));
  } else {
    return React.createElement(Link, restProps);
  }
};

XConsoleRcLink.displayName = 'XConsoleRcLink';
XConsoleRcLink.propTypes = {
  linkId: PropTypes.string,
  linkParams: PropTypes.objectOf(PropTypes.any)
};
export default XConsoleRcLink;