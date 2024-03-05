import React, { useContext, useRef, useState, useEffect } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { v4 as uuid } from "uuid";


const 
Input = ({data, setNewChat}) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const inputBoxRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  console.log("Data: ", data);

  var currentdate = new Date(); 
  var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

  const handleAttachment = async() => {
    
  }

  const handleSend = async () => {
    let tempChat = data; //data is the whole chat history
    //store at the end of the msg array
    var currentdate = new Date(); 
    
    let text = inputBoxRef.current.value;

    let newChat = {
      datetime: currentdate,
      messageText: text,
      msgId: uuid(),
      reaction: "",
      from: currentUser.username
      
      // Attach file/img adding to the chat
    };
    tempChat.messages[data.messages.length] = newChat
    // tempChat.messages[data.messages.length-1] = newChat;

    setNewChat(tempChat) //send it to the newChat variable in the ChatPage.jsx file
    console.log("New Chat: ", tempChat)
    setTimeout(()=>{
      inputBoxRef.current.value = "";
    }, 500)
    
  }

  // useEffect(() => {
    
  //   console.log("Input Text: ", text)
    
  // }, [text])
  

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        // onChange={(e) => setText(e.target.value)}
        // value={text}
        ref={inputBoxRef}
      />
      <div className="send">
        {/* <img src={Attach} alt="" /> */}
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        {/* <label htmlFor="file">
          <img src={Img} alt="" />
        </label> */}
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
