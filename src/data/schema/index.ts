import { promisify } from 'bluebird'
import { readFile as nodeReadFile, readdir as nodeReaddir } from 'fs'
import { resolve, extname } from 'path'
import { pipeP } from 'ramda'

const readFile = promisify(nodeReadFile)
const readdir = promisify(nodeReaddir)

export async function getTypesFilePaths(dir: string): Promise<string[]> {
  const fileNames: string[] = await readdir(dir)

  return fileNames
    .filter(fileName => extname(fileName) === '.gql')
    .map(fileName => resolve(dir, fileName))
}

export async function getTypesData(paths: string[]): Promise<string[]> {
  return Promise.all(paths.map(filePath => readFile(filePath, 'utf8')))
}

export default async (): Promise<string[]> => {
  return pipeP<string, string[], string[]>(getTypesFilePaths, getTypesData)(
    __dirname,
  )
}
