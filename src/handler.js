import { graphqlLambda, graphiqlLambda } from 'apollo-server-lambda'
import { makeExecutableSchema } from 'graphql-tools'

import getTypeDefs from 'data/types'
import resolvers from 'data/resolvers'

async function getSchema() {
  const typeDefs = await getTypeDefs()

  return makeExecutableSchema({
    typeDefs,
    resolvers,
  })
}

const addCORSHeader = output => ({
  ...output,
  headers: {
    ...output.headers,
    'Access-Control-Allow-Origin': '*',
  },
})

const callbackFilterFactory = callback => (error, output) => {
  callback(error, addCORSHeader(output))
}

export async function graphql(event, context, callback) {
  const schema = await getSchema()
  const handler = graphqlLambda({ schema })

  handler(event, context, callbackFilterFactory(callback))
}

export const graphiql = graphiqlLambda({
  endpointURL: `/${process.env.STAGE}/graphql`,
})
