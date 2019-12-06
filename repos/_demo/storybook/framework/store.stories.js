import React, { useCallback } from 'react'
import { Store } from '@legend/framework/store/Store'

export default {
  title: 'framework'
}

const S = new Store({
  x: 1
})


function PlusButton () {
  const [store, updateStore] = S.useStore()
  
  const handleClick = useCallback(() => {
    updateStore({ x: store.x + 1, pressCount: store.pressCount + 1 })
  }, [store])

  return <button onClick={handleClick}>Plus</button>
}

function MinusButton () {
  const [store, updateStore] = S.useStore()

  const handleClick = useCallback(() => {
    updateStore({ x: store.x - 1, pressCount: store.pressCount + 1 })
  }, [store])
  return <button onClick={handleClick}>Minus</button>
}

function ContextBox () {
  const  [store] = S.useStore()
  return <div>x: { store.x }, pressCount: { store.pressCount }</div>
}

export function store () {

  return (
    <S.provider store={{ pressCount: 0 }}>
      <ContextBox />
      <PlusButton />
      <MinusButton />
    </S.provider>
  )
}