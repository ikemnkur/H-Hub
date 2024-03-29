// import React from "react";
import React, { useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import TopNavBar from "../components/TopNavBar";
import Modal from "../components/Modal";
import Post from "../components/Post";

import { FaCommentsDollar } from "react-icons/fa";
import { FaCommentDollar } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaComment } from "react-icons/fa";
import { IoIosUnlock } from "react-icons/io";
import { GiPayMoney } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  // const { currentUser } = useContext(AuthContext);

  // localStorage.setItem("username", currentUser.displayName)

  // const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [allPosts, setAllPosts] = useState(null);
  const [searchForMode, setSearchForMode] = useState("posts")
  const searchFor = useRef(null)
  const searchInputRef = useRef(null)
  let sf = "posts";
  const [searchedPosts, setSearchedPosts] = useState(null)
  const [searchedModels, setSearchedModels] = useState(null)
  const [searchedFollowings, setSearchedFollowings] = useState(null)
  const [searchedSubscriptions, setSearchedSubscriptions] = useState(null)

  const [noResults, setNoResults] = useState(false)
  // let noResults = false;

  const getAllPosts = async (threadTitle) => {
    fetch("http://localhost:4000/posts", {
      method: "GET",
      // body: JSON.stringify({
      // 	thread,
      // 	user_id: localStorage.getItem("_id"),
      // 	title: threadTitle,
      // 	media_link: ""
      // }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // alert(data.message);
        // const newThread = data.data;
        // setThreadList((prev) => ([newThread, ...prev]));
        setAllPosts(data);
        // console.log("AllPosts: ", JSON.stringify(data));
      })
      .catch((err) => console.error(err));
  };

  async function handleSearch4Models (){
    const input = searchInputRef.current.value;
    console.log("Search For: ", input)
    let response = await axios.get(`http://localhost:4000/models`);
    let models = response.data;
    let searchResults = [];
    let response2 = await axios.get(`http://localhost:4000/posts`);
    let posts = response2.data;

    // if(searchForMode === "models"){
    //   for (let index = 0; index < models.length; index++) {
    //     const element = models[index];
    //     if (element.name.includes(input) === true){
    //       searchResults[searchResults.length] = element
    //     }
    //   }
    // }

    console.log("SRL: ", searchResults.length)

    if(searchForMode === "posts") {
      for (let index = 0; index < posts.length; index++) {
        const element = posts[index];
        console.log("MN: ", element.modelName.toLowerCase())
        if (element.modelName.toLowerCase().includes(input.toLowerCase()) || element.caption.toLowerCase().includes(input.toLowerCase()) || element.title.toLowerCase().includes(input.toLowerCase())){
          searchResults[searchResults.length] = element
        }
      }
    }
    
    console.log("List of Models: ", models)
    setSearchedModels(models) 

    console.log("List of Matching Posts: ", searchResults)
    if (searchResults.length !== 0){
      setSearchedPosts(searchResults)
      setNoResults(false);
    }
    else{
      setSearchedPosts(null)
      setNoResults(true);
    }
      

  }

  useEffect(() => {
    const temp = localStorage.getItem("currentUser")
    if(temp === null || temp === "[object Object]")
    navigate("/login")
    getAllPosts();
  }, [])
  

  function setTheSearchMode(){
    let sf = searchFor.current.value
    console.log("Search Mode:", sf)
    setSearchForMode(sf)
  }

  async function followModel(modelName){
    let newCurrentUser = currentUser
    newCurrentUser.following += ","+ modelName;
    try {
      const response = await axios.put(`http://localhost:4000/users/${currentUser.id}`, newCurrentUser);
      console.log('Item updated:', response.data);
      setCurrentUser(newCurrentUser)
      localStorage.setItem("currentUser", JSON.stringify(newCurrentUser))
    } catch (error) {
      console.error('Error updating item:', error);
    }
    
  }

  async function getCurrentUserData() {
    try {
      const response = await axios.get(`http://localhost:4000/users?id=${currentUser.id}`);
      const data = response.data[0];
      console.log("Current User Data: ", data)
      setCurrentUser(data)
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } catch (error) {
      navigate("/login")
    }
  }

  async function getModelsData(){
    let response = await axios.get(`http://localhost:4000/models`);
    let models = response.data;
    console.log("List of Models: ", models)
    // setSearchedModels(models)
    localStorage.setItem("Models", JSON.stringify(models))

    let i = 0;
    let subscriptions = []
    models.map((model) => {
      if(currentUser.subscriptions.includes(model.name)){
        subscriptions[i] = model;
        i++
      } 
    }) 

    i = 0;
    let following = []
    models.map((model) => {
      if(currentUser.following.includes(model.name)){
        following[i] = model;
        i++
      } 
    })

    localStorage.setItem("Subscriptions", JSON.stringify(subscriptions))
    setSearchedSubscriptions(JSON.parse(localStorage.getItem("Subscriptions")))
    localStorage.setItem("Following", JSON.stringify(following))
    setSearchedFollowings(JSON.parse(localStorage.getItem("Following")))
  }

  useEffect(() => {
    getCurrentUserData();
    getModelsData();
  }, [])
  

  return (
    <>
      <TopNavBar />
      <div style={{ padding: 5, backgroundColor: "#a7bcff" }}>
        <div
          style={{
            height: 150,
            width: "90%",
            margin: "auto",
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#eeeeff",
          }}
        >
          Ad
        </div>
      </div>

      <div style={{padding: "5px 15px", backgroundColor: "#a7bcff" }}>
        
        <div style={{display:"flex", gap: 5, padding: 10, margin: "2% 5%", backgroundColor: "#a7ccff", borderRadius: 10, border: "3px solid black" }}>
          <FaSearch style={{fontSize: 32, marginRight: 5}}/>
          
          <input ref={searchInputRef} type="text" onKeyDown={(e) => { if (e.key === "Enter") handleSearch4Models(); }} onKeyUp={()=>{console.log("keyUP")}} style={{ width: "70%", height: 32, marginRight: 10}}/>
          <span for="cars" style={{width:"10%", margin: "auto"}}>Look for:</span>
          <select id="searchFor" name="cars" style={{width:"15%"}} ref={searchFor} onClick={()=>setTheSearchMode()}>
            <option value="posts">Posts</option>
            <option value="models">Models</option>
            <option value="followings">Followings</option>
            <option value="subcriptions">Subcriptions</option>
          </select>
        </div>

        {searchForMode === "posts" &&
          <div style={{ overflowY: "scroll", scrollbarWidth: "none", height: 600 }}>
            {
              console.log("No Results: ", noResults)
            }

            {!(allPosts === null) && (noResults === false) &&(searchedPosts === null)  && allPosts.map((post) => {
              // console.log("Search Result: ", searchedPosts)
              
              return (
                <Post data={post} showButtons={true} />
              )

            })}
            
            {!(searchedPosts === null) && searchedPosts.map((post) => {

              return (
                <Post data={post} showButtons={true} />
              )

            })}

            {(noResults === true) && 

              <div style={{width: "90%", margin: "auto", padding: 20, backgroundColor: "#8F64F3"}}>
                <div>
                  <h1> Nothing Matching Your Search</h1>
                  <p> Please try searching for something else.</p>
                  Type 3 letters to start a search
                </div>
                
              </div>
            }

          </div>
        }

        {searchForMode === "followings" &&
          <div style={{ overflowY: "scroll", scrollbarWidth: "none", height: 600 }}>
           
            {!(allPosts === null) && allPosts.map((post) => {
              let str = currentUser.following.toLowerCase()
              if(str.includes(post.modelName.toLowerCase())){
                let input = searchInputRef.current.value;
                if(post.modelName.includes(searchInputRef.current.value)){
                  console.log("returned: ", post)
                  // setNoResults(true)
                  return (
                    <Post data={post} showButtons={true} />
                  )
                }
                let modelname = post.modelName.toLowerCase()
                if(modelname.includes(input.toLowerCase())){
                  console.log("returned: ", post)
                  // setNoResults(true)
                  return (
                    <Post data={post} showButtons={true} />
                  )
                }
              }
            })}
            
          </div>
        }

        {searchForMode === "models" &&
          <div style={{ overflowY: "scroll", scrollbarWidth: "none", margin: "auto", height: 600, backgroundColor: "rgb(167, 188, 220)" }}>
            {/* <div style={{ height: 50, width: "90%", margin: "auto", padding: 20 }}>
              Type 3 letters to start a search
            </div> */}
            {/* {console.log("hello: " + JSON.stringify(allPosts))} */}
            {!(searchedModels === null) && searchedModels.map((model) => {
              const input = searchInputRef.current.value;
              if(model.name.toLowerCase().includes(input.toLowerCase())){
                return (
                <div>
                  <div style={{ display: "flex", flexDirection: "row", gap: 10, margin: "auto", borderRadius: 10 }}>
                    <div style={{ padding: 10, margin: 10, display: "flex", flexDirection: "column", gap: 10, backgroundColor: "#eeeeff", borderRadius: 10 }}>
                      <img src={model.modelProfileImg} alt="" style={{ width: 160 }} />
                      <b style={{ margin: "auto" }}>{model.name}</b>
                      <div style={{ margin: "auto", gap: 5 }}>
                        <button onClick={() => { followModel(model.name) }}>Follow</button>
                        <button onClick={() => { navigate("/model?model=" + model.name) }}>Profile</button>
                        <button onClick={() => { navigate("/chat?model=" + model.name) }}>Chat</button>
                      </div>
                    </div>
                  </div>
                </div>
                )
              }

            })}
          </div>
        }

      </div>

      

      


      {/* <div style={{ padding: 10, backgroundColor: "#a7bcff" }}>
        <div
          style={{
            width: "90%",
            margin: "auto",
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#eeeeff",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", margin: "3px 0px" }}>
              <img
                src=""
                alt=""
                style={{ border: "3px", width: 48, height: 48, margin: 3 }}
              ></img>

              <h5 style={{ margin: "18px 5px" }}>Model</h5>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <button style={{ margin: 3 }}>+ Follow</button>
              <button style={{ margin: 3 }}>
                {" "}
                <FaCommentDollar /> Chat
              </button>
              <button style={{ margin: 3 }}> $ Subscribe</button>
              <button style={{ margin: 3 }}> X Hide</button>
            </div>
          </div>
          <div style={{ margin: "auto", padding: 3, display: "flex" }}>
            <canvas
              style={{
                width: 368,
                height: 386,
                borderRadius: 5,
                background: "lightgrey",
                margin: "auto",
              }}
              onClick={createThread}
            ></canvas>
          </div>
          <div>
            <div style={{ padding: 5}}>
              <div style={{width: "95%", margin: "auto", padding: 10, borderRadius: 10, backgroundColor: "#dedeff"}}>
                Caption:
                <p style={{ padding: 3, margin: 3 }}>
                  Whats up here's a nice pic
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ margin: 5, fontSize: 24, display: "flex" }} onClick={likeAction}>
              <span style={{ margin: "auto", padding: 3, fontSize: 16 }}>
                25
              </span>
              <FcLike style={{ margin: "auto", padding: 3 }} />
            </div>

            <div style={{ margin: 5, fontSize: 24, display: "flex" }} onClick={commentAction}>
              <span style={{ margin: "auto", padding: 3, fontSize: 16 }}>
                11
              </span>
              <FaComment style={{ margin: "auto", padding: 3 }} />
            </div>

            <div style={{margin: 3, display: "flex"}} onClick={tipAction}>
              <span style={{ margin: "auto", padding: 3, fontSize: 16 }}>
                3
              </span>
              <GiPayMoney style={{fontSize: 24, margin: "10px 3px 3px 0px"}} /> 
              <span style={{margin:"auto"}}>Tip</span>
            </div>

            <div style={{marginLeft: "auto", marginTop: "auto", marginBottom:"auto", display: "flex"}} onClick={unlockAction}>
              <button style={{margin: 3}}>
                <IoIosUnlock /> Unlock{" "}
              </button>
            </div>  
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Home;
