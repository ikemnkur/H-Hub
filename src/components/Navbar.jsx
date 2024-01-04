import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const [coins, setCoins] = useState(0);
  const [viewChat, setViewChat] = useState(false);

  return (
    <div className="navbar">
      <div className="user">
        {/* <img src={currentUser.photoURL} alt="" /> */}
        {/* <span>{currentUser.displayName}</span> */}
        {/* <div> */}
          <span>Coins: {coins}</span>
          <button onClick={() => setCoins(1 + coins)}>+ Get More</button>
          {/* <button onClick={() => setCoins(!viewChat)}> {">>>"} </button> */}
        {/* </div> */}
        {/* <span>Coins: {coins}</span> */}
        <button style={{float: "right"}} onClick={() => setViewChat(!viewChat)}> {">>>"} </button>
        {/* <button onClick={()=>signOut(auth)}>logout</button> */}
        
      </div>
    </div>
  );
};

export default Navbar;
