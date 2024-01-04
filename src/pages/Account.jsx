// import React from "react";
import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";

import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <div
        style={{
          alignItems: "center",
          // margin: 5,
          padding: 3,
          height: 48,
          display: "flex",
          background: "#2f2d52",
        }}
      >
        <div>
          <span style={{ fontSize: 24, margin: 5, padding: 3, color: "white" }}>
            H-Hub
          </span>
        </div>

        <div
          id="topNavBar"
          style={{ float: "right", display: "flex", marginLeft: "auto" }}
        >
          <img
            id="topNavBarPic"
            src={currentUser.photoURL}
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
          />
          <span style={{ margin: "auto" }}>{currentUser.displayName}</span>
          <button style={{ margin: 5 }} onClick={() => signOut(auth)}>
            logout
          </button>
        </div>
      </div>

      <div style={{ padding: 10, backgroundColor: "#a7bcff" }}>
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
          <h1>Account</h1>
          <div>
            <label>Change Profile Picture: </label>
            <button>Upload Picture</button>
          </div>
        </div>
      </div>

      <div></div>
      <div className="home">
        <div className="container">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </>
  );
};

export default Home;
