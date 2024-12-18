import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import LoadingSpinner from './LoadingSpinner'


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: {isSubmitting, errors} } = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)

    const login = async(data) => {
        setLoading(true)
        setError('')
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                navigate('/')
            }

        } catch (error) {
            setError("the error message inside login block",error.message)
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
                         backgroundImage: `url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
                     }}>
                </div>

                {/* Right Side - Login Form */}
                <div className='w-full md:w-1/2 p-8'>
                    <div className="mb-6 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                    
                    <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                    <p className="mt-2 text-center text-sm text-gray-600 mb-8">
                        Don&apos;t have an account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-orange-500 hover:text-orange-600 transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>

                    {error && <p className='text-red-600 mb-4 text-center bg-red-50 p-2 rounded'>{error}</p>}

                    <form onSubmit={handleSubmit(login)} className='space-y-4'>
                        <div className='space-y-4'>
                            <Input 
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500"
                                {...register("email", {
                                    required: true,
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
                                {...register("password", {
                                    required: true
                                })}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    id="remember" 
                                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                                    {...register('rememberMe')}
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <Link 
                                to="/forgot-password" 
                                className="text-sm text-orange-500 hover:text-orange-600 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full flex items-center justify-center gap-4 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition-all duration-200 mt-6"
                            disabled = {isSubmitting}
                        >
                            {loading ? ' Verifying... ' : 'Sign In'} {isSubmitting ? <LoadingSpinner/> : ''}
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

export default Login
