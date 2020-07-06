import * as ErrorConsumers from './internal';
import _get from 'lodash.get';

const process = ({
  error,
  code,
  errorConfig
}) => {
  if (!errorConfig) return;
  if (typeof errorConfig === 'function') return errorConfig(error, code);

  const { enable, type = '' } = errorConfig;
  if (!enable) return;
  if (ErrorConsumers[type]) ErrorConsumers[type]({ error, code, errorConfig });
};

const consume = (error, errorCodes, include, exclude, globalErrorCode) => {
  const code = _get(error, 'response.data.code') || error.code;
  const errorConfig = errorCodes[code] || globalErrorCode;

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

  process({
    error,
    code,
    errorConfig
  });
}

export default consume;