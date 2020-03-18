#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const minimist = require('minimist');
const figlet = require('figlet');
const { Service } = require('@alicloud/console-toolkit-core');
const updatePackage = require('./checkupdate');

/**
 * Call command in service
 * @param {*} cmd
 * @param {*} args
 */

async function invokeService(cmd, args) {
  await updatePackage();

  const cwd = process.cwd();
  let windProConfig = {};
  try {
    windProConfig = require(path.resolve(cwd, 'config/config.js'));
  } catch (e) {}

  const config = {
    presets: [
      [ require.resolve('@ali/breezr-preset-xconsole'), windProConfig ]
    ],
    plugins:[
      require.resolve('@ali/breezr-plugin-generator'),
      ...(windProConfig.plugins || []),
      require.resolve('@ali/breezr-plugin-xconsole')
    ]
  };

  await new Service({ cwd: process.cwd(), config }).run(cmd, args);
}

program.version(require('../package').version).usage('<command> [options]');

program
  .command('start')
  .description('start the development environment for wind')
  .option('-o, --open', 'Open browser')
  .option('-p, --port [port]', '')
  .action(cmd => {
    invokeService('start', cleanArgs(cmd));
  });

program
  .command('build')
  .allowUnknownOption(true)
  .option('-e, --engine [engine]', 'Build engine type')
  .option('-w, --watch', 'Need watching file changing?')
  .option('--publishType [publishType]', 'Build engine type')
  .description('build for wind')
  .action(cmd => {
    invokeService('build', cleanArgs(cmd));
  });

program
  .command('inspect')
  .description('inspect webpack config')
  .option('-e, --env [env]', 'show config by env')
  .action(cmd => {
    invokeService('inspect', cleanArgs(cmd));
  });

program
  .command('init')
  .description('generate xconsole project')
  .action(() => {
    invokeService('init', {
      type: 'XConsole'
    });
  });

program.arguments('<command>').action(cmd => {
  invokeService(cmd, minimist(process.argv.slice(2)));
});

program.parse(process.argv);

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
  const args = {};
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''));
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key];
    }
  });
  return args;
}

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}
