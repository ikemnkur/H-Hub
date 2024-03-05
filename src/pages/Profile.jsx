// import React from "react";
import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import TopNavBar from "../components/TopNavBar";

import GetMoreCoinsModal from "../components/GetMoreCoinsModal";
import { useNavigate, Link, Navigate } from "react-router-dom";
import ImageCanvas from "../components/ImageUploadPreview";



const AccountSettings = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [userStatus, setUserStatus] = useState(false);
  const [ppImage, setPPImage] = useState(null);
  const { v4: uuid } = require("uuid");

  const [isOpenCoinModal, setisOpenCoinModal] = useState(false);

  const usernameRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const subscribeInputRef = useRef()
  const followInputRef = useRef()
  const coinsRef = useRef()

  const [searchedModels, setSearchedModels] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [followModel, setFollowModel] = useState(null);
  // const [models, setModels] = 
  let models = JSON.parse(localStorage.getItem("Models"));

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("")

  
  async function getCurrentUserData() {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    console.log(currentUser.id)
    const response = await axios.get(`http://localhost:4000/users?id=${currentUser.id}`);
    const data = response.data[0];
    console.log("Current User Data: ", response)
    setCurrentUser(data)

  }

  useEffect(() => {

    getCurrentUserData()

    try {
      // setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
      setUsername(currentUser.username);
      usernameRef.current.value = currentUser.username
      setCPassword(currentUser.password);
      setPassword(currentUser.password);
      setSearchedModels(models)
    } catch {
      // log out user if cant get user data
      console.log("Error: Can verify Login Status")
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
      setCurrentUser(newUser)
      navigate("/login")
    }
  }, [])



  const handleSubmit = async (e) => {

    e.preventDefault();

    setUsername(usernameRef.current.value)
    setPassword(passwordRef.current.value)
    setCPassword(confirmPasswordRef.current.value)

    handleUpdateAccount()

  };


  useEffect(() => {
    setTimeout(() => {
      if (currentUser && usernameRef.current) {
        setUsername(currentUser.username);
        console.log("Username Ref: ", usernameRef.current.value);
        usernameRef.current.value = currentUser.username;
        setCPassword(currentUser.password);
        setPassword(currentUser.password);
      } else {
        console.log("Ref is not attached or currentUser is not available");
      }
    }, 500);
    // Removed array around 500, it's the delay argument for setTimeout

  }, [currentUser]); // Added currentUser as a dependency


  async function handleUpdateAccount() {

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

    setUsername(usernameRef.current.value);
    if (passwordRef.current.value === "") {

    } else {
      setPassword(passwordRef.current.value);
      setCPassword(confirmPasswordRef.current.value);
    }


    console.log("Debug: ", username);

    if (cpassword !== password) {
      alert("Error: Passwords do not match");
      return;
    }

    let usernameStr = username


    if (usernameStr.length < 5) {
      let errortext = "Error: Username is too short. Length: " + usernameStr.length;
      alert(errortext);
      return;
    }

    let passwordLen = cpassword;

    if (passwordLen.length < 8 && passwordRef.current.value !== "") {
      let errortext = "Error: Password is too short. Length: " + passwordLen.length;
      alert(errortext);
      return;
    }

    newUser = currentUser
    if (passwordRef.current.value === "") {
      newUser.password = currentUser.password;
    } else {
      newUser.password = password;
    }

    newUser.username = username;

    //Create a unique image name
    const date = new Date().getTime();

    let imageData = ppImage;
    let imgUploadResponse;
    let ppImgLink = "";

    let imageUpload = await axios.post('http://localhost:5000/upload', { image: imageData, username: username, date: date })
      .then(response => {
        console.log(response.data);
        imgUploadResponse = response;
        ppImgLink = 'http://localhost:5000/uploads/pp/' + username + "-" + date + '-ProfilePic.png'
        // ppImgLink = response.data.link
        newUser.profileUrl = ppImgLink;
      }).catch(error => console.error('Error uploading the image:', error));



    const response = await axios.put(`http://localhost:4000/users/${currentUser.id}`, newUser);

    console.log("Account Update results: ", response)
    let accountUpdated = "Your account has been updated!";
    alert(accountUpdated);
    localStorage.setItem("currentUser", JSON.stringify(newUser))
    navigate("/login")

  }

  function openCoinModal() {
    setisOpenCoinModal(true)
  }

  // useEffect(() => {
  //   handleSearch4Models()
  // }, [])

  // async function handleSearch4Models() {



  //   let response = await axios.get(`http://localhost:4000/models`);
  //   let models = response.data;
  //   console.log("List of Models: ", models)
  //   setSearchedModels(models)
  //   localStorage.setItem("Models", JSON.stringify(models))

    

  // }

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
              <div style={{ margin: 5 }}>
                <div style={{ width: "90%", height: 32, margin: "auto", overflowY: "scroll", backgroundColor: "lightgray", borderRadius: 5, }}>

                  <div style={{ margin: 5 }}>
                    <b>Coins: </b> <span useRef="coinsRef" style={{ margin: 5, }}> {currentUser.coins} </span>
                    <button onClick={openCoinModal}> Get More</button>
                  </div>

                </div>
              </div>
              
              <div style={{ margin: 5, marginBottom: 10 }}>
                <div style={{ width: "90%", height: 150, margin: "auto", backgroundColor: "lightgray", borderRadius: 5 }}>
                  <h4 style={{ padding: 5, margin: "auto" }}>Subcriptions: <input useRef="subscriptionsInputRef"></input></h4>

                  <div style={{height: 120, width: "100%", margin: "auto", backgroundColor: "gray", borderRadius: "5", overflowX: "scroll", display: "flex", flexWrap: "wrap"}}>
                    {!(searchedModels === null) && searchedModels.map((model) => {
                      let input = ""
                      if(subscribeInputRef.current) {
                        input = subscribeInputRef.current.value;
                      }
                      if(currentUser.subscriptions.toLowerCase().includes(model.name.toLowerCase())){
                        console.log("model: ", model)
                        let mn = model.name.toLowerCase()
                        if (mn.includes(input.toLowerCase()) || input === "") {
                          return (
                            // <span>
                              <span style={{ display: "flex", gap: 2, margin: "auto", borderRadius: 5 }}>
                                <div style={{ padding: 5, margin: 5, display: "flex", flexDirection: "column", gap: 5, backgroundColor: "#eeeeff", borderRadius: 5 }}>
                                  <img src={model.modelProfileImg}  onClick={() => { navigate("/model?model=" + model.name) }} alt="" style={{ width: 64 }} />
                                  <b style={{ margin: "auto" }}>{model.name}</b>
                                  <div style={{ margin: "auto", gap: 2 }}>
                                    {/* <button onClick={() => { followModel(model.name) }}>Follow</button> */}
                                    {/* <button onClick={() => { navigate("/model?model=" + model.name) }}>Profile</button> */}
                                    {/* <button onClick={() => { navigate("/chat?model=" + model.name) }}>Chat</button> */}
                                  </div>
                                </div>
                              </span>
                            // </span>
                          )
                        }
                      }
 
                    })}
                  </div>

                </div>
              </div>
              
              <div style={{ margin: 5 }}>
                <div style={{ width: "90%", height: 150, margin: "auto", backgroundColor: "lightgray", borderRadius: 5 }}>
                  <h4 style={{ padding: 5, margin: "auto" }}>Following: <input useRef="followInputRef"></input></h4>

                  <div style={{height: 120, width: "100%", margin: "auto", backgroundColor: "gray", borderRadius: "5", overflowX: "scroll", display: "flex", flexWrap: "wrap"}}>
                    {!(searchedModels === null) && searchedModels.map((model) => {
                      let input = ""
                      if(followInputRef.current) {
                        input = followInputRef.current.value;
                      }
                      console.log("model: ", model)
                      let mn = model.name.toLowerCase()
                      if (mn.includes(input.toLowerCase()) || input === "") {
                        return (
                          // <span>
                            <span style={{ display: "flex", gap: 2, margin: "auto", borderRadius: 5 }}>
                              <div style={{ padding: 5, margin: 5, display: "flex", flexDirection: "column", gap: 5, backgroundColor: "#eeeeff", borderRadius: 5 }}>
                                <img src={model.modelProfileImg}  onClick={() => { navigate("/model?model=" + model.name) }} alt="" style={{ width: 64 }} />
                                <b style={{ margin: "auto" }}>{model.name}</b>
                                <div style={{ margin: "auto", gap: 2 }}>
                                  {/* <button onClick={() => { followModel(model.name) }}>Follow</button> */}
                                  {/* <button onClick={() => { navigate("/model?model=" + model.name) }}>Profile</button> */}
                                  {/* <button onClick={() => { navigate("/chat?model=" + model.name) }}>Chat</button> */}
                                </div>
                              </div>
                            </span>
                          // </span>
                        )
                      }
 
                    })}
                  </div>

                </div>
              </div>


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

                {/* <br /> */}
                <tr>
                  <td>
                    <label htmlFor="">Username: </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      // value={currentUser.username}
                      ref={usernameRef}
                      // onChange={handleUsernameChange}
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
                      // value={password}
                      ref={passwordRef}
                      // onChange={handlePasswordChange}
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
                      // value={password}
                      ref={confirmPasswordRef}
                      // onChange={handlePasswordChange}
                      placeholder="Confirm Password"
                    />
                  </td>
                </tr>

                <tr>
                  <ImageCanvas setPPImage={setPPImage} />
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

      {isOpenCoinModal && <GetMoreCoinsModal setIsOpen={setisOpenCoinModal} currentUser={currentUser} />}
    </>
  );
};

export default AccountSettings;
