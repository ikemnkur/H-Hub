// import React from "react";
import React, { useContext, useState, useEffect, useRef, useLayoutEffect} from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

import TopNavBar from "../components/TopNavBar";
import GetMoreCoinsModal from "../components/GetMoreCoinsModal";

import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";

import Messages from "../components/Messages";
import Input from "../components/Input";
import Message from "../components/Message";

import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

import { FaSearch } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import { v4 as uuid } from "uuid";


const ChatPage = () => {
  // const { data } = useContext(ChatContext);

  const navigate = useNavigate();

  const queryParameters = new URLSearchParams(window.location.search)
  
  let modelName = queryParameters.get("model")
  
  //Nav Bar Logic
  const [coins, setCoins] = useState(0);
  const [viewChat, setViewChat] = useState(false);
  const [allChats, setAllChats] = useState(null);
  const [openCoinModal, setOpenCoinModal] = useState(false);
  
  const chatSearch = useRef(null);
  const chatsList = useRef(null);
  const chatPane = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const newChatTemplate = 
  {
    id: "CHAT"+uuid(),
    modelName: modelName,
    userid: currentUser.id,
    modelProfileImg: `http://localhost:5000/images/modelPP/${modelName}.jpg`,
    messages: [
      {
        "msgId": "MSG"+uuid(),
        "from": modelName,
        "to": currentUser.username,
        "datetime": new Date(),
        "messageText": "Hey thanks for chatting with me, I will reply to any messages soon.",
        "reaction": "like"
      },
    ]
  }

  //  Search Bar Code
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [chatMode, setChatMode] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [newChat, setNewChat] = useState(null);

  
  function openChats() {
    setViewChat(!viewChat);
    console.log("closeChats");
    // chatSearch.current.display = viewChat ? "block" : "none";
    // chatSearch.current.style.display = "none";
    chatsList.current.style.display = "none";
    
  }

  async function getAllChats() {
    const response = await axios.get(`http://localhost:4000/chats}`);
    const chats = response.data;
    console.log("Get All Chats: ", chats)
    setAllChats(chats)
    setChatMode("all")
  }

  var currentdate = new Date(); 
  var datetime = "Sent: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + (currentdate.getMinutes()) > 9? "0" : "" + currentdate.getMinutes() + ":" 
                + (currentdate.getSeconds()) > 9? "0" : "" + currentdate.getSeconds();


  async function getAChat() {
    console.log("Model:" + queryParameters.get("model"));
    // const response = await axios.get(`http://localhost:4000/chats?modelName=${queryParameters.get("model")}`);
    const response = await axios.get(`http://localhost:4000/chats?modelName=${queryParameters.get("model")}&userid=${currentUser.id}`);
    let chat = response.data[0];
    console.log("Retrieved Chat: ", response)
    // console.log("Retrieved Chat: ", chat)
    try {
      if (chat.messages){
        //If no messages exist yet
        console.log(`Getting Chat with ${modelName}: `, chat)
        setCurrentChat(chat)
      } else {
        setCurrentChat(newChatTemplate)
        console.log(`Creating New A Chat with ${modelName}: `, newChatTemplate);
      }
    } catch (error) {
      setCurrentChat(newChatTemplate)
      console.log(`Creating New A Chat with ${modelName}: `, newChatTemplate);
    }
    
    
    setChatMode("one") 
  }

  // getAChat()

  
  async function sendChat() {
    try {
      console.log("Current Chat ID: ", currentChat.id)
      console.log("Model Pic URL: ", currentChat.modelProfileImg)
      const response = await axios.put(`http://localhost:4000/chats/${currentChat.id}`, newChat);
      console.log('Item updated:', response.data);
      setCurrentChat(newChat)
    } catch (error) {
      console.error('Error updating item:', error);
    }
    console.log("Updated Current Chat: ", currentChat);
    // localStorage.setItem("currentChat", JSON.stringify(currentChat))
  }


  // Update current Chat in localstorage
  useEffect(() => {
    // getAChat();
    localStorage.setItem("currentChat", JSON.stringify(currentChat))
  }, [currentChat]);
  

  //Updated chat page when new chat is sent
  useEffect(() => {
    setCoins(currentUser.coins) 
    if (newChat !== null) {
      setCurrentChat(newChat)
      sendChat() 
      // localStorage.setItem("currentChat", JSON.stringify(currentChat))
    }
  }, [newChat]);


  useEffect(() => {
    if (chatMode === "all")
      getAllChats(); // delete all related code later
    else
      getAChat();

    // setInterval(() => {
    //   // if (newChat !== currentChat){
    //     console.log("re-render: 2")
    //     if (chatMode === "all")
    //       getAllChats(); // delete all related code later
    //     else
    //       getAChat();
    //   // }
      
    // }, 15000);
  }, []);

  // setInterval(() => {
  //     console.log("re-render: 1")
  // }, 5000);


  // useEffect(() => {
  //   if(currentChat!== null || newChat !== null){
  //     console.log("Current Chat: ", currentChat[0])
  //     // sendChat()
  //   }
  //   // getAChat();
  // }, [newChat]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('This will run every second!');
  //     sendChat();
  //     getAChat();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);
  
  const handleSearch = async () => {
    // const msgUser = allUsers.find(u => u.username === username);

    



   
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const searchHandleSelect = async () => {
  
  }

  const handleSelect = (u) => {
    // dispatch({ type: "CHANGE_USER", payload: u });
    chatPane.current.style.display = "block";
    chatsList.current.style.display = "none";
    console.log("Chat with User: "+ u);
  };

  
  function closeChats() {
    chatPane.current.style.display = "none"; 
    chatsList.current.style.display = "block";
  }

  function goToChat(){
    console.log("click Image")
    navigate("/login")
  }

  function openBuyCoinModal(){
    setCoins(1 + coins)
    setOpenCoinModal(true)
  }

  // Render HTML Code
  return (
    <>

      <TopNavBar />

      <div style={{ padding: 10, backgroundColor: "#a7bcff" }}>
        <div style={{height: 150,width: "90%",margin: "auto",padding: 10,borderRadius: 10,backgroundColor: "#eeeeff",}}>
          Ad
        </div>
      </div>

      <div className="home">
        <div className="container">

          {/* <Navbar /> */}
          <div className="navbar" ref={chatSearch} id="navbar">
            <div className="user" style={{ display: "flex", backgroundColor: "#8e82d2", padding: 10 }}>
              <span style={{margin: 3}}> Coins: {coins}</span>
              <button style={{ float: "right", marginLeft: "auto" }} onClick={() => openBuyCoinModal()}>+ Get More</button>
              
              {/* <button
                style={{ float: "right", marginLeft: "auto" }}
                onClick={()=>{openChats()}}
              >
                {" "}{">>>"}{" "}
              </button> */}
            </div>
          </div>


          {/* <Search /> */}
         {/* { chatMode === "all" &&
          <div className="search">
              <div className="searchForm" style={{padding: 3, display: "flex", backgroundColor: "#8e82bd"}}>
                <FaSearch style={{margin: "auto", fontSize: 24, color: "white"}}/>
                <input type="text" placeholder="Find a user" onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  style={{padding: 5, margin: "5px 5px 5px 5px", width: "90%"}}
                />
              </div>
              {err && <span>User not found!</span>}
              {user && (
                <div className="userChat" onClick={()=> searchHandleSelect()}>
                  <div onClick={()=> goToChat()}>
                    <img src={user.photoURL} alt="" />
                  </div>
                  
                  <div className="userChatInfo">
                    <span>{user.displayName}</span>
                  </div>
                </div>
              )}
            </div>
          } */}


          {/* <ChatsList /> */}
          {/* <div className="chats" style={{backgroundColor: "#8e82ad"}} ref={chatsList}>
            {allChats !== null && allChats.map((chat) => {
                return(
                  <div key={chat.id} className="userChat" onClick={() => handleSelect(chat.modelName)} style={{display: 'flex', padding: 3}}>
                  <img src={chat.modelProfileImg} alt="" style={{width:32, height: 32, margin: 3}}/>
                  <div className="userChatInfo" style={{display: "flex"}}>
                    <h4 style={{margin: "auto"}}>{chat.modelName}: </h4>
                    <span style={{margin: "auto", paddingLeft: 3}}> {chat.messages[chat.messages.length - 1].messageText} </span>
                  </div>
                </div>
                )
              }
            )}        
          </div> */}


          {/* Chat with model */}
          { currentChat !== null &&
            <div className="chat" style={{height: 512}} ref={chatPane}>
              <div className="chatInfo">
                <div onClick={()=> goToChat()}>
                    {/* <img src={user.photoURL} alt="" />  */}
                    <img src={currentChat.modelProfileImg} alt="" style={{width: 60, height: 60, borderRadius: 80, marginRight: 15}} />
                </div>
                  
               
                <h3 style={{marginRight: "auto" }}>{currentChat.modelName}</h3>
                {
                  chatMode === "all" &&
                  <div className="chatIcons">
                    <IoArrowBackCircleOutline style={{fontSize: 36}} /*onClick={()=>{closeChats()}}*//>
                  </div>
                }
                
              </div>
              {/* {currentChat && */}
                <>
                  {/* <Messages data={currentChat} /> */}
                  <div className="messages">
                    {currentChat.messages.map((m) => (
                      <Message message={m} key={uuid()} data={currentChat} />
                    ))}
                  </div>
                  <Input data={currentChat} setNewChat={setNewChat} />
                </>
              {/* } */}
              
            </div>
          }
          
        </div>
      </div>
      
      <div style={{ padding: 10, backgroundColor: "#a7bcff" }}>
        <div style={{height: 150,width: "90%",margin: "auto",padding: 10,borderRadius: 10,backgroundColor: "#eeeeff",}}>
          Ad
        </div>
      </div>
      {openCoinModal && <GetMoreCoinsModal setIsOpen={setOpenCoinModal} currentUser={currentUser} />}
    </>
  );
};

export default ChatPage;
