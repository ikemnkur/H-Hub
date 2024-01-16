// import React from "react";
import React, { useContext, useState, useEffect} from "react";
import axios from "axios";
import { signOut } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc, setDoc} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import { useNavigate, Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import TopNavBar from "../components/TopNavBar";

import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link, Navigate } from "react-router-dom";
import ImageCanvas from "../components/ImageUploadPreview";


const AccountSettings = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [userStatus, setUserStatus] = useState(false);
  const [ppImage, setPPImage] = useState(null);
  const { v4 : uuid } = require("uuid");

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

  const handleEmailChange = (e) => {
      setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
      setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
      setPassword(e.target.value);
  };

  const handleProfilePicChange = (e) => {
      setProfilePic(e.target.files[0]);
      console.log(e.target.files[0]);
  };

  // function handleUpdateAccount(e) {

  // }

  useEffect(() => {

    const handleLogin = async () => {
      try {
          const response = await axios.get(`http://localhost:3000/users`);
          const users = response.data;

          const user = users.find(u => u.email === email && u.password === password);

          if (user) {
              setUserStatus('User Data Retrival successful!');
              // Perform further actions here like redirecting to another page or storing user details in context/state
          } else {
              setUserStatus('Invalid User Credentials');
          }
      } catch (error) {
          console.error('Error fetching users:', error);
          setUserStatus('Login failed. Please try again later.');
      }
  };
  
    return () => {
      
    }
  }, [])
  

  const handleSubmit = async (e) => {
      e.preventDefault();
      const currentUser = auth.currentUser;

      if (profilePic) {
          const storageRef = storage.ref();
          const profilePicRef = storageRef.child(`${username + serverTimestamp()}.${profilePic.name.split('.').pop()}`);
          setUploading(true);

          try {
              await profilePicRef.put(profilePic);
              const photoURL = await profilePicRef.getDownloadURL();
              await currentUser.updateProfile({ photoURL });
              setUploading(false);
          } catch (error) {
              console.error("Error uploading file: ", error);
              setUploading(false);
          }
      }

      if (email !== '') {
          await currentUser.updateEmail(email);
      }
      if (password !== '') {
          await currentUser.updatePassword(password);
      }
  };

  async function handleUpdateAccount(){
    let newUser = {
      id: 1,
      username: "billy",
      password: "Password",
      email: "billy@gmail.com",
      date: "",
      joinDate: "",
      profileUrl: "http://localhost:5000/images/defaultpp.png",
      coins: 10,
      unlockedPost: "",
      following: "",
      subscriptions: ""
    }

    newUser = currentUser

    // newUser.id = uuid();
    // console.log("New User ID: "+ newUser.id)
    newUser.email = email;
    newUser.password = password;
    newUser.username = username;

    // const res = await createUserWithEmailAndPassword(auth, email, password);

    //Create a unique image name
    const date = new Date().getTime();
    // newUser.joinDate = date;

    let imageData = ppImage;
    let imgUploadResponse; 
    let ppImgLink = "";

    let imageUpload = await axios.post('http://localhost:5000/upload', { image: imageData, username: username, date: date })
          .then(response => {console.log(response.data); imgUploadResponse = response; ppImgLink = response.data.link})
          .catch(error => console.error('Error uploading the image:', error));

    newUser.profileUrl = ppImgLink;

    const response = await axios.put(`http://localhost:4000/users/${currentUser.id}`, newUser);

  }

  // const { currentUser } = useContext(AuthContext);

  return (
    <>
      <TopNavBar />
      
      
      <div style={{ padding: 10, backgroundColor: "#a7bcff" }}>
        <div
          style={{
            // height: 150,
            width: "90%",
            margin: "auto",
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#eeeeff",
          }}
        >
          <h1>Account</h1>
          <br />
          <div>
            <div>
              <b>Coins: </b> <span style={{margin: 5}}> 5 </span>
              <button> Get More</button>
            </div>
            
            <div>
              <h4 style={{paddingBottom: 5}}>Subscriptions:</h4> 
              <div style={{width:"90%", height:100, margin:"auto", overflowY: "scroll", backgroundColor: "lightgray", borderRadius: 5}}></div>
              
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: 10, backgroundColor: "#a7bcff", height: "100%" }}>
        <div
          style={{
            width: "90%",
            margin: "auto",
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#eeeeff",
          }}
        >
          <div>
            <h1>Account Settings</h1>
            <br />
            <form onSubmit={handleSubmit}>
              <table style={{ margin: "auto" }}>
                <tr>
                  <td>
                    <label htmlFor="">Email: </label>
                  </td>
                  <td>
                    <input
                      type="email"
                      value={currentUser.email}
                      onChange={handleEmailChange}
                      placeholder="Change Email"
                    />
                  </td>
                </tr>
                {/* <br /> */}
                <tr>
                  <td>
                    <label htmlFor="">Username: </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={currentUser.username}
                      onChange={handleUsernameChange}
                      placeholder="Change Username"
                    />
                  </td>
                </tr>
                {/* <br /> */}
                <tr>
                  <td>
                    <label htmlFor="">Password: </label>
                  </td>
                  <td>
                    <input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Change Password"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="">Confirm Password: </label>
                  </td>
                  <td>
                    <input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Confirm Password"
                    />
                  </td>
                </tr>
               
                <tr>
                  <ImageCanvas setPPImage={setPPImage}/>
                </tr>
               
                <br />
                
                <tr>
                  <td></td>
                  <td>
                    <button
                      style={{ padding: 5, float: "right", marginLeft: "auto" }}
                      type="submit"
                      disabled={uploading}
                      onClick={handleUpdateAccount}
                    >
                      Update Account
                    </button>
                  </td>
                </tr>
              </table>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
