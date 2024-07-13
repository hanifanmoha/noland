const log =
  (fKey: string, isDebug: boolean) =>
  (key: any, ...args: any) => {
    if (!isDebug) return
    console.log(`[${fKey}.${key}]`, ...args)
  }

const debugLogger = (fKey: string, _isDebug: boolean) => {
  const isDebug = _isDebug
  return {
    log: log(fKey, isDebug),
  }
}

export default debugLogger
