const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

const cwd = process.cwd()

const ei = Buffer.from('http://wsdl-docker.cs.odu.edu:8080/tests/iframeMadness/funtimes.js', 'utf8').toString('base64')

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
      'process.env.EVAL_INJECTED': JSON.stringify(ei),
      'process.env.EXPECTED_HOST': JSON.stringify('wsdl-docker.cs.odu.edu:8080'),
      'process.env.MUST_START_WITH': JSON.stringify('http://wsdl-docker.cs.odu.edu:8880')
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
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
