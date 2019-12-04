
export type PlainObject<T = any> = {
  [key:string]: T
}

export type SqlString = string


export type CommonOption<T = number> = { 
  name: string, 
  value: T, 
  disabled?: boolean 
}
