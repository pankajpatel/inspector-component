var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var webpack = require('webpack');

module.exports = {
  // devtool: 'eval-source-map',
  entry: {
    app: path.join(__dirname, 'src' , 'd-calendar/d-calendar.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'd-calendar.js'
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.join(__dirname, '../node_modules'),
    ]
  },
  resolve: {
    alias: {
      js: path.join(__dirname, 'src' , 'js'),
      root: __dirname
    }
  },
  module:{
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          presets: ['es2015']
        }
      }, {
        test: /.scss?$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader'}),
        exclude: /node_modules/
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
    new ExtractTextPlugin("css/[name].css"),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        join_vars: true,
        if_return: true
      },
      output: {
        comments: false
      }
    }),
  ]
}
