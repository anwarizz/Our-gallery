import React, { useEffect, useState } from "react";
import { useParams, useNavigate, resolvePath } from "react-router-dom";
import axios from "axios";
import "../styles/albums.css";

export default function AlbumsEdit() {
  const [imageCover, setImageCover] = useState(false);
  const [album, setAlbum] = useState({});
  const [file, setFile] = useState(false)
  
  const { albumId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getAlbum() {
      const response = await axios.get(
        `http://localhost:3000/albums?id=${albumId}`
      )
      setAlbum(response.data.data[0]);
      if (response.data.data[0].image.length > 0) {
        setImageCover('http://localhost:3000/uploads/' + response.data.data[0].image)
      }
    }
    
    getAlbum();
    
  }, []);

  function updateAlbum(e) {
    e.preventDefault();
    const formData = new FormData()
    if(file) {
      formData.append('file', file)
    }
    formData.append('header', album.header)

    try {
      console.log(albumId);
      console.log(album.header);
      axios.put(`http://localhost:3000/albums/${albumId}/edit`, formData);
      navigate('/');
      navigate(-2)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="edit-container">
      {/* <h1>{albumId}</h1> */}
      <form onSubmit={updateAlbum} method="post" encType="multipart/form-data" className="edit-box"> 
        <div className="edit-cover">
          <div className="image">
            {imageCover ? <img src={imageCover} alt="" /> : ""}
          </div>
        </div>
        <div className="edit-input">
          <input
            type="text" 
            className="text"
            name="header"
            defaultValue={album.header}
            onChange={(e) => {
              setAlbum({ ...album, header: e.target.value });
            }}
          />
          <label htmlFor="cover" className="cover">cover</label>
          <input
            id="cover"
            type="file"
            className="file"
            name="file"
            onChange={(e) => {
              setImageCover(URL.createObjectURL(e.target.files[0]));
              setFile(e.target.files[0])
            }}
          />
        </div>
        <button type="submit" className="edit-submit" name="submit">
          OK
        </button>
      </form>
    </div>
  );
}
