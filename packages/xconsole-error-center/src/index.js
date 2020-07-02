import consume from './consume'
import { ConsoleNeedLogin } from './const'

const defaultErrorCodes = {
  [ConsoleNeedLogin]: {
    enable: false
  }
}

export default ({
  errorCenter: {
    enable = false,
    errorCode,
    errorCodes,
    include,
    exclude
  } = {},
}) => {
  if (process.env.NODE_ENV === 'development' && errorCode) {
    console.error('[XConsole error-center]', '使用 errorCodes 来替代 errorCode(已废弃) '); // eslint-disable-line no-console
  }

  const lastErrorCodes = Object.assign({}, defaultErrorCodes, errorCodes || errorCode || {});

  return {
    onError(err) {
      if (!enable) return false

      if (process.env.NODE_ENV === 'development') {
        console.error('[XConsole error-center]', err, err.response); // eslint-disable-line no-console
      }

      consume(err, lastErrorCodes, include, exclude);
    },
  }
};

export const ErrorConsume = consume;

export const ErrorPrompt = (err, { errorConfig = {} }) => {
  consume(err, errorConfig);
};
