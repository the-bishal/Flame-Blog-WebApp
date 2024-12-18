import React from 'react'
import loadingImage from '../assets/loadingImage.webp'

function Loading({loadingText}) {
  return (
    <div className='h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-orange-50'>
      <img src={loadingImage} 
            alt="" 
      />
      <h2 className='text-6xl font-leagueSpartan font-extrabold text-[#64655A]'> <span className='text-[#E4798D]'>{loadingText}</span>, Please Wait...</h2>
    </div>
  )
}

export default Loading
