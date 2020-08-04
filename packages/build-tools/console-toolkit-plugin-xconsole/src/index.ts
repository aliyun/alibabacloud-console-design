import { resolve } from 'path';
// import * as Chain from 'webpack-chain';
import { PluginAPI, PluginOptions } from '@alicloud/console-toolkit-core';
import { GENERATOR_URL } from './constants';

export default function (api: PluginAPI, options: PluginOptions) {
  api.dispatchSync('registerGenerator', 'XConsole', {
    path: resolve(__dirname, '../generator/index.js'),
    namespace: 'XconsoleProject',
    type: 'git',
    url: GENERATOR_URL,
  });

  // api.on('onChainWebpack', async (config: Chain) => {
  //   config.resolve.alias
  //     .set('@ali/wind', '@alife/alicloud-components')
  //     .set('@alicloud/console-components', '@alife/alicloud-components');
  // });
}
