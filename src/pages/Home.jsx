import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'
import LargeCards from '../components/LargeCards'
import HomeImg from '../assets/home.png'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import Loading from '../components/Loading'

function Home() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const stateUserData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        appwriteService.getPosts().then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
        setIsLoading(false)
    }, [])

    return !isLoading ? (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="w-full bg-orange-50 py-20">
                <Container>
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="w-full md:w-1/2">
                            <img 
                                src={HomeImg}
                                alt="Hero" 
                                className="rounded-lg hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="w-full md:w-1/2 space-y-6">
                            <h1 className="text-4xl md:text-6xl font-bold text-primary">
                                Welcome to Our Blog
                            </h1>
                            <p className="text-lg text-gray-600 ">
                                Discover amazing stories, insights, and experiences shared by our community of writers.
                            </p>
                            <button className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors"
                                onClick = {() => stateUserData ? navigate('/all-posts') : navigate('/login')}
                            >
                                Start Reading
                            </button>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Featured Post Section */}
            {posts.length > 0 && (
                <div className="w-full bg-white py-16">
                    <Container>
                        <h2 className="text-3xl text-primary font-bold mb-10 text-center">Featured Post</h2>
                        <LargeCards {...posts[posts.length-1]} />
                    </Container>
                </div>
            )}

            {/* Categories Section */}
            <div className="w-full bg-white py-16">
                <Container>
                    <h2 className="text-3xl font-bold mb-10 text-primary text-center">Popular Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {['Technology', 'Lifestyle', 'Travel'].map((category) => (
                            <div key={category} className="bg-orange-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                                <h3 className="text-xl font-semibold mb-4">{category}</h3>
                                <p className="text-gray-600">Explore the latest articles in {category.toLowerCase()}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Recent Posts Grid */}
            {posts.length > 0 && (
                <div className="w-full bg-white py-16">
                    <Container>
                        <h2 className="text-3xl font-bold mb-10 text-primary text-center">Recent Posts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {posts.slice(1).reverse().map((post) => (
                                <div key={post.$id}>
                                    <PostCard {...post} bgColor="orange-50" />
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            )}

            {/* Newsletter Section */}
            <div className="w-full bg-orange-50 py-16">
                <Container>
                    <div className="max-w-2xl mx-auto text-center space-y-6">
                        <h2 className="text-3xl font-bold">Subscribe to Our Newsletter</h2>
                        <p className="text-gray-600">Stay updated with our latest stories and updates</p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="px-6 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <button className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    ) : <Loading loadingText = "Loading Posts"/>
}

export default Home