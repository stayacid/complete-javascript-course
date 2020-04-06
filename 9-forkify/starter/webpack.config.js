const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
      // IMG
      {
        test: /\.(png|jpg|gif|svg|webp)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      path: PATHS.dist,
      filename: 'css/[name].[contenthash].css',
    }),
    new CopyWebpackPlugin([{
      from: `${PATHS.src}/img`,
      to: `${PATHS.dist}/img`,
    }]),
  ],
};
