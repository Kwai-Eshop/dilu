import path from 'path';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import pkg from './package.json';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

const version = process.env.VERSION || pkg.version;
const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx'];

const banner =
  '/*!\n' +
  ` * ${pkg.name} v${version}\n` +
  ` * (c) 2023-present By Kuaishou Eshop FrontEnd\n` +
  ' * Released under the MIT License.\n' +
  ' */';

const resolve = (p) => path.resolve(__dirname, './', p);

console.log(resolve('src/index.ts'));
const moduleName = 'DLCore';
const external = ['qiankun'];

const builds = {
  umd: {
    entry: resolve('src/index.ts'),
    dest: resolve('dist/index.umd.js'),
    format: 'umd',
    banner,
    plugins: [terser()],
    babelOptions: {
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/env',
          {
            useBuiltIns: 'usage',
            corejs: 3,
            loose: true,
            targets: {
              chrome: '60',
              ie: '11',
              firefox: '62',
            },
          },
        ],
      ],
    },
    moduleName,
  },
  // esm: {
  //   entry: resolve('src/index.ts'),
  //   dest: resolve('dist/index.esm.js'),
  //   external,
  //   format: 'esm',
  //   banner,
  // },
  // cjs: {
  //   entry: resolve('src/index.ts'),
  //   dest: resolve('dist/index.cjs.js'),
  //   external,
  //   format: 'cjs',
  //   banner,
  // },
};

function genConfig(name) {
  const opts = builds[name];
  const config = {
    input: opts.entry,
    external: opts.external || [],
    plugins: [
      json(),
      nodeResolve({ browser: true }),
      commonjs(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      babel({
        exclude: 'node_modules/**', // 只编译我们的源代码
        extensions,
        ...(opts.babelOptions || {}),
      }),
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || moduleName,
      exports: 'auto',
      sourcemap: false,
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg);
      }
    },
  };
  return config;
}

export default Object.keys(builds).map(genConfig);
