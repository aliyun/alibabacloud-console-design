import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React, { isValidElement } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@alicloud/console-components';
import { createForm } from 'rc-form';
import classNames from 'classnames';
import Context from './Context';
import map from 'lodash.map';

var EnhancedForm = function EnhancedForm(_ref) {
  var _classNames;

  var _ref$dataSource = _ref.dataSource,
      dataSource = _ref$dataSource === void 0 ? {} : _ref$dataSource,
      items = _ref.items,
      operation = _ref.operation,
      form = _ref.form,
      _ref$fixFooter = _ref.fixFooter,
      fixFooter = _ref$fixFooter === void 0 ? true : _ref$fixFooter,
      className = _ref.className,
      formProps = _objectWithoutProperties(_ref, ["dataSource", "items", "operation", "form", "fixFooter", "className"]);

  var getFieldDecorator = form.getFieldDecorator,
      getFieldError = form.getFieldError;
  var formClassName = classNames((_classNames = {
    'wind-pro-rc-form': true
  }, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, 'fix-footer', fixFooter), _classNames));

  var renderFormItem = function renderFormItem(_ref2) {
    var label = _ref2.label,
        dataIndex = _ref2.dataIndex,
        initialValue = _ref2.initialValue,
        validateRules = _ref2.validateRules,
        element = _ref2.element,
        helper = _ref2.helper,
        _ref2$visible = _ref2.visible,
        visible = _ref2$visible === void 0 ? true : _ref2$visible,
        _ref2$asterisk = _ref2.asterisk,
        asterisk = _ref2$asterisk === void 0 ? false : _ref2$asterisk;
    return visible && React.createElement(Form.Item, {
      key: dataIndex,
      label: label,
      asterisk: asterisk,
      validateState: getFieldError(dataIndex) ? 'error' : 'success',
      help: getFieldError(dataIndex) || helper
    }, getFieldDecorator(dataIndex, {
      initialValue: initialValue || dataSource[dataIndex],
      rules: validateRules
    })(element));
  };

  var renderOperation = function renderOperation(opt) {
    if (!isValidElement(opt)) {
      console.warn('Operation is expected to be a class or function as React component');
    }

    return opt;
  };

  return React.createElement(Context.Provider, {
    value: form
  }, React.createElement("div", null, React.createElement(Form, _extends({}, formProps, {
    className: formClassName
  }), React.createElement("div", {
    className: "wind-pro-rc-form-body"
  }, items && map(items(form), function (item) {
    if (isValidElement(item)) {
      return item;
    } else {
      return renderFormItem(item);
    }
  })), React.createElement("div", {
    className: "wind-pro-rc-form-footer"
  }, operation && renderOperation(operation)))));
};

EnhancedForm.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.any),
  items: PropTypes.arrayOf(PropTypes.object),
  operation: PropTypes.node,
  form: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
  fixFooter: PropTypes.bool
};
export default createForm()(EnhancedForm);