import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createAction } from 'redux-actions';

var createLoadingSelector = function createLoadingSelector(actionType) {
  return function (state) {
    var result = false;

    try {
      result = state.loading.effects[actionType];
    } catch (err) {
      result = false;
    }

    return result;
  };
};

var createActionCreatorByNamespace = function createActionCreatorByNamespace(namespace) {
  return function (actions, extend) {
    return actions.reduce(function (result, action) {
      var exactAction = Array.isArray(action) ? action : [action];

      var _exactAction = _slicedToArray(exactAction, 3),
          actionName = _exactAction[0],
          _exactAction$ = _exactAction[1],
          payloadCreator = _exactAction$ === void 0 ? function (payload) {
        return payload;
      } : _exactAction$,
          _exactAction$2 = _exactAction[2],
          metaCreator = _exactAction$2 === void 0 ? function (payload, meta) {
        return meta;
      } : _exactAction$2;

      var actionType = "".concat(namespace, "/").concat(actionName);
      var actionCreator = createAction(actionType, payloadCreator, metaCreator);

      if (extend) {
        for (var key in extend) {
          if (Object.prototype.hasOwnProperty.call(extend, key)) {
            actionCreator[key] = extend[key](actionType);
          }
        }
      }

      return Object.assign(result, _defineProperty({}, action, actionCreator));
    }, {});
  };
};

var createActions = function createActions(model) {
  var actionMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var namespace = model.namespace,
      reducers = model.reducers,
      effects = model.effects;

  if (!namespace) {
    return;
  }

  var createActionCreator = createActionCreatorByNamespace(namespace);
  var reducerActionNames = Object.keys(reducers);
  var effectActionNames = Object.keys(effects);
  var actionNames = Object.keys(actionMap);
  var actionDescriptors = actionNames.map(function (actionName) {
    return [actionName].concat(actionMap[actionName]);
  });
  return Object.assign(createActionCreator(reducerActionNames), createActionCreator(effectActionNames, {
    isLoading: createLoadingSelector
  }), createActionCreator(actionDescriptors));
};

export default createActions;