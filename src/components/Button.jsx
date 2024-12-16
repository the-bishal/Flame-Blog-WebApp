import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-orange-600',
    textColor = 'white',
    className = '',
    ...props

}) {
  console.log(type);
  
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props} >
        {children}
    </button>
  )
}

export default Button
