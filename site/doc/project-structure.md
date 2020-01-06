---
name: project-structure
zhName: 目录结构
sort: 2
---

# 目录结构


## 项目目录结构

项目创建完成后会得到如下目录结构:

```
├── config                    // * 项目配置文件夹
│   └── config.js             // * 构建配置
├── package.json              // * 应用依赖等信息配置
└── src                       // 业务代码目录
    ├── appConfig.js          // * 应用配置
    ├── components            // 通用组件
    ├── index.html            // 应用页面入口
    ├── locales               // * 国际化相关数据
    │   └── messages.js
    ├── pages                 // * 页面
    ├── sidebar.js
    └── styles
        ├── fix.less
        └── index.less

```

## 页面目录结构

```
├── pages
    └── basic-form
        ├── index.scoped.less  // 样式
        ├── index.js           // * 页面组件入口文件
        └── model.js           // 数据模型

```


