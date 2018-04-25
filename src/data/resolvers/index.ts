import { GraphQLFieldResolver } from 'graphql'

import { default as Query } from './query'
import { default as Mutation } from './mutation'
import { default as Date } from './date'

export type ResolverObject = {
  [key: string]: GraphQLFieldResolver<any, any, any>,
}

export type EnumResolver = {
  [key: string]: string | number,
}

export default {
  Query,
  Mutation,
  Date,
}
