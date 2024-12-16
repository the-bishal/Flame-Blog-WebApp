import React from 'react'
import logo from '../assets/icon.png'

const Logo = ({width = '100px'}) => {
  return (
    <div className='flex items-center' >
      <img src={logo} alt="logo" className='h-10 w-10'/>
      <h2 className='text-2xl font-bold text-[#ff4d00] font-["Helvetica"] pt-2'>Flames</h2>
    </div>
  )
}

export default Logo