import React from 'react';

import hocDialogContent from '../../hoc/content';
import Input from '../../rc/input';
import open from '../open';

const FIELD_NAME = {
  VALUE: 'value'
};

@hocDialogContent
class Prompt extends React.Component {
  static displayName = 'Prompt';
  
  render() {
    const {
      context: {
        field: {
          init
        }
      }
    } = this;
    
    return <Input {...init(FIELD_NAME.VALUE, {
      props: {
        style: {
          width: '100%'
        }
      }
    })} />;
  }
}

/**
 * window.prompt 的替代 - OK 返回输入（可能为空串），Cancel 返回 null
 * 
 * @param {string} [message] 
 * @param {string} [value] 
 * @param {object} [fixedMixin]
 * @return {Promise}
 */
export default (message, value = '', { // 额外配置，不在 Dialog 中定义的配置项
  ok = 'OK',
  cancel = 'Cancel'
} = {}) => open({
  title: message,
  content: <Prompt />,
  buttons: [{
    label: ok,
    result(field) {
      return field.getValue(FIELD_NAME.VALUE);
    }
  }, cancel],
  esc: -1,
  fieldOptions: {
    values: {
      [FIELD_NAME.VALUE]: value
    }
  }
}).catch(() => null);
