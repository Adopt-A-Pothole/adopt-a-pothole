const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');


const outputDirectory = 'dist';

module.exports = () => {
  const env = dotenv.config().parsed;
  let envKeys

  if (env) {
    envKeys = Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});
  }

  return {
    node: {
      fs: 'empty'
    },
    entry: ['babel-polyfill', './src/client/index.js'],
    output: {
      path: path.join(__dirname, outputDirectory),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    devServer: {
      port: 3000,
      open: true,
      proxy: {
        '/api': 'http://localhost:8080'
      }
    },
    plugins: [
      new CleanWebpackPlugin([outputDirectory]),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico'
      }),
      new webpack.DefinePlugin(envKeys || {})
    ]
  };
}
