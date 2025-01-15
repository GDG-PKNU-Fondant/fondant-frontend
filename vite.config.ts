import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isTest = mode === 'test';

  return {
    plugins: [react(), svgrPlugin()],
    resolve: {
      alias: [
        { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
        {
          find: '@components',
          replacement: path.resolve(__dirname, 'src/components'),
        },
        { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
        { find: '@styles', replacement: path.resolve(__dirname, 'src/styles') },
      ],
    },
    test: isTest
      ? {
          globals: true,
          environment: 'jsdom',
        }
      : undefined,
  };
});
