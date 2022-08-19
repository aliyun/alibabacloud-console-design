import {
  Fetcher,
  FetcherConfig,
  createFetcher as _createFetcher,
  buildUrl,
} from '@alicloud/fetcher';
import interceptSls, {
  FetcherInterceptorConfig as FetcherInterceptorConfigSls
} from '@alicloud/console-fetcher-interceptor-sls';
import interceptRisk, {
  FetcherInterceptorConfig as FetcherInterceptorConfigRisk
} from '@alicloud/console-fetcher-interceptor-res-risk';
import interceptCacheLocal from '@alicloud/fetcher-interceptor-cache-local';
import interceptMerger from '@alicloud/fetcher-interceptor-merger';
import interceptBiz from '@alicloud/console-fetcher-interceptor-res-biz';
import interceptSecurity from '@alicloud/console-fetcher-interceptor-req-security';
import interceptFecs from '@alicloud/console-fetcher-interceptor-fecs';
import interceptErrorMessage from '@alicloud/console-fetcher-interceptor-res-error-message';
import interceptArms from '@alicloud/console-fetcher-interceptor-arms';

import { ApiType, API_URL } from '../const';

interface IOptions {
  slsConfig?: FetcherInterceptorConfigSls;
  armsConfig?: FetcherInterceptorConfigArms;
  riskConfig?: FetcherInterceptorConfigRisk;
}

function getApiUrl(type = ApiType.open, product: string, action: string): string {
  const url = API_URL[type];
  
  if (!url) {
    throw new Error(`ConsoleAPI type ${type} not supported!`);
  }
  
  return buildUrl({
    url,
    params: {
      _fetcher_: `${product}__${action}`
    },
    urlCacheBusting: false
  });
}

export default function createFetcher(config: FetcherConfig, options: IOptions) {
  const {
    slsConfig,
    armsConfig,
    riskConfig
  } = options;

  const fetcher = _createFetcher(config);

  interceptBiz(fetcher);
  interceptCacheLocal(fetcher); // 必须在 Biz 之后，因为 biz 结果的处理影响缓存的数据
  interceptMerger(fetcher); // 必须在 CacheLocal 之后，因为 CacheLocal 有类似的逻辑，且 cache 会优先于 merger
  interceptSecurity(fetcher);
  interceptErrorMessage(fetcher);
  interceptFecs(fetcher);
  interceptArms(fetcher, armsConfig);

  if (slsConfig) {
    interceptSls(fetcher, slsConfig);
  }

  interceptRisk(fetcher, riskConfig);

  return <P = void>(
    product: string,
    action: string,
    params?: P,
    opt?: any,
    apiType?: ApiType,
  ) => {
    const body = {
      product,
      action,
    };

    if (params) {
      body.params = typeof params === 'string' ? params : JSON.stringify(params);

      if (apiType === ApiType.roa || apiType === ApiType.roaInner) {
        body.content = JSON.stringify(params.content)
      }
    }


    return fetcher.post(opt, getApiUrl(apiType, product, action), body);
  }
}