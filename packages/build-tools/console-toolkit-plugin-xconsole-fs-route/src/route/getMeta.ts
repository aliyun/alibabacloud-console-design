import * as fs from 'fs';
import { resolve, basename } from 'path';

import { flatten } from 'lodash';
import { debug } from '@alicloud/console-toolkit-shared-utils';
import { IGNORE_DIR, GLOBAL_DIR, LAYOUT } from '../constants';
import { resolveExt, resolveWithExt } from '../utils/resolveExt';
// import * as pathToRegexp from 'path-to-regexp';

import { RouteMeta } from './RouteMeta';
import GlobalMeta, { GlobalOptions } from './GlobalMeta';

interface RouteParam {
  // current Root Dir
  currentDir: string;
  // routes name
  name: string;
  // current working dir
  cwd: string;
  // tpl dir for import
  distDir: string;
  //
  isRoot?: boolean;
}
/**
 *
 * @param root
 * @param name
 * @param dir
 */
function getRouteMetasImpl(param: RouteParam) {
  const { currentDir, name, distDir, cwd, isRoot } = param;

  const igonreDirs = IGNORE_DIR;
  if (isRoot) {
    igonreDirs.push(GLOBAL_DIR);
  }

  if (!fs.existsSync(currentDir)) {
    return [];
  }

  const fileList = fs.readdirSync(currentDir).filter(
    (fileName: string) => !fileName.startsWith('.')
  );

  debug('fs-route', 'scan file for %s fileList is %j', currentDir, fileList);

  // 查找出对应的文件夹
  const directories = fileList.filter(
    (fileName: string) =>
      fs.statSync(resolve(currentDir, fileName)).isDirectory() && igonreDirs.indexOf(fileName) === -1
  ).reverse();

  let pages: RouteMeta[] = [];

  // 如果这个文件夹下全部是文件夹
  // 那么递归遍历这些子文件夹获取页面信息
  pages = flatten(directories.map((fileName: string) => {
    const filePath = resolve(currentDir, fileName);
    return getRouteMetasImpl({
      currentDir: filePath,
      name: fileName,
      cwd,
      distDir
    });
  }));

  const indexExt = resolveExt(resolve(currentDir, 'index'));
  const layoutPath = resolveWithExt(resolve(currentDir, '..', LAYOUT));
  if (indexExt) {
    pages.push(new RouteMeta({
      directory: currentDir,
      page: name,
      cwd,
      distDir,
      layoutPath,
      ext: indexExt
    }));
  }

  // 返回这个文件夹下 所有页面的信息
  return pages;
}

export function getRouteMeta(directory: string, distDir: string) {
  const routeMetas = getRouteMetasImpl({
    currentDir: directory,
    cwd: directory,
    name: basename(directory),
    distDir,
    isRoot: true
  });

  const globalRouteMetas = getRouteMetasImpl({
    currentDir: resolve(directory, GLOBAL_DIR),
    cwd: directory,
    name: basename(directory),
    distDir,
  });

  return [routeMetas, globalRouteMetas];
}

export function getGlobalMeta(cwd: string, opts: GlobalOptions) {
  return new GlobalMeta(cwd, opts);
}