// import React from "react";
import React, { useContext, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import TopNavBar from "../components/TopNavBar";

import Modal from "../components/Modal";
import AddCommentModal from "./AddCommentModal";
import CommentsModal from "./CommentsModal";
import TipModal from "./TipModal";
import UnlockModal from "./UnlockModal";
import SubscribeModal from "./SubscribeModal";

import { FaCommentsDollar } from "react-icons/fa";
import { FaCommentDollar } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { FaComment } from "react-icons/fa";
import { IoIosUnlock } from "react-icons/io";
import { GiPayMoney } from "react-icons/gi";

import { AuthContext } from "../context/AuthContext";
import { useState } from "react";

const Post = () => {

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
    
  const likesRef = useRef(null);
//   const unlikedRef = useRef(null);
//   const likedRef = useRef(null);
  const commentsRef = useRef(null);
  const captionRef = useRef(null);
  const modelNameRef = useRef(null);
  const profilePicRef = useRef(null);
  const imageCanvasRef = useRef(null);
  const commentsModalRef = useRef(null);


  const [image, setImage] = useState(null); 
  const [postID, setPostID] = useState(null); 
  const [likes, setLikes] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(null);
  const [modelName, setModelName] = useState(null); 
  const [modelProfilePic, setModelProfilePic] = useState(null);
  const [caption, setCaption] = useState(null);
  const [scale, setScale] = useState(0.5);

  //used to control the close/open state of the modal
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [isOpenTip, setIsOpenTip] = useState(false); 
  const [isOpenSubscribe, setIsOpenSubscribe] = useState(false);
  const [isOpenUnlock, setIsOpenUnlock] = useState(false);


  let postData = {"id":1,"postId":"12d3asc32","modelName":"pamm","modelProfileImg":"http://","mediaUrl":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Falaskan-malamute--128845239327562501%2F&psig=AOvVaw0U1O6MMZz0EIvkuqeuRcUC&ust=1704783173812000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOCOi7GazYMDFQAAAAAdAAAAABAE","caption":"ABC text","likes":"Maxwell, T-Rell, Jay","comments":"Maxwell: Wow that is awesome!, 3; T-rell: Cool my man!, 3; Jay: W post bro!, 3;","tips":"Maxwell:2;"};

  const getPostData = (threadTitle) => {
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

  // Run the get fetch request for all the posts data once
  useEffect(() => {
    getPostData();
  }, []);
  

  function subscribeAction() {
    setIsOpenSubscribe(true)
    console.log("Subscribing")
   
  }
  
  function likeAction() {
    
    console.log("Liked: " + !liked)
    //if already liked then reduce the number of likes
    if (liked === true){
        setLikes(likes - 1)
    } else {
        setLikes(likes + 1)
    } 
    setLiked(!liked) 
  }

  function commentAction() {
    setIsOpenComment(true)
    console.log("comment")
  }

  function tipAction() {
    setIsOpenTip(true)
    console.log("tip")
  
  }

  function unlockAction() {
    setIsOpenUnlock(true)
    console.log("unlock")
    loadImageAction()
  }

  function loadImageAction() {
    // imageCanvasRef.current.innerHTML = "";
    const canvas = imageCanvasRef.current;
    canvas.hieght = 300;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    let sf = 1;
    img.src = postData.mediaUrl;
    img.onload = () => {
        setImage(img);
        // localStorage.setItem("Img", img);
        console.log("Img Hieght: " + img.naturalHeight);
        // console.log("imageHieght: " + img.style.hieght);
        canvas.hieght = 250//(img.naturalHeight/img.naturalWidth)  * canvas.width;
        sf = (canvas.width/img.naturalWidth)/2;
        console.log("sf: ", sf)
    };
    img.src = postData.mediaUrl;
    
    if (image) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.drawImage(image, 0, 0, img.naturalWidth*sf, img.naturalHeight*sf);
        console.log(300 * parseFloat(img.naturalHeight) / parseFloat(img.naturalWidth));
        let h = 300 * parseFloat(img.naturalHeight) / parseFloat(img.naturalWidth);
        // let w = 300 * img.naturalWidth / img.naturalHeight;
        // let h = 300 *canvas.height / canvas.width;
        let w = 300 *canvas.width / canvas.height;
        ctx.drawImage(image, 0, (300-h)/2, 300, h)
        // ctx.drawImage(image, 0, 0, image.width * scale, image.height * scale);
    }
    // // const imageData = ctx.getImageData(dx, dy, image.width, image.height);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // // ctx.putImageData(imageData, 0, 0);
    // ctx.drawImage(image, dx, dy, image.width * scale, image.height * scale);

  }


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
        {isOpenTip && <TipModal setIsOpen={setIsOpenTip} tips={postData.tips} modelName={postData.modelName}/>}
       
        {isOpenComment && <CommentsModal setIsOpen={setIsOpenComment} data={postData.comments} />}
        
        {isOpenUnlock && <UnlockModal setIsOpen={setIsOpenUnlock} tips={postData.tips} modelName={postData.modelName}/>}
       
        {isOpenSubscribe && <SubscribeModal setIsOpen={setIsOpenSubscribe} modelName={postData.modelName} />}
        
        <div
            style={{ padding: 10, backgroundColor: "#a7bcff" }}
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
              <button style={{ margin: 3 }} onClick={()=>{navigate('/chat/'+modelName)}}>
                {" "}
                <FaCommentDollar /> Chat
              </button>
              <button style={{ margin: 3 }} onClick={subscribeAction}> $ubscribe</button>
              <button style={{ margin: 3, padding: "3px 7px", backgroundColor: "#FF4444", border: "none", borderRadius: 5 }}> X </button>
            </div>
          </div>
          <div style={{ margin: "auto", padding: 3, display: "flex" }}>
            <canvas
              ref={imageCanvasRef}
            //   width={150}
              hieght= {600}
              style={{
                width: "300px",
                hieght: "300px",
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
                //   width: "100%",
                  margin: -1,
                  padding: 5,
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
              <span ref={likesRef} style={{ margin: "auto", padding: 3, fontSize: 16 }}>
                {likes}
              </span>
              {/* {isOpenTip && <TipModal setIsOpen={setIsOpenTip} tips={postData.tips} modelName={postData.modelName}/>} */}
              {liked && <FcLike  style={{ margin: "auto", padding: 3}} />}
              {!liked && <FcLikePlaceholder style={{ margin: "auto", padding: 3}} />}

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
              <FaComment style={{ margin: "auto", padding: 3 }} onClick={commentAction}/>
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
            //   onClick={loadImageAction}
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
