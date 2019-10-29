import React from 'react'

export function ExampleButton ({ children, ...otherProps }) {
  return (
    <button 
      {...otherProps}
      className="
        bg-red-500 
        hover:bg-red-700 
        text-white 
        ont-bold 
        py-2 
        px-4 
        rounded"
      >
      { children }
    </button>
  )
}