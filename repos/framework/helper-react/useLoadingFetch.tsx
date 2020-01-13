import { useState, useEffect } from "react"
import { catchError } from "../helper"

export function useLoadingFetch<T = any, K = any> (
  params: T, 
  listFetcher: (payload: T) => Promise<K>,
  success?: (response: K) => any,
  error?: (err: Error) => any
) {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<K>(null)
  const [parameters, setParameters] = useState<T>(params)

  useEffect(() => {
    if (parameters === null) return
    setLoading(true)
    listFetcher(parameters)
    .then(res => {

      setData(res)
      setLoading(false)
      success && success(res)
    })
    .catch(e => {
      setLoading(false)
      catchError(e)
      error && error(e)
    }) 

  }, [ parameters ])

  return { data, loading, params: parameters, fetcher: setParameters }
}