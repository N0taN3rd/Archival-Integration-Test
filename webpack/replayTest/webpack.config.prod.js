const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const cwd = process.cwd()

module.exports = {
  entry: {
    replayTest: './index.js',
    rpVend: ['react', 'react-dom', 'uikit', 'jquery', 'rxjs']
  },
  output: {
    filename: '[name]-bundle.js',
    chunkFilename: '[name]-chunk.js',
    path: path.join(cwd, 'public/rpTest'),
    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  context: path.join(cwd, 'apps/replay_test'),
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
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.API_ENDPOINT': JSON.stringify('http://wsdl-docker.cs.odu.edu:8091')
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'rpVend'
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
