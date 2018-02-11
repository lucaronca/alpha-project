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

import logger from 'utils/logger'
import { default as getSchema } from './graphql/schema'

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

export const graphql: ProxyHandler = (
  event: APIGatewayEvent,
  context: Context,
  callback: ProxyCallback,
): void => {
  getSchema()
    .then((schema: GraphQLSchema) => {
      const handler: LambdaHandler = graphqlLambda({ schema })

      handler(event, context, callbackFilterFactory(callback))
    })
    .catch(error => {
      logger.error(error)

      callback(null, {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: null,
          errors: [
            { message: 'Error in the initialization of graphql server' },
          ],
        }),
      } as ProxyResult)
    })
}

export const graphiql: Handler = graphiqlLambda({
  endpointURL: `/${process.env.STAGE}/graphql`,
})
