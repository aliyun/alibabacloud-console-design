import React from 'react';
import Container from '../Container';
import List from '../List';

var ExpandedRegion = function ExpandedRegion(props) {
  return /*#__PURE__*/React.createElement(Container, {
    shape: "expanded"
  }, /*#__PURE__*/React.createElement(List, props));
};

export default ExpandedRegion;