import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import ExpandedRegion from './components/expanded';
import DropdownRegion from './components/dropdown';

var Region = /*#__PURE__*/function (_Component) {
  _inherits(Region, _Component);

  function Region() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Region);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Region)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      activeId: _this.props.defaultActiveId
    };
    _this.onItemClick = _this.onItemClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Region, [{
    key: "onItemClick",
    value: function onItemClick(id) {
      var _this$props = this.props,
          activeId = _this$props.activeId,
          propsOnItemClick = _this$props.onItemClick;

      if (typeof activeId === 'undefined') {
        this.UNCONTROLLED_onItemClick(id);
      }

      propsOnItemClick && propsOnItemClick(id);
    } // eslint-disable-next-line camelcase

  }, {
    key: "UNCONTROLLED_onItemClick",
    value: function UNCONTROLLED_onItemClick(id) {
      var onChange = this.props.onChange;
      var prevActiveId = this.state.activeId;

      if (id !== prevActiveId) {
        this.setState({
          activeId: id
        }, function () {
          onChange && onChange(id, prevActiveId);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          style = _this$props2.style,
          dataSource = _this$props2.dataSource,
          portal = _this$props2.portal,
          shape = _this$props2.shape;
      var activeId = this.state.activeId;
      var props = {
        className: className,
        style: style,
        activeId: activeId,
        dataSource: dataSource,
        onItemClick: this.onItemClick
      };
      var domNode = Region.getPortalDomNode(portal);
      var Element;

      switch (shape) {
        case 'dropdown':
          {
            Element = DropdownRegion;
            break;
          }

        case 'expanded':
        default:
          {
            Element = ExpandedRegion;
          }
      }

      var element = React.createElement(Element, props);
      return domNode ? createPortal(element, domNode) : element;
    }
  }], [{
    key: "getPortalDomNode",
    value: function getPortalDomNode(portal) {
      if (portal) {
        if (portal === true) {
          return document.getElementById('aliyun-console-topbar-region');
        }

        if (typeof portal === 'string') {
          return document.getElementById(portal);
        }
      }
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var activeId = nextProps.activeId,
          onChange = nextProps.onChange;
      var prevActiveId = prevState.activeId;

      if (activeId !== prevActiveId) {
        onChange && onChange(activeId, prevActiveId);
      }

      return {
        activeId: activeId
      };
    }
  }]);

  return Region;
}(Component);

Region.propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  defaultActiveId: PropTypes.string,
  activeId: PropTypes.string,
  dataSource: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  })),
  portal: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  shape: PropTypes.string,
  onChange: PropTypes.func,
  onItemClick: PropTypes.func
};
Region.defaultProps = {
  shape: 'expanded'
};
export default Region;