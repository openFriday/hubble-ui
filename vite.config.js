import path from 'path'
import util from 'util';

import _glob from 'glob';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import requireTransform from 'vite-plugin-require-transform';

import inliner from '@geakstr/sass-inline-svg'

const glob = util.promisify(_glob);

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const protoJs = await glob(path.resolve(__dirname, './backend/proto/**/*.js'));
  console.log('protojs: ', protoJs);

  return {
    plugins: [
      react(/*{ jsxRuntime: 'classic' }*/),
      requireTransform({
        fileRegex: /.ts$|.tsx|.js|.jsx$/
      }),
    ],
    root: './src',
    resolve: {
      alias: [
        {
          find: /^~backend(.*)$/,
          replacement: path.resolve(__dirname, './backend/$1'),
        },
        {
          find: /^~@(.*)$/,
          replacement: '@$1',
        },
        {
          find: /^~(.*)$/,
          replacement: path.resolve(__dirname, './src/$1'),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          functions: {
            ...inliner,
            'svg-icon($path, $selectors: null)': inliner(
              path.join(__dirname, 'src/icons/blueprint'),
              {
                optimize: true,
                encodingFormat: 'uri',
              },
            ),
          },
        },
      }
    },
    optimizeDeps: {
      include: [
        ...protoJs,
      ],
    }
  };
})
