import _regeneratorRuntime from "@babel/runtime/regenerator";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { createSelector } from 'reselect';
import { getActiveId as getActiveIdFromCookie, setActiveId as setActiveIdToCookie } from './cookie';
import fallback from './data/fallback';
import { getRegionList } from './service';
var NAMESPACE = '@@wind-rc-region';
export default {
  namespace: NAMESPACE,
  state: {
    /**
     * 当前 region id
     * 默认从 cookie 中进行获取. 在用户第一次访问控制台时, 该值可能为 `undefined`
     * 使用 `RegionContext(Route)` 可以将当前的 dataSource 中的第一个 region id
     * 作为当前 region id 并使用 model.change 接口更新 cookie 和 model 中的值
     * @type {String=}
     */
    activeId: getActiveIdFromCookie(),

    /**
     * 远程的数据源
     * 默认使用兜底数据, 当调用 model.fetch 接口时将异步获取数据并更新该值
     * 使用 `RegionContext(Route)` 中的 `remoteable: Boolean` 属性可以定义当前
     * 上下文初始化时是否自动获取远程数据, 配合 `SmartRegion` 组件可以进行远程数据的
     * 合并和分组, 优化前端显示
     * @type {Array=}
     */
    remoteDataSource: fallback
  },
  reducers: {
    /**
     * 更新数据
     * @param {Object} state
     * @param {Object} action
     */
    update: function update(state, action) {
      var _action$payload = action.payload,
          payload = _action$payload === void 0 ? {} : _action$payload;
      return _objectSpread({}, state, {}, payload);
    }
  },
  effects: {
    /**
     * 改变当前的 region id
     * @param {Object} action
     * @param {Object} effect
     */
    change: /*#__PURE__*/_regeneratorRuntime.mark(function change(action, effect) {
      var id, _action$meta, _action$meta$syncCook, syncCookie, _action$meta$cookieKe, cookieKey, put;

      return _regeneratorRuntime.wrap(function change$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = action.payload, _action$meta = action.meta;
              _action$meta = _action$meta === void 0 ? {} : _action$meta;
              _action$meta$syncCook = _action$meta.syncCookie, syncCookie = _action$meta$syncCook === void 0 ? true : _action$meta$syncCook, _action$meta$cookieKe = _action$meta.cookieKey, cookieKey = _action$meta$cookieKe === void 0 ? 'activeRegionId' : _action$meta$cookieKe;
              put = effect.put;

              if (syncCookie) {
                setActiveIdToCookie(id, {
                  key: cookieKey
                });
              }

              _context.next = 7;
              return put({
                type: 'update',
                payload: {
                  activeId: id
                }
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, change);
    }),

    /**
     * 从远程数据源 (公共服务) 获取 region 列表
     * fetch url:
     * https://fecs.console.aliyun.com/api/topbar/showRegionList.json
     * @param {Object} action
     * @param {Object} effect
     */
    fetch: /*#__PURE__*/_regeneratorRuntime.mark(function fetch(action, effect) {
      var ids, put, call, remoteDataSource;
      return _regeneratorRuntime.wrap(function fetch$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              ids = action.payload;
              put = effect.put, call = effect.call;
              _context2.prev = 2;
              _context2.next = 5;
              return call(getRegionList, [ids]);

            case 5:
              remoteDataSource = _context2.sent;
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](2);
              console.warn(_context2.t0);

            case 11:
              if (!remoteDataSource) {
                _context2.next = 14;
                break;
              }

              _context2.next = 14;
              return put({
                type: 'update',
                payload: {
                  remoteDataSource: remoteDataSource
                }
              });

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, fetch, null, [[2, 8]]);
    })
  }
};
/**
 * @param {Object} state
 */

var getState = function getState(state) {
  return state[NAMESPACE];
};
/**
 * 获取当前的 region id
 * @param {Object} state
 */


var getActiveId = createSelector(getState, function (state) {
  return state.activeId;
});
/**
 * 获取远程数据列表内容
 * @param {Object} state
 */

var getRemoteDataSource = createSelector(getState, function (state) {
  return state.remoteDataSource;
});
export { NAMESPACE, getActiveId, getRemoteDataSource };