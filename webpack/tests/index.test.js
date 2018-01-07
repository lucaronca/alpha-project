import webpackConfig from '..'
import getStage from '../utils/getStage'

jest.mock('../configs/webpack.config.local', () =>
  ({ local: true }))

jest.mock('../configs/webpack.config.aws', () =>
  ({ aws: true }))

jest.mock('../utils/getStage.js', () =>
  jest.fn())

describe('Webpack config factory', () => {
  it('should merge base config with webpack.config.local if stage is local', () => {
    getStage.mockImplementation(() => 'local')

    const config = webpackConfig()

    expect(config.entry).toBeDefined()
    expect(config.local).toBe(true)
  })

  it('should merge base config with webpack.config.aws if stage is dev or prod', () => {
    getStage.mockImplementation(() => 'dev')

    let config = webpackConfig()

    expect(config.entry).toBeDefined()
    expect(config.aws).toBe(true)

    getStage.mockImplementation(() => 'prod')

    config = webpackConfig()
    expect(config.entry).toBeDefined()
    expect(config.aws).toBe(true)
  })
})
