import React, { useCallback } from 'react'
import { ReactHookStore as Store } from '@micro/framework'
import { ExampleButton } from '@component/ui'

export default {
  title: 'framework'
}

const S = new Store({ x: 10000 })
const useStore = S.useStore

function PlusButton () {
  const { store, updateStore } = useStore(({ x, pressCount }) => ({ num: x, pressCount }))
  
  const handleClick = useCallback(() => {
    updateStore({ 
      x: store.num + 1, 
      pressCount: store.pressCount + 1 
    })
  }, [store])

  return <ExampleButton onClick={handleClick}>Plus</ExampleButton>
}


function MinusButton () {
  const { store, updateStore } = useStore(store => store)
  
  const handleClick = useCallback(() => {
    updateStore({ 
      x: store.x - 1, 
      // pressCount: store.pressCount + 1 
    })
  }, [store])

  return <ExampleButton onClick={handleClick}>Minus</ExampleButton>
}



function NumberBox () {
  const  { store } = useStore(s => ({ num: s.x }))
  // console.log('![context box render]', store)
  return <div>x: { store.num }</div>
}


function PressTimesBox () {
  const { store } = useStore(({ pressCount }) => ({ count: pressCount }))
  console.log('![press times box render]', store)
  return <div>pressPlusCount: { store.count }</div>
}

export function store () {
  const { updateStore } = useStore()
  // console.log('ffff', store)
  updateStore({ pressCount: 10 })

  return (
    <>
      <NumberBox />
      <PressTimesBox />
      <PlusButton />
      <MinusButton />
    </>
  )
}