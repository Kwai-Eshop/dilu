import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    dedupe: ['vue'],
  },
  build: {
    outDir: './dist',
    lib: {
      entry: './src/index.tsx',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format: any, entryname: string) => {
        return `index.${format}.js`;
      },
      name: 'DLVue',
    },
    minify: false,
    rollupOptions: {
      external: ['vue', 'qiankun'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
});
