export function pathPrefix(prefix: string | string[]) {
  return function (_location: Location) {
    const prefixs: string[] = typeof prefix === 'string' ? [prefix] : prefix
    return prefixs.some(prefix => window.location.pathname.indexOf(prefix) === 0)
  }
}