import { resolve } from 'path'
import webpack from 'webpack'
import { default as slswebpack } from 'serverless-webpack'

const { lib: { entries } } = slswebpack

const ROOT: string = resolve(__dirname, '..', '..', 'src')

export default {
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
} as webpack.Configuration
