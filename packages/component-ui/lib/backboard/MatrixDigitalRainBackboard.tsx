import React, { useState, useEffect, useRef, useLayoutEffect, FC } from 'react'

function r(from: number, to: number) {
  return ~~(Math.random() * (to - from + 1) + from)
}

function pick(...args: number[]) {
  return args[r(0, args.length - 1)]
}

function getChar() {
  return String.fromCharCode(pick(
    r(0x3041, 0x30ff),
    r(0x2000, 0x206f),
    r(0x0020, 0x003f)
  )) || '一'
}

function loop(fn: () => void, delay: number) {
  let stamp = Date.now()
  function _loop() {
    if (Date.now() - stamp >= delay) {
      fn()
      stamp = Date.now()
    }
    requestAnimationFrame(_loop)
  }
  requestAnimationFrame(_loop)
}




const MAX_COUNT = 70
const loopArray = Array.from({ length: MAX_COUNT })
const fontSize = 100 / MAX_COUNT + 'vmax'

const defStyle =`width:${fontSize};height:${fontSize};font-size:${fontSize};`
class Trail {
  list: any[]
  options: { size: number, offset: number }
  body: any[]

  constructor(list = [], options: { size: number, offset: number }) {
    this.list = list;
    this.options = Object.assign(
      { size: 10, offset: 0 }, options
    );
    this.body = []
    this.move()
  }
  traverse(fn: (item: any, i: number, last: boolean) => void) {
    this.body.forEach((n, i) => {
      let last = (i == this.body.length - 1)
      if (n) fn(n, i, last)
    })
  }
  move() {
    this.body = []
    let { offset, size } = this.options
    for (let i = 0; i < size; ++i) {
      let item = this.list[offset + i - size + 1]
      this.body.push(item)
    }
    this.options.offset = 
      (offset + 1) % (this.list.length + size - 1)
  }
}

function RainChar() {
  
  const [char, setChar] = useState(getChar())

  useEffect(() => {
    loop(() => {
      Math.random() < .5 && setChar(getChar())
    }, r(4e3, 1e4))
  }, [setChar])

  return <span
    className="block text-center"
    style={{
      width: fontSize, height: fontSize, fontSize: fontSize,
      color: 'color:hsl(213, 73%, 20%)'
    }}>{char}</span>
}

function Rain ({ index }) {

  const rainBar = useRef(null)

  useLayoutEffect(() => {
    // drop
    const chars = Array.from(rainBar.current.children)
    const dropSpeed = r(30, 100)
    const trail = new Trail(chars, {
      size: r(~~(MAX_COUNT * 2), ~~(MAX_COUNT * .4)),
      offset: r(0, 30)
    })

    const len = trail.body.length

    loop(function dropMove () {
      // if (index === 25) {
        trail.move()
        trail.traverse((char, i, last) => {
          char.style = defStyle + `color: hsl(213, 73%, ${40 / len * (i + 1) + 20 }%)
        `
        if (last) {
          char.style = defStyle + 'color:hsl(213, 73%, 40%);text-shadow:0 0 .1em #fff,0 0 .1em currentColor'
        }
        })
      // }
    }, dropSpeed)

  }, [rainBar.current])

  return (
    <p ref={rainBar} className="leading-none">
    {loopArray.map((_, i) => {
      return <RainChar key={i} />
    })}
  </p>
  )
}

export const MatrixDigitalRainBackboard: FC<{}> = () => {
  return (
    <div className="flex" style={{ height: '100%', backgroundColor: '#132553', fontFamily: '"Helvetica Neue", Helvetica, sans-serif' }}>
      { loopArray.map((_, i) => {
        return <Rain key={i} index={i} />
      })}
    </div>
  )
}