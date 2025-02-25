require('dotenv').config();
const configs = require('../configs/config.dev.json');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './frontend/src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./backend/public'),
    publicPath: '/',
  },
  devServer: {
    port: process.env.DEV_PORT || configs.devServer.port,
    proxy: {
      '/api': 'http://localhost:3000',
      '/img': 'http://localhost:3000',
      '/upload': 'http://localhost:3000',
    },
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'asset/[name].[ext]?[hash]',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Project Demo',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: './frontend/public/index.html',
    }),
  ],
};
