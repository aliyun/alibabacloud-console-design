import _regeneratorRuntime from "@babel/runtime/regenerator";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { v1 as uuid } from 'uuid';
import { takeLatest } from '@alicloud/xconsole-effect-creator';
import _ from 'lodash';
var defaultModel = {
  state: {
    Result: {},
    APIError: {}
  },
  reducers: {
    save: function save(state, action) {
      var _action$payload = action.payload,
          payload = _action$payload === void 0 ? {} : _action$payload;
      return _objectSpread({}, state, {}, payload);
    }
  },
  effects: {},
  subscriptions: {},
  selectors: {
    result: function result(state) {
      return state && state.Result;
    },
    error: function error(state) {
      return state && state.APIError;
    }
  }
};
export default (function (_ref) {
  var service = _ref.service,
      initialValue = _ref.initialValue,
      rest = _objectWithoutProperties(_ref, ["service", "initialValue"]);

  var namespace = uuid();

  if (_.isFunction(service)) {
    var dvaModel = _objectSpread({}, defaultModel, {
      namespace: namespace,
      effects: {
        action: takeLatest( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref2, _ref3) {
          var payload, _ref2$meta, meta, call, put, result;

          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  payload = _ref2.payload, _ref2$meta = _ref2.meta, meta = _ref2$meta === void 0 ? {} : _ref2$meta;
                  call = _ref3.call, put = _ref3.put;
                  _context.prev = 2;
                  _context.next = 5;
                  return call(service, payload);

                case 5:
                  result = _context.sent;
                  _context.next = 8;
                  return put({
                    type: 'save',
                    payload: {
                      Result: result
                    }
                  });

                case 8:
                  if (meta.onCompleted) {
                    _.delay(function () {
                      meta.onCompleted(result);
                    }, 200);
                  }

                  _context.next = 16;
                  break;

                case 11:
                  _context.prev = 11;
                  _context.t0 = _context["catch"](2);
                  _context.next = 15;
                  return put({
                    type: 'save',
                    payload: {
                      APIError: _context.t0
                    }
                  });

                case 15:
                  if (meta.onError) {
                    _.delay(function () {
                      meta.onError(_context.t0);
                    }, 200);
                  }

                case 16:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[2, 11]]);
        }))
      }
    });

    if (initialValue) {
      dvaModel.state.Result = initialValue;
    }

    return dvaModel;
  } else {
    return _objectSpread({
      namespace: namespace
    }, rest);
  }
});