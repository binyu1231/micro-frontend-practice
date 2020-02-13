export const noop = (..._args: any[]) => {}
export const no = (..._args: any[]) => false
export const identity = (_: any) => _

export function copy<T = any> (o: T) { 
  return Object.assign(Object.create(null), o) as T 
}