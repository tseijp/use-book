//process.env.NODE_ENV="test"
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
//import postcss from 'rollup-plugin-postcss';
//import peerDepsExternal from 'rollup-plugin-peer-deps-external';
//import dts from 'rollup-plugin-dts';
//import { terser } from 'rollup-plugin-terser';

//import css from 'rollup-plugin-css-porter';
//import svg from 'rollup-plugin-svg';
//import uglify from 'rollup-plugin-uglify-es';

const namedExports= {'node_modules/react/index.js':['Component','useState',]}
const plugins = [
  //peerDepsExternal(),
  //postcss({ extract: false }),
  //terser()
  ///nodeResolve({ jsnext: true, main: true }), // Locate and bundle third-party dependencies in node_modules
  ///commonjs({ include: 'node_modules/**' }),  // Convert CommonJS modules to ES6

  replace({ 'process.env.NODE_ENV': JSON.stringify('production') }), //Replace strings in files while bundling
  babel({ runtimeHelpers: true,exclude: 'node_modules/**', presets:['@babel/env','@babel/preset-react']}),// Compile your files with Babel
  nodeResolve({ browser: true }),
  commonjs({namedExports}),
  typescript({lib: ["es5", "es6", "dom"], target:"es5"}),
];

import pkg from '../package.json';
const dependencies = Object.keys(pkg.dependencies)||[];

export default {
    input: './src/index.ts',
    output:[
        { file: pkg.main   , format: 'cjs' },
        { file: pkg.module , format: 'es'  }],
    external:dependencies,
    plugins,
};
