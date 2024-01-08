import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useRef } from "react";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const [coins, setCoins] = useState(0);
  const [viewChat, setViewChat] = useState(false);
  const chatSearch = useRef(null);

  function openChats(){
    setViewChat(!viewChat);
    console.log("closeChats");
    // chatSearch.current.display = viewChat ? "block" : "none";
    chatSearch.current.style.display = "none";
  }

  return (
    <div className="navbar" ref={chatSearch} id="navbar">
      <div className="user" style={{display: "flex"}} >
        {/* <img src={currentUser.photoURL} alt="" /> */}
        {/* <span>{currentUser.displayName}</span> */}
        {/* <div> */}
          <span>Coins: {coins}</span>
          <button onClick={() => setCoins(1 + coins)}>+ Get More</button>
          {/* <button onClick={() => setCoins(!viewChat)}> {">>>"} </button> */}
        {/* </div> */}
        {/* <span>Coins: {coins}</span> */}
        <button style={{float: "right", marginLeft: "auto"}} onClick={openChats}> {">>>"} </button>
        {/* <button onClick={()=>signOut(auth)}>logout</button> */}
        
      </div>
    </div>
  );
};

export default Navbar;
