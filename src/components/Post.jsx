// import React from "react";
import React, { useContext, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

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
// import { empty } from "uuidv4";

const Post = ({data, showButtons}) => {

    const navigate = useNavigate();
    // const { currentUser } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
    const [postComments, setPostComments] = useState(null);

    const likesRef = useRef(null);
    //   const unlikedRef = useRef(null);
    //   const likedRef = useRef(null);
    const commentsRef = useRef(null);
    const tipsRef = useRef(null);
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
    const [tips, setTips] = useState(null);
    const [scale, setScale] = useState(0.5);
    const [unlockStatus, setLockedStatus] = useState(false);
    const [following, setFollowing] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [postTips, setPostTips] = useState(false);
    const [numofComments, setnumofComments] = useState(0);

    //used to control the close/open state of the modal
    const [isOpenComment, setIsOpenComment] = useState(false);
    const [isOpenTip, setIsOpenTip] = useState(false);
    const [isOpenSubscribe, setIsOpenSubscribe] = useState(false);
    const [isOpenUnlock, setIsOpenUnlock] = useState(false);

    async function getCurrentUserData() {
        try{
            const response = await axios.get(`http://localhost:4000/users?id=${currentUser.id}`);
            const data = response.data[0];
            console.log("Current User Data: ", data)
            setCurrentUser(data)
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } catch (error){
            navigate("/login")
        }
    }
    // let numofComments = 0;
    let commentsArray;

    async function getComments() {
        try{
            console.log("post id: ", postData.id)
            const response = await axios.get(`http://localhost:4000/comments?postId=${postData.id}`);
            console.log("Post Comments Data: ", response.data);
            const data = response.data
            // console.log("Post Comments Data: ", data)
            setnumofComments(data.length);
            console.log("number of comments: ", numofComments);
            setPostComments(data)
            commentsArray = data;
            // localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } catch (error){
            // navigate("/login")
            console.log("Fetching commments failed: ", error)
            let noPost = {
                "id": 0,
                "username": "Bot",
                "text": "No comments yet, be the first to comment!",
                "postId": 1
            }
            setPostComments(noPost)
            commentsArray = noPost;
        }
    }
    
    async function getTips() {
        try{
        // const response = await axios.get(`http://localhost:4000/comments?postId=${postData.id}`);
        const response = await axios.get(`http://localhost:4000/tips?postId=${postData.id}`);
        const data = response.data;
        console.log("Post Tip Data: ", data)
        setPostTips(data)
        //  setTips(postData.tips.split(";").length);
        // tipsRef.current.innerHTML = postData.tips.split(";").length;
        // setTips(data);
        console.log("tips: ", postTips)
        tipsRef.current.innerHTML = data.length;
        // localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } catch (error){
            // navigate("/login")
            console.log("Fetching commments failed.")
            let noTips = {
                "postId": 0,
                "tipUserId": "null",
                "tipUsername": "Bot",
                "tipAmount": 0
            }
            setPostTips(noTips)
        }
    }
    
    let postData = data;

    const handlePostUpdate = async () => {
        try {
            // console.log("PD: ", postData)
            const response = await axios.put(`http://localhost:4000/posts/${postData.id}`, postData);
            console.log('Item updated:', response.data);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    function subscribeAction() {
        setIsOpenSubscribe(true)
        console.log("Subscribing")

    }

    function likeAction() {

        console.log("Liked: " + !liked)
        //if already liked then reduce the number of likes
        if (liked === true) {
            setLikes(likes - 1)
            postData.likes.replace(`, ${localStorage.getItem("username")}`, "");
            
        } else {
            setLikes(likes + 1)
            postData.likes += ", " + localStorage.getItem("username");
        }
        setLiked(!liked)
        // postData.likes += ", " + localStorage.getItem("username");
        handlePostUpdate();
        
    }

    function commentAction() {
        setIsOpenComment(true)
        console.log("comment")
        getComments()
    }

    function tipAction() {
        setIsOpenTip(true)
        getTips()
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
            sf = (canvas.width / img.naturalWidth) / 2;
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
            let w = 300 * canvas.width / canvas.height;
            ctx.drawImage(image, 0, (300 - h) / 2, 300, h)
            // ctx.drawImage(image, 0, 0, image.width * scale, image.height * scale);
        }
        // // const imageData = ctx.getImageData(dx, dy, image.width, image.height);
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // // ctx.putImageData(imageData, 0, 0);
        // ctx.drawImage(image, dx, dy, image.width * scale, image.height * scale);

    }


    useEffect(() => {
        setTimeout(() => {

            getCurrentUserData();

            console.log("PD: ", postData)
            // setCount((count) => count + 1);
            setPostID(postData.postId);
            //   console.log("post ID: " + postID);
            modelNameRef.current.innerText = postData.modelName;
            setModelName(postData.modelName);
            profilePicRef.current.src = postData.modelProfileImg;
            setModelProfilePic(postData.modelProfileImg);
            // commentsRef.current.innerHTML = postComments.length;
            commentsRef.current.innerHTML = numofComments;

            getComments()
            // setComments(postComments)
            
            likesRef.current.innerHTML = postData.likes.split(",").length;
            setLikes(postData.likes.split(",").length)
           
            setCaption(postData.caption) 
            captionRef.current.innerHTML = postData.caption;

           getTips();
            // console.log(JSON.stringify(postData));
            console.log("PostData ID: ", postData.id);

            if(currentUser.unlockedPosts.includes(postData.id))
                setLockedStatus(true)

            if(postData.likes.includes(localStorage.getItem("username"))){
                setLiked(true);
            }
        }, 500);
    }, [numofComments]);

    return (
        <>
            {isOpenTip && <TipModal setIsOpen={setIsOpenTip} tips={postTips} modelName={postData.modelName} />}

            {isOpenComment && <CommentsModal setIsOpen={setIsOpenComment} postComments={postComments} modelName={postData.modelName} postData={postData}/>}

            {isOpenUnlock && <UnlockModal setIsOpen={setIsOpenUnlock} tips={postData.tips} postData={postData} cost={postData.cost} unlockStatus={unlockStatus}/>}

            {isOpenSubscribe && <SubscribeModal setIsOpen={setIsOpenSubscribe} modelName={postData.modelName} />}

            <div
                style={{ padding: 10, margin: 5, backgroundColor: "rgb(188 204 255)", color: "black", borderRadius: 10}}
            >
                <div
                    style={{
                        width: "90%",
                        margin: "auto",
                        padding: 10,
                        borderRadius: 10,
                        backgroundColor: "#eeeeff", 
                        maxWidth: 512 
                    }}
                >
                    <div style={{ display: "flex" }}>
                        <div style={{ display: "flex", margin: "3px 0px" }}>
                            <img
                                ref={profilePicRef}
                                src=""
                                alt=""
                                style={{ border: "3px", width: 48, height: 48, margin: 3, borderRadius: 4 }}
                                onClick={()=>{navigate('/model?model=' + modelName)}}
                            ></img>

                            <h5 ref={modelNameRef} style={{ margin: "18px 5px" }}>
                                Model
                            </h5>
                        </div>
                        {showButtons && 
                        <div style={{ marginLeft: "auto" }}>

                            <button style={{ margin: 3 }}> {following ? 'Follow' : 'Unfollow'}</button>

                            <button style={{ margin: 3 }} onClick={() => { navigate('/chat?model=' + modelName) }}>
                                {" "}
                                <FaCommentDollar /> Chat
                            </button>
                            {   subscribed && <button style={{ margin: 3 }} onClick={subscribeAction}> $Subscribe</button> }
                            {/* {   !subscribed && <span>Subscribed</span> } */}

                            <button style={{ margin: 3 }} onClick={subscribeAction}> $Subscribe</button>
                            <button style={{ margin: 3, padding: "3px 7px", backgroundColor: "#FF4444", border: "none", borderRadius: 5 }}> X </button>
                        </div>
                        }
                    </div>
                    <div style={{ margin: "auto", padding: 3, display: "flex", hieght:300 }}>
                        <canvas
                            ref={imageCanvasRef}
                            width={300}
                            height="300"
                            style={{
                                // width: "100%",
                                // hieght: "100%",
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
                                <h4>{postData.title}</h4>
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
                            {liked && <FcLike style={{ margin: "auto", padding: 3 }} />}
                            {!liked && <FcLikePlaceholder style={{ margin: "auto", padding: 3 }} />}

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
                            <FaComment style={{ margin: "auto", padding: 3 }} onClick={commentAction} />
                        </div>

                        <div style={{ margin: 3, display: "flex" }} onClick={tipAction}>
                            <span ref={tipsRef} style={{ margin: "auto", padding: 3, fontSize: 16 }}>
                                3
                            </span>
                            <GiPayMoney
                                style={{ fontSize: 24, margin: "10px 3px 3px 0px" }}
                            />
                            {/* <span style={{ margin: "auto" }}>Tip</span> */}
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
                        {   !unlockStatus &&
                            <button style={{ margin: 3 }}>
                                <IoIosUnlock /> Unlock{" "}
                            </button>
                        }
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;
