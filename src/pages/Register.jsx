import React, { useState, useRef } from "react";
import AddPic from "../img/addAvatar.png";
import axios from "axios";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import ImageCanvas from "../components/ImageUploadPreview";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [ppImage, setPPImage] = useState(null);

  const [password, setPassword] = useState(null);
  const [cpassword, setcPassword] = useState(null);

  // const PPImg = useRef(null)
  const passwordField =  useRef(null);
  const cpasswordField =  useRef(null);
  const showButton =  useRef(null);
  const cshowButton =  useRef(null);



  const { v4 : uuid } = require("uuid");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  function showPassword(e) {
    e.preventDefault();
    if (passwordField.current.type !== "text"){
      passwordField.current.type = "text";
      showButton.current.innerHTML = "Hide";
    } else {
      passwordField.current.type = "password";
      showButton.current.innerHTML = "Show";
    }
  } 

  function cshowPassword(e) {
    e.preventDefault();
    if (cpasswordField.current.type !== "text"){
      cpasswordField.current.type = "text";
      cshowButton.current.innerHTML = "Hide";
    } else {
      cpasswordField.current.type = "password";
      cshowButton.current.innerHTML = "Show";
    }
  } 

  const handleSubmit2 = async (e) => {
    setLoading(true);
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    // const password = e.target[2].value;
    const newPassword = password;
    // const file = e.target[3].files[0];

    try {
      //Create user

      let newUser = {
        id: 1,
        username: "billy",
        password: "Password",
        email: "billy@gmail.com",
        date: "",
        joinDate: "",
        profileUrl: "http://",
        coins: 10,
        unlockedPost: "",
        following: "",
        subscriptions: ""
      }

      newUser.id = uuid();
      console.log("New User ID: "+ newUser.id)
      newUser.email = email;
      newUser.password = password;
      newUser.username = username;

      // const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      newUser.joinDate = date;

      let imageData = ppImage;
      let imgUploadResponse; 
      let ppImgLink = "";

      let imageUpload = await axios.post('http://localhost:5000/upload', { image: imageData, username: username, date: date })
            .then(response => {console.log(response.data); imgUploadResponse = response; ppImgLink = response.data.link})
            .catch(error => console.error('Error uploading the image:', error));
 
      newUser.profileUrl = ppImgLink;

      const response = await axios.post(`http://localhost:4000/users`, newUser);

      navigate("/login");

    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">H-Hub</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit2}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <div style={{display:"flex"}}>
            <input ref={passwordField} type="password" placeholder="password" value={password}
            onChange={e => setPassword(e.target.value)} />
            <button onClick={showPassword} ref={showButton} style={{}}>Show</button> 
          </div>
          <div style={{display:"flex"}}>
            <input ref={cpasswordField} type="password" placeholder="confirm password" value={cpassword}
            onChange={e => setcPassword(e.target.value)} />
            <button onClick={cshowPassword} ref={cshowButton} style={{}}>Show</button> 
          </div>
          {/* <input required type="password" placeholder="password" /> 
          <input required type="password" placeholder="confirm password" /> */}
          {/* <input style={{ display: "none" }} type="file" id="file" /> */}
          <label htmlFor="file">
            <img src={AddPic} alt="" />
            <span>Add an avatar / Profile Picture</span>
          </label>
          <ImageCanvas setPPImage={setPPImage}/>
          <button type="submit">Sign up</button>
          {/* <button disabled={loading}>Sign up</button> */}
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
        {/* <img ref={PPImg} src="" alt="ref" />
        <img  src={ppImage} alt="" /> */}
      </div>
    </div>
  );
};

export default Register;
