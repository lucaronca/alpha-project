import { Resolver } from '.'

export default {
  User: {
    id() {
      return 1
    },
    first_name() {
      return 'ciao'
    },
  },
} as Resolver
