import webpack from 'webpack'
import { default as nodeExternals } from 'webpack-node-externals'

export default {
  // Don't bundle all node dependencies in local env
  // to make handlers bundles lighter, since they can require
  // node modules from local node_modules
  externals: [nodeExternals()],
} as webpack.Configuration
