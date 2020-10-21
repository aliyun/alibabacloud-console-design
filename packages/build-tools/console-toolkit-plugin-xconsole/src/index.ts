import { resolve } from 'path';
import { PluginAPI } from '@alicloud/console-toolkit-core';
import { GENERATOR_URL } from './constants';

export default function (api: PluginAPI) {
  api.dispatchSync('registerGenerator', 'XConsole', {
    path: resolve(__dirname, '../generator/xconsole/index.js'),
    namespace: 'XconsoleProject',
    type: 'git',
    url: GENERATOR_URL,
  });
}
