
export type SqlString = string


export type PlainOption<T = number | string> = { 
  name: string, 
  value: T, 
  disabled?: boolean 
}
