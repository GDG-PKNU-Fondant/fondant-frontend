/// <reference types="vitest/config" />
import { defineConfig, UserConfig } from 'vite';
import { InlineConfig } from 'vitest/node';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import svgrPlugin from 'vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
  },
  plugins: [react(), svgrPlugin(), mkcert()],
  resolve: {
    alias: [
      { find: '@apis', replacement: path.resolve(__dirname, 'src/apis') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@mocks', replacement: path.resolve(__dirname, 'src/mocks') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@stores', replacement: path.resolve(__dirname, 'src/stores') },
      { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') },
      { find: '@type', replacement: path.resolve(__dirname, 'src/types') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
    ],
  },
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
} as VitestConfigExport);
