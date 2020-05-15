import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@alicloud/console-components';
import Context from './Context';

var Submit = function Submit(_ref) {
  var onClick = _ref.onClick,
      _ref$validate = _ref.validate,
      validate = _ref$validate === void 0 ? true : _ref$validate,
      children = _ref.children,
      buttonProps = _objectWithoutProperties(_ref, ["onClick", "validate", "children"]);

  var form = useContext(Context);

  var onClickWithValidate = function onClickWithValidate() {
    form.validateFields(function (err, values) {
      if (err) return;
      onClick(values);
    });
  };

  return React.createElement(Button, _extends({}, buttonProps, {
    onClick: validate ? onClickWithValidate : onClick
  }), children);
};

Submit.propTypes = {
  onClick: PropTypes.func,
  validate: PropTypes.bool,
  children: PropTypes.node
};
export default Submit;