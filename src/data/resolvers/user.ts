import { Resolver } from '.'

export default <Resolver>{
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
}
