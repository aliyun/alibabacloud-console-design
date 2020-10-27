import { DependencyList } from 'react'
import createService from '../service';
import { IOptions } from '../types';
import useAsync from './useAsync';
import { ApiType } from '../const/index';
import globalConfig from '../config/config'

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
  opt: IProps<R> = {},
  deps: DependencyList = []
) => {
  return useAsync<P, R>(
    async (runParams: P) => {
      const res = await service(runParams || params);
      return res;
    },
    [JSON.stringify(params), JSON.stringify(opt), ...deps],
    {
      manual: opt.manual,
      pollingInterval: opt.pollingInterval,
      onError: (error) => {
        globalConfig.onError(error);
        opt.onError && opt.onError(error);
      },
      onSuccess: opt.onSuccess,
    }
  );
};

const useXconsoleService = <R = any, P extends IParams = {}>(
  code: string,
  action: string,
  params: P,
  opt: IProps<R> = {},
  apiType: ApiType
) => {
  const requestService = createService<P, R>(code, action, {
    ...opt,
    apiType,
  });
  return useService<R, P>(requestService, params, opt, [code, action]);
};

export const useOpenApi = <R = any, P extends IParams = {}>(
  code: string,
  action: string,
  params?: P,
  opt: IProps<R> = {}
) => {
  return useXconsoleService(code, action, params, opt, ApiType.open);
};

export const useInnerApi = <R = any, P extends IParams = {}>(
  code: string,
  action: string,
  params?: P,
  opt: IProps<R> = {}
) => {
  return useXconsoleService(code, action, params, opt, ApiType.inner);
};

export const usePluginApi = <R = any, P extends IParams = {}>(
  code: string,
  action: string,
  params?: P,
  opt: IProps<R> = {}
) => {
  return useXconsoleService(code, action, params, opt, ApiType.plugin);
};

export const useAppApi = <R = any, P extends IParams = {}>(
  code: string,
  action: string,
  params?: P,
  opt: IProps<R> = {}
) => {
  return useXconsoleService(code, action, params, opt, ApiType.app);
};


export const useRoaApi = <R = any, P extends IParams = {}>(
  code: string,
  action: string,
  params?: P,
  opt: IProps<R> = {}
) => {
  return useAsync<P, R>(
    async (runParams: P) => {
      const requestService = createService<P, R>(code, action, {
        ...opt,
        apiType: ApiType.open,
        data: {
          content: JSON.stringify(runParams || params)
        }
      });
      const res = await requestService(runParams || params, true) as R;
      return res;
    },
    [JSON.stringify(params), JSON.stringify(opt), code, action],
    {
      manual: opt.manual,
      pollingInterval: opt.pollingInterval,
      onError: opt.onError,
      onSuccess: opt.onSuccess,
    }
  );
};

export default useService;
