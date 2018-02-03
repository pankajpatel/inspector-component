const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // devtool: 'eval-source-map',
  mode: 'development',
  entry: path.join(__dirname, 'src' , 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'inspector-component.js'
  },
  resolve: {
    modules: [
      'node_modules',
      path.join(__dirname, 'src'),
    ]
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env'],
            plugins: []
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    colors: true,
    historyApiFallback: true,
    inline: true
  },
  plugins: [
    new UglifyJsPlugin(),
  ]
}
