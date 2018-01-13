const { resolve } = require('path')
const slswebpack = require('serverless-webpack')

const { lib: { entries } } = slswebpack

const ROOT = resolve(__dirname, '..', '..', 'src')

module.exports = {
  entry: entries,
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
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
    extensions: ['.ts', '.js'], // Leave .js to handle node_modules dependecies
    modules: [ROOT, 'node_modules'],
  },
  plugins: [],
}
