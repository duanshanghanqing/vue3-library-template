import path from 'path';
// ts -> compile js
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';// compress

// commonjs -> ES2015
import commonjs from '@rollup/plugin-commonjs';

import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';


/* It enables rollup to use postcss to process style files such as less and CSS */
import postcss from 'rollup-plugin-postcss';
// Handling variables defined by CSS
import simplevars from 'postcss-simple-vars';
// Handling with less / scss nested style
import nested from 'postcss-nested';
// The latest CSS features can be applied in advance
import postcssPresetEnv from 'postcss-preset-env';
// CSS code compression
import cssnano from 'cssnano';
// Automatic prefixing of styles
import autoprefixer from "autoprefixer";


// It can process the import image in the component and convert the image to Base64 format, 
// but it will increase the packaging volume, which is suitable for small icons
// import image from '@rollup/plugin-image';


// Empty directory
import del from 'rollup-plugin-delete';

// build vue
import vue from 'rollup-plugin-vue'

import pkg from './package.json';

const globals = {
  'vue': 'Vue'
};

export default {
  input: 'src/index.ts',
  output: [
    {
      file: path.resolve(__dirname, pkg.main),
      format: 'cjs',
      globals,
      exports: 'named',
    },
    {
      file: path.resolve(__dirname, pkg.module),
      format: 'es',
      globals,
      exports: 'named',
    },
    {
      file: path.resolve(__dirname, pkg.unpkg),
      format: 'umd',
      name: pkg.name,
      globals,
      exports: 'named',
    },
    {
      file: path.resolve(__dirname, pkg.browser),
      format: 'umd',
      name: pkg.name,
      plugins: [terser()],
      globals,
      exports: 'named',
    }
  ],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: true,
      mainFields: ['browser']
    }),
    vue({
      // 把单文件组件中的样式，插入到html中的style标签
      css: true,
      // 把组件转换成 render 函数
      compileTemplate: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    typescript(),
    postcss({
      plugins: [
        simplevars(),
        nested(),
        postcssPresetEnv(),
        cssnano(),
        autoprefixer({
          overrideBrowserslist: ["last 2 versions", "ie 6"]
        }),
      ],
      // Processing. CSS Less Scss files
      extensions: ['.css', 'less', 'scss'],
      extract: false, // Extract style
    }),
    // image(),
    del({
      targets: [`${pkg.main.split('/')[0]}/*`, `${pkg.module.split('/')[0]}/*`, `${pkg.browser.split('/')[0]}/*`]
    }),
  ],
  external: ['vue']
}
