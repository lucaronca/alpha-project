import webpack from 'webpack'
import { default as UglifyJsPlugin } from 'uglifyjs-webpack-plugin'
import { default as CopyWebpackPlugin } from 'copy-webpack-plugin'

export default {
  plugins: [
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        compress: {
          keep_classnames: true,
          keep_fnames: true,
          reduce_funcs: false,
          reduce_vars: false,
          ecma: 6,
        },
        output: {
          ecma: 6,
        },
        mangle: false,
      },
    }),
    // Include .gql files in bundle
    new CopyWebpackPlugin(['src/data/schema/**/*.gql']),
  ],
} as webpack.Configuration
