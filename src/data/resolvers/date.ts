import { GraphQLScalarType, GraphQLScalarTypeConfig, Kind } from 'graphql'

// prettier-ignore
const DateScalarType: GraphQLScalarTypeConfig<Date, number> & GraphQLScalarType = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime()
  },
  parseValue(value) {
    return new Date(value)
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10)
    }
    return null
  },
})

export default DateScalarType
