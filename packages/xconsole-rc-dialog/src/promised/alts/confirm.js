import React from 'react';

import prepareProps from '../../util/prepare-props';
import Wrapper from '../../rc/wrapper';
import open from '../open';

/**
 * window.confirm 的替代
 * 
 * @param {Object} props 
 * @param {Object} [fixedMixin]
 * @return {Promise}
 */
export default (props, { // 额外配置，不在 Dialog 中定义的配置项
  ok = 'OK',
  cancel = 'Cancel'
} = {}) => {
  const dialogProps = prepareProps(props, {
    buttons: [{
      label: ok,
      result: 1
    }, cancel],
    esc: -1
  });
  
  dialogProps.content = <Wrapper icon="help">{dialogProps.content}</Wrapper>;
  
  return open(dialogProps);
};
