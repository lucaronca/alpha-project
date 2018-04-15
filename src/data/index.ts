import { makeExecutableSchema } from 'graphql-tools'

import logger from 'utils/logger'
import { default as getSchema } from './schema'
import resolvers from './resolvers'

import { GraphQLSchema } from 'graphql'

export default async function getExecutableSchema(): Promise<GraphQLSchema> {
  const schema: string[] = await getSchema()

  return makeExecutableSchema({
    typeDefs: schema,
    resolvers,
    logger: {
      log(log: string | Error) {
        log instanceof Error
          ? logger.error(JSON.stringify(log.stack, null, 2))
          : logger.log('info', log)
      },
    },
  })
}
