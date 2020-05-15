import { PluginAPI, PluginOptions } from '@alicloud/console-toolkit-core';
import { resolve } from 'path';
import { debounce, get } from 'lodash';
import * as chokidar from 'chokidar';
import * as WebpackChain from 'webpack-chain';

import { Generator } from './generator';
import { getRouteMeta, getGlobalMeta } from './route/getMeta';
import { TMP_DIR } from './constants';

export default async (api: PluginAPI, options: PluginOptions) => {
  api.on('onDevStart', async () => {
    await watchAndBuild(api, options);
  });

  api.on('onBuildStart', async () => {
    await watchAndBuild(api, options);
  });

  api.on('onChainWebpack', async (config: WebpackChain) => {
    buildRoute(api, options);

    config
      .entry('index')
      .clear()
      .add(`./${TMP_DIR}/index.js`)
      .end()
    .resolve
      .alias
      .merge({
        '~': resolve(api.getCwd(), 'src')
      })
      .end();
  });

  api.registerSyncAPI('getRouteMeta', () => {
    return getRouteMetaFromDir(api, options);
  });

};

async function watchAndBuild(api: PluginAPI, options: PluginOptions) {
  const watcher = chokidar.watch('./src/pages/**')
    .on('all', debounce(() => {
      console.log('监听到 pages 下文件变化，重新生成 .xconsole 内容');
      buildRoute(api, options);
    }, 100));

  process.on('SIGINT', () => {
    watcher.close();
  });
}

function getRouteMetaFromDir(api: PluginAPI, options: PluginOptions) {
  const tmpPath = resolve(api.getCwd(), `src/${TMP_DIR}`);
  const directory = resolve(api.getCwd(), 'src/pages');
  const [routes, globalRoutes] = getRouteMeta(directory, tmpPath);

  const global = getGlobalMeta(api.getCwd(), {
    indexRoute: `${get(options, 'routes.index', null)}`,
    mode: `${get(options, 'routes.mode', '')}`,
    prefix: `${get(options, 'routes.prefix', '')}`,
    appId: options.appId,
  });

  return {
    routes,
    globalRoutes,
    global
  };
}

function buildRoute(api: PluginAPI, options: PluginOptions) {
  const tmpPath = resolve(api.getCwd(), `src/${TMP_DIR}`);
  const directory = resolve(api.getCwd(), 'src/pages');
  const [routes, globalRoutes] = getRouteMeta(directory, tmpPath);

  const global = getGlobalMeta(api.getCwd(), {
    indexRoute: `${get(options, 'routes.index', null)}`,
    mode: `${get(options, 'routes.mode', '')}`,
    prefix: `${get(options, 'routes.prefix', '')}`,
    appId: options.appId,
  });

  const generator = new Generator(tmpPath);

  api.emit('onBuildRoutes');

  generator.generate({
    routes,
    globalRoutes,
    global
  });
}
