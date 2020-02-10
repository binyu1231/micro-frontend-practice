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