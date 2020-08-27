# XConsole Service

阿里云通用的请求方法库，包含：

- OpenAPI
- InnerAPI
- 容器 API
- ISV API
- ROA 风格 OpenAPI
- OneConsole API

## 用法

### 基础用法

```javascript
import createService from '@alicloud/xconsole-service';

createService('产品code', '产品 API Name')({/* 产品参数 */}, opts);
```

### 配置项


### React Hooks 用法

```javascript
import React from 'react';
import { useOpenApi } from '@alicloud/xconsole-service';

const ECS_PRODUCT_CODE = 'ecs';
const DescribeInstance = 'DescribeInstance';

const List: React.FC = () => {

  const { data, loading, run } = useOpenApi(
    ECS_PRODUCT_CODE,
    DescribeInstance,
    { instanceId },
    { initialData: {} }
  );

  console.log(data.Instances);

  return <div></div>;
}
```