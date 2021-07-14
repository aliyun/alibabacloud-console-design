import isFunction from 'lodash/isFunction';
import innerErrorPrompt from './ErrorPrompt2';
import { ResponseError, ErrorCenterOption, ErrorPromptOption } from './type';

const ErrorCenter = (errorCenterOption: ErrorCenterOption) => {
  const { enable = false, errorCodes, getMessage } = errorCenterOption;

  return {
    onError(err: ResponseError) {
      if (!enable) return false

      const valideErrorCodes = Object.assign({}, isFunction(errorCodes) ? errorCodes(err) : errorCodes || {});

      if (process.env.NODE_ENV === 'development') {
        console.error('[XConsole error-center]', err, err.response);
      }

      innerErrorPrompt({
        error: err,
        errorConfig: valideErrorCodes[err.response?.data?.code] || errorCenterOption.errorConfig ||{},
        getMessage,
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