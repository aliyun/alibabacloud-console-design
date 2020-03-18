"use strict";

const path = require("path");
const mkdirp = require("mkdirp");
const co = require('co');
const chalk = require('chalk');
const logSymbols = require('log-symbols')
const Client = require('@ali/def-login-client');

const Generator = require("yeoman-generator");
const mocks = require('./mocks');
const widgetServeHost = 'http://cws.aliyun-inc.com';

module.exports = class extends Generator {
  async initializing() {
    this.props = {};
    const client = new Client({
      'server': 'http://def.alibaba-inc.com',
    });

    const getDefInfo = co.wrap(function* () {
      const token = yield client.login();
      const user = yield client.user();
      const ticket = yield client.ticket({'app': 'def'});
      return {
        user, ticket
      }
    })

    this.props = await getDefInfo();
    console.log(this.options.templatePath)
    if (this.options.templatePath) {
      this.sourceRoot(this.options.templatePath)
    }
  }

  prompting() {
    const self = this;
    return this.prompt([
      // {
      //   type: 'list',
      //   name: 'group',
      //   message: '请选择 Gitlab 仓库分组',
      //   choices: [
      //     {
      //       name: 'aliyun-next',
      //       message: 'aliyun-next' // Uppercase :)
      //     },
      //     {
      //       name: 'no-gitlab',
      //       message: '暂不创建 Gitlab 仓库'
      //     }
      //   ],
      // },
      {
        name: "name",
        message: "请输入 控制台 的名称 (示例: slb, ecs):",
        type: "input",
        validate: this._validateGitLab
      },
      {
        type: 'confirm',
        name: 'useMocks',
        message: '是否使用Mocks平台(http://mocks.alibaba-inc.com)，为您的应用提供标准化场景化的本地数据mock服务',
        default: 'Y'
      },
      {
        type: 'input',
        name: 'mocksProjectName',
        message: 'Mocks项目名称',
        when(props) {
          return props.useMocks
        },
        validate(input){
          console.log('\ncreating...')
          if (input === '') {
            return 'Mocks名称不能为空'
          }
          const done = this.async();
          self._createMocksProject(input).then((result) => {
            if (result !== true) {
              done(result)
            } else {
              done(null, true)
            }
          })
        }
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
    this.spawnCommandSync("tnpm", ["install"]);
  }

  end() {
    const help = `


${logSymbols.success} ${chalk.green('项目已经完成初始化')}

Commands:

  ${chalk.cyan(`tnpm run start`)}          开启本地调试服务器
  ${chalk.cyan(`tnpm run build`)}          执行本地构建
  ${chalk.cyan(`tnpx xconsole block add`)} 添加区块
  ${chalk.cyan(`def publish --daily`)}     将项目发布至日常环境(云端构建)
  ${chalk.cyan(`def publish --prod`)}      将项目发布至生产环境(云端构建)

常用网址:

  XConsole            ：  ${chalk.green(`https://xconsole.aliyun-inc.com`)}
  Wind                ：  ${chalk.green(`https://wind.alibaba-inc.com`)}
  Def                 ：  ${chalk.green(`https://work.def.alibaba-inc.com/my`)}
  配置发布平台viper   ：  ${chalk.green(`http://vipernew.aliyun-inc.com`)}

Example for the ${chalk.cyan(`add`)} command:

  ${chalk.gray(`# 添加列表页`)}
  ${chalk.cyan('tnpx xconsole block add xconsole/basic-list --path ./src/pages/basic-list')}

`;

    this.log(help);
  }

  _createMocksProject(mocksProjectName) {
    const { empid } = this.props.user
    return mocks
      .create(mocksProjectName, empid)
      .then((result) => {
        const { error, data = {} } = result
        if (error) {
          const { code, message } = error
          if (code === 'Duplicate_Name' || code === 'Duplicate_Product_Code') {
            return '该Mocks项目已经存在'
          }
          throw new Error(message)
        }
        const { token } = data
        Object.assign(this.props, {
          mocksAuthToken: token,
        })
        return true;
      })
      .catch((err) => {
        const {
          message = 'UNKNOWN',
          options: {
            url,
            qs,
            formData,
            method = 'GET',
          } = {},
          stack,
        } = err
        this.log(chalk.red(message))
        this.log(chalk.red(`${method} ${url}`))

        if (qs) {
          this.log(`queries: ${JSON.stringify(qs)}`)
        }

        if (method === 'POST' && formData) {
          this.log(`form data: ${JSON.stringify(formData)}`)
        }

        if (stack) {
          this.log(stack)
        }

        process.exit(1)
      })
  }

  /**
   * 获取mocks配置
   */
  _getMocksConfig() {
    const props = this.props // eslint-disable-line prefer-destructuring

    if (!props.mocksResolved || !props.mocksProjectName) {
      return null
    }

    const { mocksProjectName, mocksAuthToken } = props
    const baseConfig = {
      host: mocks.getUrl(),
      product: mocksProjectName,
      projectUrl: mocks.getProjectUrl(mocksProjectName),
    }
    const authConfig = mocksAuthToken ? {
      auth: mocks.getAuthUrl(mocksAuthToken),
    } : {}

    return Object.assign(baseConfig, authConfig)
  }

  async _validateGitLab(input, { answers }) {
    const validateNameApi = `${widgetServeHost}/api/def/has.json`
    if (input === '') {
      return '控制台的名称不能为空'
    }
    // If user skipped creating gitlab
    // if (answers.group === 'no-gitlab') {
    //   return true
    // }

    // try {
    //   const { body } = await axios.post(
    //     validateNameApi,
    //     {
    //       Group: answers.group,
    //       Product: input,
    //       DEFTicket: defTicket,
    //       AuthorWorkId: user.empid
    //     },
    //     {
    //       timeout: 5000
    //     }
    //   )

    //   const { code, message, data } = body
    //   if (code !== '200') {
    //     throw new Error(message)
    //   }
    //   if (data) {
    //     return `请重新输入：${message}`
    //   }
    // } catch (err) {
    //   return `名称可用性检查服务端异常：${err.message}
    //     你可以选择：1. 稍后重试；2. ctrl + c 退出。
    //   `
    // }
    return true
  }
};
