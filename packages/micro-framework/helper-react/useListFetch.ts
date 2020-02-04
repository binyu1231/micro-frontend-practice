import { useState, useEffect } from 'react'
import { catchError } from '../helper'

export function useListFetch<P = any, R = any> (listFetcher: any) {
  function fetcher (p: P) {
    setParameters(p)
  }
  const [parameters, setParameters] = useState<P>(null as any)

  const [data, setData] = useState<R[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (parameters === null) return
    setLoading(true)
    listFetcher(parameters)
    .then(res => {
      setLoading(false)
      setTotal(res.total)
      setData(res.records)
    })
    .catch((e) => {
      setLoading(false)
      catchError(e)
    })

  }, [parameters])


  return { data, total, loading, fetcher }
}