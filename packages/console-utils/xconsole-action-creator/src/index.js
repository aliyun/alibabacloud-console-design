import { createAction } from 'redux-actions'

const createLoadingSelector = actionType => (state) => {
  let result = false
  try {
    result = state.loading.effects[actionType]
  } catch (err) {
    result = false
  }

  return result
}

const createActionCreatorByNamespace = namespace => (actions, extend) =>
  actions.reduce(
    (result, action) => {
      const exactAction = Array.isArray(action) ? action : [action]
      const [
        actionName,
        payloadCreator = payload => payload,
        metaCreator = (payload, meta) => meta,
      ] = exactAction
      const actionType = `${namespace}/${actionName}`
      const actionCreator = createAction(
        actionType,
        payloadCreator,
        metaCreator
      )

      if (extend) {
        for (const key in extend) {
          if (Object.prototype.hasOwnProperty.call(extend, key)) {
            actionCreator[key] = extend[key](actionType)
          }
        }
      }

      return Object.assign(result, {
        [action]: actionCreator,
      })
    },
    {}
  )

const createActions = (model, actionMap = {}) => {
  const { namespace, reducers, effects } = model

  if (!namespace) {
    return
  }

  const createActionCreator = createActionCreatorByNamespace(namespace)
  const reducerActionNames = Object.keys(reducers)
  const effectActionNames = Object.keys(effects)
  const actionNames = Object.keys(actionMap)
  const actionDescriptors = actionNames.map(
    actionName => [actionName].concat(actionMap[actionName])
  )

  return Object.assign(
    createActionCreator(reducerActionNames),
    createActionCreator(effectActionNames, {
      isLoading: createLoadingSelector,
    }),
    createActionCreator(actionDescriptors)
  )
}

export default createActions
