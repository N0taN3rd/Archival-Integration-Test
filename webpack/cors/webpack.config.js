const path = require('path')
const webpack = require('webpack')

const cwd = process.cwd()

module.exports = {
  entry: [
    './index.js'
    // the entry point of our app
  ],
  output: {
    filename: 'cors.js',
    // the output bundle

    path: path.join(cwd, 'apps/cors/complexTest'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  context: path.join(cwd, 'apps/cors/complexTest'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        },
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
    // enable HMR globally
    new webpack.NoEmitOnErrorsPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.API_ENDPOINT': JSON.stringify('http://localhost:8091')
    })

  ]
}
