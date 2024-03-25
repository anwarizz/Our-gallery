import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Container({ children }) {

  const navigate = useNavigate()

  useEffect(() => {
    async function getSession() {
      const UID = localStorage.getItem('UID')

      if (!UID) {
        return navigate('/login')
      }

      const response = await axios.get(`http://localhost:3000/get-auth?uid=${UID}`)
      console.log(response.data)
      // return response.data
      

      const response1 = await axios.get(`http://localhost:3000/users?username=${response.data.username}`)
      if (response1.length < 1) {
        return navigate('/login')
      }

      
    }

    getSession()
  })


  return (
    <div className='app'>
        { children }
    </div>
  )
}
