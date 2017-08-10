const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const cwd = process.cwd()

module.exports = {
  // devtool: 'source-map',
  entry: {
    reactSPA: './index.js',
    reactSPAV1: ['core-js', 'uikit', 'react', 'react-router-dom', 'react-dom']
  },
  output: {
    filename: '[name]-bundle.js',
    chunkFilename: '[name]-chunk.js',
    path: path.join(cwd, 'public/rspa'),
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
  devServer: {
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.API_ENDPOINT': JSON.stringify('http://wsdl-docker.cs.odu.edu:8880'),
      'process.env.WIKI_ENDPOINT': JSON.stringify('http://wsdl-docker.cs.odu.edu:8880/wikiStream'),
      'process.env.LMGTFY_ENDPOINT': JSON.stringify('http://wsdl-docker.cs.odu.edu:8880/lmgtfyStream')
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'reactSPAV1'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new UglifyJSPlugin({
      sourceMap: false,
      parallel: {
        cache: true,
        workers: 2 // for e.g
      },
      uglifyOptions: {
        compress: true,
        mangle: true
      }
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      threshold: 0,
      minRatio: 0.0
    })
  ]
}
