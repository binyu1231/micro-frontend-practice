export function pathPrefix(prefix: string) {
  return function (location: Location) {
    return window.location.pathname.indexOf(prefix) === 0
  }
}