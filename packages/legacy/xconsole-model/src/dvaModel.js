import createActions from '@alicloud/xconsole-action-creator'
import { createSelector } from 'reselect'

export const register = (app, model) => {
  const dvaModel = {
    namespace: model.namespace,
    state: model.state,
    reducers: model.reducers,
    effects: model.effects,
    subscriptions: model.subscriptions,
  }
  app.model(dvaModel)
  const actions = createActions(dvaModel)
  const selectors = _.reduce(model.selectors, (res, value, key) => {
    res[key] = createSelector(state => state[model.namespace], value)
    return res
  }, {})
  return {
    namespace: model.namespace,
    action: actions.action,
    selectors,
  }
}

export const destroy = (app, namespace) => {
  app.unmodel(namespace)
}
