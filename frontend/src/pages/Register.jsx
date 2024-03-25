import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../styles/register.css";

const Register = (props) => {
    const [username, setUsername] = useState(false)
    const [password, setPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState(false)
    const navigate = useNavigate()

    function addNewUser(e) {
        e.preventDefault()
        
        if (password != confirmPassword) {
            navigate(1)
            return alert('Confirm your password!')
        } 
        
        async function getDataLike () {
           const response =  await axios.get(`http://localhost:3000/users?username=${username}`)
           return response.data.data
        }

        getDataLike().then(item => {
            if (item.length > 0) return alert('Username exist!');
            axios.post(`http://localhost:3000/register`, {username, password})
            navigate(-1)
        })
    }


  return (
    <div className="register-container">
      <div className="register-container1">
        <form className="register-form" onSubmit={addNewUser} method='post'>
          <span className="register-text">New Account</span>
          <input
            type="text"
            placeholder="Create Username"
            required
            className="register-textinput input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Create Password"
            required
            className="register-textinput1 input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            encType="Confirm Password"
            className="register-textinput2 input"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="register-button button">
            <span className="register-text1">Register</span>
          </button>
        </form>
        <Link
          to="/login"
          className="register-link"
        >
          <span>Already have an account?</span>
          <br></br>
        </Link>
      </div>
    </div>
  )
}

export default Register
