import {
  getSecToken,
  getUmid,
  getCollina,
  getActiveRegionId,
} from '../../utils/index';
import { IOptions, IOptionsData } from '../../types';
import { ApiType } from '../../const/index';

// 默认请求路径
const BASE_URL = '/';
// One-console 各类接口 url 映射表
const API_URL: { [key: string]: string[] } = {
  [ApiType.plugin]: ['data/plugin.json', 'data/multiPluginApi.json'],
  [ApiType.inner]: ['data/innerApi.json', 'data/multiInnerApi.json'],
  [ApiType.app]: ['data/call.json', 'data/multiCall.json'],
  [ApiType.open]: ['data/api.json', 'data/multiApi.json'],
};

// 检查是否是合法的 url
function isValidURL(url: string, apiType: ApiType = ApiType.plugin): boolean {
  const urls = API_URL[apiType];
  if (!urls) {
    console.error(`未在 API_URL 找到 ${apiType} 类型的接口定义`);
    return false;
  }
  if (url && !urls.includes(url)) {
    return false;
  }
  return true;
}

// 解析请求的 api 类型
function isMulti(data: any): boolean {
  // 如果参数中存在 actions 则判定为 multi 请求
  if (typeof data.actions !== 'undefined') {
    return true;
  }
  return false;
}

// fecs 暂时不支持 url 后面跟 "?action" 标示，暂时去掉，如果后面支持再加回来
function getURL(apiType: ApiType = ApiType.plugin, multi: boolean): string {
  const urls = API_URL[apiType];
  if (urls && urls.length > 0) {
    // 添加一个 url 参数方便调试
    return `${multi ? urls[1] : urls[0]}`;
  }
  return '';
}

// 获取 region 用于后端区分调用的 endpoint
function getRegion(data: any): string {
  const multi = isMulti(data);
  if (!multi) {
    const params = data.params || {};
    const { RegionId } = params;

    if (RegionId) {
      return RegionId;
    }
  } else {
    const { actions } = data;
    const action = actions.find(
      ({ params }: { params: any }) => (params || {}).RegionId
    );

    if (action && action.params.RegionId) return action.RegionId;
  }
  return getActiveRegionId();
}

// 必填缺省参数补全并格式化部分参数
const utilsMap: { [key: string]: (data?: any) => any } = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  sec_token: getSecToken,
  collina: getCollina,
  umid: getUmid,
  region: getRegion,
};

function processData(
  data: IOptions['data'] = {},
  keys: string[] = []
): {
    [key: string]: any;
    params?: string;
    actions?: string;
  } {
  const nextData = { ...data };
  keys.forEach((key) => {
    if (typeof nextData[key] === 'undefined') {
      // 只有 getRegion 需要参数
      // 其它方法会忽略参数 data
      nextData[key] = utilsMap[key] && utilsMap[key](data);
    }
  });
  // stringify `params` 与 `actions`
  const params = JSON.stringify(data.params);
  const actions = JSON.stringify(data.actions);

  return {
    ...nextData,
    params,
    actions,
  };
}

// 检查单接口入参
function checkArgumentsForApi({ product, action }: IOptionsData): void {
  if (!product) {
    throw new Error("You must specify which product's api you want to call");
  }
  if (!action) {
    throw new Error('You must specify which api you want to call');
  }
}

// 检查多接口入参
function checkArgumentsForMultiApi({ product, actions }: IOptionsData): void {
  if (!product) {
    throw new Error("You must specify which product's api you want to call");
  }
  if (!Array.isArray(actions)) {
    throw new TypeError('Actions must be an array');
  }
  // loop through to check every action
  actions.forEach(({ action }) => {
    if (!action) {
      throw new Error(
        `You must specify which api you want to call.
        If you see this log, it's likely that you've forgot to specify an action
        property in your actions argument. Go for a double check.`
      );
    }
  });
}

// 检查参数
function checkArguments(data: IOptionsData, multi: boolean): void {
  if (multi) {
    checkArgumentsForMultiApi(data);
  } else {
    checkArgumentsForApi(data);
  }
}

/**
 * Axios intercetor
 * One-console request pre-processor
 * @param {*} config
 */
function consoleRequestInterceptor(config: IOptions): IOptions {
  const { url = '', apiType, data = {}, useCors } = config;
  // 补全缺省必填参数并修正参数格式
  // params 与 actions 需要 JSON.stringify
  const nextData = processData(data, [
    'sec_token',
    'collina',
    'umid',
    'region',
  ]);

  // 如果传入了 url，且不在我们检查的 url 范围内，提前返回不作处理
  if (!isValidURL(url, apiType)) {
    return {
      ...config,
      data: nextData,
    };
  }
  // 单或多接口调用
  const multi = isMulti(data);
  // 检查参数格式是否正确
  checkArguments(data, multi);

  // 返回新的 config 对象
  return {
    ...config,
    method: 'post',
    url: `${getURL(apiType, multi)}?action=${nextData.action}&product=${
      nextData.product
    }`, // 获取请求 URL
    baseURL: BASE_URL,
    withCredentials: !!useCors,
    data: nextData,
    requestStartTime: Date.now(),
  };
}

export default consoleRequestInterceptor;
