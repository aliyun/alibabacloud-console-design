import _isString from 'lodash/isString';
import React from 'react';

/**
 * 
 * @param {object|string|React} dialogProps dialog 的 props，也可以只是 content（string 或 react 的 element）
 * @param {object} [fixedMixin] 不可修改的 mixin
 * @param {object} [defaultMixin] 可修改的 mixin
 */
export default (dialogProps = {}, fixedMixin, defaultMixin) => {
  if (_isString(dialogProps) || React.isValidElement(dialogProps)) {
    dialogProps = {
      content: dialogProps
    };
  }
  
  return {
    ...defaultMixin,
    ...dialogProps,
    ...fixedMixin
  };
};