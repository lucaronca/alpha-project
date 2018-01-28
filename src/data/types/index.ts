import { promisify } from 'bluebird'
import { readFile as nodeReadFile, readdir as nodeReaddir } from 'fs'
import { resolve, extname } from 'path'

import { mergeTypes } from 'merge-graphql-schemas'

const readFile = promisify(nodeReadFile)
const readdir = promisify(nodeReaddir)

export async function getTypesFilePaths(): Promise<string[]> {
  const fileNames: string[] = await readdir(__dirname)

  return fileNames
    .filter(fileName => extname(fileName) === '.gql')
    .map(fileName => resolve(__dirname, fileName))
}

export async function getTypesData(): Promise<string[]> {
  const paths: string[] = await getTypesFilePaths()

  return Promise.all(paths.map(filePath => readFile(filePath, 'utf8')))
}

export default async (): Promise<string> => {
  const typesArray: string[] = await getTypesData()

  return mergeTypes(typesArray)
}
