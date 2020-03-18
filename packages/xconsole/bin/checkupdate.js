const packageJson = require('package-json');
const inquirer = require('inquirer');
const { resolve } = require('path');
const execa = require('execa');
const rimraf = require('rimraf');
const { info, error, exit } = require('@alicloud/console-toolkit-shared-utils');

const PKG_NAME = '@alicloud/xconsole';

module.exports = async function updatePackage() {
  const cwd = process.cwd();
  try {
    const needUpdate = await checkUpdate(cwd);
    if (needUpdate) {
      const answers = await inquirer.prompt([
        {
          name: 'type',
          type: 'confirm',
          message: `发现 ${PKG_NAME} 新版本 是否升级?`
        }
      ]);

      if (answers.type) {
        info("正在删除 node_modules")
        rimraf.sync(resolve(cwd, 'node_modules'))
        info("正在执行 tnpm i")
        await execa.stdout('tnpm', ['update'], { cwd });
      }
    }
  } catch(e) {
    error("检查更新失败")
  }
}

async function checkUpdate(cwd) {
  const packageJson = require(resolve(cwd, 'package.json'));
  const xwindVersion = packageJson.dependencies[PKG_NAME] || packageJson.devDependencies[PKG_NAME]
  if (!xwindVersion) {
    error(`没在 package.json 的 dependencies 或者 devDependencies 中找到 ${PKG_NAME}`);
    exit(0);
  }
  return await shouldUpdate(xwindVersion);
}

const shouldUpdate = (currentVersion) => {
  return new Promise((resolve) => {
    const version = require('../package.json').version;
    packageJson(PKG_NAME, {
      registryUrl: 'http://registry.npm.alibaba-inc.com',
      version: currentVersion
    }).then((json) => {
      info("获取到 npm 最新 XConsole 版本:")
      info(json.version)
      info("项目中 XConsole 指定版本:")
      info(version)
      resolve(json.version !== require('../package.json').version);
    })
  });
}