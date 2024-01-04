// import React from "react";
import React, { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc, setDoc} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";

import { AuthContext } from "../context/AuthContext";

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

  return (
      <div>
          <form onSubmit={handleSubmit}>
              <input type="email" value={email} onChange={handleEmailChange} placeholder="Change Email" />
              <input type="text" value={username} onChange={handleUsernameChange} placeholder="Change Username" />
              <input type="password" value={password} onChange={handlePasswordChange} placeholder="Change Password" />
              <input type="file" onChange={handleProfilePicChange} />
              <button type="submit" disabled={uploading}>Update Settings</button>
          </form>
      </div>
  );
};

export default AccountSettings;
