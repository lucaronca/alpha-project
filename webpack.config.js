const { resolve } = require('path')
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ROOT = resolve(__dirname, 'src')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals()],
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: ROOT,
        exclude: /node_modules/,
      },
    ],
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  resolve: {
    modules: [ROOT, 'node_modules'],
  },
  plugins: [
    // Include .gql files in bundle
    new CopyWebpackPlugin(['src/data/types/**/*.gql']),
  ],
}
