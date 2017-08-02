const path = require('path')
const webpack = require('webpack')

const cwd = process.cwd()


module.exports = {
  entry:{
   combined: './index.js'
  },
  output: {
    filename: 'cors-[name]-bundle.js',
    chunkFilename: 'cors-[name]-chunk.js',
    path: path.join(cwd, 'public/js'),
    publicPath: '/'
  },
  context: path.join(cwd,'apps/cors'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        query: {
          cacheDirectory: true,
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {
            loader: "css-loader"
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ico)$/,
        loader: 'url-loader?limit=10000',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.(eot|ttf|wav|mp3|tex)$/,
        loader: 'file-loader',
      }, {
        test: /\.(txt|xml|cxml)$/,
        loader: 'raw-loader',
      }
    ],
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: "cors-commons.js",
      minChunks(module, count) {
        const context = module.context
        return context && context.indexOf('node_modules') >= 0
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ],
}