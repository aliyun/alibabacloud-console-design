import alertError from './alert-error'
// import './index.less';

export default ({
  errorCenter: {
    enable = false,
    errorCode,
    errorCodes,
  } = {},
}) => {
  if (process.env.NODE_ENV === 'development' && errorCode) {
    console.error('[XConsole error-center]', '使用 errorCodes 来替代 errorCode(已废弃) '); // eslint-disable-line no-console
  }

  return {
    onError(err) {
      if (!enable) return false

      if (process.env.NODE_ENV === 'development') {
        console.error('[XConsole error-center]', err, err.response); // eslint-disable-line no-console
      }

      // 自定义 errorPrompt
      // if (errorPrompt) {
      //   return errorPrompt(err)
      // }

      return ErrorPrompt(err, {
        errorConfig: errorCodes || errorCode || {},
      })
    },
  }
};

export const ErrorPrompt = (err, { errorConfig = {} }) => {
  const _alertError = alertError({
    errorConfig,
  })
  return _alertError(err);
};
