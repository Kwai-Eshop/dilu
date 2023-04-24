import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

import { createVuePlugin } from 'vite-plugin-vue2';
import VuePlugin from 'rollup-plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  //@ts-ignore
  plugins: [
    createVuePlugin({
      jsx: true,
      jsxOptions: {
        compositionAPI: 'plugin',
      },
    }),
    basicSsl(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    dedupe: ['vue', 'vue-demi'],
  },
  build: {
    lib: {
      entry: './src/main.ts',
      formats: ['es', 'cjs', 'umd'],
    },
    minify: false,
    rollupOptions: {
      external: ['vue', '@vue/composition-api'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
      // @ts-ignore
      plugins: [VuePlugin()],
    },
  },
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  server: {
    port: 3000,
  },
});
