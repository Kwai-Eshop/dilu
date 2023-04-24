import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

import { createVuePlugin } from 'vite-plugin-vue2';
import VuePlugin from 'rollup-plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  //@ts-ignore
  plugins: [
    createVuePlugin({
      jsx: true,
      jsxOptions: {
        compositionAPI: 'vue-demi',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@vue/composition-api': 'vue-demi',
    },
    dedupe: ['vue', 'vue-demi'],
  },
  build: {
    outDir: '../vue/v2/',
    lib: {
      entry: './src/index.tsx',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format: any) => {
        return `index.${format}.js`;
      },
      name: 'DLVue',
    },
    minify: false,
    rollupOptions: {
      external: ['vue', 'vue-demi'],
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
});
