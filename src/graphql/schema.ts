import { makeExecutableSchema } from 'graphql-tools'

import { default as getTypeDefs } from './typeDefs'
import resolvers from './resolvers'

import { GraphQLSchema } from 'graphql'

export default async function getSchema(): Promise<GraphQLSchema> {
  const typeDefs: string[] = await getTypeDefs()

  return makeExecutableSchema({
    typeDefs,
    resolvers,
  })
}
