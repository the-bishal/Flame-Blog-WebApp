import React, { useState } from 'react'
import { Logo, Container, LogoutBtn } from '../index'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
      mid: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      mid: true,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      mid: true,
    },
    {
      name: "About",
      slug: "/about",
      active: true,
      mid: true,
    },
    {
      name: "Contact",
      slug: "/contact",
      active: true,
      mid: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: authStatus ? false : true,
      mid: false,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      mid: false,
    },
  ]

  const handleNavigation = (slug) => {
    navigate(slug)
    setIsMenuOpen(false)
  }


  return (
    <header className='w-full h-20 fixed top-0 left-0 right-0 bg-white z-50 shadow-sm'>
      <Container>
        <nav className='w-full flex items-center justify-between h-20'>
          <Link to='/' className='z-50'>
            <Logo />
          </Link>

          {/* Hamburger Menu Button with Animation */}
          <button 
            className='lg:hidden p-2 z-50 transition-all duration-300 ease-in-out'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className='w-6 h-5 relative flex flex-col justify-between'>
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}></span>
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ease-in-out ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}></span>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className='hidden lg:flex items-center gap-8'>
            <ul className='flex items-center gap-8'>
              {navItems.map((item) => item.active ? item.mid ? (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.slug)}
                    className={`inline-block px-6 py-2 duration-200 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300 ${location.pathname === item.slug ? 'after:w-full text-primary after:bg-primary font-bold' : ''} `}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null : null)}
            </ul>
            {authStatus ? (<LogoutBtn />) : (
              <div className='flex items-center gap-4'>
                <button className='px-6 py-2 hover:text-blue-600 transition-colors duration-300' 
                  onClick={() => handleNavigation(navItems[5].slug)}>
                  Login
                </button>
                <button className='orangeButton text-white px-6 py-2 rounded-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5' 
                  onClick={() => handleNavigation(navItems[6].slug)}>
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu with Animation */}
          <div className={`lg:hidden fixed inset-0 bg-white transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className='pt-24 px-6'>
              <ul className='flex flex-col gap-4'>
                {navItems.map((item) => item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavigation(item.slug)}
                      className='w-full text-left px-4 py-3 hover:bg-blue-50 rounded-lg transition-colors duration-200 text-lg'
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null)}
              </ul>
              {authStatus ? (
                <div className='mt-8 px-4'>
                  <LogoutBtn />
                </div>
              ) : (
                <div className='flex flex-col gap-3 mt-8 px-4'>
                  <button 
                    className='w-full px-6 py-3 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200' 
                    onClick={() => handleNavigation(navItems[5].slug)}
                  >
                    Login
                  </button>
                  <button 
                    className='w-full orangeButton text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300' 
                    onClick={() => handleNavigation(navItems[6].slug)}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}


export default Header