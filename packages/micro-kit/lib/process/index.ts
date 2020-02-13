export function microDelay(fn: (...args: any[]) => any) {
  let microtaskStarted = false
  const resolvePromise = Promise.resolve()
  let cache = []

  return function (...args: any[]) {
    if (!microtaskStarted) microtaskStarted = true
    cache[0] = args

    resolvePromise.then(() => {
      if (microtaskStarted) {
        fn.apply(null, cache[0])
        cache = []
        microtaskStarted = false
      }
    })
  }
}

export function macroDelay (fn: (...args: any[]) => any) {

  let count = 0
  let cache = []

  return function (...args: any[]) {
    cache[0] = args

    if (count === 0) {
      setImmediate(() => {
        fn.apply(null, cache[0])
        cache = []
        count = 0
      })
    }
    count++
  }
}