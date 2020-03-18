import { resolve } from 'path';
import * as chai from 'chai';
import { getRouteMeta } from '../src/route/getMeta';

describe('Page meta', ()=> {
  test('test page meta', () => { 
    const routes = getRouteMeta(resolve(__dirname, 'fixtures/src/pages'), '');
    chai.expect(routes.length).to.equal(2);
  });
});
