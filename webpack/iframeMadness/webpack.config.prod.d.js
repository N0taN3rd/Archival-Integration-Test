const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const cwd = process.cwd()

const EVAL_INJECTED = Buffer.from('http://localhost:8090/tests/iframeMadness/funtimes.js', 'utf8').toString('base64')
const EXPECTED_HOST = Buffer.from('localhost:8090', 'utf8').toString('base64')
const MUST_START_WITH = Buffer.from('http://localhost:8091', 'utf8').toString('base64')

// http://localhost:8090/tests/simpleReact

module.exports = {
  entry: {
    iframeMadness: './index.js',
    iframeMadnessFooter: './footer.js'
  },
  output: {
    filename: '[name]-bundle.js',
    chunkFilename: '[name]-chunk.js',
    path: path.join(cwd, 'public/js'),
    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  context: path.join(cwd, 'apps/iframeMadness'),
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.EVAL_INJECTED': JSON.stringify(EVAL_INJECTED),
      'process.env.EXPECTED_HOST': JSON.stringify(EXPECTED_HOST),
      'process.env.MUST_START_WITH': JSON.stringify(MUST_START_WITH)
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
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
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // }),
  ]
}
