import React from 'react';
import PropTypes from 'prop-types';
import { ConsoleBaseContext } from '@alicloud/xconsole-console-base-context';
import get from 'lodash.get';

var Gray = function Gray(_ref) {
  var id = _ref.id,
      children = _ref.children;

  if (typeof id === 'undefined') {
    throw new Error('[Gray] id is required');
  }

  var _React$useContext = React.useContext(ConsoleBaseContext),
      gray = _React$useContext.gray;

  var value = get(gray, id);
  if (value === false) return null;
  return children;
};

Gray.displayName = 'WindProGray';
Gray.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node
};
export default Gray;