import { curry, PlainObject, isObject } from "../operator"

function objHas (obj: PlainObject, ...fields: string[]): boolean {

  return fields.every(function (field) {
    if (!isObject(obj)) return false
    const has = obj.hasOwnProperty(field)
    obj = obj[field]
    return has
  })
}

function objGet<V = any, D = undefined> (defaultValue: D, obj: PlainObject, ...fields: string[]) {

  if (!isObject(obj)) return defaultValue
  let value: V

  fields.some(function (field) {
    return (value = obj = obj[field]) === undefined
  })

  return value === undefined ? defaultValue : value
}

export const objectHas = curry(objHas)
export const objectGet = curry(objGet)
export * from './tree'