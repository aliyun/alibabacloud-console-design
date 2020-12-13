import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import createActions from '@alicloud/xconsole-action-creator';
import { createSelector } from 'reselect';
import { v1 as uuid } from 'uuid';
import reduce from 'lodash/reduce';
import WindProContext from './BaseContext';
import Context from './Context';

const createModel = (dva, model) => {
  const namespace = uuid();
  const dvaModel = {
    namespace,
    state: model.state,
    reducers: model.reducers,
    effects: model.effects,
    subscriptions: model.subscriptions,
  };
  dva.model(dvaModel);
  const actions = createActions(dvaModel);
  const selectors = reduce(
    model.selectors,
    (res, value, key) => {
      res[key] = createSelector((state) => state[namespace], value);
      return res;
    },
    {}
  );

  return {
    actions,
    selectors,
  };
};

const Model = (props) => {
  const { dvaInstance } = useContext(WindProContext);
  const [value, setValue] = useState(null);
  if (!value) {
    setValue(createModel(dvaInstance, props.model));
  }

  useEffect(
    () => () => {
      dvaInstance.unmodel();
    },
    []
  );

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

Model.propTypes = {
  model: PropTypes.objectOf(PropTypes.any),
};

export default Model;
