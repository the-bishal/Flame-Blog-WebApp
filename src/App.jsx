import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Header, Footer } from './components'
import { Outlet } from "react-router-dom"

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const authStatus = useSelector(state => state.auth.userData)

  //little bit doubt
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className="w-full min-h-screen flex content-between justify-center">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
