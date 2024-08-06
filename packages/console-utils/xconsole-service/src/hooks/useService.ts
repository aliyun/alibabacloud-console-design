import { DependencyList } from 'react';
import { createFetcher, FetcherError } from '@alicloud/console-fetcher';
import { createFetcher as createFetcherProxy } from '@alicloud/console-fetcher-proxy';

import createService from '../service';
import { IOptions } from '../types';
import useAsync from './useAsync';
import { ApiType } from '../const/index';
import globalConfig from '../configuration/config';
import { getOssDownloadUrl, genOssUploadSignature } from '../oss';
import { DownloadSignatureParam, DownloadSignatureResponse, OssSignatureParam, OssSignatureResponse } from '../oss/types';
import createError from '../utils/createError';
import { getActiveRegionId } from '../utils/index';

interface IParams {
  [key: string]: any;
}

interface IProps<T> extends Partial<IOptions> {
  code?: string;
  disableErrorPrompt?: boolean;
  ignoreError?: boolean;
  manual?: boolean;
  service?: (p: IParams) => Promise<T>;
  pollingInterval?: number;
  onSuccess?: (d: T) => void;
  onError?: (e: Error) => void;
  useNewRisk?: boolean | { riskVersion: '3.0' }; // 使用 fetcher 新版风控
  useFetcherProxy?: boolean; // 使用 fetcherProxy
}

export const useService = <R = any, P extends IParams = {}>(
  service: (p: P) => Promise<R>,
  params?: P,
  opt: IProps<R> = {},
  deps: DependencyList = [],
) => {
  return useAsync<P, R>(
    async (runParams: P) => {
      const res = await service(runParams || params);
      return res;
    },
    [JSON.stringify(params), JSON.stringify(opt), JSON.stringify(deps)],
    {
      manual: opt.manual,
      pollingInterval: opt.pollingInterval,
      onError: (error) => {
        !opt.disableErrorPrompt && globalConfig.onError(error);
        opt.onError && opt.onError(error);
      },
      onSuccess: opt.onSuccess,
    },
  );
};

const useXconsoleService = <R = any, P extends IParams = {}>(
  code: string,
  action: string,
  params: P,
  opt: IProps<R> = {},
  apiType = ApiType.open,
  useFetcher = false,
) => {
  let requestService;

  if (useFetcher) {
    const { region: userRegion, useNewRisk, useFetcherProxy, ignoreError, disableThrowResponseError } = opt || {};
    const fetcher = useFetcherProxy ? createFetcherProxy({}, {}, useNewRisk) : createFetcher({}, {}, useNewRisk);
    // 获取 region 值，调用 oneConsole 时用于区别 endpoint

    const handleError = (e: FetcherError) => {
      if (ignoreError !== true && !disableThrowResponseError) {
        throw createError(e);
      }

      return e as unknown as R;
    };

    const getData = (json: any) => {
      if (opt.rawResponseData) return json;

      return json.data;
    };

    // eslint-disable-next-line @typescript-eslint/no-shadow
    requestService = (params: P) => {
      const { RegionId, content } = params;
      const region = userRegion || RegionId || getActiveRegionId();

      switch (apiType) {
        case ApiType.open:
          return fetcher.callOpenApi<R, P>(code, action, params, { region, getData }).catch(handleError);
        case ApiType.inner:
          return fetcher.callInnerApi<R, P>(code, action, params, { region, getData }).catch(handleError);
        case ApiType.roa:
          // roa 的参数格式特殊
          return fetcher.callOpenApi<R, P>(code, action, params.params || params, { region, roa: content, getData }).catch(handleError);
        case ApiType.app:
          return fetcher.callContainerApi<R, P>(code, action, params, { getData }).catch(handleError);
        default:
          return fetcher.callOpenApi<R, P>(code, action, params, { region, getData }).catch(handleError);
      }
    };
  } else {
    requestService = createService<R, P>(code, action, {
      ...opt,
      apiType,
    });
  }

  return useService<R, P>(requestService, params, opt, [code, action]);
};

export const useOpenApi = <R = any, P extends IParams = {}>(
  code: string,
  action: string,
  params?: P,
  opt: IProps<R> = {},
  useFetcher = false,
) => {
  return useXconsoleService(code, action, params, opt, ApiType.open, useFetcher);
};

export const useInnerApi = <R = any, P extends IParams = {}>(
  code: string,
  action: string,
  params?: P,
  opt: IProps<R> = {},
  useFetcher = false,
) => {
  return useXconsoleService(code, action, params, opt, ApiType.inner, useFetcher);
};

export const usePluginApi = <R = any, P extends IParams = {}>(
  code: string,
  action: string,
  params?: P,
  opt: IProps<R> = {},
) => {
  return useXconsoleService(code, action, params, opt, ApiType.plugin);
};

export const useAppApi = <R = any, P extends IParams = {}>(
  code: string,
  action: string,
  params?: P,
  opt: IProps<R> = {},
  useFetcher = false,
) => {
  return useXconsoleService(code, action, params, opt, ApiType.app, useFetcher);
};

export const useRoaApi = <R = any, P extends IParams = {}>(
  code: string,
  action: string,
  params?: P,
  opt: IProps<R> = {},
  useFetcher = false,
) => {
  return useXconsoleService(code, action, params, opt, ApiType.roa, useFetcher);
};

export const useHttpApi = <R = any, P extends IParams = {}>(
  code: string,
  action: string,
  params?: P,
  opt: IProps<R> = {},
  useFetcher = false,
) => {
  return useXconsoleService(code, action, params, opt, ApiType.http, useFetcher);
};

export const useOssDownloadUrl = (
  params: DownloadSignatureParam,
  opt: IProps<DownloadSignatureResponse> = {},
) => {
  return useService<DownloadSignatureResponse, DownloadSignatureParam>(getOssDownloadUrl, params, opt);
};

export const useOssUploadSignature = (
  params: OssSignatureParam,
  opt: IProps<OssSignatureResponse> = {},
) => {
  return useService<OssSignatureResponse, OssSignatureParam>(genOssUploadSignature, params, opt);
};

export default useService;
