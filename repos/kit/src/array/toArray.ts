import { isArray } from 'lodash'

export function toArray (o: any) {
  return isArray(o) ? o.slice() : Array.from(arguments)
}