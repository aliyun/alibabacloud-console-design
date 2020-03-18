import model from './model'

const createActionTypes = (modelDescriptor) => {
  const { namespace, reducers = {}, effects = {} } = modelDescriptor
  const reducerActionNames = Object.keys(reducers)
  const effectActionNames = Object.keys(effects)
  const actionNames = [...reducerActionNames, ...effectActionNames]
  return actionNames.reduce((result, actionName) => Object.assign(
    result,
    {
      [actionName]: `${namespace}/${actionName}`,
    }
  ), {})
}

export default createActionTypes(model)
