import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import "../styles/login.css";

export default function Login() {
    const [username, setUsername] = useState(false)
    const [password, setPassword] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      async function getSession() {
        const UID = localStorage.getItem('UID')

        if (UID) {
          const response = await axios.get(`http://localhost:3000/get-auth?uid=${UID}`)
          console.log(response.data)
          // return response.data
          
    
          const response1 = await axios.get(`http://localhost:3000/users?username=${response.data.username}`)
          // console.log(response1)
          if (response1) {
            return navigate('/')
          }
      
        }

      }
      
      getSession()
    })
  


    function handleSubmit(e) {
        e.preventDefault()

        async function getUser() {
            const response = await axios.get(`http://localhost:3000/users?username=${username}&password=${password}`)
            return response.data.data
        }

        async function setSessionAndNavigate(id, username, password) {
          const response = await axios.post(`http://localhost:3000/auth`, {id, username, password})
          localStorage.setItem('UID', response.data.token)
          return response.data
        }
        
        getUser().then(account => {
            if (account.length <= 0) return alert('User doesnt exist')
            if (password != account[0].password) return alert('Your password is wrong!')
            setSessionAndNavigate(account[0]._id, account[0].username, account[0].password).then(() => navigate('/'))
        })
    }



    return (
        <div className="login-container">
          <div className="login-container1">
            <form className="login-form" onSubmit={handleSubmit}>
              <span className="login-text">Haloo User!</span>
              <input
                type="text"
                placeholder="Username"
                required
                className="login-textinput input"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="login-textinput1 input"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="login-button button">
                <span className="login-text1">
                  <span>Login</span>
                  <br></br>
                  <br></br>
                </span>
              </button>
            </form>
            <Link
              to="/register"
              className="login-link"
            >
              Register New Account
            </Link>
          </div>
        </div>
      )
}
