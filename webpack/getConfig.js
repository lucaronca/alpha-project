const {
  always,
  concat,
  cond,
  contains,
  flip,
  map,
  mergeDeepWith,
  pipe,
} = require('ramda')
const getStage = require('./utils/getStage')
const base = require('./configs/webpack.config.base')
const local = require('./configs/webpack.config.local')
const aws = require('./configs/webpack.config.aws')

const CONFIGS = [
  { stage: ['local'], config: local },
  { stage: ['dev', 'prod'], config: aws },
]

const getStageConfig = cond(
  map(({ stage, config }) => [flip(contains)(stage), always(config)], CONFIGS),
)

// prettier-ignore
module.exports = pipe(
  getStage,
  getStageConfig,
  mergeDeepWith(concat, base)
)
