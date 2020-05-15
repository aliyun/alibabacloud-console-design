import React from 'react';
import Container from '../Container';
import List from '../List';

var ExpandedRegion = function ExpandedRegion(props) {
  return React.createElement(Container, {
    shape: "expanded"
  }, React.createElement(List, props));
};

export default ExpandedRegion;