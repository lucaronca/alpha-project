import { mergeResolvers } from 'merge-graphql-schemas'

import userResolver from './user'

export default mergeResolvers([
  userResolver,
])
