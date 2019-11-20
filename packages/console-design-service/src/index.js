import request from './request'

export default (
  product,
  action,
  {
    apiType = 'open',
    ignoreError = false,
    description,
  } = {}
) => {
  if (!action) {
    return actions => request({
      data: {
        product,
        actions,
      },
      apiType, // one-console 对应的接口类型
      useCors: false, // 是否使用 fecs 提供的跨域接口
      ignoreError, // 是否忽略 api 异常
      description, // 当前请求的描述
    })
  }
  return params => request({
    data: {
      product,
      action,
      params,
    },
    apiType,
    useCors: false,
    ignoreError,
    description: description || action,
  })
}
