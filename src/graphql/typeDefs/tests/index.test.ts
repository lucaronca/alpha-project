import { resolve, join, extname } from 'path'

import { vol, fs } from 'memfs'
import { map, dropRepeats, contains } from 'ramda'

import { default as getTypeDefs, getTypesFilePaths, getTypesData } from '..'

jest.mock('fs', () => require('memfs').fs)

let typesDir

beforeAll(() => {
  typesDir = resolve(__dirname, '..')

  // create an in memory version of the types folder contents
  vol.fromJSON(
    {
      './test1.gql': 'type Test1 {}',
      './test2.js': null,
      './test3.gql': 'type Test3 {}',
    },
    typesDir,
  )

  // insert there a mock directory for test too
  fs.mkdirSync(join(typesDir, 'testDir'))
})

describe('getTypesFilePaths', () => {
  it('should get paths of .gpl files of a given directory', async () => {
    const paths = await getTypesFilePaths(typesDir)

    expect(paths).toHaveLength(2)

    const exts = dropRepeats(map(path => extname(path), paths))

    expect(exts).toEqual(['.gql'])
  })
})

describe('getTypesData', () => {
  it('should retrieve contents of .gpl files given a path list', async () => {
    const paths = [
      resolve(typesDir, './test1.gql'),
      resolve(typesDir, './test3.gql'),
    ]
    const contents: string[] = await getTypesData(paths)

    expect(contains('type Test1 {}', contents)).toBe(true)
    expect(contains('type Test3 {}', contents)).toBe(true)
  })
})

describe('getTypeDefs', () => {
  it('should return a list of valid graphql type definitions', async () => {
    const typeDefs = await getTypeDefs()

    expect(contains('type Test1 {}', typeDefs)).toBe(true)
    expect(contains('type Test3 {}', typeDefs)).toBe(true)
  })
})
