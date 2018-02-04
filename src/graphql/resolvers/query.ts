import { Resolver } from '.'

export default {
  Query: {
    users: () => [],
    user: (_, args) => args,
  },
} as Resolver
