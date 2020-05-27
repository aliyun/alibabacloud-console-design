import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import WindProContext from './BaseContext';
import createActions from '@alicloud/xconsole-action-creator';
import { createSelector } from 'reselect';
import { v1 as uuid } from 'uuid';
import _ from 'lodash';

var createModel = function createModel(dva, model) {
  var namespace = uuid();
  var dvaModel = {
    namespace: namespace,
    state: model.state,
    reducers: model.reducers,
    effects: model.effects,
    subscriptions: model.subscriptions
  };
  dva.model(dvaModel);
  var actions = createActions(dvaModel);

  var selectors = _.reduce(model.selectors, function (res, value, key) {
    res[key] = createSelector(function (state) {
      return state[namespace];
    }, value);
    return res;
  }, {});

  return {
    actions: actions,
    selectors: selectors
  };
};

var Model = function Model(props) {
  var _useContext = useContext(WindProContext),
      dvaInstance = _useContext.dvaInstance;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  if (!value) {
    setValue(createModel(dvaInstance, props.model));
  }

  useEffect(function () {
    return function () {
      dvaInstance.unmodel();
    };
  }, []);
  return React.createElement(Context.Provider, {
    value: value
  }, props.children);
};

Model.propTypes = {
  model: PropTypes.objectOf(PropTypes.any)
};
export default Model;