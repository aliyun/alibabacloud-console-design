import { resolve } from 'path';
import { existWithExt } from '../utils/resolveExt';

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
    this.hasUIConfig = existWithExt(resolve(cwd, 'src/ui'));
    this.hasWidgetLoader = existWithExt(resolve(cwd, 'src/loader'));
    this.hasEntryCode = existWithExt(resolve(cwd, 'src/app'));
    this.hasAppConfig = existWithExt(resolve(cwd, 'src/appConfig'));
    this.hasLayout = existWithExt(resolve(cwd, 'src/layout'));
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
