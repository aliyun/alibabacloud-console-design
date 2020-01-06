/* eslint-disable global-require, @typescript-eslint/no-var-requires */

const path = require("path");

module.exports = {
  // 该页面会部署到 `aliyun.github.io/alibabacloud-console-components`路径下
  // 请根据你的项目名修改
  pathPrefix: `/alibabacloud-console-design`,
  plugins: [
    {
      resolve: `@alicloud/gatsby-theme-console-doc`,
      options: {
        // 用于SEO
        siteMetadata: {
          // 会生成标题如：按钮 · Console components
          siteName: "Console Design",
          description:
            "Console Desing 是针对阿里云控制台场景的研发解决方案。"
        },
        // 入口页面，即点击左上角logo跳转的地址，以及访问`/`跳转的地址
        primaryPath: "/doc/intro",
        // 从文件系统爬取.md和.mdx（我们会忽略不包含frontmatter.name的markdown文档）
        fileSystemCrawlers: [
          {
            name: "design-crawler",
            rootDir: path.resolve(__dirname, "./design")
          },
          {
            name: "doc-crawler",
            rootDir: path.resolve(__dirname, "./doc")
          }
        ],
        // 透传给webpack选项resolve.module：https://webpack.js.org/configuration/resolve/#resolvemodules
        // 优先从文档项目、根目录解析依赖，
        // 如果找不到，再从发起者(即markdown或者demo位置)开始向上解析node_modules
        // 避免不同的markdown解析出各自的'react'
        nodeModules: [
          path.resolve(__dirname, "./node_modules"),
          path.resolve(__dirname, "../node_modules"),
          "node_modules"
        ],
        // 为每个文档添加元数据：它属于哪个类目
        // 每个文档都需要有一个类目，文档的访问路径就是`/类目name/文档name`
        // 类目还被用于给左侧导航栏分类、搜索结果分类
        patchDocInfo: docInfo => {

          // 调试指南：
          // npm run debug
          // 然后在vscode中按下F5，启动vscode的debug
          // 即可在调试期间停在这个地方，查看docInfo的结构
          if (docInfo.fileSystemCrawlerName === "design-crawler") {
            return {
              category: "design",
              labelInMenu: docInfo.zhName,
            };
          }
          if (docInfo.fileSystemCrawlerName === "doc-crawler") {
            return {
              category: "doc",
              labelInMenu: docInfo.zhName,
            };
          }
          throw new Error(
            `unexpected docInfo.fileSystemCrawlerName: ${docInfo.fileSystemCrawlerName}`
          );
        },
        // 定义类目的中文名（展示在左侧导航、搜索结果中）
        categories: {
          doc: "文档",
          design: "设计",
        },
        // 顶部导航
        topNav: [
          { text: "文档", href: "/doc/quick-start" },
          { text: "设计", href: "/design/consistency" },
          { text: "Github", href: "https://github.com/aliyun/alibabacloud-console-design" },
        ],
        // 左侧导航
        // 左侧导航与顶部导航的区别：
        // 顶部导航是静态的，不随着“当前所在页面”而变化
        // 左侧导航是动态的，可以随着“当前所在页面”而变化
        sideNav: context => {
          // 同理，你可以在这里打断点，观察参数的结构
          const { pageMeta } = context;

          const header = (() => {
            switch (pageMeta.category) {
              case "design":
                return "设计";
              case "doc":
                return "文档";
              default:
                throw new Error(
                  `unexpected pageMeta.category ${pageMeta.category}`
                );
            }
          })();

          const navCategories = (() => {
            switch (pageMeta.category) {
              case "design":
                // 如果当前页面是组件
                // 则导航栏需要导航这个类目
                return [{ categoryName: "design" }];
              case "doc":
                // 如果当前页面是指南
                // 则导航栏需要导航这个类目
                return [{ categoryName: "doc" }];
              default:
                throw new Error(
                  `unexpected pageMeta.category ${pageMeta.category}`
                );
            }
          })();
          return {
            // 导航栏标题
            header,
            // 导航栏需要为哪些类目导航
            navCategories
          };
        }
      }
    }
  ]
};