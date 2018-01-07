const slswebpack = require('serverless-webpack')
const { path } = require('ramda')

const { lib: { serverless: slsInstance } } = slswebpack

module.exports = () => path(['service', 'custom', 'stage'])(slsInstance)
