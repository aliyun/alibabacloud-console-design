/* eslint-disable no-underscore-dangle */
declare global {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window {
    __bl: any;
  }
}

const apiLog = (info: any): void => {
  const { api, success, duration, code, msg, startTime, traceId } = info;
  const apiInfo = [
    'api',
    api,
    success,
    duration,
    code,
    msg,
    startTime,
    traceId,
  ];

  if (!window.__bl) {
    console.log('[xconsole service armsResponseInterceptor]', apiInfo); // eslint-disable-line no-console
  }

  if (window.__bl && window.__bl.api) {
    window.__bl.api(api, success, duration, code, msg, startTime, traceId);
  } else if (window.__bl && window.__bl.pipe) {
    window.__bl.pipe.push(apiInfo);
  } else {
    window.__bl = window.__bl || {};
    // window.__bl maybe is proxy
    if (window.__bl) window.__bl.pipe = [apiInfo];
  }
};

export default apiLog;
