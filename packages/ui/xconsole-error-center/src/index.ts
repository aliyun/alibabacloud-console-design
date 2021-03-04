import isFunction from 'lodash/isFunction';
import innerErrorPrompt from './ErrorPrompt';
import { ResponseError, ErrorCenterOption, ErrorPromptOption } from './type';

const ErrorCenter = (errorCenterOption: ErrorCenterOption) => {
  const {
    enable = false, errorCode, errorCodes,
    getMessage, disableExtraInfo, dialogType, showCopy
  } = errorCenterOption;

  if (process.env.NODE_ENV === 'development' && errorCode) {
    console.error('[XConsole error-center]', '使用 errorCodes 来替代 errorCode(已废弃) ');
  }

  return {
    onError(err: ResponseError) {
      if (!enable) return false

      const valideErrorCodes = Object.assign(
        {},
        isFunction(errorCodes) ? errorCodes(err) : errorCodes || errorCode || {}
      );

      if (process.env.NODE_ENV === 'development') {
        console.error('[XConsole error-center]', err, err.response);
      }

      innerErrorPrompt({
        error: err,
        errorConfig: valideErrorCodes[err.response?.data?.code] || errorCenterOption.errorConfig ||{},
        getMessage,
        showCopy,
        disableExtraInfo,
        dialogType
      })
      // @ts-ignore
      err.preventDefault && err.preventDefault()
    },
  }
};

export const ErrorPrompt = (
  error: ResponseError,
  option: ErrorPromptOption = {}
) => innerErrorPrompt({ error, ...option })

export * from './type';

export default ErrorCenter;