import { GraphQLFieldResolver } from 'graphql'
import { mergeAll } from 'ramda'

import { default as queryResolver } from './query'
import { default as userResolver } from './user'

export type ResolverMap = {
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

export type Resolver = {
  [key: string]: {
    [key: string]: GraphQLFieldResolver<any, any>,
  },
}

export default mergeAll<Resolver>([queryResolver, userResolver]) as ResolverMap
