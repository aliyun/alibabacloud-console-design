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
    constructor(cwd: string, options: GlobalOptions);
    private parseIndexRoute;
}
