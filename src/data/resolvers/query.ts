import { User } from '../models'

export default {
  users: () => User.findAll(),
  user: (_, { id }) => User.findById(id),
}
