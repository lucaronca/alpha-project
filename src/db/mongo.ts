import mongoose, { Connection } from 'mongoose'
import logger from 'utils/logger'

import { Db } from 'mongodb'

const uri: string = `${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}/${
  process.env.MONGODB_DB_NAME
}`

let cachedConnection: Connection

export async function connectToDatabase(): Promise<Connection> {
  logger.info('Connecting to database')

  if (
    !cachedConnection ||
    // @ts-ignore: Property 'isConnected' does not exist on type 'Server | ReplSet | Mongos'
    !(cachedConnection.db as Db).serverConfig.isConnected()
  ) {
    try {
      await mongoose.connect(uri)

      logger.info('Create new connection to mongodb')
      return (cachedConnection = mongoose.connection)
    } catch (err) {
      logger.error(`Could not connect to MongoDB on uri: ${uri}`, err)
    }
  }

  logger.info('Used cached connection')
  return cachedConnection
}
