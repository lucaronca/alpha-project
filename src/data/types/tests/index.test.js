import { resolve, join, extname } from 'path'

import { vol, fs } from 'memfs'
import { map, dropRepeats, contains, head, last } from 'ramda'
import { mergeTypes } from 'merge-graphql-schemas'

import getTypeDefs, { getTypesFilePaths, getTypesData } from '..'

jest.mock('fs', () => require('memfs').fs)
jest.mock('merge-graphql-schemas', () => ({
  mergeTypes: jest.fn(),
}))

const getMockedFunctionFirstArg = func => head(last(func.mock.calls))

beforeAll(() => {
  const typesDir = resolve(__dirname, '..')

  // create an in memory version of the types folder contents
  vol.fromJSON({
    './test1.gql': 'type Test1 {}',
    './test2.js': null,
    './test3.gql': 'type Test3 {}',
  }, typesDir)

  // insert there a mock directory for test too
  fs.mkdirSync(join(typesDir, 'testDir'))
})

describe('getTypesFilePaths', () => {
  it('should get paths of .gpl files in types folder', async () => {
    const paths = await getTypesFilePaths()

    expect(paths).toHaveLength(2)

    const exts = dropRepeats(map(path => extname(path), paths))

    expect(exts).toEqual(['.gql'])
  })
})

describe('getTypesData', () => {
  it('should retrieve contents of .gpl files in types folder', async () => {
    const contents = await getTypesData()

    expect(contains('type Test1 {}', contents)).toBe(true)
    expect(contains('type Test3 {}', contents)).toBe(true)
  })
})

describe('getTypeDefs', () => {
  it('should call \'mergeTypes\' with the array of .gpl Types files contents', async () => {
    await getTypeDefs()

    expect(mergeTypes).toBeCalled()
    expect(contains('type Test1 {}', getMockedFunctionFirstArg(mergeTypes))).toBe(true)
    expect(contains('type Test3 {}', getMockedFunctionFirstArg(mergeTypes))).toBe(true)
  })
})
