import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';
import Context from './Context';

var Column = function Column(_ref) {
  var dataSource = _ref.dataSource;
  return /*#__PURE__*/React.createElement(Context.Consumer, null, function (_ref2) {
    var onItemClick = _ref2.onItemClick,
        activeId = _ref2.activeId;
    return /*#__PURE__*/React.createElement("div", null, dataSource.map(function (data) {
      return /*#__PURE__*/React.createElement(List, {
        key: "wind-rc-region-list-".concat(data.id),
        label: data.name,
        activeId: activeId,
        dataSource: data.list,
        onItemClick: onItemClick
      });
    }));
  });
};

Column.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object)
};
export default Column;