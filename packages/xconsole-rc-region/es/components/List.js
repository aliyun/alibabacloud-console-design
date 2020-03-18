import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Item from './Item';

var List = function List(_ref) {
  var className = _ref.className,
      style = _ref.style,
      label = _ref.label,
      activeId = _ref.activeId,
      dataSource = _ref.dataSource,
      onItemClick = _ref.onItemClick,
      format = _ref.format;
  return React.createElement("dl", {
    className: classNames('wind-rc-region-list', className),
    style: style
  }, label && React.createElement("dt", null, label), dataSource.map(function (item) {
    var data = item;

    if (format) {
      data = format(data);
    }

    return React.createElement(Item, {
      key: "wind-rc-region-item-".concat(data.id || data.name),
      id: data.id,
      label: data.name,
      active: activeId === data.id,
      disabled: data.disabled,
      onItemClick: onItemClick
    });
  }));
};

List.propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string,
  activeId: PropTypes.string,
  dataSource: PropTypes.arrayOf(PropTypes.object),
  onItemClick: PropTypes.func,
  format: PropTypes.func
};
export default List;