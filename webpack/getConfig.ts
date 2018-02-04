import webpack from 'webpack'
import {
  always,
  concat,
  cond,
  contains,
  flip,
  head,
  last,
  map,
  mergeDeepWith,
  pipe,
  Pred,
} from 'ramda'
import getStage from './utils/getStage'
import { default as base } from './configs/webpack.config.base'
import { default as local } from './configs/webpack.config.local'
import { default as aws } from './configs/webpack.config.aws'

type configTuple = [string[], webpack.Configuration]

// prettier-ignore
const CONFIGS: configTuple[] = [
  [['local'], local],
  [['dev', 'prod'], aws],
]

const getStageConfig: (stage: string) => webpack.Configuration = cond(
  map<configTuple, [Pred, () => webpack.Configuration]>(
    tuple => [
      flip(contains)(head(tuple) as string[]),
      always(last(tuple) as webpack.Configuration),
    ],
    CONFIGS,
  ),
)

// prettier-ignore
export default pipe(
  getStage,
  getStageConfig,
  mergeDeepWith(concat, base),
) as () => webpack.Configuration
