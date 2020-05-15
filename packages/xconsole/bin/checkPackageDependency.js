const packageJson = require('package-json');
const inquirer = require('inquirer');
const { resolve } = require('path');
const execa = require('execa');
const rimraf = require('rimraf');
const { info, error, exit } = require('@alicloud/console-toolkit-shared-utils');

const PKG_NAMES = [
  /^@ali\/wind-/,
  /^@ali\/xconsole-/
];

module.exports = async function checkPackageDependency() {
  const cwd = process.cwd();
  try {
    info("正在检查不必要的包依赖...")
    await _check(cwd);
  } catch(e) {
    error("检查包信息失败，无法推荐你进行依赖包优化")
  }
}

async function _check(cwd) {
  const packageJson = require(resolve(cwd, 'package.json'));
  const dependencies = packageJson.dependencies;
  const devDependencies = packageJson.devDependencies;

  const undesiredPackages = [];

  Object.keys(dependencies).forEach(pkgName => {
    PKG_NAMES.forEach(nameChecker => {
      if (typeof nameChecker === 'string' && nameChecker === pkgName) {
        undesiredPackages.push(pkgName);
      }

      if (nameChecker instanceof RegExp && nameChecker.test(pkgName) === true) {
        undesiredPackages.push(pkgName);
      }
    })
  })

  Object.keys(devDependencies).forEach(pkgName => {
    PKG_NAMES.forEach(nameChecker => {
      if (typeof nameChecker === 'string' && nameChecker == pkgName) {
        undesiredPackages.push(pkgName);
      }

      if (nameChecker instanceof RegExp && nameChecker.test(pkgName) === true) {
        undesiredPackages.push(pkgName);
      }
    })
  })

  if (undesiredPackages.length > 0) {
    error(`新的XConsole中不再需要以下包在项目下引入，请参考文档进行移除:`);
    undesiredPackages.forEach(pkgName => {
      error(`包名 ${pkgName}`);
    })
  } else {
    info(`非常好，未检查到不必要的依赖包的引入! 点赞！`);
  }
  return undesiredPackages;
}