import { RouteMeta } from './RouteMeta';
import GlobalMeta, { GlobalOptions } from './GlobalMeta';
export declare function getRouteMeta(directory: string, distDir: string): RouteMeta[][];
export declare function getGlobalMeta(cwd: string, opts: GlobalOptions): GlobalMeta;
