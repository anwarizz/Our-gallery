import React, { useEffect, useState } from "react";
import Section from "../components/layouts/section";
import "../styles/albums.css";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";

export async function action({ request }) {
  return 1;
}

function getDate() {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Oct",
    "Sep",
    "Nov",
    "Dec",
  ];
  const today = new Date();
  const monthIndex = today.getMonth();
  const date = ("0" + `${today.getDate()}`).slice(-2);
  return `${date} ${month[monthIndex]}`;
}

function Pop({ onClick, prnActive, post }) {
  const [header, setHeader] = useState("New Album");
  const [active, setActive] = useState(true);

  const [image] = useState("");
  const [create_at] = useState(getDate());

  function addAlbum(e) {
    e.preventDefault();
    try {
      axios.post("http://localhost:3000/albums", { image, header, create_at });
      post(false);
      prnActive(false);
      setActive(!active);
    } catch (error) {
      console.log(error);
    }
  }

  return active ? (
    <>
      <div className="pop-card">
        <div className="pop-image">New Album</div>
        <div className="pop-body">
          <form onSubmit={addAlbum} className="pop-input" method="Post">
            <input
              type="text"
              defaultValue={"New Album "}
              autoFocus
              name="header"
              onChange={(e) => setHeader(e.target.value)}
            />
            <button type="button" className="cancel" onClick={onClick}>
              <svg
                width="11"
                viewBox="0 0 22 22"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="ui-gambling-website-lined-icnos-casinoshunter"
                    transform="translate(-869.000000, -159.000000)"
                    fill="#252528"
                    fillRule="nonzero"
                  >
                    <g
                      id="square-filled"
                      transform="translate(50.000000, 120.000000)"
                    >
                      <path
                        d="M820.716328,39.2890737 L830,48.573 L839.283672,39.2890737 C839.644156,38.9285898 840.211387,38.9008602 840.603678,39.2058851 L840.710926,39.3021143 C841.101451,39.6926386 841.101451,40.3258036 840.710926,40.7163279 L831.427,50 L840.710926,59.2836721 C841.07141,59.6441561 841.09914,60.2113872 840.794115,60.6036784 L840.697886,60.7109263 C840.307361,61.1014506 839.674196,61.1014506 839.283672,60.7109263 L830,51.427 L820.716328,60.7109263 C820.355844,61.0714102 819.788613,61.0991398 819.396322,60.7941149 L819.289074,60.6978857 C818.898549,60.3073614 818.898549,59.6741964 819.289074,59.2836721 L828.573,50 L819.289074,40.7163279 C818.92859,40.3558439 818.90086,39.7886128 819.205885,39.3963216 L819.302114,39.2890737 C819.692639,38.8985494 820.325804,38.8985494 820.716328,39.2890737 Z M819.996181,40.0092211 L829.987233,50 L819.996181,59.9907789 L820.009221,60.0038195 L830,50.0127671 L839.990779,60.0038195 L840.003819,59.9907789 L830.012767,50 L840.003819,40.0092211 L839.990779,39.9961805 L830,49.9872329 L820.009221,39.9961805 L819.996181,40.0092211 Z"
                        id="cancel"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
            <button type="submit" className="submit">
              <svg
                width="15"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12L9 18L21 6"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default function Albums() {
  const navigate = useNavigate();
  const [isActive, setActive] = useState(false);
  const [albums, setAlbums] = useState([]);

  function updateOnClick(id) {
    setPost(false);
    navigate(`/albums/${id}/edit`);
  }

  function addPopup() {
    setActive(!isActive);
  }

  const [post, setPost] = useState([]);

  async function getAlbums() {
    try {
      const response = await axios.get("http://localhost:3000/albums");
      setAlbums(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getAlbums();
    setPost(true);
    console.log(`nilai add:: ${post}`);
  }, [post]);

  const [prompt, setPrompt] = useState(false);

  function deleteAlbum() {
    axios.delete(`http://localhost:3000/albums/${prompt.id}/delete`);
    setPrompt(false);
    setPost(false);
  }

  function DeletePrompt({ header }) {
    return (
      <div className="del-prompt-container">
        <div className="del-prompt">
          <div className="body">
            <h2>You want to delete this album?</h2>
            <p>{header}</p>
          </div>
          <div className="del-btns">
            <button className="cancel" onClick={() => setPrompt(false)}>
              Cancel
            </button>
            <button className="delete" onClick={() => deleteAlbum()}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  function preview(id) {
    navigate(`/albums/${id}`);
  }

  // function UpdatePrompt() {
  //   return (
  //     .updt-prompt
  //   )
  // }

  const [query, setQuery] = useState();

  function handhleSearch(e) {
    e.preventDefault();
    axios
      .get(`http://localhost:3000/albums-query?header=${query}`)
      .then((response) => {
        setAlbums(response.data.data);
      });
  }

  const [actionActive, setActionActive] = useState({});

  return (
    <Section>
      {prompt ? <DeletePrompt header={prompt.header} /> : ""}
      <form className="album-search" method="get" onSubmit={handhleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Browse album"
          onChange={(e) => {
            setQuery(e.target.value);
            handhleSearch(e);
          }}
        />
      </form>
      <div className="album-container">
        {albums.map((album) => (
          <div
            className="album-card"
            key={album._id}
            onMouseOver={() => setActionActive({ [album._id]: true })}
            onMouseOut={() => setActionActive({ [album._id]: false })}
            onClick={() => preview(album._id)}
          >
            {actionActive[album._id] ? (
              <div className="album-actions">
                <button
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrompt({ id: album._id, header: album.header });
                  }}
                >
                  <svg
                    // width="15"
                    viewBox="-3 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                      sketchtype="MSPage"
                    >
                      <g
                        id="Icon-Set-Filled"
                        sketchtype="MSLayerGroup"
                        transform="translate(-261.000000, -205.000000)"
                        fill="#ffffffdf"
                      >
                        <path
                          d="M268,220 C268,219.448 268.448,219 269,219 C269.552,219 270,219.448 270,220 L270,232 C270,232.553 269.552,233 269,233 C268.448,233 268,232.553 268,232 L268,220 L268,220 Z M273,220 C273,219.448 273.448,219 274,219 C274.552,219 275,219.448 275,220 L275,232 C275,232.553 274.552,233 274,233 C273.448,233 273,232.553 273,232 L273,220 L273,220 Z M278,220 C278,219.448 278.448,219 279,219 C279.552,219 280,219.448 280,220 L280,232 C280,232.553 279.552,233 279,233 C278.448,233 278,232.553 278,232 L278,220 L278,220 Z M263,233 C263,235.209 264.791,237 267,237 L281,237 C283.209,237 285,235.209 285,233 L285,217 L263,217 L263,233 L263,233 Z M277,209 L271,209 L271,208 C271,207.447 271.448,207 272,207 L276,207 C276.552,207 277,207.447 277,208 L277,209 L277,209 Z M285,209 L279,209 L279,207 C279,205.896 278.104,205 277,205 L271,205 C269.896,205 269,205.896 269,207 L269,209 L263,209 C261.896,209 261,209.896 261,211 L261,213 C261,214.104 261.895,214.999 262.999,215 L285.002,215 C286.105,214.999 287,214.104 287,213 L287,211 C287,209.896 286.104,209 285,209 L285,209 Z"
                          id="trash"
                          sketchtype="MSShapeGroup"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </button>
                <button
                  className="update"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateOnClick(album._id);
                  }}
                >
                  <svg
                    fill="#ffffffdf"
                    // width="15"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21.707,4.475,19.525,2.293a1,1,0,0,0-1.414,0L9.384,11.021a.977.977,0,0,0-.241.39L8.052,14.684A1,1,0,0,0,9,16a.987.987,0,0,0,.316-.052l3.273-1.091a.977.977,0,0,0,.39-.241l8.728-8.727A1,1,0,0,0,21.707,4.475Zm-9.975,8.56-1.151.384.384-1.151,7.853-7.854.768.768ZM2,6A1,1,0,0,1,3,5h8a1,1,0,0,1,0,2H4V20H17V13a1,1,0,0,1,2,0v8a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1Z" />
                  </svg>
                </button>
              </div>
            ) : (
              ""
            )}
            <div className="album-image">
              {album.image ? (
                <img
                  src={`http://localhost:3000/uploads/${album.image}`}
                  alt=""
                />
              ) : (
                "New Album"
              )}
            </div>
            <div className="album-body">
              <span>{album.create_at}</span>
              {album.header}
            </div>
          </div>
        ))}

        {isActive ? (
          <Pop onClick={addPopup} prnActive={setActive} post={setPost} />
        ) : (
          ""
        )}
        <div className="album-card" onClick={addPopup}>
          <div className="album-image">
            <svg
              fill="#ffffff"
              width="100"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9,17h6v6a1,1,0,0,0,2,0V17h6a1,1,0,0,0,0-2H17V9a1,1,0,0,0-2,0v6H9a1,1,0,0,0,0,2Z" />
            </svg>
          </div>
        </div>
      </div>
    </Section>
  );
}
