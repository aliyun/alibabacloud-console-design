import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import * as ejs from 'ejs';

import { RouteMeta } from '../route/RouteMeta';
import GlobalMeta from '../route/GlobalMeta';

interface AppInfo {
  routes: RouteMeta[];
  globalRoutes: RouteMeta[];
  global: GlobalMeta;
}

const _BOM = /^\uFEFF/;

/**
 * 
 */
export class Generator {
  private dir: string;

  constructor(dir: string) {
    this.dir = dir;
  }

  public generate(app: AppInfo) {
    this.ensureDir();
    this.genRoutes(app);
    this.getRouteConfig(app);
    // await genCreateModel();
    this.genIndex();
    this.genApp(app);
    this.genInitializer();
  }

  public genRoutes(app: AppInfo) {
    this.render('routes', app);
  }

  public genIndex() {
    this.render('index');
  }

  public genApp(app: AppInfo) {
    this.render('app', app);
  }

  public genInitializer() {
    this.render('initializer');
  }

  public getRouteConfig(app: AppInfo) {
    app.globalRoutes.forEach((route) => {
      route.config = {
        ...route.config,
        appMenu: false,
      };
    });
    const routesMetas = [...app.globalRoutes, ...app.routes];
    const imports = routesMetas.map((route) => route.getComponents()).join('\n');
    const routes = routesMetas.map((route) => route.getRouteCode()).join(',\n');
    const route_config = 
`
${imports}
export default{
  global: ${JSON.stringify(app.global, null, 4)},
  routes: [
    ${routes}
  ]
};`;

    writeFileSync(resolve(this.dir, 'route_config.js'), route_config, 'UTF-8');
  }

  private ensureDir() {
    if (!existsSync(this.dir)) {
      mkdirSync(this.dir);
    }
  }

  private render(name: string, data: any = {}) {
    const filePath = resolve(__dirname, '../../tpl', `${name}.js.ejs`);
    const templateStr = readFileSync(filePath, 'UTF-8').toString().replace(_BOM, '');
    const content = ejs.render(templateStr, data);
    writeFileSync(
      resolve(this.dir, `${name}.js`),
      `${content && content.trim()}\n`,
      'utf-8'
    );
    return;
  }

}
