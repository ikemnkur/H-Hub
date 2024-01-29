// import React from "react";
import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, useSearchParams, BrowserRouter } from "react-router-dom"
import axios from "axios";
import { signOut } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import { useNavigate, Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import TopNavBar from "../components/TopNavBar";
import PostModal from "../components/PostModal";
import Post from "../components/Post";

import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { FaComment } from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link, Navigate } from "react-router-dom";
import ImageCanvas from "../components/ImageUploadPreview";


const AccountSettings = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [userStatus, setUserStatus] = useState(false);
  const [modelPosts, setModelPosts] = useState(null)
  const [modelData, setModelData] = useState(null)
  const [activePost, setActivePost] = useState(null)

  const [isOpenPost, setIsOpenPost] = useState(false)

  // const [queryParameters] = useSearchParams()

  const queryParameters = new URLSearchParams(window.location.search)
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  let subscribe = false; let followIndex = 0;
  let following = false;

  const navigate = useNavigate();

  // let post = {
  //   "id": 1,
  //   "postId": "12d3asc32",
  //   "modelName": "Sally",
  //   "modelProfileImg": "https://media.gettyimages.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=gi&k=20&c=tFkDOWmEyqXQmUHNxkuR5TsmRVLi5VZXYm3mVsjee0E=",
  //   "mediaUrl": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Falaskan-malamute--128845239327562501%2F&psig=AOvVaw0U1O6MMZz0EIvkuqeuRcUC&ust=1704783173812000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOCOi7GazYMDFQAAAAAdAAAAABAE",
  //   "caption": "ABC text",
  //   "likes": "Maxwell, T-Rell, Jay, bootybob",
  //   "comments": "Maxwell: Wow that is awesome!, 3; T-rell: Cool my man!, 3; Jay: W post bro!, 3; billybob: , 0; billybob: , 0; billybob: sgsdgsdgsdgfdsg, 0;",
  //   "tips": "Maxwell:8; Logan:3; Micheal:6; Paul:12; Jonas:1; Rick:4;"
  // }

  let modelName = queryParameters.get("model")

  useEffect(() => {
    getModelPost();
    getModelData();
    getCurrentUserData();
    return () => {

    }
  }, [])

  async function getCurrentUserData() {

    const response = await axios.get(`http://localhost:4000/users?id=${currentUser.id}`);
    const data = response.data[0];
    console.log("Current User Data: ", data)
    setCurrentUser(data)
    let strArray = currentUser.following.split(",")
    for (var j=0; j<strArray.length; j++) {
      if (strArray[j].match(modelName)) {
        following = true;
        followIndex = j;
      }  
    }
    try {
      strArray = currentUser.subscribe.split(",")
    } catch (error) {
      strArray = [","];
    }
    
    for (var j=0; j<strArray.length; j++) {
      try {
        if (strArray[j].match(modelName)) {
          following = true;
          followIndex = j;
        }  
      } catch (error) {
        console.log("User not subscribed")
      }
    }
    
  }



  async function getModelPost() {

    const response = await axios.get(`http://localhost:4000/posts?modelName=${modelName}`);
    const posts = response.data;
    console.log("Model Posts: ", posts)
    setModelPosts(posts)

  }

  async function getModelData() {

    const response = await axios.get(`http://localhost:4000/models?name=${modelName}`);
    const data = response.data[0];
    console.log("Model Data: ", data)
    setModelData(data)

  }

  const openPost = function (post) {
    setActivePost(post)
    setIsOpenPost(true)
  }

  return (
    <>
      <TopNavBar />

      <div style={{ padding: 10, backgroundColor: "#a7bcff" }}>
        <div
          style={{
            // height: 150,
            width: "90%",
            margin: "auto",
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#eeeeff",
          }}
        >
          {modelData !== null && 
          <> 
          <div style={{ display: "flex", gap: 10 }}>
            <img style={{width: 120}} src={modelData.modelProfileImg} alt="" />
            <h1 style={{ marginTop: "auto",}}> {modelName}
              <div style={{ display: "flex", gap: 10, paddingTop: 5 }} >
                {/* <b>Coins: </b> <span style={{margin: 5}}> 5 </span> */}
                <button> {following ? 'Unfollow' : 'Follow'}  </button>
                <button onClick={() => { navigate('/chat?model=' + modelName) }}> Chat </button>
                <button> {subscribe ? 'Unsubscribe' : 'Subscribe'} </button>
              </div>
            </h1>
          </div>

          <br />
          <div>

            <div>

              <div style={{ width: "90%", height: 100, margin: "auto", overflowY: "scroll", backgroundColor: "lightgray", borderRadius: 5 }}>
                <b style={{ padding: 0, margin: 5 }}>Bio:</b>
                <p style={{ paddingLeft: 5, marginLeft: 5 }}>{modelData.bio}</p>
              </div>

            </div>
          </div>
          </>
         
          }
        </div>
      </div>

      {isOpenPost && <PostModal setIsOpen={setIsOpenPost} postData={activePost} />}

      <div style={{ padding: 10, backgroundColor: "#a7bcff", height: "100%" }}>
        <div
          style={{
            width: "90%",
            margin: "auto",
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#eeeeff",
          }}
        >
          <div>
            <h1>Posts:</h1>
            <br />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridColumnGap: "0px", gridRowGap: "0px" }}>
              {modelPosts !== null &&
                modelPosts.map((mpost) => {
                  // mpost;
                  return (
                    <div style={{ width: 150, backgroundColor: "white", padding: 5, margin: 5, borderRadius: 5 }} onClick={() => openPost(mpost)}>
                      <img style={{ width: "100%", borderRadius: 10 }} src={mpost.mediaUrl} alt="" />
                      <span style={{ fontSize: 12 }}>{mpost.title}</span>
                      <div style={{ display: "flex", gap: 1 }}>
                        <div>
                          <span>{mpost.likes.split(",").length}</span>
                          <FcLikePlaceholder style={{ margin: "auto", padding: 3 }} />
                        </div>
                        <div>
                          <span  style={{ margin: "auto", padding: 3 }}>{mpost.comments.split(",").length}</span>
                          <FaComment style={{ margin: "auto", padding: 3 }} />
                        </div>
                      </div>
                    </div>
                  )
                })
              }


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;


