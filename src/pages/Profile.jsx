// import React from "react";
import React, { useContext, useState } from "react";
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

  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <TopNavBar />
      
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
                      value={email}
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
                      value={username}
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
                      placeholder="Change Password"
                    />
                  </td>
                </tr>
                {/* <br /> */}
                {/* <tr>
                  <td>
                    <label htmlFor="">Upload Picture: </label>
                  </td>
                  <td>
                    <input type="file" onChange={handleProfilePicChange} />
                  </td>
                </tr> */}
                <tr>
                  <ImageCanvas/>
                </tr>
                {/* <tr>
                  <td>
                    <label htmlFor=""> Image Preview: </label>
                  </td>
                  <td>
                    <img
                      id="topNavBarPic"
                      src={currentUser.photoURL}
                      alt=""
                      style={{
                        backgroundColor: "#ddddf7",
                        height: 160,
                        width: 160,
                        borderRadius: 5,
                        borderColor: "gray",
                        border: "3px solid gray",
                        objectFit: "cover",
                        marginLeft: "auto",
                      }}
                    />
                  </td>
                </tr> */}
                <br />
                {/* <br /> */}

                <tr>
                  <td></td>
                  <td>
                    <button
                      style={{ padding: 5, float: "right", marginLeft: "auto" }}
                      type="submit"
                      disabled={uploading}

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
