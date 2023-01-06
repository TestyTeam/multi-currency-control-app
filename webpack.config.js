const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const fs = require('fs');
const ESLintPlugin = require('eslint-webpack-plugin');

const PAGES = fs.readdirSync(`./src/pages`);

module.exports = {
  devtool: 'inline-source-map',
  entry: path.join(__dirname, 'src', 'index.ts'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: './js/index.[contenthash].js',
    assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.ts?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: path.join('fonts', '[name]/[name].[ext]'),
        }
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.html', '.ts']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.pug'),
      filename: 'index.html',
    }),
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `./src/pages/${page}/${page}.pug`,
      filename: `./pages/${page}/${page}.html`
    })),
    new FileManagerPlugin({
        events: {
            onStart: {
                delete: ['dist']
            }
        }
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash].css'
    }),
  ],
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              ['svgo', { name: 'preset-default' }],
            ],
          },
        },
      }),
    ],
  },
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    port: '8000'
  }
};