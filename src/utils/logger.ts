import {
  Logger,
  transports,
  TransportInstance,
  ConsoleTransportInstance,
  FileTransportInstance,
  LoggerStatic,
  LoggerInstance,
} from 'winston'
import { existsSync, mkdirSync } from 'fs'

const isLocalStage = process.env.STAGE === 'local'
const timestampFormat: () => string = () => new Date().toISOString()

const loggerTransports: TransportInstance[] = [
  new transports.Console({
    timestamp: timestampFormat,
    handleExceptions: false,
    json: false,
    colorize: isLocalStage, // avoid colorize in CloudWatch since is not supported
  }) as ConsoleTransportInstance,
]

if (isLocalStage) {
  const logDir: string = 'log'

  if (!existsSync(logDir)) {
    mkdirSync(logDir)
  }

  loggerTransports.push(
    new transports.File({
      name: 'error-log',
      level: 'error',
      timestamp: timestampFormat,
      filename: `${logDir}/error.log`,
    }) as FileTransportInstance,
    new transports.File({
      name: 'info-log',
      timestamp: timestampFormat,
      filename: `${logDir}/combined.log`,
    }) as FileTransportInstance,
  )
}

const logger: LoggerInstance = new (Logger as LoggerStatic)({
  level: process.env.NODE_LOGGING_LEVEL || 'error',
  transports: loggerTransports,
})

export default logger
