// import React from "react";
import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

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

import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  const createThread = (threadTitle) => {
		fetch("http://localhost:3000/posts/1", {
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
        console.log("Data: " + JSON.stringify(data))
			})
			.catch((err) => console.error(err));
	};

  function likeAction() {

  }

  function commentAction() {

  }

  function tipAction() {

  }

  function unlockAction() {

  }

  return (
    <>
      <TopNavBar />
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
          Ad
        </div>
      </div>

          {/* <Modal/> */}

      <Post/>

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
