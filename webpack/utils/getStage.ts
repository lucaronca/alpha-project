import * as slswebpack from 'serverless-webpack'
import { path } from 'ramda'

const { lib: { serverless: slsInstance } } = slswebpack

export default () => path(['service', 'custom', 'stage'])(slsInstance)
