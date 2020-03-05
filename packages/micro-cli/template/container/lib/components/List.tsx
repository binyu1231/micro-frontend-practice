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
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Opt</th>
          </tr>
        </thead>
        <tbody>
          { store.list.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            { store.access.edit && (
              <td><Link to={'/edit/' + item.id }><button>Edit</button></Link></td>
            ) }
          </tr>
        ))}
        </tbody>
      </table>

      
    </div>
  )
}