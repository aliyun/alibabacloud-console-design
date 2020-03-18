import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useContext, useState } from 'react';
import Context from './Context';
import { register, destroy } from './dvaModel';
export default (function (props) {
  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      models = _useState2[0],
      setModels = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      counts = _useState4[0],
      setCounts = _useState4[1];

  var _models = models;
  var _counts = counts;

  var attach = function attach(config) {
    if (models[config.namespace]) {
      _counts[config.namespace]++;
      setCounts(_counts);
      return models[config.namespace];
    } else {
      var model = register(props.app, config);
      _models[model.namespace] = model;
      _counts[model.namespace] = 1;
      setModels(_models);
      setCounts(_counts);
      return model;
    }
  };

  var detach = function detach(namespace) {
    if (models[namespace]) {
      _counts[namespace]--;
      setCounts(_counts);

      if (_counts[namespace] === 0) {
        destroy(props.app, namespace);
        delete models[namespace];
        delete counts[namespace];
        setModels(models);
        setCounts(counts);
      }
    }
  };

  return React.createElement(Context.Provider, {
    value: {
      attach: attach,
      detach: detach,
      models: models
    }
  }, props.children);
});