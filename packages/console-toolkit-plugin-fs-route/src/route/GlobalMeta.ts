import * as fs from 'fs';
import { resolve } from 'path';

export interface GlobalOptions {
  indexRoute: string;
  prefix: string;
  appId: string;
}
/**
 * 
 */
export default class GlobalMeta {
  hasEntryCode: boolean;
  hasAppConfig: boolean;
  indexRoute: string;
  redirect?: string;
  prefix: string;
  hasLayout: boolean;
  appId: string;
  // globalModals: boolean;

  constructor(cwd: string, options: GlobalOptions) {
    this.hasEntryCode = fs.existsSync(resolve(cwd, 'src/app.js'));
    this.hasAppConfig = fs.existsSync(resolve(cwd, 'src/appConfig.js'));
    this.hasLayout = fs.existsSync(resolve(cwd, 'src/layout.js'));
    this.indexRoute = options.indexRoute;
    this.prefix = options.prefix;
    this.appId = options.appId || 'os-app';

    this.parseIndexRoute();
  }
  
  private parseIndexRoute() {
    const { indexRoute } = this;
    this.redirect = indexRoute;
  }
}
