import { IOptions } from '../../types';

function armsRequestInterceptor(config: IOptions): IOptions {
  // 返回新的 config 对象
  return {
    ...config,
    requestStartTime: Date.now(),
  };
}

export default armsRequestInterceptor;
