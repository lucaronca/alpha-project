import { DocumentQuery } from 'mongoose'
import { User as db, UserModel } from '../connectors'

const findAll = (): DocumentQuery<UserModel[], UserModel> => {
  return db.find({})
}

const findById = (id: string): DocumentQuery<UserModel, UserModel> => {
  return db.findOne({ id })
}

const create = (user: UserModel): Promise<UserModel> => {
  return db.create(user)
}

export const User = {
  findAll,
  findById,
  create,
}
