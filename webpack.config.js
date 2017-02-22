var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./client.js",
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
          test: /\.json$/,
          loader: 'json'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: '/public/',
    filename: "client.min.js"
  },
  plugins: debug ? [
      new CopyWebpackPlugin([
        { from: './../public', to: './../build' },
      ])
    ] : [
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CleanWebpackPlugin(['build'], {
      root: __dirname,
      verbose: true, 
      dry: false,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CopyWebpackPlugin([
      { from: './../public', to: './../build' },
    ])
  ],
};