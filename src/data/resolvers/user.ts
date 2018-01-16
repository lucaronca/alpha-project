import { Resolver } from '.'

export default {
  Query: {
    users: () => [],
    user: (_, args) => args,
  },
  User: {
    id() {
      return 1
    },
    first_name() {
      return 'ciao'
    },
  },
} as Resolver
