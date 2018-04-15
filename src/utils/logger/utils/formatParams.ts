interface Params {
  [key: string]: any
}

export default function formatParams(info: Params): string {
  const { timestamp, level: logLevel, message, ...args } = info
  const ts = timestamp.slice(0, 19).replace('T', ' ')

  let log = `${ts} [${logLevel}]: ${message}`

  if (Object.keys(args).length) {
    log += JSON.stringify(args)
  }

  return log
}
