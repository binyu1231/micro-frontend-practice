export interface INavMenuItem {
  value: string,
  name: string,
  link?: string,
  path?: string,
  icon?: string,
  disabled?: boolean
  children?: INavMenuItem[]
}
