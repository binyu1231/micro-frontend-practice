export interface INavMenuItem {
  key: string,
  name: string,
  link?: string,
  path?: string,
  icon?: string,
  disabled?: boolean
  subs?: INavMenuItem[]
}
