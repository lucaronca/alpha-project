import webpack from 'webpack'
import getConfig from '../getConfig'
import getStage from '../utils/getStage'

jest.mock('serverless-webpack', () => ({ lib: { entries: {} } }))
jest.mock('../configs/webpack.config.local', () => ({ local: true }))
jest.mock('../configs/webpack.config.aws', () => ({ aws: true }))
jest.mock('../utils/getStage', () => jest.fn())

interface IMockedLocalConfig extends webpack.Configuration {
  local: true
}
interface IMockedAwsConfig extends webpack.Configuration {
  aws: true
}

describe('Webpack config factory', () => {
  it('should merge base config with webpack.config.local if stage is local', () => {
    (getStage as jest.Mock).mockImplementation(() => 'local')

    const config = getConfig()

    expect(config.resolve).toBeDefined()
    expect((config as IMockedLocalConfig).local).toBe(true)
  })

  it('should merge base config with webpack.config.aws if stage is dev', () => {
    (getStage as jest.Mock).mockImplementation(() => 'dev')

    const config = getConfig()

    expect(config.resolve).toBeDefined()
    expect((config as IMockedAwsConfig).aws).toBe(true)
  })
  it('should merge base config with webpack.config.aws if stage is prod', () => {
    (getStage as jest.Mock).mockImplementation(() => 'prod')

    const config = getConfig()
    expect(config.resolve).toBeDefined()
    expect((config as IMockedAwsConfig).aws).toBe(true)
  })
})
