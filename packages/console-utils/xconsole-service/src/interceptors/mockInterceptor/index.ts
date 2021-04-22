import { IOptions } from '../../types';

function getURL(url: string): string {
  // If no one-console api
  const oneConsoleApiPattern = /^data\/(multi)?(inner)?(plugin)?(api|call)\.json/i;
  if (!oneConsoleApiPattern.test(url)) {
    return url.replace(/^\//, '');
  }
  const [, target] = /^data\/(.+)\.json/.exec(url) || [];

  // multi
  if (target.includes('multi')) {
    return url.replace(target, 'multiApi');
  }
  return url.replace(target, 'api');
}

function consoleMockInterceptor({
  url = '',
  mock = false,
  baseURL = '/',
  data,
  ...restConfig
}: IOptions): IOptions {
  const { hostname, protocol, host } = window.location;
  const useMocks = mock || ['localhost', '127.0.0.1'].includes(hostname);
  // Mocks does not support the "inner" and "call" apis,
  // so we map these apis to the very basic correspondings.
  // aka. "data/api.json" and "data/multiApi.json"
  // and keep the search part -> ?action=DescribeVpcs.

  return {
    ...restConfig,
    // Strip "/" out of url
    // eg: "/data/api.json" -> "data/api.json"
    url: useMocks ? getURL(url) : url && url.replace(/^\//, ''),
    baseURL: mock ? `${protocol}//${host}` : baseURL,
    data,
  };
}

export default consoleMockInterceptor;
