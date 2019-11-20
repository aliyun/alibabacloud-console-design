import * as fs from 'fs';
import { resolve, relative } from 'path';
import { debug } from '@alicloud/console-toolkit-shared-utils';
import {
  CONFIG,
  COMPONENT_ENTRY,
  SYTLE,
  MODEL
} from '../constants';
import { getComponentName } from '../utils/utils';
import { getCommentConfig } from '../utils/getCommentSettings';

/*
 * 页面的 meta 信息
 * 包括了:
 *  相关文件的路径信息(component, css, lang, tpl)
 *  相关模块信息
 *  入口文件code
 */
interface IPageMetaOption {
  cwd: string;
  page: string;
  directory: string;
  distDir: string;
  layoutPath?: string;
  ext: string;
}

export class RouteMeta {
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

  constructor(opts: IPageMetaOption) {
    const { directory, cwd, distDir, ext, layoutPath } = opts;

    this.dir = directory;
    this.distDir = distDir;
    this.style = resolve(directory, SYTLE);
    this.component = resolve(directory, COMPONENT_ENTRY)
    .replace(/\.(j|t)sx?/g, ext);

    this.config = this.existPath(resolve(directory, CONFIG));
    this.model = this.existPath(resolve(directory, MODEL));
    this.importPath = relative(this.distDir, this.component)
      .replace(/(\\|\/)/g, '/')
      .replace(/\.(j|t)sx?/g, '');

    this.componentName = getComponentName(relative(distDir, this.dir));

    this.routePath = relative(cwd, directory)
      .replace(/\.\./g, '')
      .replace(/(\\|\/)/g, '/')
      .replace(/\/\$/g, '/:')
      .replace(/^\$/g, ':');

    this.layoutPath = layoutPath;
    if (layoutPath) {
      this.layoutImportPath = relative(this.distDir, layoutPath)
        .replace(/(\\|\/)/g, '/')
        .replace(/\.(j|t)sx?/g, '');
      this.layoutComponentName = getComponentName(relative(distDir, layoutPath));
    }
    this.buildMeta();
  }

  private existPath(path: string, required = false) {
    if (fs.existsSync(path)) {
      return path;
    }
    if (required) {
      throw new Error(`path not exists ${path}`);
    }
  }

  buildMeta() {
    this.getConfig();
    this.getLayout();
    this.getLang();
    this.getHTML();
  }

  private getConfig() {
    const code = fs.readFileSync(this.component, 'UTF-8');
    this.config = getCommentConfig(code);
    debug('fs-route', "Config is: %s",JSON.stringify(this.config));
  }

  private getLayout() {}

  getComponents() {
    const imports = [
      `import ${this.componentName} from '${this.importPath}'`,
    ];
    if (this.layoutPath) {
      imports.push(`import ${this.layoutComponentName} from '${this.layoutImportPath}'`);
    }
    return imports.join('\n');
  }

  getRouteCode() {
    return `{
      path: '${this.routePath}',
      component: ${this.componentName},
      layout: ${this.layoutPath ? this.layoutComponentName : 'null'},
      config: ${JSON.stringify(this.config, null, 8)}
    }`;
  }

  private getLang() {}

  private getHTML() {}
}
