import { ErrorPrompt, createService } from '@alicloud/xconsole'

export default async (variables) => {
  let result = []
  // 假设我们想自己以 GET 形式请求一个 https://xxx.console.aliyun.com/helpme 的接口
  // 因为 createService 本身是为 控制台 openAPI 调用为核心优化的
  // product 建议换成自己的一个 product 标识
  // action 不能为空， 可以随意填写一个

  try {
    result = await createService(
      'vpc',
      'action',
      {
        apiType: 'custom', // 必须设置，非 OneConsole 支持的 api 类型都请设置为 custom
        method: 'post',
        url: '/helpme',
        data: {
          sec_token: '',
          collina: '',
          umid: '',
          region: '',
        },
        params: {
          a: 1,
          b: 2,
        }
      }
    )({
      param1: '1',
      param2: '2',
    })
  } catch (err) {
    console.log('debugme', err, err.response)
    err.response = err.response || {
      config: {
        url: '/helpme',
        method: 'get',
        params: {},
      }
    }
    ErrorPrompt(err, {
      errorConfig: {},
    });
    // result = err.response.data;
  }
  return result;
}
