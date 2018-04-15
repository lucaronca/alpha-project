import { UserModel } from 'data/connectors'
import { User } from '../models'

import { ResolverObject } from '.'

export default {
  createUser: (_, args: UserModel) => User.create(args),
} as ResolverObject
