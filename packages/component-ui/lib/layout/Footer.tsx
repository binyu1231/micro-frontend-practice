import React, { FC } from 'react'

export const Footer: FC<{
}> = ({ children }) => {

  return (
    <div className="flex justify-center py-2">
      { children || 'Copyright YOYI Inc. 2003-2019.' }
    </div>
  )
}