import React, { FC } from 'react'
import { useStore } from '../store'
import { Link, useHistory } from 'react-router-dom'

export interface IEditProps {}

export const Edit: FC<IEditProps> = () => {

  const history = useHistory()
  const { store } = useStore()

  return (
    <div>
      This the edit, item is 
    </div>
  )
}

