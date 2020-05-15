import { resolve } from 'path';
import { PluginAPI, PluginOptions } from '@alicloud/console-toolkit-core';
import { getEnv } from '@alicloud/console-toolkit-shared-utils'
import { GENERATOR_URL } from './constants';

export default function (api: PluginAPI, options: PluginOptions) {
  api.dispatchSync('registerGenerator', 'XConsole', {
    path: resolve(__dirname, '../generator/index.js'),
    namespace: 'XconsoleProject',
    type: 'git',
    url: GENERATOR_URL
  });

  api.on('onBuildEnd', () => {
    const env = getEnv();
    if (env.isCloudBuild()) {
      // TODO XXXX
    }
  })
}