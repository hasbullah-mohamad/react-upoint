require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV;

module.exports = {
  devServer: {
    contentBase: '/',
    inline: true,
    port: 2222,
    historyApiFallback: true
  },
  entry: [
    // 'babel-polyfill',
    './src/index.jsx',
    './src/app.scss'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ],
          fallback: 'style-loader'
        }))
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        use: [
          {
            // loader: 'url-loader'
            loader: 'file-loader',
            options: {
              name: './img/[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg$/i,
        rules: [
          {
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'assets/[name].[hash:12].[ext]'
                }
              }
            ],
            issuer: /\.scss$/i
          },
          {
            use: ['raw-loader'],
            issuer: /\.(jsx?|html)$/i
          }
        ]
      },
      {
        test: /\.(pdf|doc)$/,
        use: [
          {
            // loader: 'url-loader'
            loader: 'file-loader',
            options: {
              name: './docs/[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|ogg|webm)$/,
        use: [
          {
            // loader: 'url-loader'
            loader: 'file-loader',
            options: {
              name: './videos/[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[hash].[ext]'
        }
      }
    ]
  },
  output: {
    filename: 'bundle.[hash:12].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: './src/index.html'
    }),
    new ExtractTextPlugin(
      mode === 'development'
        ? '[name].css'
        : '[name].[contenthash:12].css'
    ),
    new webpack.EnvironmentPlugin([
      'API_LOCATION',
      'CAMPAIGN_ID',
      'CAMPAIGN_NAME'
    ]),
    new CopyWebpackPlugin(
      [
        { from: './src/sitemap.xml', to: './' },
        { from: './src/img', to: './img' },
        { from: './src/docs', to: './docs' },
        { from: './src/.htaccess', to: './' }
      ],
      { copyUnmodified: false }
    )
  ]
};
