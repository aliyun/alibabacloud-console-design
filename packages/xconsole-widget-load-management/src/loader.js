// import createLoader from '@ali/widget-loader'

// const loadWidget = createLoader()
import React from '@alicloud/xconsole/react'

export default ({
  id,
  version,
}, loadOptions) => {

  return () => {
    return <div>因为目前开源版本 widget-loader 还不可用，需要在项目中自行增加 widget-loader 的依赖，请查看 xconsole 网站中开发文档下的【如何自定义 widget-loader】部分来进行处理!</div>
  }
  // if (typeof id === 'undefined') {
  //   throw Error(
  //     '[WLM:loader] widget id is required'
  //   )
  // }
  // return loadWidget({ id, version }, loadOptions)
}
