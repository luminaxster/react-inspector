/**
 * Adapted from https://github.com/reduxjs/redux/blob/master/rollup.config.js
 * Copyright (c) 2015-present Dan Abramov
 */

import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import cleanup from 'rollup-plugin-cleanup';

const defaultOutput = {
   indent: false,
   sourcemap: true,
   exports: 'named',
};

const defaultExternal = [
   'react',
   'react/jsx-runtime',
   'react-resizable',
   '@emotion/react',
   'hoist-non-react-statics', // used by @emotion/react
];

const defaultRollup = {
   input: 'src/index.js',
   plugins: [
      nodeResolve({
         mainFields: ['module', 'jsnext:main', 'main'],
      }),
      commonjs({
         include: 'node_modules/**',
      }),
      babel({
         babelHelpers: 'runtime',
         exclude: /^(.+\/)?node_modules\/.+$/,
      }),
      cleanup()
   ],
};

const cjs = {
   ...defaultRollup,
   output: {
      ...defaultOutput,
      file: 'dist/cjs/react-inspector.js',
      format: 'cjs',
   },
   external: [...defaultExternal]
};

const es = {
   ...defaultRollup,
   output: {
      ...defaultOutput,
      file: 'dist/es/react-inspector.js',
      format: 'es',
   },
   external: [...defaultExternal]
};

const umd = {
   ...defaultRollup,
   output: {
      ...defaultOutput,
      file: 'dist/umd/react-inspector.js',
      format: 'umd',
      name: 'ReactInspector',
   },
   plugins: [
      nodeResolve({
         mainFields: ['module', 'jsnext:main', 'main'],
      }),
      babel({
         babelHelpers: 'runtime' ,
         exclude: /^(.+\/)?node_modules\/.+$/,
      }),
      commonjs(),
      cleanup()
   ]
};

export default [
   cjs,
   es,
   umd,
];
