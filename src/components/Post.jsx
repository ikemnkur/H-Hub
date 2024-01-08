// import React from "react";
import React, { useContext, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import TopNavBar from "../components/TopNavBar";
import Modal from "../components/Modal";

import { FaCommentsDollar } from "react-icons/fa";
import { FaCommentDollar } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaComment } from "react-icons/fa";
import { IoIosUnlock } from "react-icons/io";
import { GiPayMoney } from "react-icons/gi";

import { AuthContext } from "../context/AuthContext";
import { useState } from "react";

const Post = () => {
  const { currentUser } = useContext(AuthContext);

  let postData;

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
        postData = data;
        console.log(JSON.stringify(data));
      })
      .catch((err) => console.error(err));
  };

  createThread();

  function likeAction() {}

  function commentAction() {}

  function tipAction() {}

  function unlockAction() {}

  function loadImageAction() {
    // imageCanvasRef.current.innerHTML = "";
    const canvas = imageCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    // img.src = postData.mediaUrl;
    img.onload = () => {
        setImage(img);
    };
    img.src = postData.mediaUrl;
    if (image) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, image.width * scale, image.height * scale);
    }
    // // const imageData = ctx.getImageData(dx, dy, image.width, image.height);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // // ctx.putImageData(imageData, 0, 0);
    // ctx.drawImage(image, dx, dy, image.width * scale, image.height * scale);

  }


  const likesRef = useRef(null);
  const commentsRef = useRef(null);
  const captionRef = useRef(null);
  const modelNameRef = useRef(null);
  const profilePicRef = useRef(null);
  const imageCanvasRef = useRef(null);


  const [image, setImage] = useState(null); 
  const [postID, setPostID] = useState(null); 
  const [likes, setLikes] = useState(null);
  const [comments, setComments] = useState(null);
  const [modelName, setModelName] = useState(null); 
  const [modelProfilePic, setModelProfilePic] = useState(null);
  const [caption, setCaption] = useState(null);
  const [scale, setScale] = useState(0.5);


  useEffect(() => {
    setTimeout(() => {
      // setCount((count) => count + 1);
      setPostID(postData.postId);
    //   console.log("post ID: " + postID);
      modelNameRef.current.innerHTML = postData.modelName;
      setModelName(postData.modelName); 
      profilePicRef.current.src = postData.modelProfileImg;
      setModelProfilePic(postData.modelProfileImg);
      commentsRef.current.innerHTML = postData.comments.split(";").length;
      setComments(postData.comments.split(";").length)
      likesRef.current.innerHTML = postData.likes.split(",").length;
      setLikes(postData.likes.split(",").length)
      captionRef.current.innerHTML = postData.caption;
      setCaption(postData.caption)
      // console.log(JSON.stringify(postData));
      // console.log("Hello world");
    }, 1000);
  }, []);

  return (
    <>
      <div
        style={{ padding: 10, backgroundColor: "#a7bcff" }}
        onLoad={createThread}
      >
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
                ref={profilePicRef}
                src=""
                alt=""
                style={{ border: "3px", width: 48, height: 48, margin: 3 }}
              ></img>

              <h5 ref={modelNameRef} style={{ margin: "18px 5px" }}>
                Model
              </h5>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <button style={{ margin: 3 }}>+ Follow</button>
              <button style={{ margin: 3 }}>
                {" "}
                <FaCommentDollar /> Chat
              </button>
              <button style={{ margin: 3 }}> $ Subscribe</button>
              <button style={{ margin: 3, padding: "3px 7px", backgroundColor: "#FF4444", border: "none", borderRadius: 5 }}> X </button>
            </div>
          </div>
          <div style={{ margin: "auto", padding: 3, display: "flex" }}>
            <canvas
              ref={imageCanvasRef}
              style={{
                width: 368,
                height: 386,
                borderRadius: 5,
                background: "lightgrey",
                margin: "auto",
              }}
              onClick={loadImageAction}
            ></canvas>
          </div>
          <div>
            <div style={{ padding: 5 }}>
              <div
                style={{
                  width: "95%",
                  margin: "auto",
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: "#dedeff",
                }}
              >
                Caption:
                <p ref={captionRef} style={{ padding: 3, margin: 3 }}>
                  Whats up here's a nice pic
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div
              style={{ margin: 5, fontSize: 24, display: "flex" }}
              onClick={likeAction}
            >
              <span
                ref={likesRef}
                style={{ margin: "auto", padding: 3, fontSize: 16 }}
              >
                25
              </span>
              <FcLike style={{ margin: "auto", padding: 3 }} />
            </div>

            <div
              style={{ margin: 5, fontSize: 24, display: "flex" }}
              onClick={commentAction}
            >
              <span
                ref={commentsRef}
                style={{ margin: "auto", padding: 3, fontSize: 16 }}
              >
                11
              </span>
              <FaComment style={{ margin: "auto", padding: 3 }} />
            </div>

            <div style={{ margin: 3, display: "flex" }} onClick={tipAction}>
              <span style={{ margin: "auto", padding: 3, fontSize: 16 }}>
                3
              </span>
              <GiPayMoney
                style={{ fontSize: 24, margin: "10px 3px 3px 0px" }}
              />
              <span style={{ margin: "auto" }}>Tip</span>
            </div>

            <div
              style={{
                marginLeft: "auto",
                marginTop: "auto",
                marginBottom: "auto",
                display: "flex",
              }}
              onClick={unlockAction}
            >
              <button style={{ margin: 3 }}>
                <IoIosUnlock /> Unlock{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
