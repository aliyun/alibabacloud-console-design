import createActions from '@alicloud/xconsole-action-creator';
import { createSelector } from 'reselect';
export var register = function register(app, model) {
  var dvaModel = {
    namespace: model.namespace,
    state: model.state,
    reducers: model.reducers,
    effects: model.effects,
    subscriptions: model.subscriptions
  };
  app.model(dvaModel);
  var actions = createActions(dvaModel);

  var selectors = _.reduce(model.selectors, function (res, value, key) {
    res[key] = createSelector(function (state) {
      return state[model.namespace];
    }, value);
    return res;
  }, {});

  return {
    namespace: model.namespace,
    action: actions.action,
    selectors: selectors
  };
};
export var destroy = function destroy(app, namespace) {
  app.unmodel(namespace);
};