import webpack from 'webpack'
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'

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
    new CopyWebpackPlugin(['src/data/types/**/*.gql']),
  ],
} as webpack.Configuration
