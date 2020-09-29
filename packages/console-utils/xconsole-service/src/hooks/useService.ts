import createService from '../service';
import { IOptions } from '../types';
import useAsync from './useAsync';
import { ApiType } from '../const/index';

interface IParams {
  [key: string]: any;
}

interface IProps<T> extends Partial<IOptions> {
  code?: string;
  ignoreError?: boolean;
  manual?: boolean;
  service?: (p: IParams) => Promise<T>;
  pollingInterval?: number;
  onSuccess?: (d: T) => void;
  onError?: (e: Error) => void;
}

export const useService = <R = any, P extends IParams = {}>(
  service: (p: P) => Promise<R>,
  params?: P,
  opt: IProps<R> = {}
) => {
  return useAsync<P, R>(
    async (runParams: P) => {
      const res = await service(runParams || params);
      return res;
    },
    [JSON.stringify(params), JSON.stringify(opt)],
    {
      manual: opt.manual,
      pollingInterval: opt.pollingInterval,
      onError: opt.onError,
      onSuccess: opt.onSuccess,
    }
  );
};

export const useOpenApi = <R = any, P extends IParams = {}>(
  code: string,
  action: string,
  params?: P,
  opt: IProps<R> = {}
) => {
  const requestService = createService<P, R>(code, action, {
    ...opt,
    apiType: ApiType.open,
  });
  return useService<R, P>(requestService, params, opt);
};

export const useInnerApi = <R = any, P extends IParams = {}>(
  code: string,
  action: string,
  params?: P,
  opt: IProps<R> = {}
) => {
  const requestService = createService<P, R>(code, action, {
    ...opt,
    apiType: ApiType.inner,
  });
  return useService<R, P>(requestService, params, opt);
};

export const usePluginApi = <R = any, P extends IParams = {}>(
  code: string,
  action: string,
  params?: P,
  opt: IProps<R> = {}
) => {
  const requestService = createService<P, R>(code, action, {
    ...opt,
    apiType: ApiType.plugin,
  });
  return useService<R, P>(requestService, params, opt);
};

export const useAppApi = <R = any, P extends IParams = {}>(
  code: string,
  action: string,
  params?: P,
  opt: IProps<R> = {}
) => {
  const requestService = createService<P, R>(code, action, {
    ...opt,
    apiType: ApiType.app,
  });
  return useService<R, P>(requestService, params, opt);
};

export default useService;
