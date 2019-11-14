import React, { FC, useRef, useLayoutEffect } from 'react'

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


class Char {
  text: string
  index: number = -1
  isHead: boolean = false
  trailRate: number = 0
  constructor () {

    this.mutate()
  }

  mutate () {
    this.text = getChar()
  }
}

class RainTrail {
  options: { size: number, offset: number }
  chars: Char[]
  body: Char[]
  constructor (chars: Char[], options?: Partial<{ size: number, offset: number }>) {
    this.chars = chars
    this.options = Object.assign({
      size: 10, offset: 0
    }, options)
    this.body = []
    this.move()

  }

  move () {
    this.body = []
    const { offset, size } = this.options

    for (let i = 0; i < size; ++i) {
      let char = this.chars[offset + i - size + 1]
      this.body.push(char)
    }

    this.options.offset = (offset + 1) % (this.chars.length + size - 1)
  }

  traverse (fn) {
    this.body.forEach((char, i) => {
      let last = (i === this.body.length - 1)
      if (char !== undefined) {
        fn(char, i, last)
      }
    })
  }
}

class RainBar {
  chars: Char[]
  trial: RainTrail
  matrix: Matrix
  constructor (matrix: Matrix) {
    this.matrix = matrix
    this.initialize(matrix.maxCol)
    this.drop()
  }

  initialize (row: number) {
    this.chars = Array.from({ length: row }).map(() => {

      const char = new Char()
      // 每列有一半的字符会变
      if (Math.random() < .5) {
        loop(() => {
          char.mutate()
          this.matrix.needRender = true
        }, r(1e3, 5e3))
      }
      return char
    })

    this.trial = new RainTrail(this.chars, {
      size: r(10, 30), offset: r(0, 100)
    })
  }

  drop () {
    const trail = this.trial
    const len = trail.body.length
    let dropSpeed = r(10, 100)
    loop(() => {
      trail.move()
      trail.traverse((char: Char, charTrailIndex: number, isHead: boolean) => {
        char.trailRate = charTrailIndex + 1 / len
        char.isHead = isHead
        if (isHead) {  char.mutate() }
      })
      this.matrix.needRender = true
    }, dropSpeed)
  }

}

class Matrix {
  maxCol: number
  ctx: CanvasRenderingContext2D
  w: number
  h: number
  bars: RainBar[] = []
  charColSize: number
  needRender: boolean = false
  stop: boolean = false

  constructor (canvas: HTMLCanvasElement, option: Partial<{ maxCol: number }>) {
    this.maxCol = option.maxCol || 50
    this.ctx = canvas.getContext('2d')
    this.w = canvas.width
    this.h = canvas.height

    this.charColSize = Math.max(this.w, this.h) / this.maxCol
    this.ctx.font =`${100 / this.maxCol}vmax "Helvetica Neue", Helvetica, sans-serif`
    for (let i = 0; i < this.maxCol; i++) {
      this.bars.push(new RainBar(this))
    }
    
    requestAnimationFrame(this.loop)
  }

  loop = () => {
    if (this.stop) return
    if (this.needRender) {
      this.render()
      this.needRender = false
    }

    requestAnimationFrame(this.loop)
  }

  render () {
    // 清画布
    this.ctx.fillStyle = '#132553'
    this.ctx.fillRect(0, 0, this.w, this.h)
    
    for (let col = 0; col < this.bars.length; col++) {
      const bar = this.bars[col]
      for (let row = 0; row < bar.chars.length; row++) {
        this.renderChar(bar.chars[row], col, row)
      }
    }
  }

  renderChar (char: Char, x: number, y: number) {
    this.ctx.fillStyle = `hsl(213, 73%, ${~~(40 * char.trailRate) + 20 }%)`
    this.ctx.fillText(char.text, x * this.charColSize, y * this.charColSize)
  }

  destory () {
    this.stop = true
  }
}

export const MatrixDigitalRainCanvas: FC<{
  maxDimemsion?: number
}> = ({
  maxDimemsion
}) => {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const canvas = ref.current
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight

    const matrix = new Matrix(canvas, { maxCol: maxDimemsion })

    return () => matrix.destory()

  }, [ref.current])

  return (
    <canvas ref={ref} />
  )
}