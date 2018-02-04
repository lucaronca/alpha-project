import {
  graphqlLambda,
  LambdaHandler,
  graphiqlLambda,
} from 'apollo-server-lambda'
import {
  APIGatewayEvent,
  ProxyCallback,
  ProxyResult,
  Context,
  Handler,
  ProxyHandler,
} from 'aws-lambda'

import { default as getSchema } from 'data/schema'

import { GraphQLSchema } from 'graphql'

const addCORSHeader = (response: ProxyResult): ProxyResult => ({
  ...response,
  headers: {
    ...response.headers,
    'Access-Control-Allow-Origin': '*',
  },
})

const callbackFilterFactory = (callback: ProxyCallback): ProxyCallback => (
  error: Error,
  response: ProxyResult,
): void => {
  callback(error, addCORSHeader(response))
}

export const graphql: ProxyHandler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: ProxyCallback,
): Promise<void> => {
  const schema: GraphQLSchema = await getSchema()
  const handler: LambdaHandler = graphqlLambda({ schema })

  handler(event, context, callbackFilterFactory(callback))
}

export const graphiql: Handler = graphiqlLambda({
  endpointURL: `/${process.env.STAGE}/graphql`,
})
