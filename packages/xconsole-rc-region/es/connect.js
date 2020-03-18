import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect as reduxConnect } from 'dva';
import { NAMESPACE, getActiveId, getRemoteDataSource } from './model';
import mapRegionListToIds from './mapRegionListToIds';
import renderProps from './renderProps';

var mapStateToProps = function mapStateToProps(state) {
  return {
    /**
     * 当前的 region id
     * @type {?String}
     */
    activeId: getActiveId(state),

    /**
     * 远程数据列表
     * @see https://fecs.console.aliyun.com/api/topbar/showRegionList.json
     * @type {?Array<Object>}
     */
    remoteDataSource: getRemoteDataSource(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,

    /**
     * 更新 model 中的 region id
     * @param {String} id 待更新的 region id
     */
    dispatchChangeAction: function dispatchChangeAction(id) {
      dispatch({
        type: "".concat(NAMESPACE, "/change"),
        payload: id
      });
    },

    /**
     * 获取并更新远程数据列表
     * @param {Array<String>} dataSource 包含 region id 的列表
     */
    dispatchFetchAction: function dispatchFetchAction(dataSource) {
      var ids = mapRegionListToIds(dataSource);
      dispatch({
        type: "".concat(NAMESPACE, "/fetch"),
        payload: ids
      });
    }
  };
};

var RenderModelProps = /*#__PURE__*/function (_PureComponent) {
  _inherits(RenderModelProps, _PureComponent);

  function RenderModelProps() {
    _classCallCheck(this, RenderModelProps);

    return _possibleConstructorReturn(this, _getPrototypeOf(RenderModelProps).apply(this, arguments));
  }

  _createClass(RenderModelProps, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          render = _this$props.render,
          children = _this$props.children,
          restProps = _objectWithoutProperties(_this$props, ["render", "children"]);

      return renderProps(this.props)(restProps);
    }
  }]);

  return RenderModelProps;
}(PureComponent);

RenderModelProps.propTypes = {
  activeId: PropTypes.string,
  remoteDataSource: PropTypes.arrayOf(PropTypes.any),
  dispatchChangeAction: PropTypes.func,
  dispatchFetchAction: PropTypes.func,
  dispatch: PropTypes.func,
  render: PropTypes.func,
  children: PropTypes.func
};
var connect = reduxConnect(mapStateToProps, mapDispatchToProps);
/**
 * @type {Function}
 * @returns {Component}
 */

export default connect;
/**
 * @type {Component}
 */

export var Connection = connect(RenderModelProps);