import { existsSync, mkdirSync } from 'fs'
import { createLogger, format, transports } from 'winston'
import { apply } from 'ramda'

import formatParams from './utils/formatParams'

const level = process.env.LOG_LEVEL || 'debug'

const formats = [format.timestamp(), format.printf(formatParams)]

if (process.env.STAGE === 'local') {
  // colorize should be the fisrt argument to work:
  // https://github.com/winstonjs/winston/issues/1135#issuecomment-343980350
  formats.unshift(format.colorize())
}

const formatter = apply(format.combine, formats)

let logger

if (!(process.env.STAGE === 'local')) {
  logger = createLogger({
    level,
    format: formatter,
    transports: [new transports.Console()],
  })
} else {
  const logDir: string = 'log'

  if (!existsSync(logDir)) {
    mkdirSync(logDir)
  }

  logger = createLogger({
    level,
    format: formatter,
    transports: [
      new transports.File({ filename: `${logDir}/error.log`, level: 'error' }),
      new transports.File({ filename: `${logDir}/combined.log` }),
      new transports.Console(),
    ],
  })
}

export default logger
