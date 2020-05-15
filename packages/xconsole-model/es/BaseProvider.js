import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './BaseContext';
import ModelProvider from './ModelProvider';

var Provider = function Provider(props) {
  return React.createElement(ModelProvider, {
    app: props.app
  }, props.children);
};

Provider.propTypes = {
  app: PropTypes.objectOf(PropTypes.any)
};
export default Provider;