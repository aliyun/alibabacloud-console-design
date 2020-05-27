import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";

/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '@alicloud/console-components';
import find from 'lodash/find';
import { seperateToColumns } from '../../data/transform';
import Container from '../Container';
import Trigger from './Trigger';
import Column from './Column';
import Context from './Context';

var DropdownRegion = /*#__PURE__*/function (_Component) {
  _inherits(DropdownRegion, _Component);

  function DropdownRegion() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DropdownRegion);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DropdownRegion)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      visible: false,
      columns: []
    };
    _this.onVisibleChange = _this.onVisibleChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DropdownRegion, [{
    key: "onVisibleChange",
    value: function onVisibleChange(visible) {
      this.setState({
        visible: visible
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          visible = _this$state.visible,
          columns = _this$state.columns;
      var _this$props = this.props,
          activeId = _this$props.activeId,
          dataSource = _this$props.dataSource,
          onItemClick = _this$props.onItemClick;

      var _ref = find(dataSource, {
        id: activeId
      }) || {},
          name = _ref.name;

      var trigger = React.createElement(Trigger, {
        label: name,
        active: visible
      });
      var providerValue = {
        activeId: activeId,
        onItemClick: onItemClick
      };
      return React.createElement(Container, {
        shape: "dropdown"
      }, React.createElement(Dropdown, {
        trigger: trigger,
        visible: visible,
        delay: 0,
        onVisibleChange: this.onVisibleChange
      }, React.createElement("div", {
        className: "wind-rc-region-dropdown-content"
      }, React.createElement(Context.Provider, {
        value: providerValue
      }, columns.map(function (column, i) {
        return React.createElement(Column, {
          key: "wind-rc-region-column-".concat(i),
          dataSource: column
        });
      })))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      var dataSource = nextProps.dataSource;
      return {
        columns: seperateToColumns(dataSource)
      };
    }
  }]);

  return DropdownRegion;
}(Component);

DropdownRegion.propTypes = {
  activeId: PropTypes.string,
  dataSource: PropTypes.arrayOf(PropTypes.any),
  onItemClick: PropTypes.func
};
export default DropdownRegion;