const { resolve } = require('path');
const packageName = require('./package.json').name;

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  context: resolve(__dirname),
  entry: resolve(__dirname, 'src/index.tsx'),
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'build'),
    library: {
      name: `${packageName}`,
      type: 'umd',
    },
    chunkLoadingGlobal: `webpackJsonp_${packageName}`,
    publicPath: 'https://localhost:9000/',
    chunkLoading: 'jsonp',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic',
                  },
                ],
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    modules: false,
                    corejs: 3,
                  },
                ],
                '@babel/preset-typescript',
              ],
            },
          },
        ],

        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public/index.html'),
    }),
  ],

  watchOptions: {
    ignored: /node_modules/,
  },
  devServer: {
    port: 9000,
    https: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    hot: true,
    open: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
