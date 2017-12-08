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

export async function graphql(event, context, callback) {
  const callbackFilter = (error, output) => {
    const outputWithHeader = {
      ...output,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }

    callback(error, outputWithHeader)
  }

  const schema = await getSchema()
  const handler = graphqlLambda({ schema })

  handler(event, context, callbackFilter)
}

export const graphiql = graphiqlLambda({
  endpointURL: '/graphql',
})

