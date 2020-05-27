

const useMocks = ['localhost', '127.0.0.1'].includes(location.hostname);

function consoleMockInterceptor() {
  // Mocks does not support the "inner" and "call" apis,
  // so we map these apis to the very basic correspondings.
  // aka. "data/api.json" and "data/multiApi.json"
  // and keep the search part -> ?action=DescribeVpcs.
  function getURL(url) {
    // If no one-console api
    const oneConsoleApiPattern = /^data\/(multi)?(inner)?(plugin)?(api|call)\.json/i;
    if (!oneConsoleApiPattern.test(url)) {
      return url;
    }
    const [ , target ] = /^data\/(.+)\.json/.exec(url);

    // multi
    if (target.indexOf('multi') !== -1) {
      return url.replace(target, 'multiApi');
    }
    return url.replace(target, 'api');
  }

  return function ({ url, baseURL = '/', data, ...restConfig}) {
    if (url) {
      // Strip "/" out of url
      // eg: "/data/api.json" -> "data/api.json"
      url = url.replace(/^\//, '')
    }

    return {
      ...restConfig,
      url: useMocks ? getURL(url) : url,
      baseURL: useMocks
        ? location.protocol + '//' + location.host
        : baseURL,
      data: data,
    }
  };
}

export default consoleMockInterceptor;