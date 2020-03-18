import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { ModelProvider } from '@alicloud/xconsole-model';

var Provider = function Provider(props) {
  return React.createElement(ModelProvider, {
    app: props.app
  }, props.children);
};

Provider.propTypes = {
  app: PropTypes.objectOf(PropTypes.any)
};
export default Provider;