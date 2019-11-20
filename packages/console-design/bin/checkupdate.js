const execa = require('execa');
const rimraf = require('rimraf');
const { resolve } = require('path');
const inquirer = require('inquirer');
const packageJson = require('package-json');
const { info, error, exit } = require('@alicloud/console-toolkit-shared-utils');

const PKG_NAME = '@alicloud/console-design';

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
    packageJson(PKG_NAME, {
      registryUrl: 'http://registry.npmjs.org',
      version: currentVersion
    }).then((json) => {
      resolve(json.version !== require('../package.json').version);
    })
  });
}