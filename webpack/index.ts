import webpack from 'webpack'
import getConfig from './getConfig'

const config: webpack.Configuration = getConfig()

// Used typescript export instead of ES6 export default to allow interoperability with serverless-webpack
// that consumes commonjs modules. See https://github.com/Microsoft/TypeScript/issues/2719
export = config
