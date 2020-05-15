import * as fs from 'fs';
import { resolve } from 'path';

export interface GlobalOptions {
  indexRoute: string;
  mode?: string;
  prefix: string;
  appId?: string;
}
/**
 *
 */
export default class GlobalMeta {
  hasUIConfig: boolean;
  hasWidgetLoader: boolean;
  hasEntryCode: boolean;
  hasAppConfig: boolean;
  indexRoute: string;
  redirect?: string;
  prefix: string;
  mode: string;
  hasLayout: boolean;
  appId: string;
  // globalModals: boolean;

  constructor(cwd: string, options: GlobalOptions) {
    this.hasUIConfig = fs.existsSync(resolve(cwd, 'src/ui.js'));
    this.hasWidgetLoader = fs.existsSync(resolve(cwd, 'src/loader.js'));
    this.hasEntryCode = fs.existsSync(resolve(cwd, 'src/app.js'));
    this.hasAppConfig = fs.existsSync(resolve(cwd, 'src/appConfig.js'));
    this.hasLayout = fs.existsSync(resolve(cwd, 'src/layout.js'));
    this.indexRoute = options.indexRoute;
    this.prefix = options.prefix;
    this.mode = options.mode || 'browser';
    this.appId = options.appId || 'os-app';

    this.parseIndexRoute();
  }

  private parseIndexRoute() {
    const { indexRoute } = this;
    this.redirect = indexRoute;
  }
}
