import React from 'react'
import { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components/'
import Loading from '../components/Loading'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sortBy, setSortBy] = useState('newest')
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        setIsLoading(true)
        appwriteService.getPosts([]).then((posts) => {
          if (posts) {
            setPosts(posts.documents)
            setFilteredPosts(posts.documents)
          }
        })
        setIsLoading(false)
    }, [])

    // Filter and sort posts
    useEffect(() => {
        setIsLoading(true)
        let result = [...posts]
        
        // Apply category filter
        if (selectedCategory !== 'all') {
            result = result.filter(post => post.category === selectedCategory)
        }
        
        // Apply sorting
        if (sortBy === 'newest') {
            result.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
        } else if (sortBy === 'oldest') {
            result.sort((a, b) => new Date(a.$createdAt) - new Date(b.$createdAt))
        }
        setIsLoading(false)
        
        setFilteredPosts(result)
    }, [selectedCategory, sortBy, posts])

    // Get unique categories from posts
    const categories = ['all', ...new Set(posts.filter(post => post?.category).map(post => post.category))]

    return !isLoading ? (
        <div className='w-full min-h-screen py-8 bg-orange-50'>
            <Container>
                {/* Filter Section */}
                <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <h3 className="text-lg font-semibold">Filter by:</h3>
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <h3 className="text-lg font-semibold">Sort by:</h3>
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Posts Grid */}
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-10">
                        <h2 className="text-2xl font-semibold text-gray-600">Loading Posts...</h2>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post) => (
                            <div key={post.$id} className="transform transition duration-200 hover:scale-105">
                                <PostCard {...post} bgColor="white" />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    ) : <Loading loadingText="Loading All Posts" />
}

export default AllPosts