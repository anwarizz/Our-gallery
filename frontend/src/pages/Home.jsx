import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Photos from "../components/photos";
import Section from "../components/layouts/section"
import axios from 'axios';

export default function Home() {

  const navigate = useNavigate()

  // useEffect(()=> {
  //   async function sayHello(e) {
  //     await axios.post('http://localhost:3000/client', {message: 'client say hi'})
  //   }

  //   sayHello();
  // })

  const [album, setAlbum] = useState([])

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
    
    async function getData() {
      const response = await axios.get(`http://localhost:3000/albums`)
      setAlbum(response.data.data)
    }
    
    getSession()
    getData()


  }, [])


  return (
      <Section>
        <form action="" className="filter">
          <select name="filter" id="filter" defaultValue={"all"}>
            <option value="all">All Photos</option>
            <option value="longest">Longest</option>
            <option value="latest">Latest</option>
          </select>
        </form>

        {album.map((a) => (
          <Photos limitPhoto={true} albumId={a._id} key={a._id}/>
        ))}
      </Section>
  );
}
