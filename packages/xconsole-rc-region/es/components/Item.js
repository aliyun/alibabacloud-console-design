import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

var onLinkClick = function onLinkClick(e) {
  e.preventDefault();
};

var Item = function Item(_ref) {
  var id = _ref.id,
      label = _ref.label,
      _ref$active = _ref.active,
      active = _ref$active === void 0 ? false : _ref$active,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      onItemClick = _ref.onItemClick;
  return React.createElement("dd", {
    className: classNames('wind-rc-region-item', {
      active: active,
      disabled: disabled
    }),
    onClick: function onClick(e) {
      return !disabled && onItemClick(id, e);
    }
  }, React.createElement("a", {
    title: label,
    name: "#".concat(label),
    onClick: onLinkClick
  }, label));
};

Item.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onItemClick: PropTypes.func
};
export default Item;