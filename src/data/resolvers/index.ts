import { GraphQLFieldResolver } from 'graphql'
import { mergeAll } from 'ramda'

import { default as queryResolver } from './query'
import { default as userResolver } from './user'

export type Resolver = {
  Query: {
    [key: string]: GraphQLFieldResolver<any, any>,
  }
  Mutation?: {
    [key: string]: GraphQLFieldResolver<any, any>,
  }
  [key: string]: {
    [key: string]: GraphQLFieldResolver<any, any>,
  },
}

export default mergeAll([queryResolver, userResolver]) as Resolver
