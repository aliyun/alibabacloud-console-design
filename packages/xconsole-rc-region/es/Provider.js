import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import warning from '@alicloud/xconsole-dev-utils/lib/warning';
import Context from './Context';
import determinActiveId from './determineActiveId';
import renderProps from './renderProps';

var Provider = /*#__PURE__*/function (_Component) {
  _inherits(Provider, _Component);

  function Provider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Provider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Provider)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.onItemClick = _this.onItemClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Provider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.update();
      this.fetchRemoteList();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.update();
    }
  }, {
    key: "onItemClick",
    value: function onItemClick(id) {
      var propsOnItemClick = this.props.onItemClick;

      if (propsOnItemClick) {
        // 如果显式声明了 `onItemClick` 事件代理, 并显式返回了 `false`
        // 则直接返回避免执行默认行为 `onChange`
        var preventDefault = propsOnItemClick(id) === false;

        if (preventDefault) {
          return;
        }
      }

      this.onChange(id);
    }
  }, {
    key: "onChange",
    value: function onChange(id) {
      var _this$props = this.props,
          activeId = _this$props.activeId,
          dataSource = _this$props.dataSource,
          propsOnChange = _this$props.onChange,
          dispatchChangeAction = _this$props.dispatchChangeAction,
          changeInterceptor = _this$props.changeInterceptor; // 使用预处理

      var nextActiveId = changeInterceptor ? changeInterceptor(id, {
        activeId: activeId,
        dataSource: dataSource
      }) : id;

      if (nextActiveId === activeId) {
        return;
      }

      var exactNextActiveId = determinActiveId(nextActiveId, activeId, dataSource);

      if (nextActiveId !== exactNextActiveId) {
        // 如果 nextActiveId 显式地进行了声明并且不符合预期, 则在 dev 环境下提示
        warning(typeof nextActiveId === 'undefined', "Next active id (".concat(nextActiveId, ") is unexpected. ") + 'You can define a interceptor (props.changeInterceptor)' + 'to correct the next active id before change.');
        return;
      } // 如果显式地声明了 `onChange` 并且执行结果为 `false`
      // 则阻止执行默认行为 `dispatchChangeAction`


      if (propsOnChange) {
        var preventDefault = propsOnChange(nextActiveId) === false;

        if (preventDefault) {
          return;
        }
      }

      dispatchChangeAction && dispatchChangeAction(nextActiveId);
    }
  }, {
    key: "fetchRemoteList",
    value: function fetchRemoteList() {
      var _this$props2 = this.props,
          remoteable = _this$props2.remoteable,
          dispatchFetchAction = _this$props2.dispatchFetchAction,
          dataSource = _this$props2.dataSource;

      if (remoteable && dispatchFetchAction) {
        dispatchFetchAction(dataSource);
      }
    }
  }, {
    key: "update",
    value: function update() {
      var nextActiveId = this.props.nextActiveId;
      this.onChange(nextActiveId);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          activeId = _this$props3.activeId,
          nextActiveId = _this$props3.nextActiveId,
          dispatchChangeAction = _this$props3.dispatchChangeAction,
          keepAlive = _this$props3.keepAlive,
          dataSource = _this$props3.dataSource,
          remoteDataSource = _this$props3.remoteDataSource; // 在数据变化时, 销毁子组件并重新进行渲染
      // 可以通过设置 `props.keepAlive = true` 阻止子组件的销毁

      if (!keepAlive && nextActiveId && nextActiveId !== activeId) {
        return null;
      }

      var providerValue = {
        activeId: activeId,
        nextActiveId: nextActiveId,
        dataSource: dataSource,
        remoteDataSource: remoteDataSource,
        dispatchChangeAction: dispatchChangeAction,
        onItemClick: this.onItemClick
      };
      return React.createElement(Context.Provider, {
        value: providerValue
      }, renderProps(this.props)(providerValue));
    }
  }]);

  return Provider;
}(Component);

Provider.propTypes = {
  /**
   * 当前的 region id
   * @type {String}
   */
  activeId: PropTypes.string,

  /**
   * 需要进行更新的 region id
   * 在 Provider 的 didMount 和 didUpdate 生命周期函数内,
   * 会针对 nextActiveId 做检查, 如果该值是一个有效值,
   * 则会执行 onChange 事件, 并触发默认行为 dispatchChangeAction
   * @type {String}
   */
  nextActiveId: PropTypes.string,

  /**
   * 是否自动获取远程数据源
   * 当该值显式指定为 `true`, 则会在 didMount 生命周期触发 dispatchFetchAction
   * 主动获取远程数据源
   * @type {Boolean}
   */
  remoteable: PropTypes.bool,

  /**
   * 在 activeId 数据变化时, 是否保持 Provider 下的子组件的生存周期
   *
   * 该值默认为 `false`, 即在发生变化时, 通过 render null 将所有的子组件清除,
   * 这样做的原因是在数据变化的过程中, 避免执行子组件的一些行为 (如根据 activeId
   * 获取远程数据等), 来确保数据的正确性. 由于视图需要进行重新计算并绘制, 会损失
   * 一定的性能, 但仍然建议禁用 keepAlive 来确保数据和事件触发的正确性.
   *
   * 如果希望保持子组件的生存周期, 请显式指定 `true` 并在子组件内确保数据和事件
   * 触发的正确性
   *
   * @type {Boolean}
   * @default false
   */
  keepAlive: PropTypes.bool,

  /**
   * 数据列表
   * @type {Array}
   */
  dataSource: PropTypes.arrayOf(PropTypes.any),

  /**
   * 远程数据列表
   * @type {Array}
   */
  remoteDataSource: PropTypes.arrayOf(PropTypes.any),

  /**
   * 触发远程数据的获取 (依赖于 redux.connect 高阶组件为该属性赋值)
   * @type {Function}
   * @param {Array} dataSource
   */
  dispatchFetchAction: PropTypes.func,

  /**
   * 触发 activeId 的变化 (依赖于 redux.connect 高阶组件为该属性赋值)
   * @type {Function}
   * @param {String} nextActiveId
   */
  dispatchChangeAction: PropTypes.func,

  /**
   * 在触发变化之前的拦截器, 可以对将要变化的 activeId 进行预处理
   * @type {Function}
   * @param {String} nextActiveId
   * @return {String} processedNextActiveId
   */
  changeInterceptor: PropTypes.func,

  /**
   * 在 activeId 变化时触发的事件函数
   * @type {Function}
   */
  onChange: PropTypes.func,

  /**
   * 代理 Provider 下的 SmartRegion 的点击事件
   * @type {Function}
   */
  onItemClick: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  component: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  render: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  children: PropTypes.node
};
Provider.defaultProps = {
  keepAlive: false
};
export default Provider;