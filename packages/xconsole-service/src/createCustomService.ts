import request from './request';
import { IOptions } from './types';

const defaultOptions = {
  apiType: 'custom',
  ignoreError: true,
  description: null,
  useCors: false,
  data: {},
  risk: {},
};

export default (
  options: IOptions = {}
): ((params: any, overlap?: boolean) => Promise<any>) => {
  const opts = {
    ...defaultOptions,
    ...options,
  };

  return (params: any): Promise<any> =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    request({
      ...opts,
      data: {
        ...opts.data,
        ...params,
      },
      apiType: 'custom',
      risk: opts.risk,
    });
};
