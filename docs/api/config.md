

### product

| 类型 | 默认值 | 必填 |
| -------- | -------- | -------- |
| string     | 空     |  是    |

云产品的code, 如果是控制台项目一定要配置此选项

每个阿里云产品对应的都有自己产品的 code. 如果不知道自己产品的 code, 你可以去 [云知](https://apip.alibaba-inc.com/) 上查询自己产品对应的 code.

### routes

* type: `string`
* default: `字符串`

``` javascript
route: {
  // 路由前缀
  prefix: '/prefix',
  // 首页配置
  index: 'overview',
  // 路由类型
  mode: 'hash' | 'browser',
},
```

### armsId

* type: `string`
* default: `字符串`

监控ID

XConsole 监控使用了阿里云 Arms 的配置, 对前端应用的监控需要配置 Arms ID. 请联系 @不措(bucuo.ly) . 获取应用的arms id 之后 就可以到 ``config/config.js`` 中的 ``armsId`` 填入 id. 这样 XConsole 会自动帮你处理好监控脚本.

[监控详细参考](https://yuque.antfin-inc.com/xconsole/dev/iygpzr)

### consoleBase

* type: `boolean`
* default: false

是否开启控制台 topbar 和 sidebar. 接入 [console base](https://wind.alibaba-inc.com/docs/specs/topbar). 

### oneConsole

* type: `boolean`
* default: false

开启低版本浏览器提示

### intl

目前 OneConsole 项目的 [国际化解决方案](http://ax.aliyun-inc.com/onebook/declare/mcmsNew.html) 是基于 [美杜莎](http://mcms-portal.alibaba-inc.com) 的. 请去美杜莎申请应用.

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

### mocks

默认情况下, 脚手架会默认生成, 对应阿里云 [mocks](https://mocks.alibaba-inc.com/) 的配置. 详细 mocks [用法](https://yuque.antfin-inc.com/xconsole/dev/ebagbe)

``` javascript
mocks: {
  // 自定义 proxy
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

#### disablePolyfill
* type: `boolean`
* default: false

构建结果中是否需要包含 polyfill

#### disableErrorOverlay

* type: `boolean`
* default: false

关闭友好的提示 ErrorOverlay

#### defineGlobalConstants

* type: `boolean`
* default: `{}`

```javascript
defineGlobalConstants: {
  'process.env.Test': 1
};
```

用于提供给代码中可用的变量。

然后你写 ```console.log(process.env.Test);``` 会被编译成 ```console.log(1)```。

注意如果你需要注入字符串，需要自己手动 ```JSON.stringify``` 如：

```javascript
defineGlobalConstants: {
  'process.env.Test': JSON.stringify('test')
};
```

然后你写 ```console.log(process.env.Test);``` 会被编译成 ```console.log('test')```。

#### sourceMap

* type: `boolean`
* default: false

开启构建出sourceMap

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

#### babel
* type: `function`
* default: null

自定义 babel 配置。

```javascript
module.exports = {
  babel(babelConfig) {
    /**
     *  你的修改逻辑
     */
    return babelConfig;
  }
}
```

#### disableHmr

* type: `boolean`
* default: false

#### disableExtractText

* type: `boolean`
* default: null

#### disableUglify

* type: `boolean`
* default: false

#### disableReactHotLoader

* type: `boolean`
* default: false

#### babelExclude

* type: `boolean`
* default: Webpack.RuleSetCondition


### Plugins

高级选项，可以注册 [Breezr 插件](https://yuque.antfin-inc.com/wind/breezr_guide)。请参考 https://yuque.antfin-inc.com/wind/breezr_guide