/* eslint-disable no-underscore-dangle */
declare global {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window {
    __bl: any;
    aplus_queue: any [];
    APLUS_CONFIG: Record<string, any>;
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

  // 手动上报 aplus
  // eslint-disable-next-line @typescript-eslint/camelcase
  const q = (window.aplus_queue || (window.aplus_queue = []));
  window.APLUS_CONFIG && q.push({
    'action':'aplus.logApi',
    'arguments':[{
      api, // 必选 api地址
      url: window.location.href,
      success, // 必选 boolean 接口请求成功与否
      msg, // 可选，出错时接口返回信息
      // httpCode: number, // 可选 http状态码
      code, // 可选 业务code
      time: duration, // 可选 接口请求时长
      traceId, // 可选 traceId
      // params: string, // 可选 json格式 请求参数
      // header: string, // 可选 json格式 请求头
      requestType: 'xhr', // 可选 请求类型
      method: 'POST', // 可选 fetch,xhr的请求方法
      // sampling: 1 // 采样上报，不填为1，0-1之间的数字
    }]
  });
};

export default apiLog;
