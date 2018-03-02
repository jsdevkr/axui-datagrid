const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CnameWebpackPlugin = require('cname-webpack-plugin');
const webpack = require('webpack');
const basePath = __dirname;

webpack.logLevel = 'NONE';

module.exports = {
  context: path.join(basePath, '.'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      'datagrid-ts': path.resolve(__dirname, 'src/'),
      '@root': path.resolve(__dirname, '')
    }
  },
  entry: {
    app: './dev/index.tsx',
    vendor: [
      'react',
      'react-dom',
      'react-router',
    ]
  },
  output: {
    path: path.join(basePath, './docs'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
          babelOptions: {
            babelrc: false, /* Important line */
            presets: [ [ "env", {
              "targets": {
                "browsers": [ "last 2 versions", "> 1% in KR" ]
              }
            } ], "react", "stage-0" ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]-[hash:base64:3]'
            }
          },
          {
            loader: 'typed-css-modules-loader',
            options: {
              camelCase: true
            }
          },
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      comments: false,
      warnings: false
    }),
    new CleanWebpackPlugin(['docs'], {
      verbose:  true,
      dry:      false
    }),
    new CnameWebpackPlugin({
      domain: 'axui-datagrid.axisj.com',
    }),
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: './dev/index.html', //Name of template in ./src
      favicon: './dev/assets/favicon.ico',
      hash: true
    }),
    new HtmlWebpackPlugin({
      chunks: [],
      filename: '404.html',
      template: './dev/404.html',
      hash: false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
  ]
};