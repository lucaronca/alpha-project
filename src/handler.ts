import {
  graphqlLambda,
  LambdaHandler,
  graphiqlLambda,
} from 'apollo-server-lambda'
import { makeExecutableSchema } from 'graphql-tools'

import { APIGatewayEvent, ProxyCallback, ProxyResult, Context, Handler, ProxyHandler } from 'aws-lambda'
import { GraphQLSchema } from 'graphql'

import getTypeDefs from 'data/types'
import resolvers from 'data/resolvers'

async function getSchema(): Promise<GraphQLSchema> {
  const typeDefs: string = await getTypeDefs()

  return makeExecutableSchema({
    typeDefs,
    resolvers,
  })
}

const addCORSHeader = (response: ProxyResult): ProxyResult => ({
  ...response,
  headers: {
    ...response.headers,
    'Access-Control-Allow-Origin': '*',
  },
})

const callbackFilterFactory = (callback: ProxyCallback): ProxyCallback => (error: Error, response: ProxyResult): void => {
  callback(error, addCORSHeader(response))
}

export const graphql: ProxyHandler = async (event: APIGatewayEvent, context: Context, callback: ProxyCallback): Promise<void> => {
  const schema: GraphQLSchema = await getSchema()
  const handler: LambdaHandler = graphqlLambda({ schema })

  handler(event, context, callbackFilterFactory(callback))
}

export const graphiql: Handler = graphiqlLambda({
  endpointURL: `/${process.env.STAGE}/graphql`,
})
