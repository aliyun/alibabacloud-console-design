import React from 'react';

import {
  Message
} from '@alife/next';

import {
  slide
} from '../../../src';
import {
  validateField,
  fieldHasError,
  fieldEquals
} from '../helper/field';

import {
  FIELD_NAME,
  getFieldDefaults
} from './_common';
import DialogContent from './dialog-content';

function dataFake(values) {
  return new Promise((resolve, reject) => setTimeout(() => {
    if (values.fail) {
      reject(new Error('提交失败了！模拟的 🤪\n失败之后不应关闭 Dialog'));
    } else {
      resolve();
    }
  }, values.time * 1000));
}

function opAlertError(err) {
  if (err) {
    // 这里推荐使用 https://npm.alibaba-inc.com/package/@alicloud/xconsole-rc-error-prompt
    // 如果用 @alicloud/xconsole-rc-error-prompt 这里不需要进行 if 判断
    window.alert(err.message); // eslint-disable-line
  }

  return Promise.resolve();
}

function success() {
  Message.success('提交成功！');
}

/**
 *
 * @return {Promise<boolean>}
 */
export default () => {
  const fieldDefaults = getFieldDefaults();
  const buttonConfirm = {
    label: '提交',
    onClick(field, theDialog) {
      theDialog.lock(true);

      validateField(field).then(values => dataFake({
        name: values[FIELD_NAME.NAME],
        time: values[FIELD_NAME.TIME],
        fail: values[FIELD_NAME.FAKE_FAIL]
      }).then(() => {
        theDialog.unlock().close(true); // 成功的情况下关闭 Dialog（同时 resolve Promise，值是 close 的第一个参数）

        success();
      })).catch(opAlertError).then(() => theDialog.unlock());

      return false;
    }
  };
  const buttonCancel = '取消';

  return slide({
    debug: true,
    title: '做什么的',
    content: <DialogContent />,
    buttons: [buttonConfirm, buttonCancel],
    undefinedAsReject: false,
    fieldOptions: {
      values: fieldDefaults
    }
  }, field => ({
    buttons: [{
      ...buttonConfirm,
      disabled: fieldHasError(field) || fieldEquals(field, fieldDefaults)
    }, buttonCancel]
  }));
};
