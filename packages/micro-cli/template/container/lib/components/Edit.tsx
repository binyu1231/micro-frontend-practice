import React, { FC, useState, useEffect, useCallback } from 'react'
import { useStore } from '../core/store'
import { useHistory, useParams } from 'react-router-dom'
import { IListItemDto } from '../core'

export interface IEditProps {}

export const Edit: FC<IEditProps> = () => {

  const history = useHistory()
  const params = useParams<{ id: string }>()
  const { store } = useStore()

  const [item, setItem] = useState<IListItemDto | null>(null)

  const back = useCallback(() => {
    history.go(-1)
  }, [history])

  useEffect(() => {
    const item = store.list.find(listItem => listItem.id === Number(params.id))
    if (item) setItem(item)

  }, [params, store])

  return (
    <div>
      This the edit, item is 
      { item && <div>{ item.id }: {item.name }</div>}
      <button onClick={back}>back</button>
    </div>
  )
}

