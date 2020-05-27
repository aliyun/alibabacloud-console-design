interface IPageMetaOption {
    cwd: string;
    page: string;
    directory: string;
    distDir: string;
    layoutPath?: string;
    ext: string;
}
export declare class RouteMeta {
    style: string;
    distDir: string;
    config?: any;
    model?: string;
    component: string;
    dir: string;
    routePath: string;
    importPath?: string;
    layoutPath?: string;
    componentName?: string;
    layoutImportPath?: string;
    layoutComponentName?: string;
    constructor(opts: IPageMetaOption);
    private existPath;
    buildMeta(): void;
    private getConfig;
    private getLayout;
    getComponents(): string;
    getRouteCode(): string;
    private getLang;
    private getHTML;
}
export {};
