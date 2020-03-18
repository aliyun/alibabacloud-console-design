CHANGELOG
=========

# 0.9.2 2019/08/22 @单从

* :regionId 下的路由增加 redirect，路径为 config.js 中 route.index

# 0.9.0 2019/08/18 @单从

* 集成 xconsole-console-base，负责与 ConsoleBase 通信
* wind-pro-region-context，移除通信部分，只保留 context 功能，且 activeRegionId 从 wind-rc-region 获取
* preset & fs-router 从 breezr 拿到 xconsole 库中维护。


# 0.8.1 2019/08/11 @单从

* 集成 XConsole-Logger 支持 SPM、ARMS PV 上报功能
  - 支持在 `src/appConfig.js` 自定义 spma
  - 支持在约定路由文件注释中设置 spmb
