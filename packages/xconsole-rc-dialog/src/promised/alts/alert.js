import React from 'react';

import prepareProps from '../../util/prepare-props';
import Wrapper from '../../rc/wrapper';
import open from '../open';

/**
 * window.alert 的替代
 * 
 * @param {Object} props 
 * @param {Object} [fixedMixin]
 * @return {Promise}
 */
export default (props, { // 额外配置，不在 Dialog 中定义的配置项
  ok = 'OK'
} = {}) => {
  const dialogProps = prepareProps(props, {
    buttons: [{
      label: ok,
      type: 'primary'
    }],
    esc: -1,
    undefinedAsReject: false
  });
  
  dialogProps.content = <Wrapper icon="warning">{dialogProps.content}</Wrapper>;
  
  return open(dialogProps);
};
