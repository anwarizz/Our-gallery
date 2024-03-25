import React, { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
import "../styles/photos.css";

export default function Photos({limitPhoto, albumId}) {
  const [members, setMembers] = useState([]);
  const [album, setAlbum] = useState([])
  const [limit, setLimit] = useState(true);
  const navigate = useNavigate()


  function handleViewMore() {
    setLimit(!limit);
  }



  useEffect(() => {

    if (!limitPhoto) {
      setLimit(false)
    }

    async function getOneAlbum() {
      const response = await axios.get(`http://localhost:3000/albums?id=${albumId}`)
      console.log(response.data.data)
      setMembers(response.data.data[0].photos)
      setAlbum(response.data.data[0])
    }
    
    getOneAlbum()

    // const fetchData = async (url) => {
    //   const response = await fetch(url);
    //   const data = await response.json();
    //   setMembers(data.photos);
    // };

    // const URL = `https://api.slingacademy.com/v1/sample-data/photos?limit=18`;
    // fetchData(URL);
    // console.log(members)
  }, []);

  const [addbox, setAddBox] = useState(false)
  const [photo, setPhoto] = useState()

  function addPhoto(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('photo', photo);
    axios.put(`http://localhost:3000/albums/${albumId}/add`, formData)
    navigate('/albums')
    navigate(-1)
  }

  const [cardSize, setCardSize] = useState()

  return (
    <>
      {addbox ? (
        <form onSubmit={addPhoto} method="put" encType="multipart/form-data">
          <input type="file" name="photo" accept="image/png, image/gif, image/jpeg" onChange={(e) => setPhoto(e.target.files[0])}/>
          <button type="submit">OK</button>
        </form>
      ):('')}
      <div className="heading">
        <p>{album.header}</p>
        {/* <div>
          Created by <b>Jundia</b> / 08-09-2008
        </div> */}
      </div>
      <div className="container" style={limit ? {} : { maxHeight: "max-content" }}>
        <div className="card plus" onClick={() => setAddBox(true)}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H20M12 4V20"
              stroke="#fffff0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {members.map((member) => (
          <div className="card" key={member.url}>
            <img src={`http://localhost:3000/uploads/${member.url}`} loading="lazy"/>
          </div>
        ))}
      </div>
      <div className="btns">
        {limitPhoto ? (
        <button className="view-more-btn" onClick={handleViewMore}>
          {limit ? "View more" : "View less"}
        </button>
        ):('')}
      </div>
    </>
  );
}
