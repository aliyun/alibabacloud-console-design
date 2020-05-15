import model from './model'

const register = (app, mergeModel) => {
  const exactModel = mergeModel ? mergeModel(model) : model
  app && app.model && app.model(exactModel)
  return {}
}

export default register
