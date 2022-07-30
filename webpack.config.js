const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const getEnv = require('./scripts/env');

const isProd = process.env.NODE_ENV === 'production';

const envVars = getEnv();

module.exports = {
  bail: isProd,
  devServer: {
    client: {
      overlay: {
        errors: true,
      },
    },
    compress: false,
    historyApiFallback: true,
    hot: true,
    open: process.env.DEV_AUTO_OPEN === 'true',
    port: process.env.DEV_PORT || '3000',
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
  entry: path.join(__dirname, 'src/index.tsx'),
  mode: isProd ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'swc-loader',
        },
      },
    ],
  },
  optimization: {
    minimize: isProd,
    splitChunks: {
      maxSize: 250000,
      chunks: 'all',
    },
  },
  output: {
    chunkFilename: '[name]-chunk.[chunkhash:8].js',
    filename: '[name].[fullhash:8].js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin(envVars),
    new HtmlWebpackPlugin({ template: path.join(__dirname, 'public/index.html') }),
  ],
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
  },
};
