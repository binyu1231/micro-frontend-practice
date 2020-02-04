export function groupBy (data: any[], type: string) {
  
  const store: { [key: string]: any[] } = {}

  data.forEach(item => {
      const typeContent = item[type]
      if (!store.hasOwnProperty(typeContent)) {
          store[typeContent] = []
      }
      
      store[typeContent].push(item)
  })

  return store
}

export type GroupArrayItem = {
  name: string,
  children: any[]
}

export function groupArrayBy (data: any[], type: string) :GroupArrayItem[] {
  const groups = groupBy(data, type)
  return Object.keys(groups).map(key => ({
      name: key,
      children: groups[key]
  }))
}