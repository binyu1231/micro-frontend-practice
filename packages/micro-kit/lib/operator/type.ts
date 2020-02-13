const _toString = Object.prototype.toString

export function toRawType (value: any): string {
  return _toString.call(value).slice(8, -1)
}

export function isDefind (o: any): boolean {
  return o !== undefined && o !== null
}

export function isObject (o: any): boolean {
  return o !== null && typeof o === 'object'
}

export function isPlainObject (o: any): boolean {
  return _toString.call(o) === '[object Object]'
}

export const isString = (o: any) => typeof o === 'string'
export const isNumber = (o: any) => typeof o === 'number'
export const isSymbol = (o: any) => typeof o === 'symbol'
export const isBoolean = (o: any) => typeof o === 'boolean'
export const isFunction = (o: any) => typeof o === 'function'

export function isRegExp (o: any): boolean {
  return _toString.call(o) === '[object RegExp]'
}

export function isPrimitive (v: any): boolean {
  return isString(v) || isNumber(v) || isSymbol(v) || isBoolean(v)
}

export function isPromise (v: any): boolean {
  return isDefind(v) && isFunction(v.then) && isFunction(v.catch)
}

export type PlainObject<T = any> = { [key: string]: any }