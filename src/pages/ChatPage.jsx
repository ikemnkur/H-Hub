// import React from "react";
import React, { useContext, useState, useEffect, useRef } from "react";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";

// import Sidebar from "../components/Sidebar";
// import Chat from "../components/Chat";
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

import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const ChatPage = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  // const chatsList = useRef(null);

  // const ChatsList = () => {
  //   const [chats, setChats] = useState([]);

  //   const { currentUser } = useContext(AuthContext);
  //   const { dispatch } = useContext(ChatContext);

  //   useEffect(() => {
  //     const getChats = () => {
  //       const unsub = onSnapshot(
  //         doc(db, "userChats", currentUser.uid),
  //         (doc) => {
  //           setChats(doc.data());
  //         }
  //       );

  //       return () => {
  //         unsub();
  //       };
  //     };

  //     currentUser.uid && getChats();
  //   }, [currentUser.uid]);

  //   const handleSelect = (u) => {
  //     dispatch({ type: "CHANGE_USER", payload: u });
  //   };

  //   return (
  //     <div className="chats">
  //       {Object.entries(chats)
  //         ?.sort((a, b) => b[1].date - a[1].date)
  //         .map((chat) => (
  //           <div
  //             className="userChat"
  //             key={chat[0]}
  //             onClick={() => handleSelect(chat[1].userInfo)}
  //           >
  //             <img src={chat[1].userInfo.photoURL} alt="" />
  //             <div className="userChatInfo">
  //               <span>{chat[1].userInfo.displayName}</span>
  //               <p>{chat[1].lastMessage?.text}</p>
  //             </div>
  //           </div>
  //         ))}
  //     </div>
  //   );
  // };

  // const Navbar = (chatsList) => {
  //   const { currentUser } = useContext(AuthContext);

  //   const [coins, setCoins] = useState(0);
  //   const [viewChat, setViewChat] = useState(false);
  //   const chatSearch = useRef(null);
  //   // const chatsList = useRef(null);

  //   function openChats() {
  //     setViewChat(!viewChat);
  //     console.log("closeChats");
  //     // chatSearch.current.display = viewChat ? "block" : "none";
  //     // chatSearch.current.style.display = "none";
  //     chatsList.current.style.display = "none";
  //   }

  //   return (
  //     <div className="navbar" ref={chatSearch} id="navbar">
  //       <div className="user" style={{ display: "flex" }}>
  //         {/* <img src={currentUser.photoURL} alt="" /> */}
  //         {/* <span>{currentUser.displayName}</span> */}
  //         {/* <div> */}
  //         <span>Coins: {coins}</span>
  //         <button onClick={() => setCoins(1 + coins)}>+ Get More</button>
  //         {/* <button onClick={() => setCoins(!viewChat)}> {">>>"} </button> */}
  //         {/* </div> */}
  //         {/* <span>Coins: {coins}</span> */}
  //         <button
  //           style={{ float: "right", marginLeft: "auto" }}
  //           onClick={openChats}
  //         >
  //           {" "}
  //           {">>>"}{" "}
  //         </button>
  //         {/* <button onClick={()=>signOut(auth)}>logout</button> */}
  //       </div>
  //     </div>
  //   );
  // };

  // const Search = () => {
  //   const [username, setUsername] = useState("");
  //   const [user, setUser] = useState(null);
  //   const [err, setErr] = useState(false);

  //   const { currentUser } = useContext(AuthContext);

  //   const handleSearch = async () => {
  //     const q = query(
  //       collection(db, "users"),
  //       where("displayName", "==", username)
  //     );

  //     try {
  //       const querySnapshot = await getDocs(q);
  //       querySnapshot.forEach((doc) => {
  //         setUser(doc.data());
  //       });
  //     } catch (err) {
  //       setErr(true);
  //     }
  //   };

  //   const handleKey = (e) => {
  //     e.code === "Enter" && handleSearch();
  //   };

  //   const handleSelect = async () => {
  //     //check whether the group(chats in firestore) exists, if not create
  //     const combinedId =
  //       currentUser.uid > user.uid
  //         ? currentUser.uid + user.uid
  //         : user.uid + currentUser.uid;
  //     try {
  //       const res = await getDoc(doc(db, "chats", combinedId));

  //       if (!res.exists()) {
  //         //create a chat in chats collection
  //         await setDoc(doc(db, "chats", combinedId), { messages: [] });

  //         //create user chats
  //         await updateDoc(doc(db, "userChats", currentUser.uid), {
  //           [combinedId + ".userInfo"]: {
  //             uid: user.uid,
  //             displayName: user.displayName,
  //             photoURL: user.photoURL,
  //           },
  //           [combinedId + ".date"]: serverTimestamp(),
  //         });

  //         await updateDoc(doc(db, "userChats", user.uid), {
  //           [combinedId + ".userInfo"]: {
  //             uid: currentUser.uid,
  //             displayName: currentUser.displayName,
  //             photoURL: currentUser.photoURL,
  //           },
  //           [combinedId + ".date"]: serverTimestamp(),
  //         });
  //       }
  //     } catch (err) {}

  //     setUser(null);
  //     setUsername("");
  //   };

  //   return (
  //     <div className="search">
  //       <div className="searchForm">
  //         <input
  //           type="text"
  //           placeholder="Find a user"
  //           onKeyDown={handleKey}
  //           onChange={(e) => setUsername(e.target.value)}
  //           value={username}
  //         />
  //       </div>
  //       {err && <span>User not found!</span>}
  //       {user && (
  //         <div className="userChat" onClick={handleSelect}>
  //           <img src={user.photoURL} alt="" />
  //           <div className="userChatInfo">
  //             <span>{user.displayName}</span>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  // const Chat = () => {
  //   const { data } = useContext(ChatContext);

  //   return (
  //     <div className="chat" style={{height: 512}}>
  //       <div className="chatInfo">
  //         <span>{data.user?.displayName}</span>
  //         <div className="chatIcons">
  //           {/* <img src={Cam} alt="" /> */}
  //           {/* <img src={Add} alt="" />
  //           <img src={More} alt="" /> */}
  //           <IoArrowBackCircleOutline style={{fontSize: 24}}/>
  //         </div>
  //       </div>
  //       <Messages />
  //       <Input />
  //     </div>
  //   );
  // };

  //Nav Bar Logic
  const [coins, setCoins] = useState(0);
  const [viewChat, setViewChat] = useState(false);
  const chatSearch = useRef(null);
  const chatsList = useRef(null);
  const chatPane = useRef(null);

  function openChats() {
    setViewChat(!viewChat);
    console.log("closeChats");
    // chatSearch.current.display = viewChat ? "block" : "none";
    // chatSearch.current.style.display = "none";
    chatsList.current.style.display = "none";
    
  }

  useEffect(() => {

    }, []);

  //  Search Bar Code
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const searchHandleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };

  // List of Chats Code
  const [chats, setChats] = useState([]);

  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    chatPane.current.style.display = "block";
    chatsList.current.style.display = "none";
    console.log("Chat with User: "+ u);
  };

  // Messages/Chats Logic
  // const { data } = useContext(ChatContext);
  
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
          {/* <Sidebar /> */}

          {/* <Navbar /> */}
          <div className="navbar" ref={chatSearch} id="navbar">
            <div className="user" style={{ display: "flex", backgroundColor: "#8e82d2", padding: 10 }}>
              <span style={{margin: 3}}> Coins: {coins}</span>
              <button onClick={() => setCoins(1 + coins)}>+ Get More</button>
              <button
                style={{ float: "right", marginLeft: "auto" }}
                onClick={openChats}
              >
                {" "}
                {">>>"}{" "}
              </button>
            </div>
          </div>


          {/* <Search /> */}
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
              <div className="userChat" onClick={searchHandleSelect}>
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                  <span>{user.displayName}</span>
                </div>
              </div>
            )}
          </div>


          {/* <ChatsList /> */}
          <div className="chats" style={{backgroundColor: "#8e82ad"}} ref={chatsList}>
            {Object.entries(chats)
              ?.sort((a, b) => b[1].date - a[1].date)
              .map((chat) => (
                <div
                  className="userChat"
                  key={chat[0]}
                  onClick={() => handleSelect(chat[1].userInfo)}
                  style={{display: 'flex', padding: 3}}
                >
                  <img src={chat[1].userInfo.photoURL} alt="" style={{width:32, height: 32, margin: 3}}/>
                  <div className="userChatInfo" style={{display: "flex"}}>
                    <h4 style={{margin: "auto"}}>{chat[1].userInfo.displayName}: </h4>
                    <span style={{margin: "auto", paddingLeft: 3}}>{chat[1].lastMessage?.text}</span>
                  </div>
                </div>
              ))}
          </div>


          {/* <Chat ref={chatPane}/> */}
          <div className="chat" style={{height: 512}} ref={chatPane}>
            <div className="chatInfo">
              <span>{data.user?.displayName}</span>
              <div className="chatIcons">
                {/* <img src={Cam} alt="" /> */}
                {/* <img src={Add} alt="" />
                <img src={More} alt="" /> */}
                <IoArrowBackCircleOutline style={{fontSize: 36}} onClick={closeChats}/>
              </div>
            </div>
            <Messages />
            <Input />
          </div>
          
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
