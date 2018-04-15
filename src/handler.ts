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
  ProxyHandler,
} from 'aws-lambda'
import { Connection } from 'mongoose'

import { connectToDatabase } from 'db/mongo'
import logger from 'utils/logger'
import { default as getExecutableSchema } from 'data'

import { GraphQLSchema } from 'graphql'

const addHeaders = (response: ProxyResult): ProxyResult => ({
  ...response,
  headers: {
    ...response.headers,
    'Access-Control-Allow-Origin': '*',
  },
})

const callbackFilter = (callback: ProxyCallback): ProxyCallback => (
  error: Error,
  response: ProxyResult,
): void => {
  callback(error, addHeaders(response))
}

export const graphql: ProxyHandler = (
  event: APIGatewayEvent,
  context: Context,
  callback: ProxyCallback,
): void => {
  context.callbackWaitsForEmptyEventLoop = false

  Promise.all([connectToDatabase(), getExecutableSchema()])
    .then(([_, executableSchema]: [Connection, GraphQLSchema]) => {
      const handler: LambdaHandler = graphqlLambda({
        schema: executableSchema,
      })

      handler(event, context, callbackFilter(callback))
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

export const graphiql: ProxyHandler = (
  event: APIGatewayEvent,
  context: Context,
  callback: ProxyCallback,
): void => {
  context.callbackWaitsForEmptyEventLoop = false

  const handler: LambdaHandler = graphiqlLambda({
    endpointURL: `/${process.env.STAGE}/graphql`,
  })

  handler(event, context, callback)
}
