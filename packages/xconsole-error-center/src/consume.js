import * as ErrorConsumers from './internal';
import _get from 'lodash.get';

const consume = (error, errorCodes, include, exclude) => {
  const code = _get(error, 'response.data.code') || error.code;
  const errorConfig = errorCodes[code];

  if (typeof errorConfig === 'function') return errorConfig(error);
  
  const { type = 'prompt', enable = true } = (errorConfig || {});

  if (!enable) return;

  if (include && include instanceof Array) {
    if (!include.find((rule) => {
      if (typeof rule === 'string') return rule === code;
      if (rule instanceof RegExp) return rule.test(code);
    })) return;
  } else if (exclude && include instanceof Array) {
    if (exclude.find((rule) => {
      if (typeof rule === 'string') return rule === code;
      if (rule instanceof RegExp) return rule.test(code);
    })) return;
  }

  if (ErrorConsumers[type]) {
    ErrorConsumers[type]({ error, code, errorConfig });
  } else {
    ErrorConsumers.prompt({ error, code, errorConfig });
  }
}

export default consume;