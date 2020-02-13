import { curry } from './curry'
import { isFunction } from './type'

function eq (
  f: undefined | ((a: any, b: any) => boolean),
  a: any,
  b: any
) {
  return isFunction(f) ? f(a, b) : Object.is(a, b)
}

export const equal = curry(eq)