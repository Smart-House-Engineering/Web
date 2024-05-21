import React from "react"
import { useNavigate } from "react-router-dom"
import "react-circular-progressbar/dist/styles.css"
import { useAuth } from "../utils/authContext"

function Sidebar() {
  const navigate = useNavigate()

  const { setIsLoggedIn, setAuthUser, authUser } = useAuth()

  const logout = () => {
    setAuthUser(null)
    setIsLoggedIn(false)
    navigate("/")
  }

  return (
    <div className='sidebar'>
      <img src='/SEA-logo.png' alt='Logo of the app'></img>
      <div className='home-icon' onClick={() => navigate("/default")}>
        <img src='/home-2.svg' alt='Home or default page'></img>
        <p>Home</p>
      </div>
      <div className='home-icon' onClick={() => navigate("/emergency")}>
        <img src='/modes.svg' alt='Emergency page'></img>
        <p>Modes</p>
      </div>

      {authUser?.role === "OWNER" ? (
        <>
          <div className='home-icon' onClick={() => navigate("/add-user")}>
            <img src='/add-user.svg' alt='Logout'></img>
            <p> Add user</p>
          </div>

          <div className='home-icon' onClick={() => navigate("/delete-user")}>
            <img src='/delete-user.svg' alt='Logout'></img>
            <p> Delete user</p>
          </div>
        </>
      ) : null}
      <div
        className='home-icon'
        onClick={() => logout()}
        data-testid='logout-test'
      >
        <img src='/logged.svg' alt='Logout'></img>
        <p>Logout</p>
      </div>
    </div>
  )
}

export default Sidebar
