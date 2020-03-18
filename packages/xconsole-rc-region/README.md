# @alicloud/xconsole-rc-region

地域选择器

## 基本用法
#include "demo/without-route.js"

## 智能的地域选择器

在控制台业务中，地域选择器是一个非常通用的场景，用户通过切换当前的所在地域，来访问该地域下的一系列资源。

我们将这个场景的通用行为进行了抽象，定制了一系列和地域相关的组件和函数，在开发项目时，使用对应的函数和组件就可以定义和包含业务流程的地域选择器并监听对应的变化。在一般的场景中，控制台中会有一个名为 ``activeRegionId`` 的 Cookie，其值为当前控制台的所处地域，下面是关于 ``activeRegionId`` 的流程描述：

使用 ``wind-rc-region`` 之后，在业务开发中你无需再关注上述这些流程细节，进行简单的配置，在需要的场景中使用对应的组件或高阶组件就可以自动覆盖这些流程，你只需要关注 ``activeRegionId`` 的变化就可以完成对应的业务流程。

### 安装

在你的项目下使用安装 ``@alicloud/xconsole-rc-region`` 组件包

```
$ tnpm i -S @alicloud/xconsole-rc-region
```

### 使用预设的 region 数据模型

region 的数据模型是最核心的部分，它负责整个和 region 相关的核心数据调度。这样设计的目的在于，让 region 相关的数据有一个单一数据源，任何对该数据源的修改，都必须通过该数据模型提供的 API 进行操作。

我们将这个核心声明为一个 ``dva`` 插件，你可以在应用入口处引入并声明使用。在你项目中的入口文件，一般情况下是 ``app.js``，引用并使用 region 数据模型

```
...
import { register } from '@alicloud/xconsole-rc-region'
...
const app = dva(...options)
app.use(register(app))
...
```

### 使用 RegionContext

使用 `RegionContext` 可以连接 region 的数据模型，并且为该组件的 `children` 提供和 region 相关的上下文

- 声明 region 列表数据并连接数据模型

**routes/App/index.js**

```
import React, { Component } from 'react'
import { RegionContext } from '@alicloud/xconsole-rc-region'

const regionList = [
  { id: 'cn-hangzhou', name: '华东 1' },
  { id: 'cn-beijing', name: '华北 1' },
]

class App extends Component {
  render() {
    return (
      <RegionContext dataSource={regionList}>
        {
          ({ activeId }) => (
            <h1>Current Actived Region ID: {activeId}</h1>
          )
        }
      </div>
    )
  }
}

export default App
```

`RegionContext` 会自动访问 model 中 region 的 activeId，并且查找当前的 region 列表里是否存在这个 id，如果该 id 未在当前列表中找到，高阶组件将自动触发变化，将 activeId 设置为当前列表中的第一个 region 项的 id

### 使用 RegionContextRoute

`RegionContextRoute` 拥有 `RegionContext` 的所有功能，且可以将当前的 region 和路由更好地结合起来。`RegionContextRoute` 本身可以看做是一个 `Route`，应用更加灵活


**routes/index.js**

```
import React, { Component } from 'react'
import { RegionContextRoute } from '@alicloud/xconsole-rc-region'
import ShowRegion from './ShowRegion'

const regionList = [
  { id: 'cn-hangzhou', name: '华东 1' },
  { id: 'cn-beijing', name: '华北 1' },
]

export default ({ history }) => (
  <Router history={history}>
    <RegionContextRoute
      path="/show/:regionId"
      component={ShowRegion}
      dataSource={regionList}
    />
  </Router>
)
```

**routes/ShowRegion/index.js**

```
import React, { Component } from 'react'

class ShowRegion extends Component {
  render() {
    return (
      <h1>{this.props.activeId}</h1>
    )
  }
}

export default ShowRegion
```

### 使用智能组件 SmartRegion

在任何 `RegionContext(Route)` 的子孙模块中，都可以使用 ``<SmartRegion />`` 组件来渲染一个 region 选择器，默认情况下你不需要对其做任何配置，即插即用

下面的例子将改造上面的 `ShowRegion` 组件，渲染一个智能的 Region 列表：

```
import React, { Component } from 'react'
import { SmartRegion } from '@alicloud/xconsole-rc-region'

class ShowRegion extends Component {
  render() {
    return (
      <SmartRegion />
    )
  }
}

export default ShowRegion
```

## APIs

### register

将 region 的相关数据和行为注册到当前应用，该函数作为 ``dva`` 的插件使用

```
register(app: DvaInstance): Object
```

### RegionContext

提供 region 上下文的容器组件

|参数|说明|类型|必填|默认值|
|---|---|---|---|---|
|activeId|当前的region id|`String`|||
|nextActiveId|需要进行更新的 region id. 在 Provider 的 didMount 和 didUpdate 生命周期函数内,会针对 nextActiveId 做检查, 如果该值是一个有效值,则会执行 onChange 事件, 并触发默认行为 dispatchChangeAction|`String`|||
|remoteable|是否自动获取远程数据源. 当该值显式指定为 `true`, 则会在 didMount 生命周期触发 dispatchFetchAction 来主动获取远程数据源|`Boolean`|||
|keepAlive|在 activeId 数据变化时, 是否保持 Provider 下的子组件的生存周期|`Boolean`||`false`|
|dataSource|数据列表|Array|||
|changeInterceptor|在触发变化之前的拦截器, 可以对将要变化的 activeId 进行预处理|`Function`|||
|onChange|在 activeId 变化时触发的事件函数|`Function`|||
|onItemClick|代理 Provider 下的 SmartRegion 的点击事件|`Function`|||
|component|render props|`Function|React.Component`|||
|render|render props|`Function`|||
|children|render props|`Function`|||

### RegionContextRoute

提供 region 上下文的路由容器组件

|参数|说明|类型|必填|默认值|
|---|---|---|---|---|
|...RegionContext.props|继承 `RegionContext` 的属性||||
|path|路由路径, 可以参考[React-Route.Route.path](https://reacttraining.com/react-router/web/api/Route/path-string)|String|||

### SmartRegion

智能组件，包含 region 的 UI 以及默认行为，继承所有 ``<Region />`` 组件的属性

### Region

纯 UI 组件，只负责展示 region 列表

|参数|说明|类型|必填|默认值|
|---|---|---|---|---|
|dataSource|region数据列表|Array||``[]``|
|activeId|当前regionID|String|||
|defaultActiveId|非受控，默认的当前regionID|String|||
|portal|将region列表渲染到指定的节点|String\|Boolean||``false``|
|shape|region列表展示形态，目前只有展开形态 ``expanded`` 和下拉菜单形态 ``dropdown``|String||``expanded``|
|onItemClick|region项点击事件|Function||``noop``|
|onChange|region改变后的事件|Function||``noop``|

