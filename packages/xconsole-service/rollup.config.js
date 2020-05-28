import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import autoExternal from 'rollup-plugin-auto-external';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'es/index.js',
      format: 'esm',
    },
    {
      file: 'lib/index.js',
      format: 'cjs',
    },
  ],
  plugins: [typescript(), resolve(), commonjs(), json(), autoExternal()],
};
