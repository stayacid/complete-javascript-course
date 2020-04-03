const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'), // __dirname is absolute path to this folder
  dist: path.join(__dirname, 'dist'),
};

module.exports = {
  entry: `${PATHS.src}/js`,
  output: {
    path: PATHS.dist,
    filename: 'js/[name].[contenthash].js',
  },
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      // js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // CSS
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      path: PATHS.dist,
      filename: 'css/[name].[contenthash].css',
    }),
  ],
};

/*
  You will also need to change the entry in webpack.config.js (a file we create during the video) from this:

  entry: ['babel-polyfill', './src/js/index.js'],
  to this:

  entry: ['./src/js/index.js'],
  and the code in .babelrc (also created during the video) from this:

  {
      "presets": [
          ["env", {
              "targets": {
                  "browsers": [
                      "last 5 versions",
                      "ie >= 8"
                  ]
              }
          }]
      ]
  }
  to this:

  {
      "presets": [
          ["@babel/env", {
              "useBuiltIns": "usage",
              "corejs": "3",
              "targets": {
                  "browsers": [
                      "last 5 versions",
                      "ie >= 8"
                  ]
              }
          }]
      ]
  }
*/