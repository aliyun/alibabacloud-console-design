---
name: quick-start
zhName: 快速开始
sort: 1
---

# 快速开始

## 基础环境准备

### node
先安装 Node 环境, 推荐保证是 8.10.x 以上. 请访问 [https://nodejs.org/en/download/](https://nodejs.org/en/download/) 来根据操作系统和环境安装 Node.js

```bash
$ brew install node
# 你可以通过 node -v 来查看你的 node 是否安装成功
$ node -v
```

## 项目脚手架

先找你的项目的目录, 运行脚手架命令。

`npx @alicloud/console-design init`

在回答几个必要问题之后, 你就可以看到整个项目已经被初始化完毕.

启动本地服务器:

```bash
$ npm run start
# 你也可以指定端口启动服务
$ npm run start -- --port 3333
```
> 运行后，会在 `src` 下自动生成一个 `.xconsole` 目录， ***不应该去修改此目录下的文件***
> 该目录下的文件都是运行过程中根据源代码自动生成的代码
> 大家遇到问题时，可以查看是否是因为生成的代码存在问题；