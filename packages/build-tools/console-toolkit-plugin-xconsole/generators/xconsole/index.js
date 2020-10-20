"use strict";

const path = require("path");
const mkdirp = require("mkdirp");
const co = require('co');
const chalk = require('chalk');
const logSymbols = require('log-symbols')
const Client = require('@ali/def-login-client');

const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async initializing() {
    this.props = {};
    if (this.options.templatePath) {
      this.sourceRoot(this.options.templatePath)
    }
  }

  prompting() {
    const self = this;
    return this.prompt([
      {
        name: "name",
        message: "请输入 控制台 的名称 (示例: slb, ecs):",
        type: "input",
        validate: this._validateGitLab
      },
    ]).then(props => {
      this.props = props
    });
  }

  async configuring() {
    const { name } = this.props;
    if (path.basename(this.destinationPath()) !== name) {
      this.log(
        `Your generator must be inside a folder named ${name}\nI'll automatically create this folder.`
      );
      try {
        await mkdirp(name);
      } catch(e) {
        console.log(e)
      }
      console.log(this.destinationPath(name))
      this.destinationRoot(this.destinationPath(name));
    }
  }

  writing() {
    this.fs.copy(this.templatePath(), this.destinationPath(), {
      globOptions: { dot: true }
    });
  }

  install() {
    this.spawnCommandSync("npm", ["install"]);
  }

  end() {
    const help = `


${logSymbols.success} ${chalk.green('项目已经完成初始化')}

Commands:

  ${chalk.cyan(`npm run start`)}          开启本地调试服务器
  ${chalk.cyan(`npm run build`)}          执行本地构建
  ${chalk.cyan(`npx xconsole block add`)} 添加区块

Example for the ${chalk.cyan(`add`)} command:

  ${chalk.gray(`# 添加列表页`)}
  ${chalk.cyan('npx xconsole block add xconsole/basic-list --path ./src/pages/basic-list')}

`;

    this.log(help);
  }

  async _validateGitLab(input, { answers }) {
    if (input === '') {
      return '项目的名称不能为空'
    }
    return true
  }
};
