const log =
  (isDebug: boolean) =>
  (key: any, ...args: any) => {
    console.log(`[${key}]`, ...args)
  }

const debugLogger = (_isDebug: boolean) => {
  const isDebug = _isDebug
  return {
    log: log(isDebug),
  }
}

export default debugLogger
