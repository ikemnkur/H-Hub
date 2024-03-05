import React, { useContext, useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
// import HomeIcon from '@mui/icons-material/Home';
// import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, Link, Navigate } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";

import { AuthContext } from "../context/AuthContext";


const TopNavBar = () => {

  const navigate = useNavigate();
  // const { currentUser } = useContext(AuthContext);
  
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  // const [currentUser, setCurrentUser] = useState(null);

  const goToProfile = () => {
      navigate("/profile");
      console.log("clicked")
  }

  function logoutUser() {
    // localStorage.setItem("currentUser", {logged:"out"})
    localStorage.setItem("currentUser", `{"logged":"out"}`);
    navigate("/login");
    console.log("hit")
  }

  useEffect(() => {
    const temp = localStorage.getItem("currentUser")
    if(temp === null || temp === "[object Object]")
    navigate("/login")
    // getAllPosts();
  }, [])
  

  return (
  <div defer
    style={{
      alignItems: "center",
      // margin: 5,
      padding: 3,
      height: 48,
      display: "flex",
      background: "#2f2d52",
    }}
  >
    <div style={{display: "flex"}}>
      <FaHome onClick={() => {navigate("/")}} style={{fontSize: 24, margin: "auto", color: "white"}}/>
      <span onClick={() => {navigate("/")}}
        style={{ fontSize: 24, margin: 5, padding: 3, color: "white" }}>
        H-Hub
      </span>
    </div>

    
    <div
      id="topNavBar"
      style={{ float: "right", display: "flex", marginLeft: "auto" }}
    >
      <div onClick = {goToProfile}> 
        <img
          id="topNavBarPic"
          src={currentUser.profileUrl}
          alt=""
          style={{
            backgroundColor: "#ddddf7",
            height: 40,
            width: 40,
            borderRadius: 50,
            borderColor: "gray",
            border: "3px solid gray",
            objectFit: "cover",
            marginRight: "5px",
          }}
          onClick = {goToProfile}
          // onClick={()=>{navigate("/profile"); console.log("click")}}
        />
      </div>
      
      <span style={{ margin: "auto", color: "white" }}>
        {currentUser.username}
      </span>
      <button style={{ margin: 5, display: "flex" }} onClick={() => logoutUser()}>
        <span style={{margin: "auto"}}>Logout</span>
        {/* <HiOutlineLogout style={{ fontSize: 24, margin: "auto" }}/> */}
      </button>
    </div>
    {/* </div> */}
    {/* <Navbar /> */}
    {/* </div> */}
  </div>
  )
  
};

export default TopNavBar;
