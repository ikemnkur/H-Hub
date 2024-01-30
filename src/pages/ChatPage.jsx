// import React from "react";
import React, { useContext, useState, useEffect, useRef } from "react";

import axios from "axios";

import TopNavBar from "../components/TopNavBar";

import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";

import Messages from "../components/Messages";
import Input from "../components/Input";

import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

import { FaSearch } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import { v4 as uuid } from "uuid";


const ChatPage = () => {
  const { data } = useContext(ChatContext);

  const queryParameters = new URLSearchParams(window.location.search)
  
  let modelName = queryParameters.get("model")
  
  //Nav Bar Logic
  const [coins, setCoins] = useState(0);
  const [viewChat, setViewChat] = useState(false);
  const [allChats, setAllChats] = useState(null);
  
  const chatSearch = useRef(null);
  const chatsList = useRef(null);
  const chatPane = useRef(null);

  //  Search Bar Code
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [chatMode, setChatMode] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [newChat, setNewChat] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

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
    let chat = response.data;
    if (chat.messages === ""){
      chat = 
        {
          "id": "CHAT"+uuid(),
          "modelName": modelName,
          "userid": currentUser.id,
          "modelProfileImg": "https://www.elmueble.com/medio/2022/02/11/aranzazu-diaz-huerta_203d6a05_120x120.jpg",
          "messages": [
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
      
      console.log(`Creating New A Chat with ${modelName}: `, chat);
      console.log(`Getting Chat with ${modelName}: `, chat)
      setCurrentChat(chat)
      setChatMode("one") 
    } else {
      console.log(`Getting Chat with ${modelName}: `, chat)
      setCurrentChat(chat)
      setChatMode("one") 
    }
    
  }



  useEffect(() => {
    if (chatMode === "all")
      getAllChats(); // delete all related code later
    else
      getAChat();
  }, []);



  async function sendChat() {
    setCurrentChat(newChat)
    try {
      const response = await axios.put(`http://localhost:4000/chats/${currentChat.id}`, newChat);
      console.log('Item updated:', response.data);
      // setCurrentChat(null)
    } catch (error) {
      console.error('Error updating item:', error);
      setCurrentChat(null)
    }
    console.log("Updated Current Chat: ", currentChat)
  }

  useEffect(() => {
    if(currentChat!== null || newChat !== null){
      console.log("Current Chat: ", currentChat)
      // sendChat()
    }
    // getAChat();
  }, [newChat]);

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



  // Render HTML Code
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

      <div className="home">
        <div className="container">

          {/* <Navbar /> */}
          <div className="navbar" ref={chatSearch} id="navbar">
            <div className="user" style={{ display: "flex", backgroundColor: "#8e82d2", padding: 10 }}>
              <span style={{margin: 3}}> Coins: {coins}</span>
              <button onClick={() => setCoins(1 + coins)}>+ Get More</button>
              <button
                style={{ float: "right", marginLeft: "auto" }}
                onClick={()=>{openChats()}}
              >
                {" "}
                {">>>"}{" "}
              </button>
            </div>
          </div>


          {/* <Search /> */}
         { chatMode === "all" &&
          <div className="search">
              <div className="searchForm" style={{padding: 3, display: "flex", backgroundColor: "#8e82bd"}}>
                <FaSearch style={{margin: "auto", fontSize: 24, color: "white"}}/>
                <input
                  type="text"
                  placeholder="Find a user"
                  onKeyDown={handleKey}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  style={{padding: 5, margin: "5px 5px 5px 5px", width: "90%"}}
                />
              </div>
              {err && <span>User not found!</span>}
              {user && (
                <div className="userChat" onClick={()=> searchHandleSelect()}>
                  <img src={user.photoURL} alt="" />
                  <div className="userChatInfo">
                    <span>{user.displayName}</span>
                  </div>
                </div>
              )}
            </div>
          }


          {/* <ChatsList /> */}
          <div className="chats" style={{backgroundColor: "#8e82ad"}} ref={chatsList}>

          

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

           
          </div>


          {/* <Chat ref={chatPane}/> */}
          { currentChat !== null &&
            <div className="chat" style={{height: 512}} ref={chatPane}>
              <div className="chatInfo">
                <img src={currentChat.modelProfileImg} alt="" style={{width: 60, height: 60, borderRadius: 80, marginRight: 15}} />
                <h3 style={{marginRight: "auto", }}>{currentChat.modelName}</h3>
                {
                  chatMode === "all" &&
                  <div className="chatIcons">
                    <IoArrowBackCircleOutline style={{fontSize: 36}} /*onClick={()=>{closeChats()}}*//>
                  </div>
                }
                
              </div>
              <Messages data={currentChat}/>
              <Input data={currentChat} setNewChat={setNewChat}/>
            </div>
          }
          
        </div>
      </div>
      
      <div style={{ padding: 10, backgroundColor: "#a7bcff" }}>
        <div style={{height: 150,width: "90%",margin: "auto",padding: 10,borderRadius: 10,backgroundColor: "#eeeeff",}}>
          Ad
        </div>
      </div>
    </>
  );
};

export default ChatPage;
