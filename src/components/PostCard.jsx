import React, { useState } from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
import parse from "html-react-parser";

function PostCard({$id, title, featuredImage, content, bgColor}) {
  return (
    <div className={`w-full sm:w-[350px] h-[450px] bg-${bgColor} rounded-lg shadow-md overflow-hidden`}>
      {/* Image Container - Fixed height */}
      <div className='w-full h-48'>
        <img 
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title} 
          className='w-full h-full object-cover' 
        />
      </div>

      {/* Content Container - Fixed height with flex grow */}
      <div className='flex flex-col h-[calc(450px-192px)] p-4'>
        {/* Title - Allow up to 3 lines */}
        <h2 className='text-xl font-bold mb-3 line-clamp-2 min-h-[4rem]'>{title}</h2>

        {/* Content - Allow up to 6 lines */}
        <div className='flex-grow overflow-hidden mb-4'>
          <p className='text-gray-500 text-sm line-clamp-4'>
            {parse(content)}
          </p>
        </div>

        {/* Button - Fixed at bottom */}
        <Link to={`/post/${$id}`} className='mt-auto'>
          <button className='w-full text-white bg-orange-500 text-sm rounded-lg px-4 py-2 hover:bg-orange-600 transition-colors'>
            Read Post
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PostCard
