import React, {useState} from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
// import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index'
// import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import SignupImg from '../assets/signup.jpg'
import LoadingSpinner from './LoadingSpinner'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm()
    // const dispatch = useDispatch()

    const create = async(data) => {
        setError('')
        setLoading(true)
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                // const currentUser = await authService.getCurrentUser();
                // if (currentUser) dispatch(login(currentUser))
                // console.log("Current User after Signup",currentUser)
                console.log("Account Created Successfully")
                navigate('/login')
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='flex w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden'>
            {/* Left Side - Image */}
            <div className='hidden md:block w-1/2 bg-cover bg-center'
                style={{
                    backgroundImage: `url(${SignupImg})`
                }}>
            </div>

            {/* Right Side - Signup Form */}
            <div className='w-full md:w-1/2 p-8'>
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
                <p className="mt-2 text-center text-sm text-gray-600 mb-8">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-orange-500 hover:text-orange-600 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {error && <p className='text-red-600 mb-4 text-center bg-red-50 p-2 rounded'>{error}</p>}

                <form onSubmit={handleSubmit(create)} className='space-y-4'>
                    <div className='space-y-4'>
                        <Input 
                            label="Full Name"
                            placeholder="Enter your full name"
                            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500"
                            {...register("name",{
                                required: "Name is required",
                            })}
                        />
                        <Input 
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input 
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500"
                            {...register("password",{
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                }
                            })}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full flex items-center justify-center gap-4 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition-all duration-200 mt-6"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Sign Up"} {isSubmitting ? <LoadingSpinner/> : ''}
                    </Button>
                </form>

                <div className="mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200">
                            <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup