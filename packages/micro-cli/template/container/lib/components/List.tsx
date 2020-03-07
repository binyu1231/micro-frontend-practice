import React, { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { useStore } from '../core/store'
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
      <div className="bg-red-500">
      This is the list, mock data from <code>core/api.ts</code>
      </div>
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