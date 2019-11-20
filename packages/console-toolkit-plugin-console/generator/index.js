"use strict";

const path = require("path");
const mkdirp = require("mkdirp");
const chalk = require('chalk');
const logSymbols = require('log-symbols')
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async initializing() {
    this.props = {};
    console.log(this.options.templatePath)
    if (this.options.templatePath) {
      this.sourceRoot(this.options.templatePath)
    }
  }

  prompting() {
    const self = this;
    return this.prompt([
      {
        name: "name",
        message: "请输入项目名称:",
        type: "input",
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

`;

    this.log(help);
  }

};
