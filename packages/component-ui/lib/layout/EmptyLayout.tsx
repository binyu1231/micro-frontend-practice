import React, { FC, DetailedHTMLProps, HTMLAttributes, useLayoutEffect, useRef } from 'react'
import { getOffset } from '@micro/kit'

interface IEmptyLayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const EmptyLayout: FC<IEmptyLayoutProps> = ({
  children,
  className,
  ...otherProps
}) => {
  const container = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (container === null) return

    const immediate = setImmediate(() => {
      const dom = container.current
      const { top } = getOffset(dom)
      dom.style.minHeight = window.innerHeight - top + 'px'
    })

    return () => clearImmediate(immediate)
  }, [])

  return (
    <div 
      ref={container}
      className={`flex-1 flex flex-col bg-gray-200 ${className}`} 
      {...otherProps}>
      {children}
    </div>
  )
}