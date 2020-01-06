---
name: app-config
zhName: 应用配置
sort: 5
---

# 应用配置

```

const config = {};

// ConsoleBase 配置
config.consoleBase = {
  // regionbar 展示的产品可用地域
  regionList: [
    { id: "cn-hangzhou" },
    { id: "cn-beijing" },
    { id: "cn-qingdao" },
    { id: "cn-shanghai" }
  ]
};

// 埋点配置
config.logger = {}

export default config;

```