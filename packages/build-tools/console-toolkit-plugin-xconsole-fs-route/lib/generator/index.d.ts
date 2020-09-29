import { RouteMeta } from '../route/RouteMeta';
import GlobalMeta from '../route/GlobalMeta';
interface AppInfo {
    routes: RouteMeta[];
    globalRoutes: RouteMeta[];
    global: GlobalMeta;
}
/**
 *
 */
export declare class Generator {
    private dir;
    constructor(dir: string);
    generate(app: AppInfo): void;
    genRoutes(app: AppInfo): void;
    genIndex(app: AppInfo): void;
    genApp(app: AppInfo): void;
    genInitializer(app: AppInfo): void;
    getRouteConfig(app: AppInfo): void;
    private ensureDir;
    private render;
}
export {};
