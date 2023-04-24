const { defineConfig } = require('@vue/cli-service');
const { resolve } = require('path');
const packageName = require('./package.json').name;

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: resolve(__dirname, 'build'),
  publicPath: 'https://localhost:9003/',
  pages: {
    index: 'src/main.tsx',
  },
  configureWebpack: {
    output: {
      library: {
        name: `${packageName}`,
        type: 'umd',
      },
      chunkLoadingGlobal: `webpackJsonp_${packageName}`,
      chunkLoading: 'jsonp',
    },
    devServer: {
      port: 9003,
      https: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
      historyApiFallback: true,
      hot: true,
      open: true,
    },
  },
});
