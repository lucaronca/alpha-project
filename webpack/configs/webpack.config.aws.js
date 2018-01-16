const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
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
}
