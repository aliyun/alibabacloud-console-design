import _regeneratorRuntime from "@babel/runtime/regenerator";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint react/prop-types: 0 */
import React from 'react';
import { takeLatest } from '@alicloud/xconsole-effect-creator';
import PropTypes from 'prop-types';
import Model from './Provider';
import _ from 'lodash';
var defaultModel = {
  state: {
    Data: {},
    Result: null,
    APIError: null
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
    data: function data(state) {
      return state.Data;
    },
    result: function result(state) {
      return state.Result;
    },
    error: function error(state) {
      return state.APIError;
    }
  }
};

var InfoModel = function InfoModel(props) {
  var fetchEffect = {
    fetch: takeLatest( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref, _ref2) {
      var payload, _ref$meta, meta, call, put, result;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              payload = _ref.payload, _ref$meta = _ref.meta, meta = _ref$meta === void 0 ? {} : _ref$meta;
              call = _ref2.call, put = _ref2.put;
              _context.prev = 2;
              _context.next = 5;
              return call(props.fetch, payload);

            case 5:
              result = _context.sent;
              _context.next = 8;
              return put({
                type: 'save',
                payload: result
              });

            case 8:
              if (meta.onCompleted) {
                meta.onCompleted(result);
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
                meta.onError(_context.t0);
              }

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 11]]);
    }))
  };

  var effects = _.reduce(props, function (result, value, key) {
    if (key !== 'fetch' && _.isFunction(value)) {
      // eslint-disable-next-line no-param-reassign
      result[key] = /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(_ref3, _ref4) {
        var payload, _ref3$meta, meta, call, put, _result;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                payload = _ref3.payload, _ref3$meta = _ref3.meta, meta = _ref3$meta === void 0 ? {} : _ref3$meta;
                call = _ref4.call, put = _ref4.put;
                _context2.prev = 2;
                _context2.next = 5;
                return call(value, payload);

              case 5:
                _result = _context2.sent;
                _context2.next = 8;
                return put({
                  type: 'save',
                  payload: {
                    Result: _result
                  }
                });

              case 8:
                if (meta.onCompleted) {
                  meta.onCompleted(_result);
                }

                _context2.next = 16;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](2);
                _context2.next = 15;
                return put({
                  type: 'save',
                  payload: {
                    APIError: _context2.t0
                  }
                });

              case 15:
                if (meta.onError) {
                  meta.onError(_context2.t0);
                }

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 11]]);
      });
    }

    return result;
  }, fetchEffect);

  var model = _objectSpread({}, defaultModel, {
    effects: effects
  });

  return React.createElement(Model, {
    model: model
  }, props.children);
};

InfoModel.propTypes = {
  fetch: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

InfoModel.extend = function (extra) {
  return function (props) {
    return React.createElement(Model, {
      model: _objectSpread({}, defaultModel, {}, extra)
    }, props.children);
  };
};

export default InfoModel;