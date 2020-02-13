export function getOffset (dom: HTMLElement, parentDom?: HTMLElement) {

  parentDom = parentDom || document.body

  let left = 0
  let top = 0
  const width = dom.offsetWidth
  const height = dom.offsetHeight
  while (dom && dom !== parentDom) {
    
    left += dom.offsetLeft
    top += dom.offsetTop
    dom = dom.offsetParent as HTMLElement
    
  }

  return { width, height, left, top }

}

export * from './download'
export * from './copyToclipboard'