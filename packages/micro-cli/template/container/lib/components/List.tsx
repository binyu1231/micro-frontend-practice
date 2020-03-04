import React, { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { useStore } from '../store'
import { Link } from 'react-router-dom'

export const List: FC<RouteComponentProps> = () => {

  const { store, updateStore } = useStore()

  useEffect(() => {
    store.api.listFetch().then((res) => {
      updateStore({ list: res.data })
    })
  }, [])

  return (
    <div>
      This is the list, mock data from <code>core/api.ts</code>
      { store.list.map(item => (
        <div>
          <span>{item.id}</span>
          <span>{item.name}</span>
          { store.access.edit && (
            <Link to={'/edit/' + item.id }><button>Edit</button></Link>
          ) }
        </div>
      ))}
    </div>
  )
}