import model from './model';

var register = function register(app, mergeModel) {
  var exactModel = mergeModel ? mergeModel(model) : model;
  app && app.model && app.model(exactModel);
  return {};
};

export default register;