import './ui/index.less';

import xconsoleInfo from './xconsole.json';

window.g_xconsole = xconsoleInfo;

export * from './sdk/index';

import XConsoleApp from './lib/index';

export default XConsoleApp;