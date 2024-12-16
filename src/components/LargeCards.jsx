import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import PropTypes from 'prop-types'

const LargeCards = ({ $id, title, featuredImage, content }) => {
    return (
        <article className='flex flex-col md:flex-row gap-8 bg-orange-50 p-6 py-16 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'>
            <div className='w-full md:w-2/5 overflow-hidden rounded-lg'>
                <img 
                    src={appwriteService.getFilePreview(featuredImage)}
                    alt={title}
                    className='w-full h-[300px] object-cover hover:scale-105 transition-transform duration-300' 
                    loading="lazy"
                />
            </div>

            <div className='md:w-3/5 w-full flex flex-col gap-6 justify-between items-start pr-4'>
                <div className='space-y-4'>
                    <span className='inline-block text-blue-600 text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider bg-blue-50'>
                        Recent
                    </span>
                    <h2 className='text-2xl font-bold leading-tight text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors'>
                        {title}
                    </h2>
                    <p className='text-gray-600 text-justify line-clamp-4'>
                        {content}
                    </p>
                </div>
                
                <Link 
                    to={`/post/${$id}`}
                    className='inline-block text-white bg-orange-600 rounded-lg px-6 py-2.5 font-medium hover:bg-orange-700 transition-colors duration-300 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
                    aria-label={`Read full post about ${title}`}
                >
                    Read Post
                </Link>
            </div>
        </article>
    )
}

LargeCards.propTypes = {
    $id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    featuredImage: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}

export default LargeCards