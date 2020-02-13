export function toTree<T> (
  option: { idField: string, pidField: string, childrenField: string, parentField: string}, 
  arr: Array<T> ) {
  
  const defaultOpt = { idField: 'id', pidField: 'pid', childrenField: 'children', parentField: 'parent' }
  const opt = Object.assign(defaultOpt, option)

  const nodeMap = {}

  arr.forEach(function format (node) {
    
  })
  
  console.warn('toTree 为实现')

}

export function flatTree<T = any> (
  option: { childrenField: string, childValid: (n: T) => boolean }, 
  node: T
) {

  let result = []
  const defaultOpt = { childrenField: 'children', childValid: (n:T) => n[opt.childrenField].length > 0 }
  const opt = Object.assign(defaultOpt, option)

  function flat (n: T) {

    const hasChild = opt.childValid(n)

    if (hasChild) {
      const children = n[opt.childrenField]
      result.concat(children)
      children.forEach(flat)
    }
  }

  flat(node)

  return result
}