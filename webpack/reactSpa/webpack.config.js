const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

const cwd = process.cwd()

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:9000',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      'webpack/hot/only-dev-server',
      // activate HMR for React
      './index.js'
      // the entry point of our app
    ]
  },
  output: {
    filename: '[name]-bundle.js',
    chunkFilename: '[name]-[hash].chunk.js',
    // chunkFilename: '[name]-chunk.js',
    path: path.join(cwd, 'public/js'),
    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  context: path.join(cwd, 'apps/reactSPA'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ico)$/,
        loader: 'url-loader?limit=10000'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(eot|ttf|wav|mp3|tex)$/,
        loader: 'file-loader'
      }, {
        test: /\.(txt|xml|cxml)$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.API_ENDPOINT': JSON.stringify('http://localhost:8091'),
      'process.env.WIKI_ENDPOINT': JSON.stringify('http://localhost:8091/wikiStream'),
      'process.env.LMGTFY_ENDPOINT': JSON.stringify('http://localhost:8091/lmgtfyStream')
    })
  ]
}
