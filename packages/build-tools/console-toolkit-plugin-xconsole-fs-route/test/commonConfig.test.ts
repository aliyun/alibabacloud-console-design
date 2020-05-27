import {readFileSync } from 'fs';
import { resolve } from 'path';
import * as chai from 'chai';
import { getCommentConfig } from '../src/utils/getCommentSettings';

describe('Comment Config', () => {
  test('Comment Config', () => { 
    const code = readFileSync(resolve(__dirname, 'fixtures/commentConfig/index.js'), 'UTF-8');
    const config = getCommentConfig(code);
    chai.expect(config.appMenu).to.be.true;
  });
});
