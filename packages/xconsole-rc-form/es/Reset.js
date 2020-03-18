import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@alicloud/console-components';
import Context from './Context';

var Reset = function Reset(_ref) {
  var onClick = _ref.onClick,
      children = _ref.children,
      fields = _ref.fields,
      buttonProps = _objectWithoutProperties(_ref, ["onClick", "children", "fields"]);

  var form = useContext(Context);
  return React.createElement(Button, _extends({}, buttonProps, {
    onClick: function onClick() {
      return form.resetFields(fields);
    }
  }), children);
};

Reset.propTypes = {
  onClick: PropTypes.func,
  validate: PropTypes.bool,
  children: PropTypes.node,
  fields: PropTypes.arrayOf(PropTypes.string)
};
export default Reset;