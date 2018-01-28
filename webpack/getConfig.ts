import webpack from 'webpack'
import {
  __,
  head,
  last,
  always,
  concat,
  cond,
  contains,
  map,
  mergeDeepWith,
  pipe,
} from 'ramda'
import getStage from './utils/getStage'
import { default as base } from './configs/webpack.config.base'
import { default as local } from './configs/webpack.config.local'
import { default as aws } from './configs/webpack.config.aws'

interface IConfigDictionary extends Array<string[] | webpack.Configuration> {
  0: string[]
  1: webpack.Configuration
}
const CONFIGS: IConfigDictionary[] = [
  [['local'], local],
  [['dev', 'prod'], aws],
]

const getStageConfig: (stage: string) => webpack.Configuration = cond(
  map(dict => [contains(__, head(dict)), always(last(dict))], CONFIGS),
)

// prettier-ignore
export default pipe(
  getStage,
  getStageConfig,
  mergeDeepWith(concat, base),
) as () => webpack.Configuration
