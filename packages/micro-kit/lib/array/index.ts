import { curry, not, is } from '../operator'

export function toArray (o: any) {
  return Array.isArray(o) ? o.slice() : Array.from(arguments)
}


function arrAdd (
  existValid: undefined | ((oItem: any, item: any) => boolean),
  o: any[],
  item: any
): any[] {

  const valid = existValid || not
  const items = toArray(item)
  .filter(function remainItem (item: any) {
    return o.every(function validate (oItem: any) {
      return valid(oItem, item)
    })
  })

  return o.concat(items)
}

function arrIncludes (
  existValid: undefined | ((oItem: any, item: any) => boolean),
  o: any[],
  item: any
) {
  const valid = existValid || is
  const items = toArray(item)

  return items.every(function (item) {
    return o.some(function (oItem) {
      return valid(oItem, item)
    })
  })
}

function arrRemove (
  existValid: undefined | ((o: any, item: any) => boolean),
  o: any[],
  item: any
) {
  const items = toArray(item)
  const valid = existValid || is

  return o.filter(function remain (oItem, any) {
    return !items.some(function (item: any) {
      return valid(oItem, item)
    })
  })
}

export const arrayRemove = curry(arrRemove)
export const arrayIncludes = curry(arrIncludes)
export const arrayAdd = curry(arrAdd)