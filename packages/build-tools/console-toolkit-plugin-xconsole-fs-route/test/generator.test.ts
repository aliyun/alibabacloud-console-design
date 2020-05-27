import { existsSync } from 'fs';
import { resolve } from 'path';
import * as chai from 'chai';
import { getRouteMeta, getGlobalMeta } from '../src/route/getMeta';
import { Generator } from '../src/generator';

describe('File Generator', () => {
  const tmpPath = resolve(__dirname, 'fixtures/src/.xconsole');
  const directory = resolve(__dirname, 'fixtures/src/pages');

  const [routes, globalRoutes] = getRouteMeta(directory, tmpPath);
  const global = getGlobalMeta(directory, {
    indexRoute: ":regionId/overview",
    prefix: "",
    mode: 'browser',
    appId: ''
  });

  const generator = new Generator(tmpPath);

  test('test page meta', async () => {
    try {
      await generator.generate({
        routes,
        globalRoutes,
        global
      });
    } catch(e) {
      console.log(e);
      throw new chai.AssertionError('should no throw error');
    }

    chai.expect(existsSync(resolve(tmpPath, 'routes.js'))).to.eq(true);
    chai.expect(existsSync(resolve(tmpPath, 'app.js'))).to.eq(true);
    chai.expect(existsSync(resolve(tmpPath, 'initializer.js'))).to.eq(true);
    chai.expect(existsSync(resolve(tmpPath, 'index.js'))).to.eq(true);
    // chai.expect(existsSync(resolve(tmpPath, 'createModel.js'))).to.eq(true);
  });
});
