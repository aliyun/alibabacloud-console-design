---
name: build-config
zhName: 构建配置
sort: 4
---

# 构建配置

初始化项目之后, 有如下的地方是控制台项目目前依赖于其他平台的需要. 目前控制台配置在 config/config.js 下, 其中有几项需要自己手动修改.

## 配置
### product

* type: `string`
* default: `字符串`

云产品的code, 如果是控制台项目一定要配置此选项

### armsId

* type: `string`
* default: `字符串`

监控ID

### intl

``` javascript
{
    locale: 'zh',
    products: [
      {
        group: 'aliyun',
        name: 'wind',
        identifier: 'ALIYUN_CONSOLE_MESSAGE',
      },
    ],
    messages: 'locales/messages.js',
  }
```

### consoleBase

* type: `boolean`
* default: false

是否开启控制台 topbar 和 sidebar. 

### browserCompatibility
* type: `boolean`
* default: false

开启低版本浏览器提示

### mocks

``` javascript
mocks: {
	proxy: {
		'/api': 'http://localhost:3000'
	}
 },
```

### 构建相关

#### port

* type:`number`
* default:`3333`

本地调试的dev server 的 port.  [`webpack-dev-server`](https://webpack.js.org/configuration/dev-server/#devserverport) 中的 port 一致..

#### host
* type: `string`
* default: 'http://localhost'

本地调试的dev server 的 host. 和[`webpack-dev-server`](https://webpack.js.org/configuration/dev-server/#devserverport) 中的 host 一致.

#### https
* type: `boolean`
* default: false

本地调试 server 是不是 开启 https. [`webpack-dev-server`](https://webpack.js.org/configuration/dev-server/#devserverport) 中的 https 一致.

 #### theme
 * type: `string` | `Object`
 * default: `{}`
 
配置主题，实际上是配 less 变量。支持对象和字符串两种类型，字符串需要指向一个返回配置的文件。比如：
```javascript
theme : {
	'@primary': '#0070cc'
}
```
或者指定文件 

```javascript
theme : './theme.js' // theme.js 导出的是一个 key, value 的对象
```

#### noProgress
* type: `boolean`
* default: false

构建运行时不开启进度指示
#### disableHmr
* type: `boolean`
* default: false

dev-server 禁用热更新
#### disableReactHotLoader
* type: `boolean`
* default: false

dev-server 禁用 React 热更新. 关闭 [react-hot-loader](https://github.com/gaearon/react-hot-loader/)

#### noOpen

* type: `boolean`
* default: false

构建成功时不打开浏览器

#### disableExtractText

* type: `boolean`
* default: false

禁止将 css 抽取为独立的文件, 所有 css 都会被构建进入到 最终的 JS bundle 中去.

#### disableUglify
* type: `boolean`
* default: false

禁止文件压缩混淆

#### useTerserPlugin
* type: `boolean`
* default: false

由于目前很多 node_module 都包括了
使用 terser plugin 进行压缩混淆 ( disableUglify 为 false 时有效)

#### polyfill
* type: `boolean`
* default: false

构建结果中是否需要包含 polyfill

#### webpack
* type: `function`
* default: null

可以自定义 webpack 配置

```javascript
const merge = require('webpack-merge')

module.exports = {
  webpack(config, options, env) {
	  return merge(config, {
		  // 你的自定义配置
	  })
  }
}
```