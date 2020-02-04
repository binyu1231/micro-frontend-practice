export const formatDateParams = (date, rule = 'YYYY-MM-DD') => {
    
  const range = Array.isArray(date) ? date : [date]
  const since = range[0].format(rule)
  const until = range[range.length - 1].format(rule)
  
  return { since, until }
}

export function groupBy (data, type) {
  const store = {}

  data.forEach(item => {
      const typeContent = item[type]
      if (!store.hasOwnProperty(typeContent)) {
          store[typeContent] = []
      }
      
      store[typeContent].push(item)
  })

  return store
}

export function groupArrayBy (data, type) {
  const groups = groupBy(data, type)
  return Object.keys(groups).map(key => ({
      name: key,
      children: groups[key]
  }))
}

export const sortOptions = [
  { name: '正序', value: 'true' }, 
  { name: '倒序', value: 'false' }, 
]